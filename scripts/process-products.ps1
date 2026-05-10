param(
  [string]$SourceRoot = "public/products",
  [string]$OutputRoot = "public/products-processed"
)

Add-Type -AssemblyName System.Drawing

Add-Type -ReferencedAssemblies "System.Drawing.dll" -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class ProductBackgroundProcessor
{
    public static void Process(string inputPath, string outputPath)
    {
        using (var original = new Bitmap(inputPath))
        using (var bitmap = new Bitmap(original.Width, original.Height, PixelFormat.Format32bppArgb))
        using (var graphics = Graphics.FromImage(bitmap))
        {
            graphics.DrawImage(original, 0, 0, original.Width, original.Height);

            Color bg = AverageCorners(bitmap);
            bool lightBackground = ((bg.R + bg.G + bg.B) / 3.0) > 185;
            Rectangle rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
            BitmapData data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int bytesCount = Math.Abs(data.Stride) * bitmap.Height;
            byte[] bytes = new byte[bytesCount];
            Marshal.Copy(data.Scan0, bytes, 0, bytesCount);

            for (int y = 0; y < bitmap.Height; y++)
            {
                int row = y * Math.Abs(data.Stride);
                for (int x = 0; x < bitmap.Width; x++)
                {
                    int i = row + (x * 4);
                    int b = bytes[i];
                    int g = bytes[i + 1];
                    int r = bytes[i + 2];
                    double average = (r + g + b) / 3.0;
                    int max = Math.Max(r, Math.Max(g, b));
                    int min = Math.Min(r, Math.Min(g, b));
                    int spread = max - min;
                    double distance = Math.Sqrt(Math.Pow(r - bg.R, 2) + Math.Pow(g - bg.G, 2) + Math.Pow(b - bg.B, 2));

                    int alpha = 255;
                    bool neutralBackground = average > 70 && spread < 38;
                    if (neutralBackground)
                    {
                        alpha = 0;
                    }
                    else if ((lightBackground && average > 174 && spread < 58 && distance < 94) || (average > 150 && spread < 72))
                    {
                        int cornerAlpha = (int)((distance - 18) * 4.2);
                        int lightAlpha = (int)(((218 - average) * 4.8) + (spread * 2.2));
                        alpha = Math.Min(255, Math.Max(0, Math.Min(cornerAlpha, lightAlpha)));
                    }

                    bytes[i + 3] = (byte)alpha;
                }
            }

            Marshal.Copy(bytes, 0, data.Scan0, bytesCount);
            bitmap.UnlockBits(data);
            Directory.CreateDirectory(Path.GetDirectoryName(outputPath));
            bitmap.Save(outputPath, ImageFormat.Png);
        }
    }

    private static Color AverageCorners(Bitmap bitmap)
    {
        Color[] samples = new Color[]
        {
            bitmap.GetPixel(0, 0),
            bitmap.GetPixel(bitmap.Width - 1, 0),
            bitmap.GetPixel(0, bitmap.Height - 1),
            bitmap.GetPixel(bitmap.Width - 1, bitmap.Height - 1)
        };

        int r = 0, g = 0, b = 0;
        foreach (Color sample in samples)
        {
            r += sample.R;
            g += sample.G;
            b += sample.B;
        }

        return Color.FromArgb(255, r / samples.Length, g / samples.Length, b / samples.Length);
    }
}
'@

$categories = @("floral", "dolls", "mats", "custom")
$extensions = @("*.png", "*.jpg", "*.jpeg")

foreach ($category in $categories) {
  $sourceDirectory = Join-Path $SourceRoot $category
  if (!(Test-Path $sourceDirectory)) {
    continue
  }

  foreach ($extension in $extensions) {
    Get-ChildItem -Path $sourceDirectory -Filter $extension -File -ErrorAction SilentlyContinue | ForEach-Object {
      $outputPath = Join-Path (Join-Path $OutputRoot $category) ($_.BaseName + ".png")
      [ProductBackgroundProcessor]::Process($_.FullName, (Join-Path (Resolve-Path ".") $outputPath))
      Write-Host "processed $($_.FullName) -> $outputPath"
    }
  }
}

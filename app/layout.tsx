import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "هنـاي | مشغولات كروشيه يدوية",
  description: "واجهة عربية فاخرة لعرض مشغولات هنـاي اليدوية من الورود والدمى والمفارش والطلبات الخاصة."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

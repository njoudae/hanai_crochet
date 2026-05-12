import { readdirSync, statSync } from "fs";
import path from "path";
import CrochetShowcase, { CategoryKey, Product } from "@/components/CrochetShowcase";

const categoryFolders: Record<CategoryKey, string> = {
  floral: "floral",
  dolls: "dolls",
  mats: "mats",
  custom: "custom"
};

const heroImageAliases: Record<CategoryKey, string[]> = {
  floral: ["floral", "foral"],
  dolls: ["dolls"],
  mats: ["mats"],
  custom: ["custom"]
};

const categoryLabels: Record<CategoryKey, string> = {
  floral: "مفارش الورد",
  dolls: "الدمى",
  mats: "المفارش",
  custom: "الطلبات الخاصة"
};

const productNames: Record<CategoryKey, string[]> = {
  floral: [
    "مفرش ورد وردي",
    "وردة كروشيه ناعمة",
    "مفرش ورد أزرق",
    "مفرش ورد بنفسجي",
    "مفرش ورد أحمر"
  ],
  dolls: ["بُـــو", "ستروبيري", "لـــوفي", "دمية", "الأخصائية"],
  mats: ["مفرش بيبي", "مفرش طاولة كريمي", "مفرش قهوة هادئ"],
  custom: ["ورد التوليب", "كب كيك الفراولة", "ميدالية باقة الورد", "دونات!"]
};

const descriptions: Record<CategoryKey, string[]> = {
  floral: [
    "مفارش الورد تبقى جميلة وتمنح الهدية إحساسًا دافئًا.",
    "قطعة ناعمة بتفاصيل دقيقة ولمسة أنثوية راقية.",
    "اختيار مثالي لهدية ثمينة تحمل معنى كبيرًا."
  ],
  dolls: [
    "دمية كروشيه لطيفة تُصنع بعناية لتكون هدية مختلفة.",
    "شخصية صغيرة بتفاصيل هادئة وملمس دافئ.",
    "قطعة محببة للعرض أو الإهداء."
  ],
  mats: [
    "مفرش بيبي ناعم ودافئ.",
    "قطعة عملية وأنيقة للطاولة أو ركن القهوة.",
    "ملمس يدوي يغيّر إحساس المكان ببساطة."
  ],
  custom: [
    "قطعة تُصنع حسب فكرتك وألوانك والمناسبة التي تحبينها.",
    "تفاصيل شخصية تجعل الهدية أقرب للقلب.",
    "تنفيذ هادئ وراقي لفكرة خاصة."
  ]
};

function normalizeProductTitle(fileName: string, index: number, category: CategoryKey) {
  return productNames[category][index] ?? `${categoryLabels[category]} ${index + 1}`;
}

function readFilesFrom(folderPath: string) {
  try {
    return readdirSync(folderPath)
      .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
      .filter((file) => statSync(path.join(folderPath, file)).isFile())
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

function readHeroImages() {
  const heroRoot = path.join(process.cwd(), "public", "for_show");
  const files = readFilesFrom(heroRoot);

  return (Object.keys(categoryFolders) as CategoryKey[]).reduce(
    (acc, category) => {
      const aliases = heroImageAliases[category].map((alias) => alias.toLowerCase());
      const match = files.find((file) => aliases.includes(path.parse(file).name.toLowerCase()));
      acc[category] = match ? `/for_show/${match}` : null;
      return acc;
    },
    {} as Record<CategoryKey, string | null>
  );
}

function readProducts() {
  const sourceRoot = path.join(process.cwd(), "public", "products");
  const heroImages = readHeroImages();

  return (Object.keys(categoryFolders) as CategoryKey[]).reduce(
    (acc, category) => {
      const folder = categoryFolders[category];
      const sourcePath = path.join(sourceRoot, folder);
      const files = readFilesFrom(sourcePath);

      const products = files.map<Product>((file, index) => {
        const name = normalizeProductTitle(file, index, category);
        const categoryLabel = categoryLabels[category];
        const shortDescription = descriptions[category][index % descriptions[category].length];

        return {
          id: `${category}-${index}`,
          name,
          category,
          categoryLabel,
          image: `/products/${folder}/${file}`,
          heroImage: heroImages[category],
          shortDescription,
          whatsappMessage: `السلام عليكم، أرغب بطلب هذا المنتج من هنـاي:\nاسم المنتج: ${name}\nالقسم: ${categoryLabel}`
        };
      });

      acc[category] =
        products.length > 0
          ? products
          : productNames[category].map((name, index) => ({
              id: `${category}-placeholder-${index}`,
              name,
              category,
              categoryLabel: categoryLabels[category],
              image: null,
              heroImage: heroImages[category],
              shortDescription: descriptions[category][index % descriptions[category].length],
              whatsappMessage: `السلام عليكم، أرغب بطلب هذا المنتج من هنـاي:\nاسم المنتج: ${name}\nالقسم: ${categoryLabels[category]}`
            }));

      return acc;
    },
    {} as Record<CategoryKey, Product[]>
  );
}

export default function Home() {
  return <CrochetShowcase productsByCategory={readProducts()} />;
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  MapPin,
  Music2,
  MessageCircle,
  Sparkles,
  Truck,
  X
} from "lucide-react";
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CategoryKey = "floral" | "dolls" | "mats" | "custom";

export type Product = {
  id: string;
  name: string;
  category: CategoryKey;
  categoryLabel: string;
  image: string | null;
  heroImage: string | null;
  shortDescription: string;
  whatsappMessage: string;
};

type CategoryMeta = {
  key: CategoryKey;
  label: string;
  nav: string;
  sectionTitle: string;
  eyebrow: string;
  heroLine: string;
  sectionDescription: string;
  detail: string;
  accent: string;
  accentSoft: string;
  accentDeep: string;
  glow: string;
  reviews: string[];
};

const phoneNumber = "966582968140";
const tiktokUsername = "hanai.crochet0";

const instagramUsername = "njoodnfc";
const xUsername = "hanai_crochet";
const socialLinks = {
  instagram: `https://www.instagram.com/${instagramUsername}`,
  tiktok: `https://www.tiktok.com/@${tiktokUsername}`,
  whatsapp: `https://wa.me/${phoneNumber}`,
  x: `https://x.com/${xUsername}`
};

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7.2 19.2 3.8 20l.9-3.2A8.3 8.3 0 1 1 7.2 19.2Z" />
      <path d="M8.4 8.1c.2-.5.4-.6.8-.6h.6c.2 0 .5.1.6.5l.5 1.2c.1.4.1.6-.1.8l-.4.5c-.1.2-.2.4 0 .6.5.9 1.3 1.7 2.4 2.3.2.1.4.1.6-.1l.6-.6c.2-.2.5-.2.8-.1l1.2.6c.4.2.5.4.5.7v.5c0 .4-.2.7-.6.9-.6.3-1.6.5-3-.1-1.7-.7-3.1-1.9-4.1-3.3-1-1.3-1.5-2.6-.9-3.8Z" />
    </svg>
  );
}

function BrandLogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="14" />
      <path d="M17 18C19 14 22 12 24 12s5 2 7 6" />
      <path d="M16 26c4-6 8-8 16-8" />
      <path d="M18 30c5-7 10-9 14-9" />
      <path d="M24 11v6" />
    </svg>
  );
}

const categories: CategoryMeta[] = [
  {
    key: "floral",
    label: "مفارش الورد",
    nav: "مفارش الورد",
    sectionTitle: "قسم مفارش الورد",
    eyebrow: "باقة كروشيه تبهرك بجمالها",
    heroLine: "الورد الذي لا يذبل، بألوان ناعمة وتفاصيل دقيقة.",
    sectionDescription: "باقات وورود كروشيه ناعمة، مصنوعة لتكون هدية راقية أو إضافة لطيفة في المكان.",
    detail: "خيوط ناعمة، تنسيق هادئ، وتغليف بسيط يليق بالهدية.",
    accent: "#f4b8c6",
    accentSoft: "#fae5ea",
    accentDeep: "#9a5265",
    glow: "rgba(244, 184, 198, 0.44)",
    reviews: ["وش هالشغل الزين ❤️❤️", "الشغل ما شاء الله جميل ومرتب"]
  },
  {
    key: "dolls",
    label: "الدمى",
    nav: "الدمى",
    sectionTitle: "قسم الدمى",
    eyebrow: "رفيقات صغيرة بتفاصيل محببة",
    heroLine: "دمى كروشيه لطيفة تحمل إحساس الهدية الشخصية.",
    sectionDescription: "دمى ناعمة بتفاصيل دقيقة، تصلح للعرض أو الإهداء أو كذكرى صغيرة قريبة للقلب.",
    detail: "تعابير هادئة، ألوان دافئة، وملمس مصنوع بعناية.",
    accent: "#e56b6f",
    accentSoft: "#fae1e2",
    accentDeep: "#9b3038",
    glow: "rgba(229, 107, 111, 0.44)",
    reviews: ["النتيجة مبهرة", "You have a golden touch honey"]
  },
  {
    key: "mats",
    label: "المفارش",
    nav: "المفارش",
    sectionTitle: "قسم المفارش",
    eyebrow: "دفء صغير لتفاصيل البيت",
    heroLine: "مفارش كروشيه تضيف هدوءًا للمكان.",
    sectionDescription: "قطع منزلية ناعمة للطاولة وركن القهوة والتفاصيل اليومية التي تستحق لمسة يدوية.",
    detail: "نسيج مرتب، ألوان هادئة، وحضور بسيط يرفع جمال الركن.",
    accent: "#9db89f",
    accentSoft: "#e8f0e8",
    accentDeep: "#536f55",
    glow: "rgba(157, 184, 159, 0.48)",
    reviews: ["غيّر شكل الطاولة بالكامل", "شغل مرتب وفخم"]
  },
  {
    key: "custom",
    label: "طلبات خاصة",
    nav: "الطلبات الخاصة",
    sectionTitle: "قسم الطلبات الخاصة",
    eyebrow: "قطعة تشبه فكرتك",
    heroLine: "طلبات كروشيه مخصصة تُصنع حول قصتك.",
    sectionDescription: "اختاري الألوان والمناسبة والتفاصيل، ونحوّل الفكرة إلى قطعة يدوية دافئة.",
    detail: "تنسيق ألوان، تفاصيل شخصية، ولمسة نهائية مناسبة للإهداء.",
    accent: "#c6a3dd",
    accentSoft: "#f0e4f7",
    accentDeep: "#6f4a86",
    glow: "rgba(198, 163, 221, 0.5)",
    reviews: ["نفذوا فكرتي بالضبط", "رهيبة ما شاء الله تجنن ❤️✨"]
  }
];

const categoryIndexByKey = categories.reduce(
  (acc, category, index) => ({ ...acc, [category.key]: index }),
  {} as Record<CategoryKey, number>
);

function getWhatsAppUrl(product: Product) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(product.whatsappMessage)}`;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type HeroItem = {
  category: CategoryMeta;
  product: Product;
};

function useActiveProduct(productsByCategory: Record<CategoryKey, Product[]>) {
  const heroItems = useMemo(
    () =>
      categories
        .map((category) => {
          const product = productsByCategory[category.key]?.[0];
          return product ? { category, product } : null;
        })
        .filter((item): item is HeroItem => item !== null),
    [productsByCategory]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const timerGenerationRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimerWindow = useCallback(() => {
    timerGenerationRef.current += 1;
    clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    clearTimer();

    if (heroItems.length <= 1) {
      return undefined;
    }

    const timerGeneration = timerGenerationRef.current;
    timerRef.current = window.setTimeout(() => {
      if (timerGenerationRef.current !== timerGeneration) {
        return;
      }
      setActiveIndex((current) => (current + 1) % heroItems.length);
    }, 4000);

    return clearTimer;
  }, [activeIndex, clearTimer, heroItems.length]);

  useEffect(() => {
    if (activeIndex >= heroItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, heroItems.length]);

  const activeItem = heroItems[activeIndex] ?? heroItems[0];
  const activeCategory = activeItem?.category ?? categories[0];
  const activeProduct = activeItem?.product ?? productsByCategory[activeCategory.key][0];
  const activeCategoryIndex = categoryIndexByKey[activeCategory.key];

  const selectCategory = useCallback(
    (key: CategoryKey, shouldScroll = false) => {
      const heroIndex = heroItems.findIndex((item) => item.category.key === key);
      if (heroIndex !== -1) {
        resetTimerWindow();
        setActiveIndex(heroIndex);
      }
      if (shouldScroll) {
        window.setTimeout(() => scrollToSection(key), 50);
      }
    },
    [heroItems, resetTimerWindow]
  );

  return {
    activeCategory,
    activeProduct,
    categoryIndex: activeCategoryIndex,
    selectCategory,
    next: useCallback(() => {
      resetTimerWindow();
      setActiveIndex((current) => (current + 1) % Math.max(heroItems.length, 1));
    }, [heroItems.length, resetTimerWindow]),
    prev: useCallback(() => {
      resetTimerWindow();
      setActiveIndex((current) => (current - 1 + Math.max(heroItems.length, 1)) % Math.max(heroItems.length, 1));
    }, [heroItems.length, resetTimerWindow]),
  };
}

function PlaceholderProduct({ label }: { label: string }) {
  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center justify-center">
      <div className="absolute h-64 w-64 rounded-full border border-white/80 bg-[repeating-radial-gradient(circle,#ffffff_0_7px,rgba(255,255,255,0.18)_8px_14px)] shadow-float" />
      <div className="absolute h-44 w-44 rounded-full border border-[color:var(--accent)]/35 bg-[radial-gradient(circle,#fff_0_28%,var(--accent-soft)_29%_100%)]" />
      <div className="relative rounded-full border border-ink/10 bg-white/65 px-5 py-3 text-sm font-bold text-ink/55 shadow-soft backdrop-blur">
        أضيفي صور {label} هنا
      </div>
    </div>
  );
}

function ProductImage({
  product,
  priority = false,
  imageOverride = null,
  className = ""
}: {
  product: Product;
  priority?: boolean;
  imageOverride?: string | null;
  className?: string;
}) {
  const image = imageOverride ?? product.image;

  if (!image) {
    return <PlaceholderProduct label={product.categoryLabel} />;
  }

  return (
    <Image
      src={image}
      alt={product.name}
      fill
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized
      sizes="(max-width: 768px) 82vw, 36vw"
      className={`pointer-events-none object-contain ${className}`}
    />
  );
}

function Header({
  activeCategory,
  selectCategory
}: {
  activeCategory: CategoryMeta;
  selectCategory: (key: CategoryKey, shouldScroll?: boolean) => void;
}) {
  const navItems = [
    { label: "الرئيسية", id: "top" },
    ...categories.map((category) => ({ label: category.nav, id: category.key })),
    { label: "عن هنــاي", id: "maker" }
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-[8px] border border-white/70 bg-white/72 px-3 py-3 shadow-soft backdrop-blur-2xl sm:px-4 sm:py-5 lg:flex-nowrap lg:py-7">
        <a href="#top" className="order-1 flex min-w-0 items-center gap-2 sm:gap-3" aria-label="الرئيسية">
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[color:var(--accent-soft)] sm:h-10 sm:w-10">
            <Image
              src="/logo/hanai_corosh.jpg"
              alt="هنـاي"
              fill
              className="object-cover"
            />
          </span>
          <span className="leading-none">
            <span className="block whitespace-nowrap font-display text-xl font-bold text-ink sm:text-2xl">هنـاي</span>
            <span className="mt-1 block whitespace-nowrap text-[9px] font-medium leading-none text-ink/45 sm:mt-2 sm:text-[11px]">مشغولات كروشيه يدوية</span>
          </span>
        </a>

        <nav className="order-3 flex w-full -translate-y-0.5 items-center justify-center gap-1 overflow-x-auto text-[10px] font-bold text-ink/58 hide-scrollbar sm:-translate-y-1 sm:text-xs md:text-sm lg:order-2 lg:w-auto lg:gap-2">
          <a href="#top" className="shrink-0 rounded-full px-2 py-1.5 transition hover:bg-white/70 hover:text-ink sm:px-3 sm:py-2">
            {navItems[0].label}
          </a>
          {categories.map((category) => {
            const active = category.key === activeCategory.key;
            return (
              <a
                key={category.key}
                href={`#${category.key}`}
                onClick={() => selectCategory(category.key, false)}
                className="shrink-0 rounded-full px-2 py-1.5 transition hover:bg-white/70 hover:text-ink sm:px-3 sm:py-2"
                style={{
                  color: active ? category.accentDeep : undefined,
                  background: active ? category.accentSoft : undefined
                }}
              >
                {category.nav}
              </a>
            );
          })}
          <a href="#maker" className="shrink-0 rounded-full px-2 py-1.5 transition hover:bg-white/70 hover:text-ink sm:px-3 sm:py-2">
            {navItems[navItems.length - 1].label}
          </a>
        </nav>

        <div className="order-2 flex items-center gap-1 sm:gap-1.5 lg:order-3">
          {[
            { label: "Instagram", icon: Instagram, href: socialLinks.instagram },
            { label: "TikTok", icon: Music2, href: socialLinks.tiktok },
            { label: "WhatsApp", icon: WhatsAppIcon, href: socialLinks.whatsapp },
            { label: "X", icon: X, href: socialLinks.x }
          ].map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-7 w-7 place-items-center rounded-full text-ink/65 transition hover:bg-ink hover:text-white sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function ReviewBubble({ text, index, accent }: { text: string; index: number; accent: string }) {
  const positions = [
    "right-[2%] top-[66%] md:right-[8%] md:top-[69%]",
    "left-[2%] top-[16%] md:left-[9%] md:top-[18%]"
  ];
  const avatars = ["/avatars/avatar-1.png", "/avatars/avatar-11.png"];

  return (
    <div
      className={`pointer-events-none absolute z-20 hidden items-center gap-3 rounded-[8px] border border-white/70 bg-white/72 px-3 py-2 shadow-soft backdrop-blur-xl sm:flex ${positions[index]}`}
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white bg-white shadow-soft">
        <Image
          src={avatars[index % avatars.length]}
          alt=""
          fill
          unoptimized
          sizes="40px"
          className="object-cover"
        />
      </span>
      <span className="max-w-40 text-sm font-bold leading-snug text-ink">{text}</span>
      <Heart className="h-3.5 w-3.5 fill-current" style={{ color: accent }} />
    </div>
  );
}

function CategoryPills({
  activeKey,
  selectCategory
}: {
  activeKey: CategoryKey;
  selectCategory: (key: CategoryKey, shouldScroll?: boolean) => void;
}) {
  return (
    <div className="relative z-30 mx-auto flex max-w-3xl snap-x gap-2 overflow-x-auto px-1 py-4 hide-scrollbar sm:justify-center">
      {categories.map((category) => {
        const active = category.key === activeKey;
        return (
          <button
            key={category.key}
            type="button"
            onClick={() => selectCategory(category.key, true)}
            className="snap-card pointer-events-auto relative z-30 cursor-pointer shrink-0 rounded-full border px-5 py-7 text-sm font-bold transition hover:-translate-y-0.5"
            style={{
              borderColor: active ? category.accent : "rgba(23, 20, 18, 0.1)",
              background: active ? category.accentSoft : "rgba(255, 255, 255, 0.74)",
              color: active ? category.accentDeep : "rgba(23, 20, 18, 0.58)"
            }}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

const deliveryCities = [
  { name: "الرياض", x: 55, y: 50 },
  { name: "جدة", x: 35, y: 62 },
  { name: "المدينة", x: 30, y: 42 },
  { name: "الدمام", x: 60, y: 35 },
  { name: "أبها", x: 45, y: 66 }
];

function DeliveryMapPanel({
  activeCategory,
  next,
  prev
}: {
  activeCategory: CategoryMeta;
  next: () => void;
  prev: () => void;
}) {
  return (
    <aside className="hero-map-panel pointer-events-auto relative z-30 order-3 flex min-h-[360px] flex-col justify-between rounded-[8px] border border-white/75 bg-white/78 p-3 text-right shadow-soft backdrop-blur-xl lg:order-none lg:h-full lg:min-h-[520px] lg:p-5">
      <div className="mb-3 flex items-center justify-start gap-2 lg:mb-7 lg:gap-3 lg:justify-center">
        <button
          type="button"
          onClick={prev}
          aria-label="السابق"
          className="pointer-events-auto relative z-30 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:bg-ink hover:text-white lg:h-12 lg:w-12"
        >
          <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="التالي"
          className="pointer-events-auto relative z-30 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:bg-ink hover:text-white lg:h-12 lg:w-12"
        >
          <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
      </div>

      <div className="flex items-start justify-between gap-2 lg:gap-4">
        <div>
          <p className="text-[10px] font-bold leading-5 lg:text-xs" style={{ color: activeCategory.accentDeep }}>
            توصيل هنـاي
          </p>
          <h2 className="mt-1 font-display text-xl font-bold leading-tight text-ink lg:mt-3 lg:text-3xl">
            نصل لجميع مناطق السعودية
          </h2>
          <p className="mt-2 max-w-xs text-[11px] font-medium leading-5 text-ink/58 lg:mt-3 lg:text-sm lg:leading-7">
            تغليف أنيق وتوصيل سريع، لتصل القطعة كهدية دافئة من أول لحظة.
          </p>
        </div>
        <span
          className="grid h-9 w-9 shrink-0 -translate-y-6 place-items-center rounded-full border border-white/80 shadow-soft lg:h-12 lg:w-12 lg:-translate-y-5"
          style={{ background: activeCategory.accentSoft, color: activeCategory.accentDeep }}
        >
          <Truck className="h-4 w-4 lg:h-5 lg:w-5" />
        </span>
      </div>

      <div className="hero-map-frame relative mt-3 h-[172px] overflow-hidden rounded-[8px] border border-white/70 bg-white/50 shadow-soft md:h-[190px] lg:mt-7 lg:h-auto lg:aspect-[1.08]">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 45% 45%, ${activeCategory.glow}, transparent 62%)` }} />
        <div className="hero-map-inner relative z-10 mx-auto h-full w-[180px] md:w-[205px] lg:w-full lg:max-w-[270px]" aria-label="خريطة السعودية">
          <div
            className="pointer-events-none absolute inset-[2%]"
            style={{
              background: activeCategory.accentSoft,
              WebkitMaskImage: "url('/maps/Ksa1.png')",
              maskImage: "url('/maps/Ksa1.png')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%"
            }}
          />
          <Image
            src="/maps/Ksa.png"
            alt=""
            fill
            unoptimized
            sizes="270px"
            className="pointer-events-none object-contain opacity-50"
          />
          {deliveryCities.map((city) => (
            <span
              key={city.name}
              className="absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5 text-[8px] font-bold text-ink lg:gap-1 lg:text-[11px]"
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
            >
              <span>{city.name}</span>
              <span className="grid h-4 w-4 place-items-center rounded-full border border-white bg-white/85 shadow-soft lg:h-6 lg:w-6">
                <MapPin className="h-2.5 w-2.5 lg:h-3.5 lg:w-3.5" style={{ color: activeCategory.accent }} />
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-1 lg:mt-4 lg:gap-1.5">
        {deliveryCities.map((city) => (
          <span key={city.name} className="inline-flex items-center gap-0.5 rounded-full border border-ink/10 bg-white/62 px-1.5 py-0.5 text-[9px] font-bold text-ink/58 lg:gap-1 lg:px-2.5 lg:py-1 lg:text-[11px]">
            <MapPin className="h-2.5 w-2.5 lg:h-3 lg:w-3" />
            {city.name}
          </span>
        ))}
      </div>

    </aside>
  );
}

function Hero({
  activeCategory,
  activeProduct,
  categoryIndex,
  selectCategory,
  next,
  prev
}: ReturnType<typeof useActiveProduct>) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-10 pt-32 sm:px-6 lg:pt-32"
    >
      <div
        className="ambient-drift pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[62rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${activeCategory.glow}, transparent 66%)` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.78),rgba(255,255,255,0.28),rgba(255,255,255,0.72))]" />

      <Header activeCategory={activeCategory} selectCategory={selectCategory} />

      <div className="relative z-10 mx-auto mt-8 max-w-7xl">
        <div
          className="hero-shell relative overflow-hidden rounded-[8px] border border-white/70 px-2 py-3 shadow-float backdrop-blur-2xl sm:px-4 lg:h-[650px] lg:px-14 lg:py-12"
          style={{
            background: `linear-gradient(90deg, #f4f2ed 0%, rgba(255,255,255,0.9) 42%, ${activeCategory.accentSoft} 100%)`
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/8 lg:block" />
          <div className="hero-showcase-grid grid grid-cols-[0.86fr_1.05fr_0.86fr] items-stretch gap-2 lg:h-full lg:grid-cols-[0.9fr_1.2fr_0.82fr] lg:gap-10">
            <div
              className="hero-copy-card relative z-30 order-1 flex min-h-[360px] flex-col justify-center rounded-[8px] border border-white/75 bg-white/82 p-3 text-right shadow-soft backdrop-blur-xl lg:order-none lg:h-full lg:min-h-[520px] lg:p-6"
            >
              <p className="mb-2 max-w-sm text-[11px] font-medium leading-5 tracking-normal lg:mb-5 lg:text-base lg:leading-8" style={{ color: activeCategory.accentDeep }}>
                {activeCategory.eyebrow}
              </p>
              <h1 className="flex min-h-[5.5rem] items-center text-balance font-display text-[clamp(1.45rem,7vw,2.25rem)] font-bold leading-[0.95] tracking-normal text-ink lg:min-h-[10rem] lg:text-[clamp(3rem,5.3vw,5rem)]">
                {activeProduct.name}
              </h1>
              <p className="mt-3 max-w-sm font-display text-sm font-bold leading-5 text-ink lg:mt-6 lg:text-2xl lg:leading-9">{activeCategory.heroLine}</p>
              <p className="mt-2 max-w-sm text-[11px] font-medium leading-5 text-ink/75 lg:mt-5 lg:text-base lg:leading-8">{activeProduct.shortDescription}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 lg:mt-8 lg:gap-3">
                <a
                  href={getWhatsAppUrl(activeProduct)}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto relative z-30 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-2 text-[10px] font-bold text-white shadow-soft transition hover:scale-[1.03] lg:gap-2 lg:px-6 lg:py-3 lg:text-sm"
                >
                  <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  اطلب عبر واتساب
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection(activeCategory.key)}
                  className="pointer-events-auto relative z-30 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-[10px] font-bold text-ink/70 transition hover:bg-ink hover:text-white lg:gap-2 lg:px-5 lg:py-3 lg:text-sm"
                >
                  استعرض المجموعة
                </button>
              </div>
            </div>

            <div className="hero-product-stage relative z-10 order-2 min-h-[360px] lg:order-none lg:h-full lg:min-h-[520px]">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-t-full rounded-b-[10px] shadow-soft"
                style={{ background: activeCategory.accentSoft }}
              />
              <div className="pointer-events-none absolute left-1/2 top-[84%] h-10 w-[58%] -translate-x-1/2 rounded-full bg-ink/16 blur-xl" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[64%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: activeCategory.glow }} />

              <div
                key={activeProduct.id}
                className="hero-product-image pointer-events-none absolute inset-x-0 top-1/2 z-10 mx-auto h-[76%] max-w-[520px] -translate-y-1/2"
              >
                <ProductImage product={activeProduct} priority imageOverride={activeProduct.heroImage} />
              </div>

            </div>

            <DeliveryMapPanel
              activeCategory={activeCategory}
              next={next}
              prev={prev}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, category }: { product: Product; category: CategoryMeta }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="snap-card group relative flex w-[78vw] shrink-0 flex-col rounded-[8px] border border-white/80 bg-white/58 p-4 shadow-soft backdrop-blur-md sm:w-[420px]"
    >
      <div className="relative mb-5 aspect-[4/5] overflow-visible rounded-[8px]">
        <div className="absolute inset-8 rounded-full blur-3xl" style={{ background: category.glow }} />
        <div className="absolute bottom-8 left-1/2 h-8 w-[58%] -translate-x-1/2 rounded-full bg-ink/10 blur-lg" />
        <motion.div className="absolute inset-3" whileHover={{ scale: 1.01 }}>
          <ProductImage product={product} />
        </motion.div>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="pb-1 font-display text-3xl font-bold leading-tight text-ink">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/52">{product.shortDescription}</p>
        </div>
        <a
          href={getWhatsAppUrl(product)}
          target="_blank"
          rel="noreferrer"
          aria-label={`اطلب ${product.name} عبر واتساب`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white transition group-hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </motion.article>
  );
}

function ProductSection({ category, products, isFirst = false }: { category: CategoryMeta; products: Product[]; isFirst?: boolean }) {
  return (
    <section
      id={category.key}
      className={`scroll-mt-28 px-4 pb-20 sm:px-6 lg:pb-28 ${isFirst ? "pt-3 lg:pt-3" : "pt-20 lg:pt-28"}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 max-w-sm text-base font-medium leading-8 tracking-normal" style={{ color: category.accentDeep }}>
              {category.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(3.1rem,8vw,7rem)] font-bold leading-[0.95] text-ink">{category.sectionTitle}</h2>
          </div>
          <p className="max-w-sm text-base leading-8 text-ink/56">{category.sectionDescription}</p>
        </div>

        <div className="hide-scrollbar snap-x flex gap-5 overflow-x-auto p-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MakerSection({ activeCategory }: { activeCategory: CategoryMeta }) {
  return (
    <section id="maker" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[8px] border border-white/80 bg-white/62 p-7 shadow-soft backdrop-blur-xl md:grid-cols-[220px_1fr] md:p-10">
        <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-white bg-[color:var(--accent-soft)] shadow-soft">
          <div className="absolute inset-4 rounded-full bg-white/50" />
          <Image
            src="/logo/hanai_corosh.jpg"
            alt="هنـاي"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-4 text-base font-medium leading-8 tracking-normal" style={{ color: activeCategory.accentDeep }}>
            عن هنـاي
          </p>
          <h2 className="font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">مشغولات صغيرة بروح دافئة.</h2>
          <p className="mt-6 max-w-4xl text-lg leading-9 text-ink/58 xl:whitespace-nowrap">
            في هنـاي، تُصنع كل قطعة كروشيه يدويًا بعناية، لتكون هدية دافئة أو تفصيلة جميلة تضيف لمسة خاصة للمكان.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer({ activeCategory }: { activeCategory: CategoryMeta }) {
  return (
    <footer id="footer" className="px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-4xl font-bold text-ink">هنـاي</p>
          <p className="mt-2 text-sm text-ink/50">مشغولات كروشيه يدوية</p>
          <p className="mt-1 text-sm text-ink/50">كل غرزة تحكي حكاية</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: Instagram, href: socialLinks.instagram },
            { icon: Music2, href: socialLinks.tiktok },
            { icon: WhatsAppIcon, href: socialLinks.whatsapp },
            { icon: X, href: socialLinks.x }
          ].map(({ icon: Icon, href }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/60 text-ink/65 transition hover:text-white"
              onMouseEnter={(event) => {
                event.currentTarget.style.background = activeCategory.accent;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "rgba(255,255,255,0.6)";
              }}
              aria-label="رابط اجتماعي"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-sm text-ink/44">© 2026 هنـاي</p>
      </div>
    </footer>
  );
}

export default function CrochetShowcase({ productsByCategory }: { productsByCategory: Record<CategoryKey, Product[]> }) {
  const active = useActiveProduct(productsByCategory);
  const cssVars = useMemo(
    () =>
      ({
        "--accent": active.activeCategory.accent,
        "--accent-soft": active.activeCategory.accentSoft,
        "--accent-deep": active.activeCategory.accentDeep
      }) as CSSProperties,
    [active.activeCategory]
  );

  return (
    <main style={cssVars} className="relative min-h-screen overflow-hidden bg-porcelain">
      <div className="grain pointer-events-none" />
      <Hero {...active} />
      {categories.map((category, index) => (
        <ProductSection key={category.key} category={category} products={productsByCategory[category.key]} isFirst={index === 0} />
      ))}
      <MakerSection activeCategory={active.activeCategory} />
      <Footer activeCategory={active.activeCategory} />
    </main>
  );
}

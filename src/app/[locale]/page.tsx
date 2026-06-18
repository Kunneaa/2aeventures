"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  homeFocusGroups,
  products,
  type HomeFocusGroup,
  type HomeFocusSection,
} from "../../lib/catalogData";
import { brandAssets, brandCopy } from "../../config/brand";
import { useLanguage } from "../../store";
import type { LocaleCode, Product } from "../../types";

type FocusSectionConfig = HomeFocusSection;

type DirectionGroupStyle = {
  accent: string;
  badge: string;
  header: string;
};

type DirectionGroupConfig = HomeFocusGroup & DirectionGroupStyle;
type FocusItem = Pick<Product, "id" | "name" | "image">;

type FocusSection = {
  title: FocusSectionConfig["title"];
  categoryIds: string[];
  totalItems: number;
};

type DirectionGroup = Omit<DirectionGroupConfig, "sections"> & {
  sections: FocusSection[];
};

const directionGroupStyles: Record<HomeFocusGroup["type"], DirectionGroupStyle> = {
  import: {
    accent: "text-[#c9a86a]",
    badge: "bg-[#c9a86a]/10 text-[#c9a86a] border border-[#c9a86a]/20",
    header: "bg-[#0d1821] text-[#f5f5f5]",
  },
  export: {
    accent: "text-[#c9a86a]",
    badge: "bg-[#c9a86a]/10 text-[#c9a86a] border border-[#c9a86a]/20",
    header: "bg-[#0d1821] text-[#f5f5f5]",
  },
};

const directionGroupConfigs = homeFocusGroups.map((group) => ({
  ...group,
  ...directionGroupStyles[group.type],
})) satisfies DirectionGroupConfig[];

const getProductsByCategories = (categoryIds: string[]): FocusItem[] =>
  products
    .filter((product) => categoryIds.includes(product.categoryId))
    .map(({ id, name, image }) => ({ id, name, image }));

const directionGroups: DirectionGroup[] = directionGroupConfigs.map((group) => ({
  ...group,
  sections: group.sections.map((section) => {
    const sectionProducts = getProductsByCategories(section.categoryIds);

    return {
      title: section.title,
      categoryIds: section.categoryIds,
      totalItems: sectionProducts.length,
    };
  }),
}));

const getProductsHref = (basePath: string, categoryIds: string[]): string => {
  if (categoryIds.length === 1) {
    return `${basePath}/products?category=${categoryIds[0]}`;
  }

  return `${basePath}/products?category=${categoryIds[0]}`;
};

type HomeCopy = (typeof brandCopy)[LocaleCode]["home"];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export default function HomePage() {
  const { language, t } = useLanguage();
  const copy = brandCopy[language].home;
  const basePath = `/${language}`;

  return (
    <div className="bg-[#071018] text-[#f5f5f5] selection:bg-[#c9a86a] selection:text-[#071018] font-sans">
      <HeroSection copy={copy} basePath={basePath} />
      
      <div className="relative z-10 -mt-20">
        <CoreValuesSection copy={copy} />
      </div>

      <section className="py-24 md:py-32">
        <div className="section-shell space-y-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#c9a86a] uppercase tracking-[0.3em] text-[10px] font-bold mb-6"
            >
              {t("home_business_areas")}
            </motion.p>
            <motion.h2 
              {...fadeUp}
              className="font-serif text-4xl md:text-5xl text-[#f5f5f5] tracking-wide leading-tight"
            >
              {copy.featuredEyebrow}
            </motion.h2>
          </div>

          {directionGroups.map((group, index) => (
            <FocusGroup
              key={group.type}
              group={group}
              copy={copy}
              language={language}
              index={index}
              basePath={basePath}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function HeroSection({ copy, basePath }: { copy: HomeCopy; basePath: string }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={brandAssets.homeHero}
          alt="2AE frozen food sourcing and distribution"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-[#071018]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071018]/50 via-transparent to-transparent" />
      </div>

      <div className="section-shell relative z-10 w-full pt-32 pb-20 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-[#c9a86a] uppercase tracking-[0.4em] text-xs font-bold mb-8">
            {copy.kicker}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#f5f5f5] tracking-tight leading-[1.1] mb-8" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
            {copy.heroTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[#8d9ba8] mb-12 font-light">
            {copy.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href={`${basePath}/products`} 
              className="group relative px-8 py-4 bg-[#c9a86a] text-[#071018] font-bold text-sm uppercase tracking-widest overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                {copy.primaryCta}
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
            <Link 
              href={`${basePath}/contact`} 
              className="px-8 py-4 border border-[#c9a86a]/30 text-[#f5f5f5] font-bold text-sm uppercase tracking-widest hover:border-[#c9a86a] hover:bg-[#c9a86a]/5 transition-all duration-500"
            >
              {copy.secondaryCta}
            </Link>
          </div>
        </motion.div>

        {/* Priority Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid sm:grid-cols-3 gap-8 sm:gap-0 mt-32 w-full max-w-5xl mx-auto border-t border-white/10 pt-10"
        >
          {copy.priority.map((item, index) => (
            <div
              key={item}
              className="text-center sm:border-r border-white/10 last:border-r-0 px-6"
            >
              <p className="text-[#c9a86a] font-serif text-3xl italic mb-3">0{index + 1}</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d9ba8] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CoreValuesSection({ copy }: { copy: HomeCopy }) {
  return (
    <section className="relative text-white max-w-6xl mx-auto px-6">
      <div className="rounded-xl border border-white/5 bg-[#0d1821]/80 backdrop-blur-2xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#c9a86a]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a86a]">
            {copy.valuesEyebrow}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {copy.values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="w-12 h-px bg-[#c9a86a]/30 mb-6 group-hover:w-24 group-hover:bg-[#c9a86a] transition-all duration-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d9ba8] mb-3">
                {item.text}
              </p>
              <h3 className="text-2xl md:text-3xl font-serif text-[#f5f5f5] leading-tight group-hover:text-[#c9a86a] transition-colors duration-500">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FocusSectionBlock({
  section,
  copy,
  language,
  badgeClassName,
  basePath,
}: {
  section: FocusSection;
  copy: HomeCopy;
  language: LocaleCode;
  badgeClassName: string;
  basePath: string;
}) {
  const { t } = useLanguage();
  const sectionHref = getProductsHref(basePath, section.categoryIds);
  
  const categoryImageMap: Record<string, string> = {
    beef: "/images/categories/beef.jpg",
    chicken: "/images/categories/chicken.jpg",
    seafood: "/images/categories/seafood.jpg",
    agriculture: "/images/categories/agriculture.jpg",
  };
  const bannerImage = categoryImageMap[section.categoryIds[0]] || "/images/categories/beef.jpg";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="group grid lg:grid-cols-[1fr_450px] gap-0 border border-white/5 bg-[#0d1821] overflow-hidden rounded-xl"
    >
      <div className="relative h-[300px] lg:h-auto w-full overflow-hidden order-2 lg:order-1">
        <Link href={sectionHref} className="block h-full w-full">
          <Image
            src={bannerImage}
            alt={section.title[language]}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-[#071018]/20 group-hover:bg-transparent transition-colors duration-700" />
        </Link>
      </div>

      <div className="flex flex-col justify-center p-10 md:p-14 order-1 lg:order-2 bg-[#0d1821] z-10">
        <h4 className="font-serif text-3xl text-[#f5f5f5] mb-4 group-hover:text-[#c9a86a] transition-colors duration-500">
          {section.title[language]}
        </h4>
        
        <p className="text-sm font-medium text-[#8d9ba8] mb-12 uppercase tracking-widest">
          {section.totalItems} {t("home_collections")}
        </p>
        
        <Link
          href={sectionHref}
          className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f5f5f5] transition hover:text-[#c9a86a] mt-auto"
        >
          <span>{copy.viewMore}</span>
          <span className="w-8 h-px bg-[#c9a86a] transition-all group-hover:w-12"></span>
        </Link>
      </div>
    </motion.div>
  );
}

function FocusGroup({
  group,
  copy,
  language,
  index,
  basePath,
}: {
  group: DirectionGroup;
  copy: HomeCopy;
  language: LocaleCode;
  index: number;
  basePath: string;
}) {
  const direction = copy.directions[group.type];

  return (
    <div id={group.type} className="pt-8 border-t border-[#c9a86a]/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <p className="text-[#c9a86a] font-serif text-2xl italic mb-2">0{index + 1}</p>
          <h3 className="text-4xl md:text-5xl font-serif text-[#f5f5f5] tracking-tight">
            {direction.title}
          </h3>
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-[#8d9ba8] font-bold">
          {direction.label}
        </p>
      </div>

      <div className="space-y-8">
        {group.sections.map((section) => (
          <FocusSectionBlock
            key={section.title.en}
            section={section}
            copy={copy}
            language={language}
            badgeClassName={group.badge}
            basePath={basePath}
          />
        ))}
      </div>
    </div>
  );
}

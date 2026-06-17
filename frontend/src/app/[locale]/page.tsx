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
import { useLanguage } from "../../store/LanguageContext";
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
    accent: "text-[#336699]",
    badge: "bg-[#f2f7fb] text-[#17324d]",
    header: "bg-[#17324d] text-white",
  },
  export: {
    accent: "text-[#2f6f63]",
    badge: "bg-[#edf7f2] text-[#2f6f63]",
    header: "bg-[#2f6f63] text-white",
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

  return `${basePath}/products?view=all`;
};

type HomeCopy = (typeof brandCopy)[LocaleCode]["home"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

function HeroAndValuesSection({
  copy,
  basePath,
}: {
  copy: HomeCopy;
  basePath: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[#0b151c]">
      <Image
        src={brandAssets.homeHero}
        alt="2AE frozen food sourcing and distribution"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.95),rgba(7,15,22,0.78)_50%,rgba(7,15,22,0.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#0b151c] via-[#0b151c]/82 to-transparent" />

      <HeroSection copy={copy} basePath={basePath} />
      <CoreValuesSection copy={copy} />
    </div>
  );
}

function HeroSection({ copy, basePath }: { copy: HomeCopy; basePath: string }) {
  return (
    <section className="relative">
      <div className="section-shell relative flex min-h-[680px] flex-col justify-end py-16 md:py-20">
        <motion.div className="flex flex-1 max-w-3xl flex-col justify-center" {...fadeUp}>
          <p className="eyebrow-on-dark">{copy.kicker}</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {copy.heroSubtitle}
          </p>

          <div className="mb-14 mt-9 flex flex-col gap-3 sm:flex-row md:mb-20">
            <Link href={`${basePath}/products`} className="btn-primary px-6 py-3 text-sm group flex items-center gap-1.5 justify-center">
              <span>{copy.primaryCta}</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href={`${basePath}/contact`} className="btn-secondary px-6 py-3 text-sm">
              {copy.secondaryCta}
            </Link>
          </div>
        </motion.div>

        <div className="grid w-full border-t border-white/20 sm:grid-cols-3">
          {copy.priority.map((item, index) => (
            <div
              key={item}
              className="border-b border-white/10 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white/80 last:border-b-0 sm:border-b-0 sm:border-r sm:border-white/10 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <span className="mr-2 text-[#d9a85c]">0{index + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValuesSection({ copy }: { copy: HomeCopy }) {
  return (
    <section className="relative text-white">
      <div className="section-shell pb-14">
        <div className="relative z-10 -mt-10 rounded-lg border border-white/15 bg-white/10 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-md">
          <div className="px-2 py-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#d9a85c]">
              {copy.valuesEyebrow}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {copy.values.map((item, index) => (
              <motion.div
                key={item.title}
                className="rounded-lg border border-white/15 bg-white/[0.08] p-5"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <p className="text-xs font-extrabold uppercase text-white/55">
                  {item.text}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
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
  const sectionHref = getProductsHref(basePath, section.categoryIds);
  
  const categoryImageMap: Record<string, string> = {
    beef: "/images/US-Beef.jpg",
    chicken: "/images/US-Chicken.jpg",
    seafood: "/images/Frozen-Seafood.jpg",
    agriculture: "/images/Agricultural.jpg",
  };
  const bannerImage = categoryImageMap[section.categoryIds[0]] || "/images/US-Beef.jpg";

  return (
    <div className="grid gap-5 px-4 py-6 md:px-6 lg:grid-cols-[210px_1fr]">
      <div className="flex items-center justify-between gap-3 lg:block">
        <div>
          <h4
            className={`inline-flex rounded-lg px-4 py-2 text-sm font-extrabold uppercase tracking-[0.08em] ${badgeClassName}`}
          >
            {section.title[language]}
          </h4>
          <p className="text-sm font-bold text-[#7a858a] lg:mt-4">
            {section.totalItems} {language === "vi" ? "sản phẩm" : "products"}
          </p>
        </div>
        <Link
          href={sectionHref}
          className="inline-flex items-center gap-1 text-sm font-extrabold text-[#336699] transition hover:text-[#17324d] lg:mt-5 group"
        >
          <span>{copy.viewMore}</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <div className="relative h-[280px] w-full overflow-hidden rounded-xl border border-[#d8e3df] bg-[#edf3f0] sm:h-[360px] lg:h-[480px]">
        <Link href={sectionHref} className="group block h-full w-full">
          <Image
            src={bannerImage}
            alt={section.title[language]}
            fill
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#0b151c]/10 transition-colors group-hover:bg-transparent" />
        </Link>
      </div>
    </div>
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
    <motion.article
      id={group.type}
      className="overflow-hidden rounded-lg border border-[#d8e3df] bg-white shadow-[0_16px_46px_rgba(23,36,45,0.07)]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="grid lg:grid-cols-[260px_1fr]">
        <div className={`flex min-h-36 flex-col justify-between p-5 md:p-6 ${group.header}`}>
          <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-white/70">
            0{index + 1}
          </p>
          <div>
            <p className="text-3xl font-extrabold leading-tight">{direction.label}</p>
          </div>
        </div>

        <div className="flex items-center p-5 md:p-7">
          <h3 className={`text-3xl font-extrabold leading-tight md:text-4xl ${group.accent}`}>
            {direction.title}
          </h3>
        </div>
      </div>

      <div className="divide-y divide-[#d8e3df] border-t border-[#d8e3df]">
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
    </motion.article>
  );
}

function FeaturedCategoriesSection({
  copy,
  basePath,
  language,
}: {
  copy: HomeCopy;
  basePath: string;
  language: LocaleCode;
}) {
  return (
    <section className="border-y border-[#d8e3df] bg-[#f6f8f6]">
      <div className="section-shell section-y">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow">{copy.featuredEyebrow}</p>
          <Link href={`${basePath}/products`} className="btn-secondary px-5 py-2.5 text-sm group flex items-center gap-1.5 justify-center">
            <span>{copy.primaryCta}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <div className="mt-8 space-y-6">
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
      </div>
    </section>
  );
}

export default function HomePage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { language } = useLanguage();
  const copy = brandCopy[language].home;
  const basePath = `/${params.locale}`;

  return (
    <div className="app-shell flex w-full flex-col">
      <HeroAndValuesSection copy={copy} basePath={basePath} />
      <FeaturedCategoriesSection
        copy={copy}
        basePath={basePath}
        language={language}
      />
    </div>
  );
}

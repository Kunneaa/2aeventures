"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "../../../components/products/ProductCard";
import { countProductsByCategory, getProductSearchableText } from "../../../lib/catalog";
import {
  homeFocusGroups,
  type HomeFocusGroup,
  type HomeFocusSection,
} from "../../../lib/catalogData";
import { matchesSearchQuery, normalizeSearchText } from "../../../lib/search";
import { useCatalog } from "../../../store/CatalogContext";
import { useLanguage } from "../../../store/LanguageContext";
import type { Category } from "../../../types";

type TradeGroupType = HomeFocusGroup["type"];

type ProductGroupSection = {
  id: string;
  title: HomeFocusSection["title"];
  categoryIds: string[];
  categories: Category[];
  image: string;
  productCount: number;
};

type ProductTradeGroup = {
  type: TradeGroupType;
  categoryIds: string[];
  productCount: number;
  sections: ProductGroupSection[];
};

const isTradeGroupType = (value: string | null): value is TradeGroupType =>
  value === "import" || value === "export";

const getSectionId = (section: Pick<HomeFocusSection, "categoryIds">): string =>
  section.categoryIds.join("-");

const getSectionImage = (categories: Category[]): string =>
  categories.find((category) => category.id === "seafood")?.image ?? categories[0]?.image ?? "";



export default function ProductsPage() {
  const { t, language } = useLanguage();
  const { categories, products } = useCatalog();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = normalizeSearchText(searchQuery);
  const isSearching = normalizedQuery.length > 0;

  const focusCategoryIds = useMemo(
    () =>
      new Set(
        homeFocusGroups.flatMap((group) =>
          group.sections.flatMap((section) => section.categoryIds),
        ),
      ),
    [],
  );

  const focusCategories = useMemo(
    () => categories.filter((category) => focusCategoryIds.has(category.id)),
    [categories, focusCategoryIds],
  );

  const focusProducts = useMemo(
    () => products.filter((product) => focusCategoryIds.has(product.categoryId)),
    [focusCategoryIds, products],
  );

  const categoryProductCount = useMemo(
    () => countProductsByCategory(focusCategories, focusProducts),
    [focusCategories, focusProducts],
  );

  const categoryById = useMemo(
    () => new Map(focusCategories.map((category): [string, Category] => [category.id, category])),
    [focusCategories],
  );

  const tradeGroups = useMemo<ProductTradeGroup[]>(
    () =>
      homeFocusGroups
        .map((group) => {
          const sections = group.sections
            .map((section): ProductGroupSection | null => {
              const sectionCategories = section.categoryIds
                .map((categoryId) => categoryById.get(categoryId))
                .filter((category): category is Category => Boolean(category));
              const productCount = section.categoryIds.reduce(
                (total, categoryId) => total + (categoryProductCount[categoryId] ?? 0),
                0,
              );

              if (sectionCategories.length === 0 || productCount === 0) {
                return null;
              }

              return {
                id: getSectionId(section),
                title: section.title,
                categoryIds: section.categoryIds,
                categories: sectionCategories,
                image: getSectionImage(sectionCategories),
                productCount,
              };
            })
            .filter((section): section is ProductGroupSection => Boolean(section));

          return {
            type: group.type,
            sections,
            categoryIds: sections.flatMap((section) => section.categoryIds),
            productCount: sections.reduce((total, section) => total + section.productCount, 0),
          };
        })
        .filter((group) => group.sections.length > 0),
    [categoryById, categoryProductCount],
  );

  const sectionById = useMemo(
    () =>
      new Map(
        tradeGroups.flatMap((group) =>
          group.sections.map((section): [string, ProductGroupSection] => [section.id, section]),
        ),
      ),
    [tradeGroups],
  );

  const groupParam = searchParams.get("group");
  const activeGroup = isTradeGroupType(groupParam) ? groupParam : "import";

  const categoryParam = searchParams.get("category");
  const sectionParam = searchParams.get("section");

  const activeCategory = useMemo(() => {
    if (categoryParam && focusCategoryIds.has(categoryParam)) {
      return categoryParam;
    }
    if (sectionParam) {
      const section = sectionById.get(sectionParam);
      if (section && section.categoryIds.length > 0) {
        return section.categoryIds[0];
      }
    }
    return activeGroup === "import" ? "beef" : "seafood";
  }, [activeGroup, categoryParam, sectionParam, focusCategoryIds, sectionById]);

  const selectedSection = useMemo(() => {
    if (sectionParam) return sectionById.get(sectionParam);
    return tradeGroups
      .flatMap((g) => g.sections)
      .find((s) => s.categoryIds.includes(activeCategory));
  }, [sectionParam, activeCategory, tradeGroups, sectionById]);

  const displayAnimalCategory = useMemo(() => {
    const categoryObj = categories.find((c) => c.id === activeCategory);
    if (categoryObj && (categoryObj.id === "beef" || categoryObj.id === "chicken") && !isSearching) {
      return categoryObj;
    }
    return null;
  }, [activeCategory, categories, isSearching]);

  const visibleProducts = useMemo(() => {
    let filtered = focusProducts;

    if (selectedSection) {
      const sectionCategoryIds = new Set(selectedSection.categoryIds);
      filtered = filtered.filter((product) => sectionCategoryIds.has(product.categoryId));
    } else if (activeCategory) {
      filtered = filtered.filter((product) => product.categoryId === activeCategory);
    }

    if (isSearching) {
      filtered = filtered.filter((product) =>
        matchesSearchQuery(getProductSearchableText(product), searchQuery),
      );
    }

    return filtered;
  }, [
    activeCategory,
    focusProducts,
    isSearching,
    searchQuery,
    selectedSection,
  ]);

  const resetFilters = () => setSearchQuery("");

  const updateQuery = (nextParams: string) => {
    const url = nextParams ? `${pathname}?${nextParams}` : pathname;
    router.replace(url);
  };

  const handleSelectSection = (section: ProductGroupSection) => {
    resetFilters();
    updateQuery(`group=${activeGroup}&section=${section.id}`);
  };

  const productListTitle = useMemo(() => {
    if (isSearching) return t("search_results");
    if (selectedSection) return selectedSection.title[language];
    const categoryObj = categories.find((c) => c.id === activeCategory);
    return categoryObj?.name[language] || t("all_products");
  }, [isSearching, selectedSection, activeCategory, categories, language, t]);

  const currentGroupData = useMemo(() => {
    return tradeGroups.find((g) => g.type === activeGroup);
  }, [tradeGroups, activeGroup]);

  /* Hero background image based on active group and category */
  const heroBgImage = useMemo(() => {
    if (activeGroup === "import") {
      if (activeCategory === "chicken") return "/images/US-Chicken.jpg";
      return "/images/US-Beef.jpg";
    }
    if (activeCategory === "agriculture") return "/images/Agricultural.jpg";
    return "/images/Frozen-Seafood.jpg";
  }, [activeGroup, activeCategory]);

  /* ─────────────────────────────────────────────
     Render: Animal Cut Map
  ───────────────────────────────────────────── */
  const renderAnimalMap = () => {
    if (!displayAnimalCategory) return null;
    const isBeef = displayAnimalCategory.id === "beef";

    const titleText = isBeef
      ? (language === "vi" ? "Sơ đồ cắt lọc Bò Mỹ" : "U.S. Beef Cuts Diagram")
      : (language === "vi" ? "Sơ đồ bộ phận Thịt Gà" : "Chicken Cuts Diagram");

    const imageSrc = isBeef ? "/images/beef-cut.jpg" : "/images/chicken-cut.jpg";
    const aspectClass = isBeef ? "aspect-[1500/1220]" : "aspect-[4/3]";

    return (
      <div className="w-full">
        {/* Section header */}
        <div className="mb-4 flex items-center gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#17324d]">{titleText}</h3>
          </div>
        </div>

        {/* Map container */}
        <div className={`relative mx-auto w-full max-w-[800px] ${aspectClass} rounded-2xl overflow-hidden border border-[#d8e3df] bg-[#f8faf9] shadow-sm`}>
          <Image
            src={imageSrc}
            alt={titleText}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  };

  /* ─────────────────────────────────────────────
     Main render
  ───────────────────────────────────────────── */
  return (
    <div className="app-shell w-full">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0b151c]" style={{ minHeight: 220 }}>
        <Image
          src={heroBgImage}
          alt={activeGroup === "import" ? (activeCategory === "chicken" ? "US Chicken Import" : "US Beef Import") : (activeCategory === "agriculture" ? "Agricultural Export" : "Frozen Seafood Export")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 transition-opacity duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b151c]/95 via-[#0b151c]/80 to-[#0b151c]/50" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b151c] to-transparent" />

        <div className="relative section-shell py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-xs font-semibold text-white/50">
            <span>{language === "vi" ? "Trang chủ" : "Home"}</span>
            <span>/</span>
            <span className="text-white/80">{language === "vi" ? "Sản phẩm" : "Products"}</span>
          </nav>

          <p className="eyebrow-on-dark mb-2">{t("our_catalog")}</p>
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            {t("products")}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
            {language === "vi"
              ? "Danh mục thực phẩm đông lạnh nhập khẩu và xuất khẩu chất lượng cao — Chuẩn Mỹ, đạt chuẩn quốc tế."
              : "Premium frozen food catalog for import & export — U.S. standards, globally certified."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAVIGATION & FILTER BAR
      ══════════════════════════════════════════ */}
      <div className="sticky top-0 z-20 border-b border-[#d8e3df] bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="section-shell">
          {/* Level 1: Import / Export Tabs */}
          <div className="flex border-b border-[#f0f4f3]">
            {/* Import Tab */}
            <button
              id="tab-import"
              onClick={() => {
                resetFilters();
                updateQuery("group=import&category=beef");
              }}
              className={`relative flex flex-1 items-center justify-center gap-2.5 py-4 text-sm font-extrabold transition-all duration-200 sm:flex-none sm:px-10 ${
                activeGroup === "import"
                  ? "text-[#17324d]"
                  : "text-[#5c6a72] hover:text-[#17324d]"
              }`}
            >
              <span>{language === "vi" ? "NHẬP KHẨU" : "IMPORT"}</span>
              {tradeGroups.find((g) => g.type === "import") && (
                <span className={`hidden rounded-full px-2 py-0.5 text-[10px] font-extrabold sm:inline-block ${
                  activeGroup === "import"
                    ? "bg-[#17324d] text-white"
                    : "bg-[#edf2f0] text-[#5c6a72]"
                }`}>
                  {tradeGroups.find((g) => g.type === "import")?.productCount ?? 0}
                </span>
              )}
              {/* Active underline */}
              {activeGroup === "import" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-[#17324d]" />
              )}
            </button>
 
            {/* Divider */}
            <div className="my-3 w-px bg-[#d8e3df]" />
 
            {/* Export Tab */}
            <button
              id="tab-export"
              onClick={() => {
                resetFilters();
                updateQuery("group=export&category=seafood");
              }}
              className={`relative flex flex-1 items-center justify-center gap-2.5 py-4 text-sm font-extrabold transition-all duration-200 sm:flex-none sm:px-10 ${
                activeGroup === "export"
                  ? "text-[#2f6f63]"
                  : "text-[#5c6a72] hover:text-[#2f6f63]"
              }`}
            >
              <span>{language === "vi" ? "XUẤT KHẨU" : "EXPORT"}</span>
              {tradeGroups.find((g) => g.type === "export") && (
                <span className={`hidden rounded-full px-2 py-0.5 text-[10px] font-extrabold sm:inline-block ${
                  activeGroup === "export"
                    ? "bg-[#2f6f63] text-white"
                    : "bg-[#edf2f0] text-[#5c6a72]"
                }`}>
                  {tradeGroups.find((g) => g.type === "export")?.productCount ?? 0}
                </span>
              )}
              {activeGroup === "export" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-[#2f6f63]" />
              )}
            </button>
          </div>
 
          {/* Level 2: Category sub-tabs + Search */}
          <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {currentGroupData?.sections.map((section) => {
                const isActive = selectedSection?.id === section.id || (!selectedSection && section.categoryIds.includes(activeCategory));
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSelectSection(section)}
                    className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-150 ${
                      isActive && !isSearching
                        ? "bg-[#17324d] text-white shadow-sm"
                        : "bg-white border border-[#d8e3df] text-[#17324d] hover:border-[#336699]"
                    }`}
                  >
                    <span>{section.title[language]}</span>
                  </button>
                );
              })}
            </div>
 
            {/* Search Input */}
            <div className="w-full md:max-w-xs">
              <input
                type="text"
                className="field-input block w-full px-3.5 py-1.5 text-xs bg-[#f8faf9] border border-[#d8e3df] focus:bg-white transition-all rounded-xl focus:ring-1 focus:ring-[#336699]/30"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <section className="section-shell py-8 md:py-10">
        <div className="flex flex-col gap-8">
 
          {/* Animal Cut Map — shown above sidebar/content */}
          {(displayAnimalCategory?.id === "beef" || displayAnimalCategory?.id === "chicken") && (
            <div className="w-full rounded-2xl border border-[#d8e3df] bg-white p-5 md:p-7 shadow-sm">
              {renderAnimalMap()}
            </div>
          )}
 
          {/* Full-width catalog layout */}
          <div className="space-y-6">
 
            {/* Content header: title + count */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#d8e3df] pb-4">
              <div>
                {/* Breadcrumb context */}
                <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-[#7a858a]">
                  <span>{language === "vi" ? (activeGroup === "import" ? "Nhập khẩu" : "Xuất khẩu") : (activeGroup === "import" ? "Import" : "Export")}</span>
                  <span>/</span>
                  <span className="text-[#336699]">{productListTitle}</span>
                </div>
                <h2 className="text-xl font-extrabold text-[#17324d] md:text-2xl">
                  {productListTitle}
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {isSearching && (
                  <button
                    onClick={resetFilters}
                    className="rounded-lg border border-[#d8e3df] bg-white px-3 py-1.5 text-xs font-bold text-[#5c6a72] hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
                  >
                    {language === "vi" ? "Xóa tìm kiếm" : "Clear search"}
                  </button>
                )}
                <span className="rounded-xl border border-[#d8e3df] bg-white px-3 py-1.5 text-xs font-extrabold text-[#5c6a72]">
                  {visibleProducts.length} {t("product_count_label")}
                </span>
              </div>
            </div>
 
            {/* Brands strip */}
            {displayAnimalCategory?.brands?.length ? (
              <section>
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-[#7a858a]">
                  {language === "vi" ? "Thương hiệu uy tín" : "Trusted Brands"}
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {displayAnimalCategory.brands.map((brand) => (
                    <article
                      key={brand.id}
                      className="flex-shrink-0 rounded-xl border border-[#d8e3df] bg-white p-2.5 transition-all hover:border-[#336699]/40 hover:shadow-md"
                    >
                      <Image
                        src={brand.logoUrl}
                        alt={brand.name}
                        width={140}
                        height={70}
                        className="rounded object-contain"
                      />
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
 
            {/* Product grid */}
            {displayAnimalCategory ? (
              <div className="w-full">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {!visibleProducts.length && (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8e3df] bg-white py-16 px-6 text-center">
                    <div className="mb-4 h-1.5 w-12 bg-[#c8d5d0] rounded-full mx-auto" />
                    <h4 className="text-base font-extrabold text-[#17324d]">
                      {language === "vi" ? "Chưa có sản phẩm" : "No products available"}
                    </h4>
                    <p className="mt-1.5 max-w-[240px] text-xs text-[#7a858a] leading-relaxed">
                      {language === "vi" ? "Danh mục này hiện chưa có sản phẩm. Vui lòng quay lại sau." : "This category is currently empty. Please check back later."}
                    </p>
                  </div>
                )}
              </div>
            ) : visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="commerce-card px-6 py-16 text-center bg-white border border-[#d8e3df]">
                <div className="mb-4 h-1.5 w-12 bg-[#c8d5d0] rounded-full mx-auto" />
                <h3 className="mt-4 text-xl font-extrabold text-[#17242d]">{t("empty_title")}</h3>
                <p className="body-copy mx-auto mt-2 max-w-md text-sm text-[#7a858a] leading-relaxed">{t("empty_text")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Grid2X2, ListFilter, PackageSearch, Search } from "lucide-react";
import { ProductCard } from "../../../components/products/ProductCard";
import { countProductsByCategory, getProductSearchableText } from "../../../lib/catalog";
import { matchesSearchQuery, normalizeSearchText } from "../../../lib/search";
import { useCatalog } from "../../../store/CatalogContext";
import { useLanguage } from "../../../store/LanguageContext";

const pageCopy = {
  vi: {
    eyebrow: "Danh mục sản phẩm",
    intro: "Bắt đầu từ nhóm hàng để xem đúng sản phẩm, hoặc mở toàn bộ danh mục khi cần quét nhanh.",
    allProducts: "Toàn bộ sản phẩm",
    productCount: "sản phẩm",
    categoryMode: "Nhóm hàng",
    categoryModeNote: "Chọn nhóm hàng để xem sản phẩm chi tiết theo đúng danh mục.",
    selectedCategoryNote: "Các sản phẩm đang thuộc nhóm hàng đã chọn.",
    allModeNote: "Toàn bộ sản phẩm hiện có trong danh mục.",
    searchResults: "Kết quả tìm kiếm",
    searchNote: "Kết quả đang được lọc theo tên sản phẩm, mã, nhóm hàng và mô tả.",
    categoryCta: "Xem sản phẩm",
    emptyTitle: "Chưa có sản phẩm phù hợp",
    emptyText: "Thử đổi từ khóa tìm kiếm hoặc chọn danh mục khác.",
  },
  en: {
    eyebrow: "Product catalog",
    intro: "Start from a product group, or open the full catalog for a quick scan.",
    allProducts: "All products",
    productCount: "products",
    categoryMode: "Product groups",
    categoryModeNote: "Choose a product group to view detailed products in the right category.",
    selectedCategoryNote: "Products currently listed under the selected group.",
    allModeNote: "All currently available products in the product catalog.",
    searchResults: "Search results",
    searchNote: "Results are filtered by product name, ID, group, and description.",
    categoryCta: "View products",
    emptyTitle: "No matching products",
    emptyText: "Try a different keyword or choose another category.",
  },
};

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const { categories, products } = useCatalog();
  const copy = pageCopy[language];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = normalizeSearchText(searchQuery);
  const isSearching = normalizedQuery.length > 0;
  const showAllProducts = searchParams.get("view") === "all";
  const selectedCategory = categories.find((category) => category.id === activeCategory);
  const showCategoryOverview = !activeCategory && !showAllProducts && !isSearching;

  const categoryProductCount = useMemo(
    () => countProductsByCategory(categories, products),
    [categories, products],
  );

  const visibleProducts = useMemo(() => {
    if (isSearching) {
      return products.filter((product) =>
        matchesSearchQuery(getProductSearchableText(product), searchQuery),
      );
    }

    if (activeCategory) {
      return products.filter((product) => product.categoryId === activeCategory);
    }

    if (showAllProducts) {
      return products;
    }

    return [];
  }, [activeCategory, isSearching, products, searchQuery, showAllProducts]);

  useEffect(() => {
    const fromQuery = searchParams.get("category");
    if (!fromQuery) {
      setActiveCategory("");
      return;
    }

    const isValid = categories.some((category) => category.id === fromQuery);
    setActiveCategory(isValid ? fromQuery : "");
  }, [categories, searchParams]);

  const handleShowCategoryOverview = () => {
    setSearchQuery("");
    setActiveCategory("");
    router.replace(pathname);
  };

  const handleShowAllProducts = () => {
    setSearchQuery("");
    setActiveCategory("");
    router.replace(`${pathname}?view=all`);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSearchQuery("");
    setActiveCategory(categoryId);
    router.replace(`${pathname}?category=${categoryId}`);
  };

  const productListTitle = isSearching
    ? copy.searchResults
    : selectedCategory?.name[language] || copy.allProducts;
  const productListNote = isSearching
    ? copy.searchNote
    : selectedCategory
      ? copy.selectedCategoryNote
      : copy.allModeNote;

  return (
    <div className="app-shell w-full">
      <section className="border-b border-[#d8e3df] bg-white">
        <div className="section-shell py-10 md:py-12">
          <div className="grid gap-6 md:grid-cols-[1fr_420px] md:items-end">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1 className="heading-lg mt-2">{t("products")}</h1>
              <p className="body-copy mt-3 max-w-2xl">{copy.intro}</p>
            </div>

            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-[#7a858a]" />
              </div>
              <input
                type="text"
                className="field-input block w-full pl-10"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8 md:py-12">
        <div className="commerce-card mb-8 p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-[auto_auto_1fr] md:items-center">
            <button
              onClick={handleShowCategoryOverview}
              className={`filter-pill ${showCategoryOverview ? "filter-pill-active" : "text-[#17324d]"}`}
            >
              <Grid2X2 className="h-4 w-4" />
              {copy.categoryMode}
            </button>
            <button
              onClick={handleShowAllProducts}
              className={`filter-pill ${
                showAllProducts && !activeCategory && !isSearching
                  ? "filter-pill-active"
                  : "text-[#17324d]"
              }`}
            >
              <ListFilter className="h-4 w-4" />
              {copy.allProducts}
            </button>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  className={`filter-pill px-3 py-2 font-bold ${
                    activeCategory === category.id && !isSearching ? "filter-pill-active" : ""
                  }`}
                >
                  {category.name[language]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showCategoryOverview ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#17324d]">
                {copy.categoryMode}
              </h2>
              <p className="body-copy mt-2 text-sm">{copy.categoryModeNote}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  className="commerce-card commerce-card-hover group overflow-hidden text-left"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf3f0]">
                    <Image
                      src={category.image}
                      alt={category.name[language]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-extrabold text-[#17242d]">
                          {category.name[language]}
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#7a858a]">
                          {categoryProductCount[category.id] ?? 0} {copy.productCount}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 text-[#336699] transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-4 text-sm font-extrabold text-[#336699]">
                      {copy.categoryCta}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#17324d]">
                  {productListTitle}
                </h2>
                <p className="body-copy mt-2 text-sm">{productListNote}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-lg border border-[#d8e3df] bg-white px-3 py-2 text-sm font-bold text-[#5c6a72]">
                  {visibleProducts.length} {copy.productCount}
                </span>
                <button
                  onClick={handleShowCategoryOverview}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  {copy.categoryMode}
                </button>
              </div>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="commerce-card border-dashed px-6 py-16 text-center">
                <PackageSearch className="mx-auto h-10 w-10 text-[#7a858a]" />
                <h3 className="mt-4 text-xl font-extrabold text-[#17242d]">
                  {copy.emptyTitle}
                </h3>
                <p className="body-copy mx-auto mt-2 max-w-md text-sm">{copy.emptyText}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

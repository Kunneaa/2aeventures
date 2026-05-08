"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { useLanguage } from "../../../store/LanguageContext";
import { categories, products } from "../../../lib/mockData";
import { ProductCard } from "../../../components/products/ProductCard";

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const categoryProductCount = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category.id] = products.filter(
        (product) => product.categoryId === category.id,
      ).length;
      return acc;
    }, {});
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !activeCategory || product.categoryId === activeCategory;
    const matchesSearch =
      product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.vi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const fromQuery = searchParams.get("category");
    if (!fromQuery) {
      setActiveCategory("");
      return;
    }
    const isValid = categories.some((category) => category.id === fromQuery);
    setActiveCategory(isValid ? fromQuery : "");
  }, [searchParams]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("products")}</h1>
          <p className="text-gray-500">{t("our_catalog")}</p>
        </div>

        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">{t("categories")}</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full rounded-xl transition-all border ${
                      activeCategory === category.id
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 p-2">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <div className="relative w-full h-full">
                          <Image
                            src={category.image}
                            alt={category.name[language]}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <p
                          className={`text-sm font-semibold ${
                            activeCategory === category.id ? "text-blue-700" : "text-gray-800"
                          }`}
                        >
                          {category.name[language]}
                        </p>
                        <p className="text-xs text-gray-500">
                          {categoryProductCount[category.id] ?? 0} products
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1">
          {!activeCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="group text-left rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-40 w-full overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={category.image}
                        alt={category.name[language]}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-semibold text-gray-900">{category.name[language]}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {categoryProductCount[category.id] ?? 0} products
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {activeCategory && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : activeCategory ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">{t("no_products_found")}</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">{t("categories")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

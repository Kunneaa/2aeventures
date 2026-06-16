"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuickEmailButton } from "../../../../components/contact/QuickEmailButton";
import { ProductCard } from "../../../../components/products/ProductCard";
import { useCart } from "../../../../store/CartContext";
import { useCatalog } from "../../../../store/CatalogContext";
import { useLanguage } from "../../../../store/LanguageContext";

export default function ProductDetailPage({
  params,
}: {
  params: { locale: "vi" | "en"; id: string };
}) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const { products, getProduct, getCategory } = useCatalog();
  const [showSuccess, setShowSuccess] = useState(false);

  const product = getProduct(params.id);

  if (!product) {
    return (
      <div className="section-shell py-20 text-center">
        <div className="mx-auto max-w-sm rounded-2xl border border-[#d8e3df] bg-white p-10 shadow-sm">
          <div className="mb-4 h-1.5 w-12 bg-[#7a858a] rounded-full mx-auto" />
          <h1 className="text-xl font-extrabold text-[#17324d]">{t("product_not_found")}</h1>
          <p className="mt-2 text-sm text-[#5c6a72]">
            {language === "vi" ? "Sản phẩm này không tồn tại hoặc đã bị xoá." : "This product does not exist or has been removed."}
          </p>
          <Link
            href={`/${params.locale}/products`}
            className="btn-primary mt-6 inline-flex px-5 py-2.5 text-sm"
          >
            {t("back_to_products")}
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategory(product.categoryId);
  const categoryName = category?.name[language] || product.categoryId;

  const relatedProducts = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const specs = [
    product.specs?.packing  && { label: t("unit"),   value: product.specs.packing },
    product.specs?.brand    && { label: t("brand"),  value: product.specs.brand },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="app-shell w-full">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-[#d8e3df] bg-white">
        <div className="section-shell py-3">
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#7a858a]">
            <Link href={`/${params.locale}`} className="hover:text-[#336699] transition-colors">
              {language === "vi" ? "Trang chủ" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${params.locale}/products`} className="hover:text-[#336699] transition-colors">
              {language === "vi" ? "Sản phẩm" : "Products"}
            </Link>
            <span>/</span>
            <span className="text-[#17324d] font-bold line-clamp-1">{product.name[language]}</span>
          </nav>
        </div>
      </div>

      <section className="section-shell py-8 md:py-12">
        {/* Back link */}
        <Link
          href={`/${params.locale}/products`}
          className="mb-7 inline-flex items-center gap-1 text-sm font-bold text-[#5c6a72] hover:text-[#17324d] transition-colors group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>{t("back_to_products")}</span>
        </Link>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-10">

          {/* Left — Product image */}
          <div className="overflow-hidden rounded-2xl border border-[#d8e3df] bg-white shadow-sm">
            <div className="relative aspect-square bg-[#f4f7f9]">
              <Image
                src={product.image}
                alt={product.name[language]}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              {/* Category badge on image */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-[#17324d] shadow-sm backdrop-blur-sm ring-1 ring-inset ring-black/5">
                  {categoryName}
                </span>
              </div>
            </div>
          </div>

          {/* Right — Product info */}
          <div className="flex flex-col gap-0">
            <div className="rounded-2xl border border-[#d8e3df] bg-white p-6 md:p-8 shadow-sm">
              {/* Title */}
              <h1 className="text-2xl font-extrabold leading-tight text-[#17242d] md:text-4xl">
                {product.name[language]}
              </h1>

              {/* Description */}
              <p className="body-copy mt-4 text-base leading-relaxed">
                {product.description[language]}
              </p>

              {/* Specifications */}
              {specs.length > 0 && (
                <div className="mt-6 border-t border-[#d8e3df] pt-6">
                  <h2 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#7a858a]">
                    {t("specifications")}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Category always shown */}
                    <div className="rounded-xl border border-[#d8e3df] bg-[#f8faf9] px-5 py-4 transition-all hover:border-[#17324d]/20 hover:bg-white">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#7a858a]">{t("categories")}</p>
                      <p className="mt-1 text-sm font-extrabold text-[#17242d]">{categoryName}</p>
                    </div>
 
                    {specs.map(({ label, value }) => (
                      <div key={label} className="rounded-xl border border-[#d8e3df] bg-[#f8faf9] px-5 py-4 transition-all hover:border-[#17324d]/20 hover:bg-white">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#7a858a]">{label}</p>
                        <p className="mt-1 text-sm font-extrabold text-[#17242d]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quote notice */}
              <div className="mt-6 rounded-xl border border-[#d9a85c]/30 bg-gradient-to-br from-[#fffaf3] to-[#fef9ed] p-5">
                <p className="text-sm font-extrabold text-[#17324d]">
                  {t("quote_notice_title")}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[t("quote_benefit_pricing"), t("quote_benefit_delivery"), t("quote_benefit_support")].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-[#42525b]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f6f63]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary w-full px-5 py-3 text-sm uppercase tracking-wider font-extrabold"
                >
                  {t("add_to_quote")}
                </button>
                <QuickEmailButton
                  products={[product]}
                  className="btn-secondary w-full px-5 py-3 text-sm"
                >
                  {t("quick_contact")}
                </QuickEmailButton>
              </div>

              {/* Success toast */}
              {showSuccess && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#b8d8c7] bg-[#edf7f2] px-4 py-3">
                  <span className="text-sm font-extrabold text-[#2f6f63]">{t("added_to_quote")}</span>
                  <Link href={`/${params.locale}/cart`} className="text-xs font-extrabold text-[#2f6f63] underline hover:no-underline">
                    {language === "vi" ? "Xem giỏ hàng" : "View Cart"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
 
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#d8e3df] bg-[#f8faf9]">
          <div className="section-shell section-y">
            <div className="flex items-center justify-between gap-4 mb-7">
              <h2 className="heading-lg">{t("related_products")}</h2>
              <Link
                href={`/${params.locale}/products?category=${product.categoryId}`}
                className="hidden text-sm font-bold text-[#336699] hover:text-[#17324d] transition-colors sm:inline-flex items-center gap-1.5 group"
              >
                <span>{language === "vi" ? "Xem tất cả" : "View all"}</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

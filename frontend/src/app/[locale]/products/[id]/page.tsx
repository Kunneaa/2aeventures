"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Package, ShoppingBag } from "lucide-react";
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
      <div className="section-shell py-16 text-center">
        <h1 className="text-2xl font-extrabold text-[#17324d]">{t("product_not_found")}</h1>
        <Link href={`/${params.locale}/products`} className="btn-secondary mt-6 px-5 py-2.5 text-sm">
          {t("back_to_products")}
        </Link>
      </div>
    );
  }

  const categoryName = getCategory(product.categoryId)?.name[language] || product.categoryId;
  const relatedProducts = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="app-shell w-full">
      <section className="section-shell py-8 md:py-12">
        <Link
          href={`/${params.locale}/products`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#336699] hover:text-[#17324d]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back_to_products")}
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_520px]">
          <div className="commerce-card overflow-hidden">
            <div className="relative aspect-square bg-[#edf3f0]">
              <Image
                src={product.image}
                alt={product.name[language]}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="commerce-card p-5 md:p-7">
            <span className="inline-flex rounded-lg bg-[#f2f7fb] px-3 py-1 text-sm font-bold text-[#336699]">
              {categoryName}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#17242d] md:text-5xl">
              {product.name[language]}
            </h1>
            <p className="body-copy mt-5 text-base md:text-lg">
              {product.description[language]}
            </p>

            <div className="mt-6 grid gap-3 border-y border-[#d8e3df] py-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase text-[#7a858a]">
                  {t("categories")}
                </p>
                <p className="mt-1 font-extrabold text-[#17242d]">{categoryName}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-[#7a858a]">
                  {t("unit")}
                </p>
                <p className="mt-1 font-extrabold text-[#17242d]">
                  {product.unit[language]}
                </p>
              </div>
            </div>

            <div className="mt-6 border-l-2 border-[#d9a85c] bg-[#f8faf8] py-1 pl-4">
              <p className="text-sm font-extrabold text-[#17324d]">
                {t("quote_notice_title")}
              </p>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-[#42525b]">
                {[t("quote_benefit_pricing"), t("quote_benefit_delivery"), t("quote_benefit_support")].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f6f63]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                className="btn-primary px-6 py-3 text-sm"
              >
                <ShoppingBag className="h-5 w-5" />
                {t("add_to_quote")}
              </button>
              <QuickEmailButton
                products={[product]}
                className="btn-secondary px-6 py-3 text-sm"
              >
                {t("quick_contact")}
              </QuickEmailButton>
            </div>

            {showSuccess && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#b8d8c7] bg-[#edf7f2] px-4 py-3 text-sm font-bold text-[#2f6f63]">
                <Package className="h-5 w-5" />
                {t("added_to_quote")}
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-white">
          <div className="section-shell section-y">
            <h2 className="heading-lg">{t("related_products")}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { ProductCard } from "../../components/products/ProductCard";
import { useCatalog } from "../../store/CatalogContext";
import { useLanguage } from "../../store/LanguageContext";

const heroImage =
  "https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const homeCopy = {
  vi: {
    kicker: "Nguồn hàng thực phẩm B2B",
    secondaryCta: "Liên hệ tư vấn",
    categoryTitle: "Mua theo danh mục",
    categoryIntro: "Chọn nhanh nhóm hàng để xem các sản phẩm phù hợp với nhu cầu phân phối, bán lẻ hoặc nhập khẩu.",
    featuredEyebrow: "Sản phẩm nổi bật",
    promiseTitle: "Chuẩn hóa từ nguồn hàng đến phản hồi báo giá",
    promiseItems: ["Nguồn gốc rõ ràng", "Phù hợp nhu cầu B2B", "Trao đổi nhanh qua email/Zalo"],
  },
  en: {
    kicker: "B2B food sourcing",
    secondaryCta: "Contact sales",
    categoryTitle: "Shop by category",
    categoryIntro: "Choose a product group to view items suited for distribution, retail, or import needs.",
    featuredEyebrow: "Featured products",
    promiseTitle: "A clear path from sourcing to quotation",
    promiseItems: ["Clear product origin", "Built for B2B needs", "Fast email/Zalo follow-up"],
  },
};

export default function HomePage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { t, language } = useLanguage();
  const { categories, products } = useCatalog();
  const copy = homeCopy[language];
  const featuredProducts = products.slice(0, 4);
  const basePath = `/${params.locale}`;

  const categoryProductCount = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category.id] = products.filter(
        (product) => product.categoryId === category.id,
      ).length;
      return acc;
    }, {});
  }, [categories, products]);

  return (
    <div className="app-shell flex w-full flex-col">
      <section className="relative overflow-hidden bg-[#0b151c]">
        <Image
          src={heroImage}
          alt="2AE food distribution warehouse"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.94),rgba(7,15,22,0.78)_48%,rgba(7,15,22,0.3)_100%)]" />

        <div className="section-shell relative grid min-h-[620px] gap-10 py-16 md:py-20 lg:grid-cols-[1fr_420px] lg:items-center">
          <motion.div
            className="flex max-w-3xl flex-col justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow-on-dark">{copy.kicker}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {t("hero_title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {t("hero_subtitle")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`${basePath}/products`} className="btn-primary px-6 py-3 text-sm">
                {t("shop_now")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`${basePath}/contact`} className="btn-secondary px-6 py-3 text-sm">
                {copy.secondaryCta}
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-end lg:items-center"
          >
            <div className="w-full rounded-lg border border-white/20 bg-white/95 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur">
              <p className="eyebrow">
                {copy.promiseTitle}
              </p>
              <div className="mt-5 space-y-3">
                {copy.promiseItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 border-t border-[#d8e3df] pt-3 first:border-t-0 first:pt-0">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-[#2f6f63]" />
                    <span className="text-sm font-bold text-[#17242d]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="border-b border-[#d8e3df] bg-white">
        <div className="section-shell grid gap-5 py-8 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: t("premium_quality"), text: t("premium_quality_desc"), color: "text-[#2f6f63]", bg: "bg-[#edf7f2]" },
            { icon: Truck, title: t("cold_chain_logistics"), text: t("cold_chain_desc"), color: "text-[#336699]", bg: "bg-[#f2f7fb]" },
            { icon: ChefHat, title: t("wholesale_pricing"), text: t("wholesale_pricing_desc"), color: "text-[#b87333]", bg: "bg-[#fff5e6]" },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className={`rounded-lg p-3 ${item.bg} ${item.color}`}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#17242d]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#5c6a72]">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-shell section-y">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{copy.categoryTitle}</p>
            <h2 className="heading-lg mt-2">{t("categories")}</h2>
            <p className="body-copy mt-3 max-w-2xl">{copy.categoryIntro}</p>
          </div>
          <Link href={`${basePath}/products`} className="btn-secondary px-5 py-2.5 text-sm">
            {t("all_categories")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`${basePath}/products?category=${category.id}`}
              className="commerce-card commerce-card-hover group overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#edf3f0]">
                <Image
                  src={category.image}
                  alt={category.name[language]}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-extrabold text-[#17242d]">
                  {category.name[language]}
                </p>
                <p className="mt-1 text-xs font-bold text-[#7a858a]">
                  {categoryProductCount[category.id] ?? 0} {t("products").toLowerCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell section-y">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{copy.featuredEyebrow}</p>
              <h2 className="heading-lg mt-2">{t("our_catalog")}</h2>
              <p className="body-copy mt-3">{t("featured_subtitle")}</p>
            </div>
            <Link href={`${basePath}/products?view=all`} className="btn-secondary px-5 py-2.5 text-sm">
              {t("view_products")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

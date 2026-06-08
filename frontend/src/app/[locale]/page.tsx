"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, DollarSign, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useCatalog } from "../../store/CatalogContext";
import { useLanguage } from "../../store/LanguageContext";

const heroImage =
  "https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const homeCopy = {
  vi: {
    kicker: "Nhập khẩu, xuất khẩu và phân phối thực phẩm đông lạnh",
    heroTitle: "Thực phẩm đông lạnh cho nhập khẩu và xuất khẩu.",
    heroSubtitle:
      "2AE tập trung nhập khẩu bò, gà; phát triển xuất khẩu cá, hải sản; và xây dựng hệ thống phân phối đáng tin cậy tại Việt Nam.",
    primaryCta: "Xem mặt hàng",
    secondaryCta: "Liên hệ tư vấn",
    priority: ["Nhập khẩu", "Xuất khẩu", "Phân phối"],
    featuredEyebrow: "Sản phẩm nổi bật",
    featuredTitle: "Nhập khẩu bò, gà. Xuất khẩu cá, hải sản.",
    directions: {
      import: {
        label: "Nhập khẩu",
        note: "Nguồn hàng Mỹ",
      },
      export: {
        label: "Xuất khẩu",
        note: "Hợp tác quốc tế",
      },
    },
    valuesEyebrow: "Giá trị cốt lõi",
    valuesTitle: "Chất lượng rõ ràng, giá cả cạnh tranh.",
    values: [
      {
        icon: ShieldCheck,
        title: "Chất lượng từ Mỹ",
        text: "Nguồn bò và gà từ các đối tác uy tín tại Mỹ.",
        color: "text-[#2f6f63]",
        bg: "bg-[#edf7f2]",
      },
      {
        icon: DollarSign,
        title: "Giá cả cạnh tranh",
        text: "Tối ưu chuỗi cung ứng để giữ mức giá phù hợp.",
        color: "text-[#b87333]",
        bg: "bg-[#fff5e6]",
      },
    ],
    distributionEyebrow: "03 / Phân phối",
    distributionTitle: "Phân phối ổn định tại Việt Nam.",
    distributionItems: ["Nguồn hàng chọn lọc", "Kết nối logistics", "Phản hồi báo giá rõ ràng"],
    viewProduct: "Xem sản phẩm",
  },
  en: {
    kicker: "Frozen food import, export, and distribution",
    heroTitle: "Frozen food for import and export.",
    heroSubtitle:
      "2AE focuses on imported beef and chicken, export-ready fish and seafood, and reliable distribution in Vietnam.",
    primaryCta: "View products",
    secondaryCta: "Contact sales",
    priority: ["Import", "Export", "Distribution"],
    featuredEyebrow: "Featured products",
    featuredTitle: "Imported beef and chicken. Export-ready fish and seafood.",
    directions: {
      import: {
        label: "Import",
        note: "U.S. sourcing",
      },
      export: {
        label: "Export",
        note: "International trade",
      },
    },
    valuesEyebrow: "Core values",
    valuesTitle: "Clear quality and competitive pricing.",
    values: [
      {
        icon: ShieldCheck,
        title: "Quality from the United States",
        text: "Beef and chicken from trusted U.S. partners.",
        color: "text-[#2f6f63]",
        bg: "bg-[#edf7f2]",
      },
      {
        icon: DollarSign,
        title: "Competitive pricing",
        text: "Optimized supply chains for suitable pricing.",
        color: "text-[#b87333]",
        bg: "bg-[#fff5e6]",
      },
    ],
    distributionEyebrow: "03 / Distribution",
    distributionTitle: "Stable distribution in Vietnam.",
    distributionItems: ["Selective sourcing", "Logistics connection", "Clear quotation response"],
    viewProduct: "View product",
  },
};

const directionGroups = [
  {
    type: "import",
    categoryIds: ["beef", "chicken"],
    tone: "from-[#17324d]/95",
  },
  {
    type: "export",
    categoryIds: ["fish", "seafood"],
    tone: "from-[#2f6f63]/95",
  },
] as const;

export default function HomePage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { language } = useLanguage();
  const { categories, products } = useCatalog();
  const copy = homeCopy[language];
  const basePath = `/${params.locale}`;

  return (
    <div className="app-shell flex w-full flex-col">
      <section className="relative overflow-hidden bg-[#0b151c]">
        <Image
          src={heroImage}
          alt="2AE frozen food sourcing and distribution"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.95),rgba(7,15,22,0.78)_50%,rgba(7,15,22,0.32)_100%)]" />

        <div className="section-shell relative flex min-h-[680px] items-center py-16 md:py-20">
          <motion.div
            className="flex max-w-3xl flex-col justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow-on-dark">{copy.kicker}</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {copy.heroSubtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`${basePath}/products`} className="btn-primary px-6 py-3 text-sm">
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`${basePath}/contact`} className="btn-secondary px-6 py-3 text-sm">
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl border-t border-white/20 pt-5 sm:grid-cols-3">
              {copy.priority.map((item, index) => (
                <div
                  key={item}
                  className="border-b border-white/10 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white/80 last:border-b-0 sm:border-b-0 sm:border-r sm:border-white/10 sm:px-4 sm:first:pl-0 sm:last:border-r-0"
                >
                  <span className="mr-2 text-[#d9a85c]">0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell section-y">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">{copy.featuredEyebrow}</p>
              <h2 className="heading-lg mt-2">{copy.featuredTitle}</h2>
            </div>
            <Link href={`${basePath}/products`} className="btn-secondary px-5 py-2.5 text-sm">
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-7 lg:grid-cols-2">
            {directionGroups.map((group, groupIndex) => {
              const direction = copy.directions[group.type];
              const featuredItems = group.categoryIds.flatMap((categoryId) => {
                const category = categories.find((item) => item.id === categoryId);
                const product = products.find((item) => item.categoryId === categoryId);

                if (!category) return [];

                return [
                  {
                    id: product?.id ?? category.id,
                    name: product?.name[language] ?? category.name[language],
                    image: product?.image ?? category.image,
                    href: product
                      ? `${basePath}/products/${product.id}`
                      : `${basePath}/products?category=${category.id}`,
                  },
                ];
              });

              return (
                <motion.div
                  key={group.type}
                  className="overflow-hidden rounded-lg bg-[#0b151c]"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
                >
                  <div className="relative grid min-h-[520px] sm:grid-cols-2">
                    {featuredItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group relative min-h-[320px] overflow-hidden bg-[#0b151c]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${group.tone} via-[#0b151c]/35 to-transparent`}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="text-xs font-extrabold uppercase text-white/70">
                            {direction.note}
                          </p>
                          <h4 className="mt-2 text-2xl font-extrabold">{item.name}</h4>
                          <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                            {copy.viewProduct}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </p>
                        </div>
                      </Link>
                    ))}

                    <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#17324d] shadow-sm">
                      {direction.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8e3df] bg-[#f6f8f6]">
        <div className="section-shell grid gap-8 py-12 lg:grid-cols-[360px_1fr] lg:items-start">
          <div>
            <p className="eyebrow">{copy.valuesEyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#17324d] md:text-4xl">
              {copy.valuesTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {copy.values.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  className="commerce-card p-5"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <div className={`inline-flex rounded-lg p-3 ${item.bg} ${item.color}`}>
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-[#17242d]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c6a72]">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0b151c] text-white">
        <div className="section-shell grid gap-8 py-14 md:py-16 lg:grid-cols-[420px_1fr] lg:items-center">
          <div>
            <p className="eyebrow-on-dark">{copy.distributionEyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              {copy.distributionTitle}
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {copy.distributionItems.map((item) => (
              <div key={item} className="rounded-lg border border-white/20 bg-white/10 p-4">
                <CheckCircle2 className="h-5 w-5 text-[#d9a85c]" />
                <p className="mt-4 text-sm font-extrabold leading-relaxed text-white/80">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

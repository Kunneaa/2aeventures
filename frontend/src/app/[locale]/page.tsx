"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DollarSign, ShieldCheck, Ship, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useCatalog } from "../../store/CatalogContext";
import { useLanguage } from "../../store/LanguageContext";

const heroImage =
  "https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const homeCopy = {
  vi: {
    kicker: "Nhập khẩu, xuất khẩu và phân phối thực phẩm đông lạnh",
    heroTitle: "2AE Ventures",
    heroSubtitle:
      "Nhập khẩu, xuất khẩu và phân phối thực phẩm đông lạnh chuyên về bò, gà với định hướng xây dựng hệ thống phân phối chuyên nghiệp, đáng tin cậy tại Việt Nam.",
    primaryCta: "Xem mặt hàng",
    secondaryCta: "Liên hệ tư vấn",
    priority: ["Nhập khẩu", "Xuất khẩu", "Phân phối"],
    valuesEyebrow: "Giá trị cốt lõi",
    valuesTitle: "Tập trung vào nguồn hàng rõ ràng và giá trị thương mại thực tế.",
    values: [
      {
        icon: ShieldCheck,
        title: "Chất lượng từ Mỹ",
        text: "Nguồn thịt bò và thịt gà được nhập khẩu từ các đối tác uy tín tại Mỹ, đáp ứng các tiêu chuẩn về chất lượng và an toàn thực phẩm.",
        color: "text-[#2f6f63]",
        bg: "bg-[#edf7f2]",
      },
      {
        icon: DollarSign,
        title: "Giá cả cạnh tranh",
        text: "Tối ưu chuỗi cung ứng và kết nối trực tiếp với đối tác để mang đến mức giá phù hợp cho hệ thống phân phối và khách hàng doanh nghiệp.",
        color: "text-[#b87333]",
        bg: "bg-[#fff5e6]",
      },
    ],
    highlightEyebrow: "Mặt hàng nổi bật",
    highlightTitle: "Nhóm hàng chính theo định hướng nhập khẩu và xuất khẩu.",
    importTitle: "Những mặt hàng nổi bật nhập khẩu",
    exportTitle: "Những mặt hàng nổi bật xuất khẩu",
    importNote: "Tập trung vào nguồn hàng đông lạnh từ Mỹ.",
    exportNote: "Hướng tới các nhóm hàng phù hợp cho hợp tác thương mại quốc tế.",
    viewGroup: "Xem nhóm hàng",
  },
  en: {
    kicker: "Frozen food import, export, and distribution",
    heroTitle: "2AE Ventures",
    heroSubtitle:
      "Import, export, and distribution of frozen food with a focus on beef and chicken, building a professional and reliable distribution system in Vietnam.",
    primaryCta: "View products",
    secondaryCta: "Contact sales",
    priority: ["Import", "Export", "Distribution"],
    valuesEyebrow: "Core values",
    valuesTitle: "Focused on clear sourcing and practical commercial value.",
    values: [
      {
        icon: ShieldCheck,
        title: "Quality from the United States",
        text: "Beef and chicken sources are imported from trusted partners in the United States, meeting quality and food safety standards.",
        color: "text-[#2f6f63]",
        bg: "bg-[#edf7f2]",
      },
      {
        icon: DollarSign,
        title: "Competitive pricing",
        text: "Optimized supply chains and direct partner connections help deliver suitable pricing for distribution systems and enterprise customers.",
        color: "text-[#b87333]",
        bg: "bg-[#fff5e6]",
      },
    ],
    highlightEyebrow: "Featured goods",
    highlightTitle: "Core product groups by import and export direction.",
    importTitle: "Featured imported goods",
    exportTitle: "Featured exported goods",
    importNote: "Focused on frozen sourcing from the United States.",
    exportNote: "Built for product groups suitable for international trade partnerships.",
    viewGroup: "View group",
  },
};

const highlightGroups = [
  {
    type: "import",
    icon: Ship,
    categoryIds: ["beef", "chicken"],
    tone: "bg-[#f2f7fb]",
    iconTone: "text-[#336699]",
  },
  {
    type: "export",
    icon: Truck,
    categoryIds: ["fish", "seafood"],
    tone: "bg-[#f7f3ea]",
    iconTone: "text-[#b87333]",
  },
] as const;

export default function HomePage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { language } = useLanguage();
  const { categories } = useCatalog();
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.94),rgba(7,15,22,0.78)_48%,rgba(7,15,22,0.3)_100%)]" />

        <div className="section-shell relative flex min-h-[620px] items-center py-16 md:py-20">
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

      <section className="border-b border-[#d8e3df] bg-white">
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

      <section className="section-shell section-y">
        <div className="mb-9 max-w-3xl">
          <p className="eyebrow">{copy.highlightEyebrow}</p>
          <h2 className="heading-lg mt-2">{copy.highlightTitle}</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {highlightGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            const groupTitle = group.type === "import" ? copy.importTitle : copy.exportTitle;
            const groupNote = group.type === "import" ? copy.importNote : copy.exportNote;
            const groupCategories = group.categoryIds.flatMap((categoryId) => {
              const category = categories.find((item) => item.id === categoryId);
              return category ? [category] : [];
            });

            return (
              <motion.div
                key={group.type}
                className="commerce-card overflow-hidden"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
              >
                <div className={`flex items-start gap-4 border-b border-[#d8e3df] p-5 ${group.tone}`}>
                  <div className={`rounded-lg bg-white p-3 ${group.iconTone}`}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#17324d]">{groupTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5c6a72]">{groupNote}</p>
                  </div>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {groupCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`${basePath}/products?category=${category.id}`}
                      className="group overflow-hidden rounded-lg border border-[#d8e3df] bg-white transition-colors hover:border-[#b8cbc4]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#edf3f0]">
                        <Image
                          src={category.image}
                          alt={category.name[language]}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-extrabold text-[#17242d]">
                          {category.name[language]}
                        </p>
                        <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#336699]">
                          {copy.viewGroup}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

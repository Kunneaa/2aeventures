"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, DollarSign, ShieldCheck, Ship, Truck } from "lucide-react";
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
      "Nhập khẩu, xuất khẩu và phân phối thực phẩm đông lạnh chuyên về bò, gà với định hướng xây dựng hệ thống phân phối chuyên nghiệp, đáng tin cậy tại Việt Nam.",
    primaryCta: "Xem mặt hàng",
    secondaryCta: "Liên hệ tư vấn",
    priority: ["Nhập khẩu", "Xuất khẩu", "Phân phối"],
    heroPanelTitle: "Trọng tâm hoạt động",
    heroPanelIntro: "2AE ưu tiên xây dựng nguồn hàng nhập khẩu, mở rộng hợp tác xuất khẩu và hoàn thiện hệ thống phân phối tại Việt Nam.",
    directionsEyebrow: "Trọng tâm thương mại",
    directionsTitle: "Hai hướng hàng hóa chính được đặt ở trung tâm vận hành.",
    directionsIntro:
      "Trang chủ được tổ chức theo luồng nhập khẩu và xuất khẩu để khách hàng nhìn nhanh nhóm hàng 2AE đang tập trung.",
    directions: {
      import: {
        eyebrow: "01 / Nhập khẩu",
        title: "Bò và gà đông lạnh từ Mỹ",
        text: "Tập trung vào nguồn thịt bò và thịt gà từ các đối tác uy tín tại Mỹ, phục vụ nhu cầu phân phối và khách hàng doanh nghiệp.",
        note: "Nguồn hàng nhập khẩu",
      },
      export: {
        eyebrow: "02 / Xuất khẩu",
        title: "Cá và hải sản cho hợp tác quốc tế",
        text: "Định hướng phát triển nhóm cá và hải sản phù hợp cho hoạt động xuất khẩu, thương mại và kết nối đối tác nước ngoài.",
        note: "Nhóm hàng xuất khẩu",
      },
    },
    valuesEyebrow: "Giá trị cốt lõi",
    valuesTitle: "Nguồn hàng rõ ràng, giá trị thương mại thực tế.",
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
    distributionEyebrow: "03 / Phân phối",
    distributionTitle: "Hệ thống phân phối tại Việt Nam là nền tảng để hàng hóa vận hành ổn định.",
    distributionItems: ["Nguồn hàng chọn lọc", "Kết nối logistics", "Phản hồi báo giá rõ ràng"],
    viewGroup: "Xem nhóm hàng",
  },
  en: {
    kicker: "Frozen food import, export, and distribution",
    heroTitle: "Frozen food for import and export.",
    heroSubtitle:
      "Import, export, and distribution of frozen food with a focus on beef and chicken, building a professional and reliable distribution system in Vietnam.",
    primaryCta: "View products",
    secondaryCta: "Contact sales",
    priority: ["Import", "Export", "Distribution"],
    heroPanelTitle: "Operating focus",
    heroPanelIntro: "2AE prioritizes imported sourcing, export partnerships, and a stronger distribution system in Vietnam.",
    directionsEyebrow: "Commercial focus",
    directionsTitle: "Two product directions sit at the center of operations.",
    directionsIntro:
      "The home page is organized around import and export so customers can quickly understand where 2AE is focused.",
    directions: {
      import: {
        eyebrow: "01 / Import",
        title: "Frozen beef and chicken from the United States",
        text: "Focused on beef and chicken sources from trusted U.S. partners for distribution demand and enterprise customers.",
        note: "Imported goods",
      },
      export: {
        eyebrow: "02 / Export",
        title: "Fish and seafood for international partnerships",
        text: "Developing fish and seafood groups suited for export, trade, and overseas partner connections.",
        note: "Export goods",
      },
    },
    valuesEyebrow: "Core values",
    valuesTitle: "Clear sourcing and practical commercial value.",
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
    distributionEyebrow: "03 / Distribution",
    distributionTitle: "Vietnam distribution is the foundation for stable product flow.",
    distributionItems: ["Selective sourcing", "Logistics connection", "Clear quotation response"],
    viewGroup: "View group",
  },
};

const directionGroups = [
  {
    type: "import",
    icon: Ship,
    categoryIds: ["beef", "chicken"],
    tone: "bg-[#f2f7fb]",
    borderTone: "border-[#b8d0df]",
    accent: "text-[#336699]",
  },
  {
    type: "export",
    icon: Truck,
    categoryIds: ["fish", "seafood"],
    tone: "bg-[#f8f2e8]",
    borderTone: "border-[#e5cda3]",
    accent: "text-[#b87333]",
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.95),rgba(7,15,22,0.78)_50%,rgba(7,15,22,0.32)_100%)]" />

        <div className="section-shell relative grid min-h-[680px] gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-lg border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md"
          >
            <p className="text-sm font-extrabold uppercase text-[#d9a85c]">
              {copy.heroPanelTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {copy.heroPanelIntro}
            </p>

            <div className="mt-6 grid gap-3">
              {directionGroups.map((group) => {
                const Icon = group.icon;
                const direction = copy.directions[group.type];

                return (
                  <Link
                    key={group.type}
                    href={`${basePath}/products?category=${group.categoryIds[0]}`}
                    className="group rounded-lg border border-white/20 bg-white/10 p-4 transition-colors hover:bg-white hover:text-[#17324d]"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`rounded-lg bg-white/10 p-3 ${group.accent} group-hover:bg-[#f2f7fb]`}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-white/60 group-hover:text-[#667780]">
                          {direction.eyebrow}
                        </p>
                        <h2 className="mt-2 text-lg font-extrabold leading-tight text-white group-hover:text-[#17324d]">
                          {direction.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell section-y">
          <div className="max-w-3xl">
            <p className="eyebrow">{copy.directionsEyebrow}</p>
            <h2 className="heading-lg mt-2">{copy.directionsTitle}</h2>
            <p className="body-copy mt-4">{copy.directionsIntro}</p>
          </div>

          <div className="mt-10 grid gap-7 lg:grid-cols-2">
            {directionGroups.map((group, groupIndex) => {
              const Icon = group.icon;
              const direction = copy.directions[group.type];
              const groupCategories = group.categoryIds.flatMap((categoryId) => {
                const category = categories.find((item) => item.id === categoryId);
                return category ? [category] : [];
              });

              return (
                <motion.div
                  key={group.type}
                  className={`overflow-hidden rounded-lg border ${group.borderTone} ${group.tone}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
                >
                  <div className="grid min-h-[480px] grid-rows-[auto_1fr]">
                    <div className="p-6 md:p-7">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-sm font-extrabold uppercase text-[#53636c]">
                            {direction.eyebrow}
                          </p>
                          <h3 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-[#17324d]">
                            {direction.title}
                          </h3>
                        </div>
                        <div className={`hidden rounded-lg bg-white p-3 ${group.accent} sm:block`}>
                          <Icon className="h-7 w-7" />
                        </div>
                      </div>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c6a72]">
                        {direction.text}
                      </p>
                    </div>

                    <div className="grid gap-px bg-white/70 sm:grid-cols-2">
                      {groupCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`${basePath}/products?category=${category.id}`}
                          className="group relative min-h-[260px] overflow-hidden bg-[#0b151c]"
                        >
                          <Image
                            src={category.image}
                            alt={category.name[language]}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,22,0.08),rgba(7,15,22,0.74))]" />
                          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                            <p className="text-xs font-extrabold uppercase text-white/70">
                              {direction.note}
                            </p>
                            <h4 className="mt-2 text-2xl font-extrabold">
                              {category.name[language]}
                            </h4>
                            <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                              {copy.viewGroup}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </p>
                          </div>
                        </Link>
                      ))}
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

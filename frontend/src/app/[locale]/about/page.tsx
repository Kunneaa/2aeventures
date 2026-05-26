"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, Handshake, Users } from "lucide-react";
import { useLanguage } from "../../../store/LanguageContext";

export default function AboutPage({ params }: { params: { locale: "vi" | "en" } }) {
  const { t } = useLanguage();
  const basePath = `/${params.locale}`;
  const isVi = params.locale === "vi";

  const aboutCopy = {
    p1: isVi
      ? "Từ năm 1978, doanh nghiệp phát triển từ một cửa hàng gia đình nhờ sự bền bỉ và quyết tâm."
      : "Since 1978, we have grown from a small family shop through hard work and determination.",
    p2: isVi
      ? "Chúng tôi trở thành đối tác phân phối đáng tin cậy, luôn bám sát nhu cầu khách hàng."
      : "We became a trusted distribution partner by staying close to customer needs.",
    p3: isVi
      ? "Mục tiêu: chất lượng cao, dịch vụ tốt và giá cạnh tranh."
      : "Our goal: top quality, great service, and competitive pricing.",
  };

  const storyBlocks = [
    {
      title: t("about_story_title"),
      text: aboutCopy.p1,
      image: "/images/2.jpeg",
      cta: { label: t("view_products"), href: `${basePath}/products` },
    },
    {
      title: t("about_stat_delivery_title"),
      text: aboutCopy.p2,
      image: "/images/3.jpg",
      cta: { label: t("contact_us"), href: `${basePath}/contact` },
    },
    {
      title: t("about_stat_support_title"),
      text: aboutCopy.p3,
      image: "/images/4.jpg",
      cta: { label: t("about"), href: `${basePath}/about` },
    },
  ];

  const highlights = [
    { icon: ShieldCheck, title: t("about_stat_quality_title"), desc: t("about_stat_quality_desc") },
    { icon: Truck, title: t("about_stat_delivery_title"), desc: t("about_stat_delivery_desc") },
    { icon: Handshake, title: t("about_stat_price_title"), desc: t("about_stat_price_desc") },
    { icon: Users, title: t("about_stat_support_title"), desc: t("about_stat_support_desc") },
  ];

  return (
    <div className="w-full bg-[#f4f6f8] text-[#1f2e3a]">
      <section className="relative w-full min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/1.jpg"
            alt="2AEVENTURES"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102235]/80 via-[#102235]/50 to-[#102235]/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-10 md:space-y-14">
        {storyBlocks.map((block, index) => {
          const reverse = index % 2 === 1;
          return (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden shadow-[0_20px_55px_rgba(9,26,45,0.08)]"
            >
              <div className={`${reverse ? "lg:order-2" : ""} lg:col-span-7 relative min-h-[320px] md:min-h-[440px]`}>
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>

              <div className={`${reverse ? "lg:order-1" : ""} lg:col-span-5 bg-white p-8 md:p-12 flex flex-col justify-center text-center`}>
                <h2 className="text-2xl md:text-4xl font-bold text-[#17324d] leading-tight mb-5">{block.title}</h2>
                <p className="text-[#495a68] text-base md:text-lg leading-relaxed mb-8">{block.text}</p>
                <Link
                  href={block.cta.href}
                  className="inline-flex items-center gap-2 text-[#2f5f90] font-semibold hover:text-[#20456b] transition-colors mx-auto"
                >
                  {block.cta.label}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-[#183452] p-6 text-white shadow-[0_14px_36px_rgba(8,24,44,0.18)]"
              >
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/85 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/5.jpg" alt="Request quote" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#0f2337]/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-4">{t("about_policies_title")}</h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8">{t("about_policy_shipping_item1")}</p>
          <Link
            href={`${basePath}/contact`}
            className="inline-flex items-center justify-center rounded-full bg-white text-[#1a3f63] font-bold px-7 py-3 hover:bg-[#f2f6fa] transition-colors"
          >
            {t("contact")}
          </Link>
        </div>
      </section>
    </div>
  );
}

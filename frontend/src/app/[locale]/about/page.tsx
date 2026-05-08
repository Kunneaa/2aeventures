"use client";

import { Shield, TruckIcon, Award, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useLanguage } from "../../../store/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const storySections = [
    {
      title: t("about_story_title"),
      text: t("about_story_p1"),
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200",
    },
    {
      title: t("about_stat_delivery_title"),
      text: t("about_story_p2"),
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
    },
    {
      title: t("about_stat_support_title"),
      text: t("about_story_p3"),
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#1c3f63] tracking-tight">{t("about_title")}</h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 leading-relaxed">{t("about_subtitle")}</p>
      </div>

      <div className="space-y-12 mb-16">
        {storySections.map((section, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div key={section.title} className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                className={isReversed ? "md:order-2" : ""}
                initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="relative w-full h-[320px]">
                    <Image src={section.image} alt={section.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className={isReversed ? "md:order-1" : ""}
                initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-[#336699] rounded-2xl p-6 md:p-8 shadow-lg">
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-white leading-tight">{section.title}</h2>
                  <p className="text-white text-base md:text-lg font-medium leading-relaxed">{section.text}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-4 gap-8 mb-16">
        <div className="text-center bg-[#336699] rounded-2xl p-6 shadow-lg">
          <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_stat_quality_title")}</h3>
          <p className="text-base font-medium text-white leading-relaxed">{t("about_stat_quality_desc")}</p>
        </div>
        <div className="text-center bg-[#336699] rounded-2xl p-6 shadow-lg">
          <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <TruckIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_stat_delivery_title")}</h3>
          <p className="text-base font-medium text-white leading-relaxed">{t("about_stat_delivery_desc")}</p>
        </div>
        <div className="text-center bg-[#336699] rounded-2xl p-6 shadow-lg">
          <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_stat_price_title")}</h3>
          <p className="text-base font-medium text-white leading-relaxed">{t("about_stat_price_desc")}</p>
        </div>
        <div className="text-center bg-[#336699] rounded-2xl p-6 shadow-lg">
          <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_stat_support_title")}</h3>
          <p className="text-base font-medium text-white leading-relaxed">{t("about_stat_support_desc")}</p>
        </div>
      </div>

      <div className="bg-[#336699] rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-white">{t("about_policies_title")}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_policy_pricing_title")}</h3>
            <ul className="text-base font-medium text-white space-y-1.5 leading-relaxed">
              <li>• {t("about_policy_pricing_item1")}</li>
              <li>• {t("about_policy_pricing_item2")}</li>
              <li>• {t("about_policy_pricing_item3")}</li>
              <li>• {t("about_policy_pricing_item4")}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_policy_shipping_title")}</h3>
            <ul className="text-base font-medium text-white space-y-1.5 leading-relaxed">
              <li>• {t("about_policy_shipping_item1")}</li>
              <li>• {t("about_policy_shipping_item2")}</li>
              <li>• {t("about_policy_shipping_item3")}</li>
              <li>• {t("about_policy_shipping_item4")}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_policy_returns_title")}</h3>
            <ul className="text-base font-medium text-white space-y-1.5 leading-relaxed">
              <li>• {t("about_policy_returns_item1")}</li>
              <li>• {t("about_policy_returns_item2")}</li>
              <li>• {t("about_policy_returns_item3")}</li>
              <li>• {t("about_policy_returns_item4")}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">{t("about_policy_payment_title")}</h3>
            <ul className="text-base font-medium text-white space-y-1.5 leading-relaxed">
              <li>• {t("about_policy_payment_item1")}</li>
              <li>• {t("about_policy_payment_item2")}</li>
              <li>• {t("about_policy_payment_item3")}</li>
              <li>• {t("about_policy_payment_item4")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { motion } from "motion/react";
import { brandCopy } from "../../config/brand";
import { useLanguage } from "../../store";
import { fadeUp, directionGroups, HeroSection, CoreValuesSection, FocusGroup } from "../../components/home/HomeSections";

export default function HomePage() {
  const { language, t } = useLanguage();
  const copy = brandCopy[language].home;
  const basePath = `/${language}`;

  return (
    <div className="bg-[#071018] text-[#f5f5f5] selection:bg-[#c9a86a] selection:text-[#071018] font-sans">
      <HeroSection copy={copy} basePath={basePath} />
      
      <div className="relative z-10 -mt-20">
        <CoreValuesSection copy={copy} />
      </div>

      <section className="py-24 md:py-32">
        <div className="section-shell space-y-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#c9a86a] uppercase tracking-[0.3em] text-[10px] font-bold mb-6"
            >
              {t("home_business_areas")}
            </motion.p>
            <motion.h2 
              {...fadeUp}
              className="font-serif text-4xl md:text-5xl text-[#f5f5f5] tracking-wide leading-tight"
            >
              {copy.featuredEyebrow}
            </motion.h2>
          </div>

          {directionGroups.map((group, index) => (
            <FocusGroup
              key={group.type}
              group={group}
              copy={copy}
              language={language}
              index={index}
              basePath={basePath}
            />
          ))}
        </div>
      </section>
    </div>
  );
}


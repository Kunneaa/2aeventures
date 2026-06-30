"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { brandAssets, brandCopy } from "../../../config/brand";
import { useLanguage } from "../../../store";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const content = brandCopy[language].about;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-[#071018] text-[#f5f5f5] selection:bg-[#c9a86a] selection:text-[#071018] font-sans overflow-x-hidden">
      {/* CINEMATIC HERO */}
      <section ref={containerRef} className="relative min-h-[90vh] md:min-h-[100vh] flex items-end pb-24 md:pb-32 overflow-hidden pt-32">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src={brandAssets.aboutHero}
            alt="2AE VENTURES Heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-100 grayscale-0 md:opacity-50 md:grayscale md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-[#071018]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-[#071018]/80 to-transparent" />
        </motion.div>

        <div className="section-shell relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <p className="text-[#c9a86a] uppercase tracking-[0.4em] text-xs font-bold mb-8">
              {content.heroKicker}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#f5f5f5] tracking-tight leading-[1.1] mb-8" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
              {content.heroTitle}
            </h1>
            <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-[#8d9ba8] font-light">
              {content.heroText}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 md:mt-32 border-t border-white/10 pt-10"
          >
            {content.heroMarks.map((item, index) => (
              <div key={item} className="flex flex-col gap-2">
                <span className="text-[#c9a86a] font-serif text-2xl italic">0{index + 1}</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d9ba8]">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION STATEMENT - EDITORIAL LAYOUT */}
      <section className="py-24 md:py-40 relative">
        <div className="absolute right-0 top-1/4 w-[50vw] h-[50vw] bg-[#c9a86a]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="section-shell relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#c9a86a] uppercase tracking-[0.3em] text-[10px] font-bold mb-8">
                {content.missionEyebrow}
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#f5f5f5] leading-[1.1] tracking-tight" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
                “{content.missionQuote}”
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              {[content.missionIntro, content.missionNote].map((item, index) => (
                <div key={index} className="relative pl-8 border-l border-[#c9a86a]/30">
                  <div className="absolute top-0 left-0 w-1 h-8 bg-[#c9a86a] -translate-x-[2px]" />
                  <p className="text-sm md:text-base leading-relaxed text-[#8d9ba8] font-light">
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-32">
            {content.missionCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border border-white/5 bg-[#0d1821] p-10 hover:border-[#c9a86a]/30 transition-all duration-500 rounded-xl"
              >
                <p className="text-[#c9a86a] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Vision 0{index + 1}
                </p>
                <h3 className="text-2xl font-serif text-[#f5f5f5] mb-4 group-hover:text-[#c9a86a] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#8d9ba8] font-light">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERMISSION IMAGE */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <Image
          src="/images/about/truck-logistics.jpg"
          alt={t("about_cold_chain_alt")}
          fill
          className="object-cover grayscale-0 opacity-100 md:grayscale md:opacity-60 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-1000"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#071018]/40" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 mix-blend-overlay">
            <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-[#c9a86a] mb-6">
              {t("about_cold_chain")}
            </p>
            <h2 className="text-4xl md:text-7xl font-serif text-[#f5f5f5] leading-tight max-w-4xl mx-auto tracking-tight opacity-90">
              {t("about_cold_chain_title")}
            </h2>
          </div>
        </div>
      </section>

      {/* B2B MODEL & NETWORKS */}
      <section className="py-24 md:py-40 bg-[#0d1821]">
        <div className="section-shell">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#c9a86a] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">{content.modelEyebrow}</p>
              <h2 className="text-4xl md:text-5xl font-serif text-[#f5f5f5] leading-tight mb-8">
                {content.modelTitle}
              </h2>
              <p className="text-lg leading-relaxed text-[#8d9ba8] font-light">
                {content.modelText}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {content.customerGroups.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-6 border border-white/5 bg-[#071018] rounded-lg group hover:border-[#c9a86a]/30 transition-colors duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-[#c9a86a] group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[#8d9ba8] group-hover:text-[#f5f5f5] transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-24 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src={brandAssets.supply}
                alt="2AE Inventory and Supply Chain"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#071018]/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="text-[#c9a86a] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">{content.supplyEyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#f5f5f5] leading-tight mb-8">
                {content.supplyTitle}
              </h2>
              <p className="text-lg leading-relaxed text-[#8d9ba8] font-light">
                {content.supplyText}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.supplySteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-white/5 bg-[#071018] p-10 lg:p-12 rounded-xl group hover:border-[#c9a86a]/30 transition-colors"
              >
                <p className="text-[#c9a86a] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">
                  Step 0{index + 1}
                </p>
                <h3 className="text-2xl font-serif text-[#f5f5f5] mb-6 group-hover:text-[#c9a86a] transition-colors">{step.title}</h3>
                <p className="text-sm text-[#8d9ba8] leading-relaxed font-light">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { brandAssets, brandCopy } from "../../../config/brand";
import { useLanguage } from "../../../store";
import { motion } from "motion/react";
import { toast } from "sonner";
import { siteConfig } from "../../../config/site";
import { ContactForm } from "../../../components/contact/ContactForm";
 
export default function ContactPage() {
  const { t, language } = useLanguage();
  const copy = brandCopy[language].contact;

  const contactChannels = [
    {
      label: copy.channels.call,
      title: t("contact_hotline_title"),
      value: siteConfig.hotline.label,
      note: t("contact_hotline_note"),
      href: siteConfig.hotline.href,
    },
    {
      label: copy.channels.zalo,
      title: t("contact_zalo_title"),
      value: siteConfig.zalo.label,
      note: t("contact_zalo_note"),
      href: siteConfig.zalo.href,
    },
    {
      label: copy.channels.email,
      title: t("contact_email_title"),
      value: siteConfig.email.label,
      note: t("contact_email_note"),
      href: siteConfig.email.href,
    },
  ];

  return (
    <div className="bg-[#071018] text-[#f5f5f5] selection:bg-[#c9a86a] selection:text-[#071018] font-sans min-h-screen">
      
      {/* CONCIERGE HERO & FORM */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src={brandAssets.contactHero}
            alt="2AE frozen food trade contact"
            fill
            priority
            className="object-cover opacity-60 md:opacity-40 grayscale-0 md:grayscale"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#071018]/60" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c9a86a]/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid lg:grid-cols-[1fr_500px] gap-16 lg:gap-24 items-start">
            
            {/* Left Side: Copy & Channels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#c9a86a] uppercase tracking-[0.4em] text-xs font-bold mb-6">
                {copy.kicker}
              </p>
              <h1 className="text-5xl md:text-7xl font-serif text-[#f5f5f5] tracking-tight leading-[1.1] mb-8" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
                {copy.title}
              </h1>
              <p className="max-w-xl text-lg text-[#8d9ba8] font-light leading-relaxed mb-16">
                {copy.intro}
              </p>

              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8d9ba8] mb-8">
                  {copy.quickTitle}
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {contactChannels.map((channel, index) => (
                    <a
                      key={channel.title}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group block p-5 border border-white/5 bg-[#0d1821] rounded-xl hover:border-[#c9a86a]/30 transition-all duration-500"
                    >
                      <p className="text-[#c9a86a] text-[10px] uppercase tracking-widest font-bold mb-3">0{index + 1}</p>
                      <h3 className="text-[#f5f5f5] text-base font-serif mb-1 group-hover:text-[#c9a86a] transition-colors">{channel.label}</h3>
                      <p className="text-[#8d9ba8] text-xs font-medium mb-2">{channel.value}</p>
                      <p className="text-[#8d9ba8]/60 text-[10px] font-light leading-relaxed">{channel.note}</p>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side: Concierge Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* HELP SECTION */}
      <section className="bg-[#0b151c] py-24 border-t border-white/5">
        <div className="section-shell">
          <div className="text-center mb-16">
            <p className="text-[#c9a86a] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">2AE VENTURES</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#f5f5f5]">{copy.helpTitle}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {copy.helpCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#071018] border border-white/5 p-10 rounded-xl hover:border-[#c9a86a]/30 transition-all duration-300 group"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a86a] mb-6 block">
                  Help 0{index + 1}
                </span>
                <h3 className="text-xl font-serif text-[#f5f5f5] mb-4 group-hover:text-[#c9a86a] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[#8d9ba8] text-sm leading-relaxed font-light">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="bg-[#071018] border-t border-white/5 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c9a86a]/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="section-shell relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#c9a86a] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">2AE VENTURES</p>
              <h2 className="text-3xl md:text-5xl font-serif text-[#f5f5f5] mb-6">{copy.mapTitle}</h2>
              <p className="text-[#8d9ba8] text-lg leading-relaxed font-light mb-10">
                {copy.mapIntro}
              </p>
              
              <div className="border-l-2 border-[#c9a86a]/30 pl-6 mb-12">
                <span className="text-[#c9a86a] font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">
                  {t("contact_address")}
                </span>
                <span className="text-[#f5f5f5] text-base leading-relaxed">
                  {siteConfig.address}
                </span>
              </div>
              
              <a
                href={siteConfig.googleMaps.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#c9a86a] hover:text-[#071018] transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">{copy.mapAction}</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative grayscale-0 opacity-100 md:grayscale md:opacity-80 md:hover:grayscale-0 md:hover:opacity-100 transition-all duration-1000"
            >
              <iframe
                title="2AE Ventures Location Map"
                src={siteConfig.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

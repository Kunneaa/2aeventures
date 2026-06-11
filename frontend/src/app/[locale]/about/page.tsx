"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Building2,
  Factory,
  Globe2,
  Handshake,
  PackageCheck,
  Route,
  Store,
  Truck,
  Utensils,
  Users,
} from "lucide-react";
import { brandAssets, brandCopy } from "../../../config/brand";
import { useLanguage } from "../../../store/LanguageContext";

const customerIcons = [Store, Utensils, Building2, Users];
const missionIcons = [PackageCheck, Truck, Handshake];
const supplyIcons = [Factory, Route, Globe2];

export default function AboutPage() {
  const { language } = useLanguage();
  const content = brandCopy[language].about;

  return (
    <div className="app-shell w-full">
      <section className="relative min-h-[720px] overflow-hidden bg-[#0b151c]">
        <Image
          src={brandAssets.aboutHero}
          alt="2AE VENTURES"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.95),rgba(7,15,22,0.76)_48%,rgba(7,15,22,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0b151c] via-[#0b151c]/70 to-transparent" />

        <div className="section-shell relative flex min-h-[720px] flex-col justify-end pb-8 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl pb-12"
          >
            <p className="eyebrow-on-dark mb-5">{content.heroKicker}</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/82 md:text-xl">
              {content.heroText}
            </p>
          </motion.div>

          <div className="grid w-full gap-3 sm:grid-cols-3">
            {content.heroMarks.map((item, index) => (
              <div
                key={item}
                className="rounded-lg border border-white/14 bg-white/[0.08] p-4 text-sm font-bold uppercase tracking-[0.08em] text-white/82 backdrop-blur-sm"
              >
                <span className="mb-3 block text-[#d9a85c]">0{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b151c] text-white">
        <div className="section-shell py-14 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="eyebrow-on-dark">{content.missionEyebrow}</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
                “{content.missionQuote}”
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[content.missionIntro, content.missionNote].map((item, index) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/14 bg-white/[0.07] p-5"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#d9a85c]">
                    0{index + 1}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/74 md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.missionCards.map((item, index) => {
              const Icon = missionIcons[index];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="rounded-lg border border-white/14 bg-white/[0.05] p-5 transition hover:bg-white/[0.08]"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-[#d9a85c]" />
                    <div>
                      <h3 className="text-lg font-extrabold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/68">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f6]">
        <div className="section-shell grid gap-10 py-14 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <p className="eyebrow">{content.modelEyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#17324d] md:text-5xl">
              {content.modelTitle}
            </h2>
            <p className="body-copy mt-5 max-w-2xl text-base md:text-lg">{content.modelText}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.customerGroups.map((item, index) => {
              const Icon = customerIcons[index];

              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group overflow-hidden rounded-lg border border-[#d8e3df] bg-white p-5 shadow-[0_16px_40px_rgba(23,36,45,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(23,36,45,0.1)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2f7fb] text-[#336699]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 text-xl font-extrabold text-[#17242d]">{item}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell py-14 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <p className="eyebrow">{content.supplyEyebrow}</p>
              <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#17324d] md:text-5xl">
                {content.supplyTitle}
              </h2>
            </div>
            <p className="body-copy max-w-3xl text-base md:text-lg">{content.supplyText}</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="relative min-h-[430px] overflow-hidden rounded-lg bg-[#0b151c]"
            >
              <Image
                src={brandAssets.supply}
                alt="2AE supply chain"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b151c]/82 via-[#0b151c]/18 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#d9a85c]">
                  {language === "vi" ? "Mỹ đến Việt Nam" : "U.S. to Vietnam"}
                </p>
                <p className="mt-3 max-w-xl text-2xl font-extrabold leading-tight">
                  {content.supplyTitle}
                </p>
              </div>
            </motion.div>

            <div className="grid gap-4">
              {content.supplySteps.map((step, index) => {
                const Icon = supplyIcons[index];

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="rounded-lg border border-[#d8e3df] bg-[#f6f8f6] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-[#9aa9a4]">0{index + 1}</span>
                      <Icon className="h-5 w-5 text-[#2f6f63]" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-[#17242d]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#53636c]">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

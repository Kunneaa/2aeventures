"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  PackageSearch,
  Phone,
  Send,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { FormField } from "../../../components/forms/FormField";
import { brandAssets, brandCopy } from "../../../config/brand";
import { siteConfig } from "../../../config/site";
import { contactService } from "../../../services/contact";
import { useLanguage } from "../../../store/LanguageContext";

type ContactField = "name" | "email" | "phone" | "message";

const helpIcons = [PackageSearch, Truck, Globe2];

export default function ContactPage() {
  const { t, language } = useLanguage();
  const copy = brandCopy[language].contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: ContactField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const response = await contactService.sendMessage({
      ...formData,
      locale: language,
    });

    setIsSubmitting(false);

    if (response.success) {
      setSubmitted(true);
      toast.success(t("contact_success_title"));
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      return;
    }

    toast.error(
      language === "vi"
        ? "Chưa gửi được tin nhắn. Vui lòng thử lại."
        : "Could not send your message. Please try again.",
    );
  };

  const contactChannels = [
    {
      label: copy.channels.call,
      title: t("contact_hotline_title"),
      value: siteConfig.hotline.label,
      note: t("contact_hotline_note"),
      href: siteConfig.hotline.href,
      icon: Phone,
    },
    {
      label: copy.channels.zalo,
      title: t("contact_zalo_title"),
      value: siteConfig.zalo.label,
      note: t("contact_zalo_note"),
      href: siteConfig.zalo.href,
      icon: MessageCircle,
    },
    {
      label: copy.channels.email,
      title: t("contact_email_title"),
      value: siteConfig.email.label,
      note: t("contact_email_note"),
      href: siteConfig.email.href,
      icon: Mail,
    },
  ];

  return (
    <div className="app-shell w-full">
      <section className="relative overflow-hidden bg-[#0b151c]">
        <Image
          src={brandAssets.contactHero}
          alt="2AE frozen food trade contact"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.94),rgba(7,15,22,0.82)_46%,rgba(7,15,22,0.36)_100%)]" />

        <div className="section-shell relative grid min-h-[calc(100vh-4rem)] grid-cols-1 gap-10 py-14 md:py-20 lg:grid-cols-[1fr_500px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="eyebrow-on-dark">
              {copy.kicker}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {copy.intro}
            </p>

            <div className="mt-10">
              <h2 className="text-sm font-bold uppercase text-white/60">
                {copy.quickTitle}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {contactChannels.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <a
                      key={channel.title}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group rounded-lg border border-white/20 bg-white/10 p-4 text-white backdrop-blur transition-colors hover:bg-white hover:text-[#17324d]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Icon className="h-5 w-5 text-[#d9a85c]" />
                        <ArrowRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-5 text-base font-extrabold">{channel.label}</p>
                      <p className="mt-1 text-sm text-white/70 group-hover:text-[#53636c]">
                        {channel.value}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-white/60 group-hover:text-[#667780]">
                        {channel.note}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            id="contact-form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center"
          >
            <div className="commerce-card w-full p-5 md:p-7">
              <p className="eyebrow">
                {copy.formEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#17324d]">
                {t("contact_form_title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5c6a72]">
                {copy.formIntro}
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f4ee]">
                    <CheckCircle2 className="h-8 w-8 text-[#2f6f63]" />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-[#17324d]">
                    {t("contact_success_title")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6a72]">
                    {copy.successBody}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      required
                      label={t("contact_form_name_label")}
                      value={formData.name}
                      onChange={(value) => updateField("name", value)}
                      placeholder={t("contact_form_name_placeholder")}
                      autoComplete="name"
                    />

                    <FormField
                      required
                      type="tel"
                      label={t("contact_form_phone_label")}
                      value={formData.phone}
                      onChange={(value) => updateField("phone", value)}
                      placeholder={t("contact_form_phone_placeholder")}
                      autoComplete="tel"
                    />
                  </div>

                  <FormField
                    required
                    type="email"
                    label={t("contact_form_email_label")}
                    value={formData.email}
                    onChange={(value) => updateField("email", value)}
                    placeholder={t("contact_form_email_placeholder")}
                    autoComplete="email"
                  />

                  <FormField
                    required
                    multiline
                    rows={4}
                    label={t("contact_form_message_label")}
                    value={formData.message}
                    onChange={(value) => updateField("message", value)}
                    placeholder={t("contact_form_message_placeholder")}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? copy.sendLoading : t("contact_form_submit")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
            <div>
              <p className="eyebrow">
                2AE VENTURES
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#17324d] md:text-4xl">
                {copy.helpTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5c6a72]">
                {copy.helpIntro}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {copy.helpCards.map((card, index) => {
                const Icon = helpIcons[index];

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="commerce-card commerce-card-hover p-5"
                  >
                    <Icon className="h-7 w-7 text-[#b87333]" />
                    <h3 className="mt-5 text-lg font-extrabold text-[#17242d]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5c6a72]">
                      {card.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8e3df] bg-[#f6f8f6]">
        <div className="section-shell grid gap-8 py-14 md:py-16 lg:grid-cols-[380px_1fr]">
          <div>
            <p className="eyebrow">2AE VENTURES</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#17324d] md:text-4xl">
              {copy.mapTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5c6a72]">
              {copy.mapIntro}
            </p>
            <p className="mt-5 flex gap-3 text-sm font-bold leading-relaxed text-[#17242d]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#336699]" />
              <span>{siteConfig.address}</span>
            </p>
            <a
              href={siteConfig.googleMaps.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 px-5 py-3 text-sm"
            >
              {copy.mapAction}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="commerce-card overflow-hidden">
            <iframe
              title="2AE VENTURES map"
              src={siteConfig.googleMaps.embedUrl}
              className="h-[360px] w-full border-0 md:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}

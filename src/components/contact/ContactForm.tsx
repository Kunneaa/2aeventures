"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { brandCopy } from "../../config/brand";
import { useLanguage } from "../../store";
import { contactService } from "../../services/api";

type ContactField = "name" | "email" | "phone" | "message";

export function ContactForm() {
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
      }, 5000);
      return;
    }

    toast.error(t("product_not_found"));
  };

  return (
    <div className="bg-[#0d1821]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c9a86a]/50 to-transparent opacity-50" />
      
      <div className="mb-10 text-center">
        <p className="text-[#c9a86a] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
          {copy.formEyebrow}
        </p>
        <h2 className="text-3xl font-serif text-[#f5f5f5]" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
          {t("contact_form_title")}
        </h2>
      </div>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center"
        >
          <div className="w-16 h-16 rounded-full border-2 border-[#c9a86a] flex items-center justify-center mx-auto mb-6 text-[#c9a86a]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 className="text-2xl font-serif text-[#f5f5f5] mb-4">
            {t("contact_success_title")}
          </h3>
          <p className="text-[#8d9ba8] text-sm leading-relaxed font-light">
            {copy.successBody}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-[#f5f5f5] placeholder-transparent focus:border-[#c9a86a] focus:outline-none transition-colors"
              placeholder="Name"
              id="name"
            />
            <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-[#8d9ba8] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#8d9ba8]/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#c9a86a] uppercase tracking-widest">
              {t("contact_form_name_label")} *
            </label>
          </div>

          <div className="relative">
            <input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-[#f5f5f5] placeholder-transparent focus:border-[#c9a86a] focus:outline-none transition-colors"
              placeholder="Phone"
              id="phone"
            />
            <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-[#8d9ba8] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#8d9ba8]/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#c9a86a] uppercase tracking-widest">
              {t("contact_form_phone_label")} *
            </label>
          </div>

          <div className="relative">
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-[#f5f5f5] placeholder-transparent focus:border-[#c9a86a] focus:outline-none transition-colors"
              placeholder="Email"
              id="email"
            />
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-[#8d9ba8] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#8d9ba8]/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#c9a86a] uppercase tracking-widest">
              {t("contact_form_email_label")} *
            </label>
          </div>

          <div className="relative">
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-[#f5f5f5] placeholder-transparent focus:border-[#c9a86a] focus:outline-none transition-colors resize-none"
              placeholder="Message"
              id="message"
            />
            <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs text-[#8d9ba8] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#8d9ba8]/50 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#c9a86a] uppercase tracking-widest">
              {t("contact_form_message_label")} *
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-[#c9a86a] text-[#071018] py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#d9b87a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? copy.sendLoading : t("contact_form_submit")}
          </button>
        </form>
      )}
    </div>
  );
}

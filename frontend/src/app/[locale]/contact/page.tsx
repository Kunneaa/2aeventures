"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "../../../store/LanguageContext";
import { motion } from "motion/react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-[#eaf3fb] via-[#f5f9fd] to-white -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">
            <MessageCircle className="w-4 h-4" />
            2AEVENTURES SUPPORT
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#1f3f5f] tracking-tight">
            {t("contact_title")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            {t("contact_intro")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-extrabold text-gray-900">{t("contact_info_title")}</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="group rounded-2xl bg-white border border-blue-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#eaf2fa] rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#336699]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t("contact_hotline_title")}</h3>
                <p className="text-gray-700 font-semibold">{t("contact_hotline_value")}</p>
                <p className="text-sm text-gray-600 mt-1">{t("contact_hotline_note")}</p>
              </div>

              <div className="group rounded-2xl bg-white border border-blue-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#eaf2fa] rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-[#336699]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t("contact_zalo_title")}</h3>
                <p className="text-gray-700 font-semibold">{t("contact_zalo_value")}</p>
                <p className="text-sm text-gray-600 mt-1">{t("contact_zalo_note")}</p>
              </div>

              <div className="group rounded-2xl bg-white border border-blue-100 p-5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="w-12 h-12 bg-[#eaf2fa] rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#336699]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t("contact_email_title")}</h3>
                <p className="text-gray-700 font-semibold">{t("contact_email_value")}</p>
                <p className="text-sm text-gray-600 mt-1">{t("contact_email_note")}</p>
              </div>

              <div className="group rounded-2xl bg-white border border-blue-100 p-5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="w-12 h-12 bg-[#eaf2fa] rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#336699]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t("contact_address_title")}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("contact_address_line1")}
                  <br />
                  {t("contact_address_line2")}
                </p>
              </div>

              <div className="group rounded-2xl bg-white border border-blue-100 p-5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="w-12 h-12 bg-[#eaf2fa] rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#336699]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t("contact_hours_title")}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("contact_hours_line1")}
                  <br />
                  {t("contact_hours_line2")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl bg-white p-6 md:p-8 border border-blue-100 shadow-[0_20px_50px_rgba(17,50,84,0.12)]">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{t("contact_form_title")}</h2>
              <p className="text-gray-600 mb-6">{t("contact_success_desc")}</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t("contact_success_title")}</h3>
                  <p className="text-gray-600">{t("contact_success_desc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-800">
                        {t("contact_form_name_label")} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                        placeholder={t("contact_form_name_placeholder")}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5 text-gray-800">
                        {t("contact_form_phone_label")} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                        placeholder={t("contact_form_phone_placeholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-gray-800">
                      {t("contact_form_email_label")} <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                      placeholder={t("contact_form_email_placeholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-gray-800">
                      {t("contact_form_message_label")} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                      placeholder={t("contact_form_message_placeholder")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#336699] text-white py-3 rounded-xl font-bold hover:bg-[#2c5c8a] transition-colors shadow-md shadow-blue-900/20"
                  >
                    {t("contact_form_submit")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="rounded-3xl overflow-hidden border border-blue-100 shadow-[0_18px_45px_rgba(15,47,80,0.12)] bg-white">
            <div className="px-6 py-4 bg-gradient-to-r from-[#336699] to-[#3e78b0]">
              <p className="text-white font-semibold">{t("contact_address_title")}</p>
              <p className="text-blue-100 text-sm">{t("contact_address_line1")} - {t("contact_address_line2")}</p>
            </div>
            <div className="h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3205189944084!2d106.69276431533431!3d10.788324192315086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5d4f83e5a9!2zVMOibiBExKluaCwgUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

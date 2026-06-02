"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, FileText, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { QuickEmailButton } from "../../../components/contact/QuickEmailButton";
import { quoteService } from "../../../services/quotes";
import { useCart } from "../../../store/CartContext";
import { useLanguage } from "../../../store/LanguageContext";

const cartCopy = {
  vi: {
    eyebrow: "Yêu cầu báo giá",
    intro: "Kiểm tra danh sách sản phẩm và để lại thông tin để 2AE phản hồi đúng nhu cầu.",
    summary: "Thông tin yêu cầu",
    selected: "Sản phẩm đã chọn",
    continueShopping: "Tiếp tục xem sản phẩm",
    submitting: "Đang gửi...",
  },
  en: {
    eyebrow: "Quote request",
    intro: "Review selected products and leave your details so 2AE can follow up properly.",
    summary: "Request details",
    selected: "Selected products",
    continueShopping: "Continue browsing",
    submitting: "Submitting...",
  },
};

export default function QuoteCartPage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { t, language } = useLanguage();
  const { items, removeFromCart, clearCart } = useCart();
  const copy = cartCopy[language];
  const selectedProducts = items.map((item) => item.product);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    const response = await quoteService.createQuote({
      items: selectedProducts.map((product) => ({
        productId: product.id,
      })),
      customerInfo: {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
      },
      notes: formData.notes || undefined,
      locale: language,
    });

    setIsSubmitting(false);

    if (response.success) {
      setIsSubmitted(true);
      clearCart();
      setFormData({ name: "", email: "", company: "", phone: "", notes: "" });
      toast.success(language === "vi" ? "Đã gửi yêu cầu báo giá" : "Quote request submitted");
      return;
    }

    toast.error(
      language === "vi"
        ? "Chưa gửi được yêu cầu báo giá. Vui lòng thử lại."
        : "Could not submit the quote request. Please try again.",
    );
  };

  if (isSubmitted) {
    return (
      <div className="section-shell flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#edf7f2] text-[#2f6f63]">
          <CheckCircle size={40} />
        </div>
        <h2 className="max-w-2xl text-3xl font-extrabold text-[#17324d]">
          {t("form_success")}
        </h2>
        <Link href={`/${params.locale}/products`} className="btn-secondary mt-8 px-5 py-2.5 text-sm">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="app-shell w-full">
      <section className="border-b border-[#d8e3df] bg-white">
        <div className="section-shell py-10 md:py-12">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="heading-lg mt-2 flex items-center gap-3">
            <FileText className="h-8 w-8 text-[#336699]" />
            {t("quote_request")}
          </h1>
          <p className="body-copy mt-3 max-w-2xl">{copy.intro}</p>
        </div>
      </section>

      <section className="section-shell py-8 md:py-12">
        {items.length === 0 ? (
          <div className="commerce-card px-6 py-14 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f7fb] text-[#336699]">
              <ShoppingBag size={26} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#17324d]">{t("cart_empty")}</h2>
            <p className="body-copy mx-auto mt-3 max-w-md">{t("cart_empty_description")}</p>
            <Link href={`/${params.locale}/products`} className="btn-primary mt-8 px-6 py-3 text-sm">
              {t("view_products")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
            <div className="commerce-card overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-[#d8e3df] bg-[#f8faf8] p-4">
                <h2 className="font-extrabold text-[#17324d]">{copy.selected}</h2>
                <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-[#5c6a72]">
                  {items.length}
                </span>
              </div>

              <ul className="divide-y divide-[#edf3f0]">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-[#d8e3df] bg-[#edf3f0]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name[language]}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-extrabold text-[#17242d] sm:text-base">
                          {item.product.name[language]}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-[#7a858a]">
                          {t("unit")}: {item.product.unit[language]}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#d4183d] transition-colors hover:bg-[#fff1f3]"
                      title={t("remove")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between gap-3 border-t border-[#d8e3df] bg-[#f8faf8] p-4">
                <Link href={`/${params.locale}/products`} className="text-sm font-bold text-[#336699] hover:text-[#17324d]">
                  {copy.continueShopping}
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm font-bold text-[#7a858a] hover:text-[#17242d]"
                >
                  {t("clear_cart")}
                </button>
              </div>
            </div>

            <aside>
              <div className="commerce-card sticky top-24 p-5">
                <h2 className="border-b border-[#d8e3df] pb-4 text-lg font-extrabold text-[#17324d]">
                  {copy.summary}
                </h2>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="field-label">{t("name")} *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="field-input mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="field-label">{t("email")} *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="field-input mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="field-label">{t("company")} *</label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      className="field-input mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="field-label">{t("phone")} *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="field-input mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="field-label">{t("notes")}</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      className="field-input mt-1.5 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? copy.submitting : t("submit_quote")}
                  </button>

                  <QuickEmailButton
                    products={selectedProducts}
                    className="btn-secondary w-full px-4 py-3 text-sm"
                  >
                    {t("quick_email")}
                  </QuickEmailButton>
                  <p className="text-xs leading-relaxed text-[#5c6a72]">
                    {t("quick_email_hint")}
                  </p>
                </form>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

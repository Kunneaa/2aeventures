"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, CheckCircle, FileText } from "lucide-react";
import { useLanguage } from "../../../store/LanguageContext";
import { useCart } from "../../../store/CartContext";
import { toast } from "sonner";

export default function QuoteCartPage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { t, language } = useLanguage();
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleQuantityChange = (productId: string, value: string) => {
    const parsed = Number.parseInt(value, 10);
    updateQuantity(productId, Number.isNaN(parsed) ? 1 : Math.max(parsed, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      clearCart();
      toast.success(language === "vi" ? "Đã gửi yêu cầu báo giá" : "Quote request submitted");
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("form_success")}</h2>
        <Link
          href={`/${params.locale}/products`}
          className="mt-8 text-blue-600 font-medium hover:underline"
        >
          &larr; {t("view_products")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <FileText className="text-blue-600" />
        {t("quote_request")}
      </h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">{t("cart_empty")}</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {t("cart_empty_description")}
          </p>
          <Link
            href={`/${params.locale}/products`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
          >
            {t("view_products")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-6">{t("product_name")}</div>
                <div className="col-span-4 text-center">{t("quantity")}</div>
                <div className="col-span-2 text-right"></div>
              </div>

              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="p-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={item.product.image}
                          alt={item.product.name[language]}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">
                          {item.product.name[language]}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {t("unit")}: {item.product.unit[language]}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-4 flex justify-center w-full mt-4 sm:mt-0">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-32">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                          className="w-full text-center py-2 text-sm font-medium focus:outline-none"
                        />
                        <span className="pr-3 text-gray-500 text-sm">
                          {item.product.unit[language]}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-end w-full mt-2 sm:mt-0">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={t("remove")}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-gray-900 font-medium"
                >
                  {t("clear_cart")}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                {t("submit_quote")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("name")} *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("email")} *
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("company")} *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("phone")} *
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("notes")}
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mt-6 transition-colors shadow-sm"
                >
                  {isSubmitting
                    ? language === "vi"
                      ? "Đang gửi..."
                      : "Submitting..."
                    : t("submit_quote")}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

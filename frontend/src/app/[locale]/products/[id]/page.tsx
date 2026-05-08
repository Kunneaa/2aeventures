"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { products, categories } from "../../../../lib/mockData";
import { useLanguage } from "../../../../store/LanguageContext";
import { useCart } from "../../../../store/CartContext";

export default function ProductDetailPage({
  params,
}: {
  params: { locale: "vi" | "en"; id: string };
}) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products.find((item) => item.id === params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("product_not_found")}</h1>
        <Link href={`/${params.locale}/products`} className="text-blue-600 hover:underline">
          {t("back_to_products")}
        </Link>
      </div>
    );
  }

  const categoryName = categories.find((cat) => cat.id === product.categoryId)?.name[language];
  const relatedProducts = products
    .filter((item) => item.categoryId === product.categoryId && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href={`/${params.locale}/products`}
        className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("back_to_products")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name[language]}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-sm text-blue-600 font-medium">{categoryName}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.name[language]}</h1>
          <p className="text-gray-700 mb-6">{product.description[language]}</p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 font-medium mb-2">
              {t("wholesale_notice_title")}
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• {t("wholesale_benefit_discount")}</li>
              <li>• {t("wholesale_benefit_delivery")}</li>
              <li>• {t("wholesale_benefit_support")}</li>
            </ul>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t("quantity")}</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  className="w-20 text-center border-x border-gray-300 py-2 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <span className="text-gray-600">({product.unit[language]})</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {t("add_to_cart")}
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                router.push(`/${params.locale}/cart`);
              }}
              className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {t("buy_now")}
            </button>
          </div>

          {showSuccess && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t("add_to_cart")} {quantity} {product.unit[language]}!
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{t("related_products")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/${params.locale}/products/${relatedProduct.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <div className="relative w-full h-full">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name[language]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-600 font-medium">{categoryName}</span>
                  <h3 className="font-semibold mt-1 mb-2">
                    {relatedProduct.name[language]}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

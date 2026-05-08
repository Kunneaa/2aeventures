"use client";

import Link from "next/link";
import { ArrowRight, ChefHat, Truck, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../store/LanguageContext";
import { products } from "../../lib/mockData";
import { ProductCard } from "../../components/products/ProductCard";

export default function HomePage({
  params,
}: {
  params: { locale: "vi" | "en" };
}) {
  const { t } = useLanguage();
  const featuredProducts = products.slice(0, 4);
  const basePath = `/${params.locale}`;

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZXNhbGUlMjBmb29kJTIwZGlzdHJpYnV0aW9uJTIwd2FyZWhvdXNlfGVufDF8fHx8MTc3ODEzMDc5NXww&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Cold storage warehouse"
            className="w-full h-full object-cover opacity-30"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {t("hero_title")}
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t("hero_subtitle")}
            </p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href={`${basePath}/products`}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50"
              >
                {t("shop_now")}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("premium_quality")}</h3>
                <p className="text-gray-500 text-sm">{t("premium_quality_desc")}</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <Truck size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("cold_chain_logistics")}</h3>
                <p className="text-gray-500 text-sm">{t("cold_chain_desc")}</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <ChefHat size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("wholesale_pricing")}</h3>
                <p className="text-gray-500 text-sm">{t("wholesale_pricing_desc")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("our_catalog")}</h2>
            <p className="text-gray-500">{t("featured_subtitle")}</p>
          </div>
          <Link
            href={`${basePath}/products`}
            className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
          >
            {t("view_products")} <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}

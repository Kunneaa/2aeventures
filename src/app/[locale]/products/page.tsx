"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X } from "lucide-react";

import dynamic from "next/dynamic";
import { QuickEmailButton } from "../../../components/contact/QuickEmailButton";
import { ANIMAL_CUTS } from "../../../components/products/cutMapData";

const InteractiveCutMap = dynamic(
  () => import("../../../components/products/InteractiveCutMap")
);
import { getProductSearchableText } from "../../../lib/catalog";
import { matchesSearchQuery, normalizeSearchText } from "../../../lib/search";
import { useCatalog, useLanguage } from "../../../store";


export default function ProductsPage() {
  const { language, t } = useLanguage();
  const { categories, products } = useCatalog();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCutId, setSelectedCutId] = useState<string | null>(null);

  const categoryParam = searchParams.get("category") || "beef";
  const activeCategory = categories.some(c => c.id === categoryParam) ? categoryParam : (categories[0]?.id || "beef");

  const activeCategoryObj = useMemo(() => {
    return categories.find((c) => c.id === activeCategory);
  }, [activeCategory, categories]);

  const isSearching = normalizeSearchText(searchQuery).length > 0;

  const updateCategory = (cat: string) => {
    setSelectedCutId(null);
    setSearchQuery("");
    router.replace(`${pathname}?category=${cat}`, { scroll: false });
  };

  const visibleProducts = useMemo(() => {
    let filtered = products.filter((product) => product.categoryId === activeCategory);
    if (isSearching) {
      filtered = filtered.filter((product) =>
        matchesSearchQuery(getProductSearchableText(product), searchQuery),
      );
    }
    return filtered;
  }, [activeCategory, products, isSearching, searchQuery]);

  const displayAnimalCategory = useMemo(() => {
    if (activeCategoryObj && (activeCategoryObj.id === "beef" || activeCategoryObj.id === "chicken")) {
      return activeCategoryObj;
    }
    return null;
  }, [activeCategoryObj]);

  const getCutName = (cutId: string) => {
    const cuts = activeCategory === "beef" ? ANIMAL_CUTS.beef : ANIMAL_CUTS.chicken;
    const match = cuts.find(c => c.id === cutId);
    return match ? (language === "vi" ? match.labelVi : match.labelEn) : cutId;
  };

  const brandsForCut = useMemo(() => {
    if (!selectedCutId || !displayAnimalCategory?.brands) return [];
    // If the catalog supported exact mapping of cuts to brands, we would filter here.
    // For now, we return all brands from this category to simulate the drawer capability.
    return displayAnimalCategory.brands;
  }, [selectedCutId, displayAnimalCategory]);

  return (
    <div className="min-h-screen bg-[#071018] text-[#f5f5f5] selection:bg-[#c9a86a] selection:text-[#071018] font-sans relative overflow-x-hidden pt-12">
      
      {/* FLOATING NAVIGATION */}
      <div className="fixed top-[100px] left-1/2 -translate-x-1/2 z-50">
        <div className="backdrop-blur-2xl bg-[#0d1821]/60 border border-white/5 rounded-full p-2 flex items-center shadow-2xl">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button 
                key={cat.id}
                onClick={() => updateCategory(cat.id)}
                className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${isActive ? "text-[#071018]" : "text-[#8d9ba8] hover:text-[#f5f5f5]"}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#c9a86a] rounded-full shadow-[0_0_20px_rgba(201,168,106,0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.name[language]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* MAIN SHOWCASE */}
      <AnimatePresence mode="wait">
        {displayAnimalCategory ? (
          /* BEEF / CHICKEN EXPERIENCE */
          <motion.div
            key="animal-stage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen pt-40 pb-20 px-6 flex flex-col relative"
          >
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,168,106,0.06) 0%, transparent 60%)" }} />
            
            <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto w-full">
              <div className="text-center mb-16 mt-8">
                <h1 className="text-5xl md:text-7xl font-serif text-[#f5f5f5] tracking-tight mb-6" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
                  {displayAnimalCategory.name[language]}
                </h1>
                <p className="text-[#c9a86a] uppercase tracking-[0.3em] text-xs font-bold">Premium US Sourcing</p>
              </div>
              
              <div className="w-full px-4 lg:px-12">
                <InteractiveCutMap 
                  category={activeCategory as "beef" | "chicken"} 
                  selectedCutId={selectedCutId} 
                  onSelectCut={setSelectedCutId} 
                />
              </div>
            </div>

            {/* Strategic Partners Marquee */}
            {displayAnimalCategory.brands && displayAnimalCategory.brands.length > 0 && (
              <div className="mt-auto pt-32 pb-10 relative z-10 overflow-hidden w-full max-w-[100vw]">
                <p className="text-center text-[#8d9ba8] text-[10px] uppercase tracking-[0.3em] mb-12">
                  {t("products_strategic_partners")}
                </p>
                <motion.div 
                  className="flex w-[200vw]"
                  animate={{ x: ["0%", "-50%"] }} 
                  transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                >
                  {[...displayAnimalCategory.brands, ...displayAnimalCategory.brands, ...displayAnimalCategory.brands, ...displayAnimalCategory.brands].map((brand, i) => (
                    <div key={`${brand.id}-${i}`} className="w-[200px] md:w-[300px] flex-shrink-0 flex justify-center items-center px-8">
                       <div className="relative w-full h-[60px] opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer">
                         <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain" />
                       </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          /* SEAFOOD / AGRICULTURE EXPERIENCE */
          <motion.div
            key="grid-stage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen pt-40 pb-32 px-6 max-w-[1600px] mx-auto relative z-10"
          >
            <div className="text-center mb-24 mt-8">
               <h1 className="text-5xl md:text-7xl font-serif text-[#f5f5f5] tracking-tight mb-6" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
                 {activeCategoryObj?.name[language]}
               </h1>
               <p className="text-[#c9a86a] uppercase tracking-[0.3em] text-xs font-bold">Global Export Sourcing</p>
            </div>

            {/* Editorial Grid Layout */}
            <div className={`grid grid-cols-1 gap-12 sm:gap-16 ${
              visibleProducts.length === 1 
                ? 'max-w-md mx-auto' 
                : visibleProducts.length === 2 
                  ? 'max-w-4xl mx-auto sm:grid-cols-2' 
                  : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}>
               {visibleProducts.map((product) => (
                 <div key={product.id} className="group cursor-pointer relative">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0d1821] mb-6 rounded-lg">
                      <Image 
                        src={product.image} 
                        alt={product.name[language]} 
                        fill 
                        className="object-cover transition-all duration-[1.5s] group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 bg-[#071018]/10 group-hover:bg-[#071018]/50 backdrop-blur-[0px] group-hover:backdrop-blur-sm transition-all duration-700 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                        <QuickEmailButton 
                          products={[product]} 
                          className="bg-[#c9a86a] text-[#0b151c] px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0"
                        >
                          <Mail size={16} /> {t("quick_contact")}
                        </QuickEmailButton>
                      </div>
                    </div>
                    <div className="pr-4 border-l border-[#c9a86a]/0 group-hover:border-[#c9a86a]/30 pl-4 transition-all duration-500 relative z-10">
                      <h3 className="font-serif text-3xl text-[#f5f5f5] mb-3" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
                        {product.name[language]}
                      </h3>
                      <div className="text-[#8d9ba8] text-xs uppercase tracking-widest leading-relaxed flex flex-col gap-1 mt-1">
                        {product.specs?.packing && (
                          <span>{product.specs.packing}</span>
                        )}
                        {product.specs?.brand && (
                          <span className="text-[#c9a86a] opacity-80">{product.specs.brand}</span>
                        )}
                      </div>
                    </div>
                 </div>
               ))}
            </div>
            
            {!visibleProducts.length && (
              <div className="py-32 text-center border-t border-white/5 mt-12">
                 <p className="text-[#8d9ba8] font-serif text-2xl italic tracking-wide">
                   {t("products_no_collections")}
                 </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAWER COMPONENT */}
      <AnimatePresence>
        {selectedCutId && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedCutId(null)}
              className="fixed inset-0 bg-[#071018]/20 backdrop-blur-sm z-[60]" 
            />
            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-[#0d1821]/95 backdrop-blur-xl border-l border-[#c9a86a]/20 z-[70] overflow-y-auto"
            >
              <div className="p-10 md:p-14">
                <button onClick={() => setSelectedCutId(null)} className="absolute top-10 right-10 text-[#8d9ba8] hover:text-[#c9a86a] transition-colors duration-300">
                   <X size={28} strokeWidth={1.5} />
                </button>
                
                <p className="text-[#c9a86a] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Cut Specification</p>
                <h2 className="font-serif text-4xl md:text-5xl text-[#f5f5f5] mb-8 tracking-tight" style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif' }}>
                  {getCutName(selectedCutId)}
                </h2>
                
                <div className="mb-12">
                  <QuickEmailButton 
                    products={[{ 
                      id: selectedCutId, 
                      categoryId: activeCategory,
                      name: { 
                        en: `${getCutName(selectedCutId)} (${activeCategoryObj?.name.en})`, 
                        vi: `${getCutName(selectedCutId)} (${activeCategoryObj?.name.vi})` 
                      },
                      image: activeCategoryObj?.image || "",
                      unit: { en: "box", vi: "thùng" },
                      description: { en: "", vi: "" },
                      specs: { packing: "", brand: "" }
                    }]} 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a86a] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#0b151c] transition-colors duration-300 rounded-full text-xs font-bold uppercase tracking-widest"
                  >
                    <Mail size={16} /> {t("quick_contact")}
                  </QuickEmailButton>
                </div>
                
                <div className="w-8 h-px bg-[#c9a86a]/50 mb-12" />
                
                <div className="space-y-12">
                  <div>
                    <h4 className="text-[#8d9ba8] text-xs uppercase tracking-[0.2em] mb-6">Available Packers</h4>
                    <div className="flex flex-col gap-6">
                       {brandsForCut.map((b, i) => (
                         <motion.div 
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.2 + (i * 0.1) }}
                           key={b.id} 
                           className="flex items-center gap-6 group cursor-pointer"
                         >
                            <div className="w-20 h-12 relative bg-white/5 rounded-sm border border-white/5 group-hover:border-[#c9a86a]/30 transition-colors duration-300">
                              <Image src={b.logoUrl} alt={b.name} fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300" />
                            </div>
                            <span className="text-[#f5f5f5] text-sm group-hover:text-[#c9a86a] transition-colors duration-300 font-medium tracking-wide">{b.name}</span>
                         </motion.div>
                       ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#8d9ba8] text-xs uppercase tracking-[0.2em] mb-6">Quality Assurance</h4>
                    <ul className="text-sm text-[#f5f5f5]/80 space-y-3 font-light leading-relaxed">
                      <li className="flex items-start gap-3"><span className="text-[#c9a86a]">■</span> USDA Certified / International Grade</li>
                      <li className="flex items-start gap-3"><span className="text-[#c9a86a]">■</span> Strict temperature control at -18°C</li>
                      <li className="flex items-start gap-3"><span className="text-[#c9a86a]">■</span> Traceable origin & halal options available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

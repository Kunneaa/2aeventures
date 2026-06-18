"use client";

import Image from "next/image";
import { useLanguage } from "../../store";

export interface CutDefinition {
  id: string;
  labelEn: string;
  labelVi: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

export const ANIMAL_CUTS = {
  beef: [
    { id: "chuck", labelEn: "Chuck", labelVi: "Nạc vai", top: "15%", left: "22%", width: "18%", height: "35%" },
    { id: "brisket", labelEn: "Brisket", labelVi: "Gầu bò", top: "50%", left: "26%", width: "12%", height: "20%" },
    { id: "shank", labelEn: "Shank", labelVi: "Bắp bò", top: "70%", left: "25%", width: "10%", height: "20%" },
    { id: "rib", labelEn: "Rib", labelVi: "Sườn bò", top: "15%", left: "40%", width: "12%", height: "30%" },
    { id: "plate", labelEn: "Plate", labelVi: "Ba chỉ bò", top: "45%", left: "40%", width: "12%", height: "15%" },
    { id: "short_loin", labelEn: "Short Loin", labelVi: "Thăn nội/ngoại", top: "15%", left: "52%", width: "10%", height: "30%" },
    { id: "flank", labelEn: "Flank", labelVi: "Nạc bụng", top: "45%", left: "52%", width: "10%", height: "20%" },
    { id: "sirloin", labelEn: "Sirloin", labelVi: "Thăn vai", top: "15%", left: "62%", width: "12%", height: "30%" },
    { id: "round", labelEn: "Round", labelVi: "Thăn đùi", top: "15%", left: "74%", width: "18%", height: "50%" },
  ],
  chicken: [
    { id: "whole", labelEn: "Whole Chicken", labelVi: "Gà nguyên con", top: "10%", left: "30%", width: "40%", height: "70%" },
    { id: "breast", labelEn: "Breast", labelVi: "Ức gà", top: "30%", left: "45%", width: "25%", height: "25%" },
    { id: "wing", labelEn: "Wing", labelVi: "Cánh gà", top: "35%", left: "20%", width: "25%", height: "20%" },
    { id: "thigh", labelEn: "Thigh/Leg", labelVi: "Đùi gà", top: "55%", left: "40%", width: "25%", height: "35%" },
  ]
};

interface InteractiveCutMapProps {
  category: "beef" | "chicken";
  selectedCutId: string | null;
  onSelectCut: (cutId: string | null) => void;
}

export function InteractiveCutMap({ category, selectedCutId, onSelectCut }: InteractiveCutMapProps) {
  const { language } = useLanguage();
  const cuts = ANIMAL_CUTS[category] || [];
  const imageSrc = `/images/maps/${category}-cut.jpg`;

  const aspectRatio = category === "beef" ? "2290 / 1856" : "1448 / 1086";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio, transform: "translateZ(0)" }}>
      <Image
        src={imageSrc}
        alt={`${category} Cut Map`}
        fill
        sizes="(max-width: 1024px) 100vw, 1024px"
        className="object-contain rounded-2xl"
        style={{ borderRadius: "1rem" }}
        priority
      />
      {cuts.map((cut) => {
        const isSelected = selectedCutId === cut.id;
        return (
          <button
            key={cut.id}
            onClick={() => onSelectCut(isSelected ? null : cut.id)}
            className={`absolute flex items-center justify-center transition-all duration-300 border-2 cursor-pointer rounded-lg hover:bg-[#c9a86a]/20 hover:border-[#c9a86a]/80
              ${isSelected ? "bg-[#c9a86a]/30 border-[#c9a86a] z-10 scale-[1.02] shadow-[0_0_15px_rgba(217,168,92,0.4)]" : "bg-transparent border-transparent z-0"}`}
            style={{
              top: cut.top,
              left: cut.left,
              width: cut.width,
              height: cut.height,
            }}
            title={language === "vi" ? cut.labelVi : cut.labelEn}
          >
            {isSelected && (
              <span className="bg-[#c9a86a] text-[#0b151c] text-xs font-extrabold px-2.5 py-1 rounded shadow-sm">
                {language === "vi" ? cut.labelVi : cut.labelEn}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

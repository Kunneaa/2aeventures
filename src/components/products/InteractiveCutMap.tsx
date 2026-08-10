"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../../store";

import { ANIMAL_CUTS } from "./cutMapData";

interface InteractiveCutMapProps {
  category: "beef" | "chicken";
  selectedCutId: string | null;
  onSelectCut: (cutId: string | null) => void;
}

export default function InteractiveCutMap({ category, selectedCutId, onSelectCut }: InteractiveCutMapProps) {
  const { language } = useLanguage();
  const [hoveredCutId, setHoveredCutId] = useState<string | null>(null);
  
  const cuts = ANIMAL_CUTS[category] || [];
  const imageSrc = `/images/maps/${category}-cut-${language}.jpg`;

  const aspectRatio = category === "beef" ? "1448 / 1086" : "1448 / 1086";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio, transform: "translateZ(0)" }}>
      <Image
        src={imageSrc}
        alt={`${category} Cut Map`}
        fill
        sizes="(max-width: 1024px) 100vw, 1024px"
        quality={100}
        className="object-contain rounded-2xl"
        style={{ borderRadius: "1rem" }}
        priority
      />
      {cuts.map((cut, index) => {
        const selectedCut = selectedCutId ? cuts.find(c => c.id === selectedCutId) : null;
        const isSelected = selectedCutId === cut.id || (selectedCut?.highlights?.includes(cut.id) ?? false);
        
        const hoveredCut = hoveredCutId ? cuts.find(c => c.id === hoveredCutId) : null;
        const isHovered = hoveredCutId === cut.id || (hoveredCut?.highlights?.includes(cut.id) ?? false);
        const isActive = isSelected || isHovered;

        const cutTop = language === "vi" && cut.topVi ? cut.topVi : cut.top;
        const cutLeft = language === "vi" && cut.leftVi ? cut.leftVi : cut.left;
        const cutWidth = language === "vi" && cut.widthVi ? cut.widthVi : cut.width;
        const cutHeight = language === "vi" && cut.heightVi ? cut.heightVi : cut.height;
        const cutPath = language === "vi" && cut.pathVi ? cut.pathVi : cut.path;
        const cutViewBox = language === "vi" && cut.viewBoxVi ? cut.viewBoxVi : cut.viewBox;

        return (
          <div
            key={`${cut.id}-${index}`}
            className={`absolute pointer-events-none transition-transform duration-300 ${isSelected ? "z-20 scale-[1.02]" : "z-10 scale-100"}`}
            style={{
              top: cutTop,
              left: cutLeft,
              width: cutWidth,
              height: cutHeight,
            }}
            title={language === "vi" ? cut.labelVi : cut.labelEn}
          >
            {cutPath ? (
              <svg 
                viewBox={cutViewBox || "0 0 100 100"} 
                className={`w-full h-full overflow-visible transition-all duration-300 ${isSelected ? "drop-shadow-[0_0_15px_rgba(217,168,92,0.5)]" : ""}`}
                preserveAspectRatio="none"
              >
                <path 
                  d={cutPath} 
                  onClick={() => onSelectCut(isSelected ? null : cut.id)}
                  onMouseEnter={() => setHoveredCutId(cut.id)}
                  onMouseLeave={() => setHoveredCutId(null)}
                  className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                    isSelected ? "fill-[#c9a86a]/80 stroke-[#c9a86a] stroke-[3px]" : 
                    isHovered ? "fill-[#c9a86a]/50 stroke-[#c9a86a] stroke-[2px]" : 
                    "fill-transparent stroke-transparent"
                  }`} 
                />
              </svg>
            ) : (
              <div 
                onClick={() => onSelectCut(isSelected ? null : cut.id)}
                onMouseEnter={() => setHoveredCutId(cut.id)}
                onMouseLeave={() => setHoveredCutId(null)}
                className={`w-full h-full pointer-events-auto cursor-pointer transition-all duration-300 border-2 rounded-lg 
                ${isSelected ? "bg-[#c9a86a]/80 border-[#c9a86a] shadow-[0_0_15px_rgba(217,168,92,0.5)] border-[3px]" : 
                  isHovered ? "bg-[#c9a86a]/50 border-[#c9a86a]" : 
                  "bg-transparent border-transparent"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../../store";

export interface CutDefinition {
  id: string;
  highlights?: string[];
  labelEn: string;
  labelVi: string;
  top: string;
  left: string;
  width: string;
  height: string;
  path?: string;
  viewBox?: string;
}

export const ANIMAL_CUTS: Record<string, CutDefinition[]> = {
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
    { 
      id: "back_rect", 
      highlights: ["back_svg"],
      labelEn: "Back", 
      labelVi: "Lưng gà", 
      top: "2.3%", 
      left: "26.8%", 
      width: "10.3%", 
      height: "15.1%" 
    },
    { 
      id: "back_svg", 
      highlights: ["back_rect"],
      labelEn: "Back", 
      labelVi: "Lưng gà", 
      top: "31.6%", 
      left: "36.3%", 
      width: "25.55%", 
      height: "10.22%", 
      viewBox: "0 0 370 111",
      path: "M20.2395 29.5731L44.7395 0.57312L94.7395 15.5731L122.74 14.5731L152.24 9.57312L160.24 10.5731L159.24 18.5731L221.24 24.5731L246.24 22.5731L255.24 17.5731H269.24L272.74 14.5731H277.74L289.24 10.5731L311.24 4.57312L319.74 6.07312L329.74 3.57312L333.24 1.07312H336.74L349.24 22.5731L368.74 46.0731L361.74 49.5731L322.24 64.0731L271.74 78.5731L259.74 79.5731L227.24 86.0731L218.74 88.5731H210.24L202.24 90.5731L151.24 100.573L134.74 103.573L127.24 107.073L116.24 110.073H108.74L86.7395 102.573L79.7395 99.5731L57.7395 88.5731L36.2395 76.0731L16.2395 62.0731L0.739502 49.0731L20.2395 29.5731Z"
    },
    { 
      id: "wing_svg", 
      highlights: ["whole_wing", "wingtip", "drumette_wing", "wingetts"],
      labelEn: "Wing", 
      labelVi: "Cánh gà", 
      top: "34.69%", 
      left: "42.73%", 
      width: "22.79%", 
      height: "19.98%", 
      viewBox: "0 0 330 217",
      path: "M0.776221 132.813C2.54216 126.622 -0.775047 101.635 22.7762 83.3132C42.4227 74.5949 55.6179 70.5711 87.7763 66.8132L142.276 55.3132C218.556 43.7182 207.776 42.8132 289.776 12.8132C289.776 12.8132 307.276 3.8132 320.776 0.813221C334.276 -2.18675 327.776 17.3132 327.776 17.3132C321.445 44.0139 307.404 62.8712 274.776 99.3132C230.684 146.315 204.614 169.755 151.276 196.813C99.4822 219.097 57.5019 224.705 19.2762 195.813C5.77635 185.313 -0.989721 139.004 0.776221 132.813Z"
    },
    { id: "whole_wing", highlights: ["wing_svg"], labelEn: "Whole Wing", labelVi: "Nguyên cánh gà", top: "2.3%", left: "41.2%", width: "12.9%", height: "16.5%" },
    { id: "wingtip", highlights: ["wing_svg"], labelEn: "Wingtip", labelVi: "Đầu cánh gà", top: "2.3%", left: "54.4%", width: "9.9%", height: "16.5%" },
    { id: "drumette_wing", highlights: ["wing_svg"], labelEn: "Drumette", labelVi: "Tỏi cánh gà", top: "2.3%", left: "64.8%", width: "9.3%", height: "16.5%" },
    { id: "wingetts", highlights: ["wing_svg"], labelEn: "Wingetts", labelVi: "Khủy cánh gà", top: "2.3%", left: "74.6%", width: "9.3%", height: "16.5%" },
    { 
      id: "tenderloin_rect", 
      highlights: ["tenderloin_svg"],
      labelEn: "Tenderloin", 
      labelVi: "Ức phi lê", 
      top: "27.26%", 
      left: "10.22%", 
      width: "9.67%", 
      height: "15.29%"
    },
    { 
      id: "tenderloin_svg", 
      highlights: ["tenderloin_rect"],
      labelEn: "Tenderloin", 
      labelVi: "Ức phi lê", 
      top: "36.46%", 
      left: "33.84%", 
      width: "9.60%", 
      height: "14.23%", 
      viewBox: "0 0 141 157",
      path: "M0.672058 21.6165L31.1721 0.616547C73.6877 32.7789 97.4464 46.7086 139.672 63.6165C120.037 90.4934 120.89 112.778 126.672 155.117C76.1199 127.237 43.8364 92.8533 0.672058 21.6165Z"
    },
    { 
      id: "boneless_breast_rect", 
      highlights: ["breast_svg"],
      labelEn: "Boneless Breast", 
      labelVi: "Ức gà không xương", 
      top: "44.57%", left: "2.69%", width: "10.64%", height: "16.57%"
    },
    { 
      id: "split_breast_rect", 
      highlights: ["breast_svg"],
      labelEn: "Split Breast", 
      labelVi: "Ức gà chia nửa", 
      top: "44.57%", left: "13.81%", width: "10.29%", height: "16.57%"
    },
    { 
      id: "airline_breast_rect", 
      highlights: ["breast_svg"],
      labelEn: "Airline Breast", 
      labelVi: "Ức gà Airline", 
      top: "61.60%", left: "2.83%", width: "10.43%", height: "16.57%"
    },
    { 
      id: "bone_in_breast_rect", 
      highlights: ["breast_svg"],
      labelEn: "Bone-in Breast", 
      labelVi: "Ức gà có xương", 
      top: "61.69%", left: "13.81%", width: "10.29%", height: "16.48%"
    },
    { 
      id: "breast_svg", 
      highlights: ["boneless_breast_rect", "split_breast_rect", "airline_breast_rect", "bone_in_breast_rect"],
      labelEn: "Breast", 
      labelVi: "Ức gà", 
      top: "38.26%", left: "26.66%", width: "17.20%", height: "21.36%", 
      viewBox: "0 0 249 232",
      path: "M97.5177 0.670654C63.749 19.1681 42.7076 24.9599 0.517731 25.1707C0.988819 38.6143 2.90378 45.8701 13.0177 57.6707C14.8297 72.8279 18.0262 78.2708 25.0177 86.1707C34.9524 113.335 45.8563 125.241 73.0177 141.671C81.0398 144.304 85.7665 148.014 86.5177 156.671C122.84 190.835 146.212 206.607 191.518 230.671C208.858 201.605 221.299 186.977 248.018 163.671L237.018 147.171C207.512 130.557 193.097 119.141 169.018 97.1707C142.43 70.26 126.913 50.2421 97.5177 0.670654Z"
    },
    { 
      id: "whole_leg_rect", 
      highlights: ["drumstick_svg"],
      labelEn: "Whole Leg", 
      labelVi: "Đùi gà nguyên", 
      top: "72.01%", left: "30.73%", width: "12.02%", height: "13.90%"
    },
    { 
      id: "leg_quarter_rect", 
      highlights: ["drumstick_svg"],
      labelEn: "Leg Quarter", 
      labelVi: "Góc phần tư đùi", 
      top: "72.19%", left: "43.16%", width: "11.67%", height: "13.72%"
    },
    { 
      id: "drumstick_rect", 
      highlights: ["drumstick_svg"],
      labelEn: "Drumstick", 
      labelVi: "Tỏi gà", 
      top: "72.01%", left: "58.77%", width: "9.12%", height: "13.90%"
    },
    { 
      id: "drumstick_svg", 
      highlights: ["whole_leg_rect", "leg_quarter_rect", "drumstick_rect"],
      labelEn: "Leg", 
      labelVi: "Đùi gà", 
      top: "47.88%", left: "38.85%", width: "20.58%", height: "23.57%", 
      viewBox: "0 0 298 256",
      path: "M21.5961 128.972C36.5495 101.904 47.611 87.5481 77.0961 61.4719C142.401 100.739 201.984 74.2561 293.596 0.971863C303.417 110.057 294.369 154.492 237.096 186.472C237.454 198.68 239.298 206.201 247.096 221.472L280.096 232.472C280.096 234.972 258.265 236.221 247.096 236.472C233.596 247.783 225.405 255.351 218.096 254.472C220.916 246.772 223.372 242.852 229.096 236.472L228.668 236.571C210.95 240.651 200.884 242.97 194.096 239.472C213.238 231.156 222.461 226.633 229.096 219.472C226.686 208.42 223.505 201.39 218.096 188.972C195.595 184.537 182.916 179.485 160.096 161.972L171.596 152.472C172.753 147.183 171.691 146.399 166.596 148.972C142.909 171.501 124.108 179.03 84.0961 186.472C65.1905 218.516 61.6143 233.196 87.0961 244.472L85.0961 251.972C62.4698 239.876 51.8077 233.496 41.5961 250.972C38.4951 251.71 35.944 251.091 30.5961 248.972C36.3081 244.173 36.6247 242.276 35.0961 239.472H17.0961L0.0960693 236.472C51.4065 226.425 64.0059 217.91 62.0961 186.472C42.8461 169.31 34.9998 157.371 21.5961 128.972Z"
    },
    { 
      id: "thigh_fillets_rect", 
      highlights: ["thigh_svg"],
      labelEn: "Thigh Fillets", 
      labelVi: "Má đùi rút xương", 
      top: "43.83%", left: "76.04%", width: "10.50%", height: "15.01%"
    },
    { 
      id: "thigh_cutlets_rect", 
      highlights: ["thigh_svg"],
      labelEn: "Thigh Cutlets", 
      labelVi: "Má đùi cắt miếng", 
      top: "43.83%", left: "87.15%", width: "10.98%", height: "15.01%"
    },
    { 
      id: "thigh_svg", 
      highlights: ["thigh_fillets_rect", "thigh_cutlets_rect"],
      labelEn: "Thigh", 
      labelVi: "Má đùi", 
      top: "40.38%", left: "59.39%", width: "10.08%", height: "19.06%", 
      viewBox: "0 0 146 207",
      path: "M0.579895 79.1737C31.6209 50.2189 47.3175 32.3099 71.5799 0.673737C101.406 20.344 111.527 32.7313 144.58 37.1737L142.08 60.1737L112.08 114.674L102.58 128.674L81.0799 153.674C51.2629 178.087 34.7994 192.417 0.579895 205.674C7.94473 133.182 8.70713 103.1 0.579895 79.1737Z"
    },
  ]
};

interface InteractiveCutMapProps {
  category: "beef" | "chicken";
  selectedCutId: string | null;
  onSelectCut: (cutId: string | null) => void;
}

export function InteractiveCutMap({ category, selectedCutId, onSelectCut }: InteractiveCutMapProps) {
  const { language } = useLanguage();
  const [hoveredCutId, setHoveredCutId] = useState<string | null>(null);
  
  const cuts = ANIMAL_CUTS[category] || [];
  const imageSrc = `/images/maps/${category}-cut-${language}.jpg`;

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
      {cuts.map((cut, index) => {
        const selectedCut = selectedCutId ? cuts.find(c => c.id === selectedCutId) : null;
        const isSelected = selectedCutId === cut.id || (selectedCut?.highlights?.includes(cut.id) ?? false);
        
        const hoveredCut = hoveredCutId ? cuts.find(c => c.id === hoveredCutId) : null;
        const isHovered = hoveredCutId === cut.id || (hoveredCut?.highlights?.includes(cut.id) ?? false);
        const isActive = isSelected || isHovered;

        return (
          <div
            key={`${cut.id}-${index}`}
            className={`absolute pointer-events-none transition-transform duration-300 ${isSelected ? "z-20 scale-[1.02]" : "z-10 scale-100"}`}
            style={{
              top: cut.top,
              left: cut.left,
              width: cut.width,
              height: cut.height,
            }}
            title={language === "vi" ? cut.labelVi : cut.labelEn}
          >
            {cut.path ? (
              <svg 
                viewBox={cut.viewBox || "0 0 100 100"} 
                className={`w-full h-full overflow-visible transition-all duration-300 ${isSelected ? "drop-shadow-[0_0_15px_rgba(217,168,92,0.5)]" : ""}`}
                preserveAspectRatio="none"
              >
                <path 
                  d={cut.path} 
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

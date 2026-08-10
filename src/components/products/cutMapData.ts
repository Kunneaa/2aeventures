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
  topVi?: string;
  leftVi?: string;
  widthVi?: string;
  heightVi?: string;
  pathVi?: string;
  viewBoxVi?: string;
}

export const ANIMAL_CUTS: Record<string, CutDefinition[]> = {
  beef: [
    { id: "eye_round_rect", highlights: ["round_svg"], labelEn: "EYE ROUND", labelVi: "Thăn đùi", top: "10.13%", left: "2.76%", width: "8.63%", height: "13.63%", topVi: "10.13%", leftVi: "2.83%", widthVi: "8.63%", heightVi: "13.63%" },
    { id: "inside_round_rect", highlights: ["round_svg"], labelEn: "INSIDE ROUND", labelVi: "Thịt đùi trong", top: "10.13%", left: "12.02%", width: "8.22%", height: "13.63%", topVi: "10.13%", leftVi: "12.09%", widthVi: "8.22%", heightVi: "13.63%" },
    { id: "round_svg", highlights: ["eye_round_rect", "inside_round_rect"], labelEn: "Round", labelVi: "MÔNG", top: "28.50%", left: "29.28%", width: "11.46%", height: "21.04%", viewBox: "0 0 168 230", path: "M109 205.5C100.097 219.664 70.8105 225.556 56.5 229L27.5 205.5L3 195L0.5 137.5C0.5 91.5 6.09994 51.0864 32 36.5C47.9505 27.7734 60.5501 18.1881 77.5 0.5C125.5 0.500035 120.5 0.499995 166.5 7.64661C152.5 59.5 150.285 63.2033 152.5 119.196C145.778 142.459 142.5 151.5 136.5 175.5C120.496 183.732 121.084 194.053 109 205.5Z", topVi: "28.64%", leftVi: "29.70%", widthVi: "11.46%", heightVi: "21.04%", viewBoxVi: "0 0 168 230", pathVi: "M109 205.5C100.097 219.664 70.8105 225.556 56.5 229L27.5 205.5L3 195L0.5 137.5C0.5 91.5 6.09994 51.0864 32 36.5C47.9505 27.7734 60.5501 18.1881 77.5 0.5C125.5 0.500035 120.5 0.499995 166.5 7.64661C152.5 59.5 150.285 63.2033 152.5 119.196C145.778 142.459 142.5 151.5 136.5 175.5C120.496 183.732 121.084 194.053 109 205.5Z" },
    { id: "top_sirloin_rect", highlights: ["sirloin_svg"], labelEn: "TOP SIRLOIN", labelVi: "Thăn mông", top: "10.17%", left: "21.96%", width: "7.73%", height: "13.77%", topVi: "10.08%", leftVi: "22.38%", widthVi: "7.73%", heightVi: "13.77%" },
    { id: "tri_tip_sirloin_rect", highlights: ["sirloin_svg"], labelEn: "TRI-TIP SIRLOIN", labelVi: "Lõi thăn mông", top: "10.13%", left: "30.25%", width: "7.04%", height: "13.81%", topVi: "10.13%", leftVi: "30.53%", widthVi: "7.04%", heightVi: "13.81%" },
    { id: "sirloin_svg", highlights: ["top_sirloin_rect", "tri_tip_sirloin_rect"], labelEn: "Sirloin", labelVi: "THĂN NGOẠI", top: "29.10%", left: "39.16%", width: "7.08%", height: "13.17%", viewBox: "0 0 104 145", path: "M103.318 4.52066L24.3182 0.52066L11.8182 56.0207L8.81818 114.021L6.31818 132.021L0.818176 143.521L97.3182 137.521L98.8182 108.521L97.3182 78.0207L98.8182 29.5207L103.318 4.52066Z", topVi: "29.19%", leftVi: "39.57%", widthVi: "7.25%", heightVi: "13.26%", viewBoxVi: "0 0 107 146", pathVi: "M105.824 4.54817L24.8974 0.520203L12.0926 56.4083L9.0194 114.814L6.45843 132.94L0.82428 144.52L99.6779 138.478L101.215 109.275L99.6779 78.5622L101.215 29.723L105.824 4.54817Z" },
    { id: "short_loin_rect", highlights: ["short_loin_svg"], labelEn: "SHORT LOIN", labelVi: "Thăn lưng ngắn", top: "10.22%", left: "38.95%", width: "6.15%", height: "13.54%", topVi: "10.13%", leftVi: "39.57%", widthVi: "6.15%", heightVi: "13.54%" },
    { id: "striploin_rect", highlights: ["short_loin_svg"], labelEn: "STRIPLOIN", labelVi: "Thăn ngoại", top: "10.31%", left: "45.86%", width: "6.22%", height: "13.63%", topVi: "9.94%", leftVi: "46.34%", widthVi: "6.35%", heightVi: "13.63%" },
    { id: "sirloin_cubes_rect", highlights: ["short_loin_svg"], labelEn: "SIRLOIN CUBES", labelVi: "Thăn bò cắt lúc lắc", top: "10.13%", left: "52.90%", width: "6.01%", height: "13.81%", topVi: "9.85%", leftVi: "53.25%", widthVi: "6.42%", heightVi: "13.81%" },
    { id: "tenderloin_rect", highlights: ["short_loin_svg"], labelEn: "TENDERLOIN", labelVi: "Thăn nội", top: "9.99%", left: "59.50%", width: "6.28%", height: "13.95%", topVi: "9.67%", leftVi: "60.22%", widthVi: "6.28%", heightVi: "13.95%" },
    { id: "short_loin_svg", highlights: ["short_loin_rect", "striploin_rect", "sirloin_cubes_rect", "tenderloin_rect"], labelEn: "Loin", labelVi: "THĂN", top: "29.65%", left: "45.88%", width: "6.38%", height: "12.11%", viewBox: "0 0 94 133", path: "M2.58502 132C4.38421 57.1949 -2.90221 41.375 2.58503 0.5H92.9318L88.6254 63C84.7638 98.5439 91.085 95 88.6254 121.5C55.3164 127.013 39.2052 127.194 2.58502 132Z", topVi: "29.65%", leftVi: "46.48%", widthVi: "6.42%", heightVi: "12.15%", viewBoxVi: "0 0 95 134", pathVi: "M2.59784 132.5C4.40809 57.4104 -2.92312 41.5305 2.59784 0.5H93.5L89.1671 63.2376C85.2818 98.9167 91.6418 95.3593 89.1671 121.96C55.6534 127.494 39.4431 127.675 2.59784 132.5Z" },
    { id: "back_rib_rect", highlights: ["rib_svg"], labelEn: "BACK RIB", labelVi: "Sườn bẹ bò", top: "10.13%", left: "67.47%", width: "7.46%", height: "13.54%", topVi: "10.04%", leftVi: "68.30%", widthVi: "7.46%", heightVi: "13.54%" },
    { id: "rib_rect", highlights: ["rib_svg"], labelEn: "RIB", labelVi: "Sườn bò", top: "10.13%", left: "75.21%", width: "7.04%", height: "13.81%", topVi: "9.94%", leftVi: "76.11%", widthVi: "7.04%", heightVi: "13.81%" },
    { id: "ribeye_rect", highlights: ["rib_svg"], labelEn: "RIBEYE", labelVi: "Đầu thăn ngoại", top: "10.04%", left: "82.80%", width: "6.56%", height: "13.90%", topVi: "9.94%", leftVi: "83.50%", widthVi: "6.91%", heightVi: "13.90%" },
    { id: "short_rib_rect", highlights: ["rib_svg"], labelEn: "SHORT RIB", labelVi: "Sườn non bò", top: "10.31%", left: "89.99%", width: "6.77%", height: "13.63%", topVi: "10.04%", leftVi: "90.75%", widthVi: "7.18%", heightVi: "13.63%" },
    { id: "rib_svg", highlights: ["back_rib_rect", "rib_rect", "ribeye_rect", "short_rib_rect"], labelEn: "Rib", labelVi: "SƯỜN", top: "28.45%", left: "52.06%", width: "6.02%", height: "12.25%", viewBox: "0 0 89 135", path: "M1.69114 133.665C-1.30882 76.6649 1.98281 35.1542 4.69113 14.1649C45.1911 8.66495 32.6911 11.1649 87.6911 0.664948C83.0958 11.7549 80.9738 22.888 77.6601 47.8131C76.3012 92.3043 74.1122 81.904 70.6911 120.665L1.69114 133.665Z", topVi: "28.36%", leftVi: "52.69%", widthVi: "6.02%", heightVi: "12.25%", viewBoxVi: "0 0 89 135", pathVi: "M1.69114 133.665C-1.30882 76.6649 1.98281 35.1542 4.69113 14.1649C45.1911 8.66495 32.6911 11.1649 87.6911 0.664948C83.0958 11.7549 80.9738 22.888 77.6601 47.8131C76.3012 92.3043 74.1122 81.904 70.6911 120.665L1.69114 133.665Z" },
    { id: "petite_tender_rect", highlights: ["chuck_svg"], labelEn: "PETITE TENDER", labelVi: "Lõi vai nhỏ", top: "40.70%", left: "77.42%", width: "6.42%", height: "13.26%", topVi: "40.98%", leftVi: "78.38%", widthVi: "6.42%", heightVi: "13.26%" },
    { id: "chuck_eye_rect", highlights: ["chuck_svg"], labelEn: "CHUCK EYE", labelVi: "Lõi vai bò", top: "40.70%", left: "84.32%", width: "6.42%", height: "13.26%", topVi: "40.98%", leftVi: "85.15%", widthVi: "6.42%", heightVi: "13.26%" },
    { id: "shoulder_clod_rect", highlights: ["chuck_svg"], labelEn: "SHOULDER CLOD", labelVi: "Nạc vai bò", top: "40.70%", left: "91.23%", width: "6.35%", height: "13.26%", topVi: "40.98%", leftVi: "92.27%", widthVi: "6.35%", heightVi: "13.26%" },
    { id: "chuck_svg", highlights: ["petite_tender_rect", "chuck_eye_rect", "shoulder_clod_rect"], labelEn: "Chuck-Shoulder", labelVi: "VAI", top: "28.22%", left: "56.08%", width: "12.22%", height: "16.76%", viewBox: "0 0 179 184", path: "M21.0275 56.054C21.0238 39.8096 25.8572 16.8125 31.5269 2.05396C62.1963 -1.39983 93.121 0.105271 109.746 14.814C126.291 30.1697 137.176 36.0767 161.325 38.6559L158.869 68.0425C156.375 85.1309 156.541 94.5876 158.869 111.291C161.065 131.638 165.562 140.777 178.027 153.984L152.028 182.554H137.028L112.028 172.712L88.5276 162.624C63.1761 150.149 31.5269 152.554 1.02759 152.554C21.0275 127.054 17.5276 88.554 21.0275 56.054Z", topVi: "28.08%", leftVi: "56.77%", widthVi: "12.22%", heightVi: "16.76%", viewBoxVi: "0 0 179 184", pathVi: "M21.0275 56.054C21.0238 39.8096 25.8572 16.8125 31.5269 2.05396C62.1963 -1.39983 93.121 0.105271 109.746 14.814C126.291 30.1697 137.176 36.0767 161.325 38.6559L158.869 68.0425C156.375 85.1309 156.541 94.5876 158.869 111.291C161.065 131.638 165.562 140.777 178.027 153.984L152.028 182.554H137.028L112.028 172.712L88.5276 162.624C63.1761 150.149 31.5269 152.554 1.02759 152.554C21.0275 127.054 17.5276 88.554 21.0275 56.054Z" },
    { id: "brisket_rect", highlights: ["brisket_svg"], labelEn: "BRISKET", labelVi: "Gầu (Ức) bò", top: "69.24%", left: "66.23%", width: "11.74%", height: "11.42%", topVi: "69.24%", leftVi: "67.06%", widthVi: "11.74%", heightVi: "11.42%" },
    { id: "brisket_svg", highlights: ["brisket_rect"], labelEn: "Brisket", labelVi: "ỨC BÒ", top: "43.23%", left: "59.19%", width: "7.32%", height: "9.16%", viewBox: "0 0 108 101", path: "M106.714 22.7509C102.214 40.7509 97.7141 58.7509 85.2141 71.7509C79.2963 99.9601 33.7141 96.2509 24.7141 100.251C27.7141 100.251 7.32084 98.5921 0.71405 96.2509C14.2855 70.7509 21.7139 40.7509 27.2141 35.7509C31.2139 32.1148 39.2928 10.3452 42.2142 0.750946C69.7142 16.8217 90.7142 20.7509 106.714 22.7509Z", topVi: "43.28%", leftVi: "59.88%", widthVi: "7.32%", heightVi: "9.16%", viewBoxVi: "0 0 108 101", pathVi: "M106.714 22.7509C102.214 40.7509 97.7141 58.7509 85.2141 71.7509C79.2963 99.9601 33.7141 96.2509 24.7141 100.251C27.7141 100.251 7.32084 98.5921 0.71405 96.2509C14.2855 70.7509 21.7139 40.7509 27.2141 35.7509C31.2139 32.1148 39.2928 10.3452 42.2142 0.750946C69.7142 16.8217 90.7142 20.7509 106.714 22.7509Z" },
    { id: "fore_shank_rect", highlights: ["fore_shank_svg"], labelEn: "FORE SHANK", labelVi: "Bắp bò", top: "68.88%", left: "52.28%", width: "12.09%", height: "11.14%", topVi: "69.52%", leftVi: "53.11%", widthVi: "12.09%", heightVi: "11.14%" },
    { id: "fore_shank_svg", highlights: ["fore_shank_rect"], labelEn: "Shank", labelVi: "BẮP BÒ", top: "42.44%", left: "55.14%", width: "6.74%", height: "10.33%", viewBox: "0 0 99 114", path: "M98.143 10.6463C73.536 -1.49974 35.143 0.646326 13.7719 0.646296L3.64317 25.1463C-0.631728 53.1958 -1.35687 79.1463 6.64304 110.646C26.7292 107.1 38.0378 106.456 52.6431 112.646C65.8052 92.7363 75.1431 58.6463 78.143 50.6463C83.0243 48.671 97.3336 18.4756 98.143 10.6463Z", topVi: "42.45%", leftVi: "55.73%", widthVi: "6.74%", heightVi: "10.33%", viewBoxVi: "0 0 99 114", pathVi: "M98.143 10.6463C73.536 -1.49974 35.143 0.646326 13.7719 0.646296L3.64317 25.1463C-0.631728 53.1958 -1.35687 79.1463 6.64304 110.646C26.7292 107.1 38.0378 106.456 52.6431 112.646C65.8052 92.7363 75.1431 58.6463 78.143 50.6463C83.0243 48.671 97.3336 18.4756 98.143 10.6463Z" },
    { id: "short_plate_rect", highlights: ["short_plate_svg"], labelEn: "SHORT PLATE", labelVi: "Ba chỉ bò", top: "68.88%", left: "37.29%", width: "13.26%", height: "11.79%", topVi: "69.61%", leftVi: "37.85%", widthVi: "13.26%", heightVi: "11.14%" },
    { id: "short_plate_svg", highlights: ["short_plate_rect"], labelEn: "Short Plate", labelVi: "SƯỜN NON", top: "39.78%", left: "46.06%", width: "10.77%", height: "12.74%", viewBox: "0 0 158 140", path: "M137 135.151C71 144.151 31.1168 135.374 0.5 128.151V23.6505L78 14.1505L156.5 0.650513L134.5 50.6505L130.5 98.1505L137 135.151Z", topVi: "39.78%", leftVi: "46.55%", widthVi: "10.77%", heightVi: "12.74%", viewBoxVi: "0 0 158 140", pathVi: "M137 135.151C71 144.151 31.1168 135.374 0.5 128.151V23.6505L78 14.1505L156.5 0.650513L134.5 50.6505L130.5 98.1505L137 135.151Z" },
    { id: "flank_steak_rect", highlights: ["flank_svg"], labelEn: "FLANK STEAK", labelVi: "Diềm thăn", top: "68.88%", left: "17.68%", width: "8.63%", height: "11.79%", topVi: "69.43%", leftVi: "17.89%", widthVi: "8.91%", heightVi: "11.79%" },
    { id: "rough_flank_rect", highlights: ["flank_svg"], labelEn: "ROUGH FLANK", labelVi: "Nạm bò", top: "68.88%", left: "27.07%", width: "8.36%", height: "11.79%", topVi: "69.34%", leftVi: "27.28%", widthVi: "8.70%", heightVi: "11.79%" },
    { id: "flank_svg", highlights: ["flank_steak_rect", "rough_flank_rect"], labelEn: "Flank", labelVi: "BỤNG", top: "41.90%", left: "38.73%", width: "7.19%", height: "9.64%", viewBox: "0 0 106 106", path: "M0.703586 46.0835C-0.782431 34.5777 6.29955 17.439 7.70354 8.58353C47.1785 7.37893 60.3095 7.44419 104.54 0.583527V105.084C85.1109 105.935 66.5935 103.484 48.2036 96.0835C34.7559 90.7652 23.2794 94.752 7.70354 98.5835V73.5835L0.703586 46.0835Z", topVi: "41.80%", leftVi: "39.09%", widthVi: "7.19%", heightVi: "9.64%", viewBoxVi: "0 0 106 106", pathVi: "M0.703586 46.0835C-0.782431 34.5777 6.29955 17.439 7.70354 8.58353C47.1785 7.37893 60.3095 7.44419 104.54 0.583527V105.084C85.1109 105.935 66.5935 103.484 48.2036 96.0835C34.7559 90.7652 23.2794 94.752 7.70354 98.5835V73.5835L0.703586 46.0835Z" },
  ],
  chicken: [
    { 
      id: "back_rect", 
      highlights: ["back_svg"],
      labelEn: "Back", 
      labelVi: "Lưng", 
      top: "2.3%", 
      left: "26.8%", 
      width: "10.3%", 
      height: "15.1%" 
    },
    { 
      id: "back_svg", 
      highlights: ["back_rect"],
      labelEn: "Back", 
      labelVi: "Lưng", 
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
      labelVi: "Cánh", 
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
      labelVi: "Thăn nội", 
      top: "27.26%", 
      left: "10.22%", 
      width: "9.67%", 
      height: "15.29%"
    },
    { 
      id: "tenderloin_svg", 
      highlights: ["tenderloin_rect"],
      labelEn: "Tenderloin", 
      labelVi: "Thăn nội", 
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
      highlights: ["leg_quarter_rect", "drumstick_rect"],
      labelEn: "Leg", 
      labelVi: "Đùi", 
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
      labelVi: "Đùi", 
      top: "40.38%", left: "59.39%", width: "10.08%", height: "19.06%", 
      viewBox: "0 0 146 207",
      path: "M0.579895 79.1737C31.6209 50.2189 47.3175 32.3099 71.5799 0.673737C101.406 20.344 111.527 32.7313 144.58 37.1737L142.08 60.1737L112.08 114.674L102.58 128.674L81.0799 153.674C51.2629 178.087 34.7994 192.417 0.579895 205.674C7.94473 133.182 8.70713 103.1 0.579895 79.1737Z"
    },
  ]
};
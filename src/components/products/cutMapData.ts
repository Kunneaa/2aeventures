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
    { id: "eye_round_rect", highlights: ["round_svg"], labelEn: "EYE ROUND", labelVi: "Thăn đùi", top: "10.77%", left: "3.31%", width: "7.53%", height: "12.52%" },
    { id: "inside_round_rect", highlights: ["round_svg"], labelEn: "INSIDE ROUND", labelVi: "Thịt đùi trong", top: "10.77%", left: "12.36%", width: "7.53%", height: "12.52%" },
    { id: "round_svg", highlights: ["eye_round_rect", "inside_round_rect"], labelEn: "Round", labelVi: "MÔNG", top: "28.50%", left: "29.28%", width: "11.46%", height: "21.04%", viewBox: "0 0 168 230", path: "M109 205.5C100.097 219.664 70.8105 225.556 56.5 229L27.5 205.5L3 195L0.5 137.5C0.5 91.5 6.09994 51.0864 32 36.5C47.9505 27.7734 60.5501 18.1881 77.5 0.5C125.5 0.500035 120.5 0.499995 166.5 7.64661C152.5 59.5 150.285 63.2033 152.5 119.196C145.778 142.459 142.5 151.5 136.5 175.5C120.496 183.732 121.084 194.053 109 205.5Z" },
    
    { id: "top_sirloin_rect", highlights: ["sirloin_svg"], labelEn: "TOP SIRLOIN", labelVi: "Thăn mông", top: "10.77%", left: "22.58%", width: "6.84%", height: "12.52%" },
    { id: "tri_tip_sirloin_rect", highlights: ["sirloin_svg"], labelEn: "TRI-TIP SIRLOIN", labelVi: "Lõi thăn mông", top: "10.77%", left: "30.73%", width: "6.22%", height: "12.52%" },
    { id: "sirloin_svg", highlights: ["top_sirloin_rect", "tri_tip_sirloin_rect"], labelEn: "Sirloin", labelVi: "THĂN NGOẠI", top: "39.05%", left: "41.14%", width: "5.88%", height: "11.17%", viewBox: "0 0 82 126", path: "M5.55292 97.5357C5.52577 57.4061 7.02444 35.5495 19.0529 0.535675C42.3709 2.79212 55.9337 3.16166 80.5529 3.03568C78.8319 8.00365 77.9707 12.2791 76.5529 22.5357C75.701 53.6395 75.2694 75.2465 74.5529 118.536C43.0091 123.46 27.0482 124.666 0.552917 125.036C1.59262 114.567 2.81852 108.507 5.55292 97.5357Z" },
    
    { id: "short_loin_rect", highlights: ["short_loin_svg"], labelEn: "SHORT LOIN", labelVi: "Thăn lưng ngắn", top: "10.22%", left: "39.57%", width: "5.52%", height: "13.54%" },
    { id: "striploin_rect", highlights: ["short_loin_svg"], labelEn: "STRIPLOIN", labelVi: "Thăn ngoại", top: "10.77%", left: "46.41%", width: "5.94%", height: "12.98%" },
    { id: "sirloin_cubes_rect", highlights: ["short_loin_svg"], labelEn: "SIRLOIN CUBES", labelVi: "Thăn bò cắt lúc lắc", top: "10.77%", left: "53.52%", width: "5.32%", height: "12.52%" },
    { id: "tenderloin_rect", highlights: ["short_loin_svg"], labelEn: "TENDERLOIN", labelVi: "Thăn nội", top: "10.59%", left: "60.22%", width: "5.46%", height: "13.08%" },
    { id: "short_loin_svg", highlights: ["short_loin_rect", "striploin_rect", "sirloin_cubes_rect", "tenderloin_rect"], labelEn: "Loin", labelVi: "THĂN", top: "39.32%", left: "46.41%", width: "4.59%", height: "10.37%", viewBox: "0 0 64 117", path: "M0.513611 116.005C1.76698 62.6716 2.19104 30.1473 6.01361 1.00491L61.0136 0.504913L58.0136 42.0049C55.3235 67.3464 56.5968 81.4586 62.5136 106.505C39.3096 110.435 26.0243 112.578 0.513611 116.005Z" },
    
    { id: "back_rib_rect", highlights: ["rib_svg"], labelEn: "BACK RIB", labelVi: "Sườn bẹ bò", top: "10.13%", left: "68.30%", width: "6.42%", height: "13.54%" },
    { id: "rib_rect", highlights: ["rib_svg"], labelEn: "RIB", labelVi: "Sườn bò", top: "10.59%", left: "76.17%", width: "6.28%", height: "13.17%" },
    { id: "ribeye_rect", highlights: ["rib_svg"], labelEn: "RIBEYE", labelVi: "Đầu thăn ngoại", top: "10.77%", left: "83.77%", width: "5.73%", height: "12.98%" },
    { id: "short_rib_rect", highlights: ["rib_svg"], labelEn: "SHORT RIB", labelVi: "Sườn non bò", top: "10.77%", left: "90.88%", width: "6.22%", height: "12.89%" },
    { id: "rib_svg", highlights: ["back_rib_rect", "rib_rect", "ribeye_rect", "short_rib_rect"], labelEn: "Rib", labelVi: "SƯỜN", top: "37.94%", left: "50.37%", width: "6.96%", height: "10.90%", viewBox: "0 0 97 123", path: "M2.90525 55.7653C3.37043 39.836 4.0153 31.1787 5.90525 16.2653C38.9201 15.8381 58.922 11.2659 95.4052 0.76532C92.1985 8.645 90.7177 16.5554 88.4052 34.2653C87.457 65.8775 86.7926 83.2246 84.4052 110.765L7.90525 122.265C1.40781 97.6754 -2.17403 83.157 2.90525 55.7653Z" },
    
    { id: "petite_tender_rect", highlights: ["chuck_svg"], labelEn: "PETITE TENDER", labelVi: "Lõi vai nhỏ", top: "41.07%", left: "78.38%", width: "5.52%", height: "12.89%" },
    { id: "chuck_eye_rect", highlights: ["chuck_svg"], labelEn: "CHUCK EYE", labelVi: "Lõi vai bò", top: "41.07%", left: "85.22%", width: "5.66%", height: "12.89%" },
    { id: "shoulder_clod_rect", highlights: ["chuck_svg"], labelEn: "SHOULDER CLOD", labelVi: "Nạc vai bò", top: "41.07%", left: "92.13%", width: "5.66%", height: "12.89%" },
    { id: "chuck_svg", highlights: ["petite_tender_rect", "chuck_eye_rect", "shoulder_clod_rect"], labelEn: "Chuck-Shoulder", labelVi: "VAI", top: "37.83%", left: "56.46%", width: "10.33%", height: "14.10%", viewBox: "0 0 144 159", path: "M4.50885 37.8101C4.50511 23.1614 5.2379 15.1189 11.0089 1.8101C42.2259 -1.30443 56.5869 0.546187 73.5089 13.8101C90.3489 27.6575 101.428 32.9842 126.009 35.3101L123.509 61.8101C120.97 77.22 121.139 85.7477 123.509 100.81C125.744 119.159 130.322 127.4 143.009 139.31L124.509 158.31L68.0089 133.81C42.2047 122.561 27.6271 116.703 0.50885 110.81C1.08831 84.1848 1.34513 69.3872 4.50885 37.8101Z" },
    
    { id: "brisket_rect", highlights: ["brisket_svg"], labelEn: "BRISKET", labelVi: "Gầu (Ức) bò", top: "69.61%", left: "67.13%", width: "10.77%", height: "10.41%" },
    { id: "brisket_svg", highlights: ["brisket_rect"], labelEn: "Brisket", labelVi: "ỨC BÒ", top: "49.56%", left: "58.07%", width: "7.46%", height: "9.66%", viewBox: "0 0 104 109", path: "M86.774 50.7369C91.182 37.7199 94.0532 31.1718 102.774 26.2369C79.8478 17.969 67.285 12.5917 45.774 0.736877C43.729 7.56235 41.9757 10.465 37.274 13.2369C39.5067 25.0022 32.2344 35.4069 19.774 53.7369C16.4568 72.082 12.5016 82.9958 1.27399 106.737C13.0929 98.2954 21.5604 96.5776 40.774 100.237C45.3988 101.902 49.6898 100.52 59.774 94.7369C76.252 80.2277 82.6316 70.8051 86.774 50.7369Z" },
    
    { id: "fore_shank_rect", highlights: ["fore_shank_svg"], labelEn: "FORE SHANK", labelVi: "Bắp bò", top: "69.52%", left: "53.45%", width: "10.57%", height: "10.41%" },
    { id: "fore_shank_svg", highlights: ["fore_shank_rect"], labelEn: "Shank", labelVi: "BẮP BÒ", top: "47.70%", left: "54.70%", width: "6.67%", height: "11.35%", viewBox: "0 0 93 128", path: "M92.0006 22.0538C67.5272 11.2336 53.3553 5.69092 24.0006 0.553833L6.50065 32.0538C2.24896 57.0416 0.460888 70.3833 0.500649 90.5538C4.504 103.427 4.14509 110.984 3.51019 124.353L3.50065 124.554C23.4777 121.395 33.4746 121.539 48.0007 127.054C56.8638 108.416 61.5431 97.7021 66.0006 75.0538C79.0913 57.3171 86.027 47.4816 85.0006 33.5538C89.8554 31.7941 91.1956 29.0286 92.0006 22.0538Z" },
    
    { id: "short_plate_rect", highlights: ["short_plate_svg"], labelEn: "SHORT PLATE", labelVi: "Ba chỉ bò", top: "69.52%", left: "37.98%", width: "12.43%", height: "10.41%" },
    { id: "short_plate_svg", highlights: ["short_plate_rect"], labelEn: "Short Plate", labelVi: "SƯỜN NON", top: "47.78%", left: "46.45%", width: "9.97%", height: "10.73%", viewBox: "0 0 139 121", path: "M3.01239 109.135L0.51239 20.6355L138.012 0.635498C132.967 10.3093 129.94 15.6058 127.012 26.6355C120.893 37.5953 119.96 58.6899 117.012 88.6355C119.216 98.2037 119.081 103.689 117.012 113.635C88.9128 121.083 74.7741 122.28 53.5124 117.135C33.0357 118.063 21.7317 117.636 3.01239 109.135Z" },
    
    { id: "flank_steak_rect", highlights: ["flank_svg"], labelEn: "FLANK STEAK", labelVi: "Diềm thăn", top: "69.52%", left: "17.96%", width: "8.15%", height: "10.41%" },
    { id: "rough_flank_rect", highlights: ["flank_svg"], labelEn: "ROUGH FLANK", labelVi: "Nạm bò", top: "69.52%", left: "27.35%", width: "7.73%", height: "10.41%" },
    { id: "flank_svg", highlights: ["flank_steak_rect", "rough_flank_rect"], labelEn: "Flank", labelVi: "BỤNG", top: "49.56%", left: "41.09%", width: "5.60%", height: "7.89%", viewBox: "0 0 78 89", path: "M1.2514 26.0844C0.221305 17.889 0.278163 13.8921 1.2514 7.58441C28.6152 6.7264 44.5914 5.47116 75.2514 0.584412L76.7514 88.0844C63.2836 88.6909 55.9991 86.856 43.2514 81.5844C33.9295 77.7962 28.5485 76.3553 17.7514 79.0844L1.2514 26.0844Z" }
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
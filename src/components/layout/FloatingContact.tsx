"use client";

import Image from 'next/image';
import { Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={siteConfig.zalo.href}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0d1821]/80 backdrop-blur-md shadow-2xl transition-all hover:scale-110 hover:bg-[#071018] hover:border-[#c9a86a]/50"
        aria-label="Zalo OA"
      >
        <Image
          src="/images/brand/zalo.svg"
          alt="Zalo"
          width={24}
          height={24}
          className="w-6 h-6 grayscale hover:grayscale-0 transition-all duration-300"
        />
      </a>
      
      <a
        href={siteConfig.hotline.href}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#0d1821]/80 backdrop-blur-md text-[#c9a86a] shadow-2xl transition-all hover:scale-110 hover:bg-[#071018] hover:border-[#c9a86a]/50"
        aria-label="Hotline"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}

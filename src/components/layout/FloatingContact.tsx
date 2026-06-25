"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { AIChatbot } from '../chat/AIChatbot';

export function FloatingContact() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 group">
        
        {/* Hidden Buttons (Reveal on Hover) */}
        <div className={`flex flex-col gap-3 transition-all duration-300 ease-out ${
          isChatOpen 
            ? 'opacity-0 translate-y-4 pointer-events-none' 
            : 'opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
        }`}>
          <a
            href={siteConfig.zalo.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0d1821]/90 backdrop-blur-md shadow-2xl transition-all hover:scale-110 hover:bg-[#071018] hover:border-[#c9a86a]/50"
            aria-label="Zalo OA"
          >
            <Image
              src="/images/brand/zalo.svg"
              alt="Zalo"
              width={24}
              height={24}
              className="w-5 h-5 transition-all duration-300"
            />
          </a>
          
          <a
            href={siteConfig.hotline.href}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0d1821]/90 backdrop-blur-md text-[#c9a86a] shadow-2xl transition-all hover:scale-110 hover:bg-[#071018] hover:border-[#c9a86a]/50"
            aria-label="Hotline"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* Main Chat Button */}
        <div 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#c9a86a] text-[#071018] shadow-[0_0_20px_rgba(201,168,106,0.3)] transition-all hover:scale-105 relative"
        >
          <MessageCircle className={`w-7 h-7 transition-all duration-300 absolute ${isChatOpen ? 'rotate-90 scale-0 opacity-0' : 'group-hover:rotate-90 group-hover:scale-0 group-hover:opacity-0'}`} strokeWidth={1.5} />
          <X className={`w-7 h-7 transition-all duration-300 absolute ${isChatOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100'}`} strokeWidth={1.5} />
        </div>

      </div>
    </>
  );
}

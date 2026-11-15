"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, PawPrint } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-[#FFF2F7]/90 hover:bg-[#FFF2F7] text-[#1F1924] backdrop-blur-xl border border-white/80 shadow-[0_12px_35px_-8px_rgba(210,55,115,0.35)] cursor-pointer select-none transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#FF6F9C] text-white flex items-center justify-center shadow-sm group-hover:bg-[#E8457A] transition-colors">
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1924]" style={{ fontFamily: "var(--font-display)" }}>
            <span>Top</span>
            <PawPrint className="w-3 h-3 text-[#E8457A] fill-current" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

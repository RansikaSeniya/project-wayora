"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({
  items,
  className,
}: {
  items: AccordionItemData[];
  className?: string;
}) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-3xl border transition-all duration-300 overflow-hidden",
              isOpen
                ? "bg-[#FFF3F8] border-[#FF8FB1] shadow-[0_14px_35px_-12px_rgba(232,69,122,0.2)]"
                : "bg-[#FFEAF2]/80 border-[#F9C2D6] hover:border-[#FF9EBB]"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
            >
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-base sm:text-lg font-semibold text-[#1F1924]"
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isOpen
                    ? "bg-[#FF6F9C] text-white"
                    : "bg-[#FFF0F5] text-[#E8457A]"
                )}
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="px-6 pb-5 text-sm sm:text-[15px] text-[#665A6D] leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


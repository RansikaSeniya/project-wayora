"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
    >
      {/* Clean, minimal, professional compact navbar with scroll-aware styling */}
      <nav
        className={`pointer-events-auto mx-auto w-full max-w-[740px] flex items-center justify-between gap-4 px-5 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[#E8457A]/88 backdrop-blur-xl border border-white/40 shadow-xl shadow-[#b8225c]/25"
            : "bg-white/20 backdrop-blur-md border border-white/35 shadow-lg shadow-[#d43f73]/10"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[#FFF6C5] hover:opacity-90 transition"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-xl sm:text-[22px] font-bold tracking-wide drop-shadow-sm">
            WAYORA
          </span>
          <motion.span
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            className="inline-flex text-white"
          >
            <PawPrint className="w-4 h-4 fill-current" />
          </motion.span>
        </Link>

        {/* Page Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map((l) => {
            const isActive =
              l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#E8457A] shadow-sm font-semibold"
                    : "text-white hover:bg-white/25"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Clean CTA Pill */}
        <div className="flex items-center gap-2">
          <Link
            href="/#shop"
            style={{ fontFamily: "var(--font-display)" }}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-[#D9F27A] text-[#243000] text-xs sm:text-[13px] font-semibold hover:scale-105 active:scale-95 transition shadow-sm"
          >
            <PawPrint className="w-3.5 h-3.5 fill-[#243000]" />
            <span>Shop now</span>
          </Link>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 rounded-full bg-white text-[#E8457A] flex items-center justify-center cursor-pointer"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto md:hidden mx-auto max-w-[740px] mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-xl shadow-xl flex flex-col gap-1 border border-pink-100"
          >
            {navLinks.map((l) => {
              const isActive =
                l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 px-4 text-sm font-medium rounded-xl transition ${
                    isActive
                      ? "bg-[#FFF0F5] text-[#E8457A] font-semibold"
                      : "text-[#1F1924] hover:bg-pink-50"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

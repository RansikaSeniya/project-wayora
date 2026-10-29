"use client";

import { useState } from "react";
import Link from "next/link";
import { PawPrint, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Shop");

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-30 w-full px-4 sm:px-6 pt-4 sm:pt-6"
    >
      {/* Clean, minimal, professional compact navbar */}
      <nav className="mx-auto w-full max-w-[680px] flex items-center justify-between gap-4 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/35 shadow-lg shadow-[#d43f73]/10">
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

        {/* Minimal Center Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map((l) => {
            const isActive = active === l.label;
            return (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setActive(l.label)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#E8457A] shadow-sm"
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
            href="#shop"
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
            className="md:hidden w-8 h-8 rounded-full bg-white text-[#E8457A] flex items-center justify-center"
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
            className="md:hidden mx-auto max-w-[680px] mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-xl shadow-xl flex flex-col gap-1"
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => {
                  setActive(l.label);
                  setOpen(false);
                }}
                className="py-2 px-4 text-sm text-[#E8457A] font-medium rounded-xl hover:bg-pink-50"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

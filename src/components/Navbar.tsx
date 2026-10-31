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

export default function Navbar({ persistent = false }: { persistent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname || "/");

  useEffect(() => {
    if (pathname) {
      setActivePath(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render once in RootLayout so the navbar never unmounts/remounts on page change,
  // enabling uninterrupted spring sliding on button clicks.
  if (!persistent) {
    return null;
  }

  const isAuthActive =
    activePath === "/login" || activePath === "/register";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none"
    >
      {/* Clean, minimal, professional compact navbar with scroll-aware styling */}
      <nav
        className={`pointer-events-auto mx-auto w-full max-w-[780px] flex items-center justify-between gap-3 px-5 py-2.5 rounded-full transition-all duration-500 ease-out ${
          scrolled
            ? "bg-[#E8457A]/90 backdrop-blur-xl border border-white/45 shadow-xl shadow-[#b8225c]/25"
            : "bg-white/22 backdrop-blur-md border border-white/35 shadow-lg shadow-[#d43f73]/10"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setActivePath("/")}
          className="flex items-center gap-1.5 text-[#FFF6C5] hover:opacity-95 transition-transform duration-300 hover:scale-[1.03] active:scale-95"
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

        {/* Page Navigation Links with Smooth Sliding Active & Hover Pills */}
        <div
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navLinks.map((l) => {
            const isActive =
              l.href === "/"
                ? activePath === "/"
                : activePath?.startsWith(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setActivePath(l.href)}
                onMouseEnter={() => setHoveredHref(l.href)}
                className="relative px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors duration-300 select-none"
              >
                {/* Sliding Active White Pill */}
                {isActive && (
                  <motion.span
                    layoutId="wayora-nav-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                  />
                )}

                {/* Sliding Soft Hover Pill */}
                {!isActive && hoveredHref === l.href && (
                  <motion.span
                    layoutId="wayora-nav-hover-pill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full bg-white/25"
                  />
                )}

                <motion.span
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className={`relative z-10 inline-block transition-colors duration-200 ${
                    isActive
                      ? "text-[#E8457A] font-semibold"
                      : "text-white"
                  }`}
                >
                  {l.label}
                </motion.span>
              </Link>
            );
          })}
        </div>

        {/* Clean CTA Pill & Auth Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            onClick={() => setActivePath("/login")}
            className="hidden sm:inline-flex"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className={`relative inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-colors duration-300 border ${
                isAuthActive
                  ? "bg-white text-[#E8457A] border-white shadow-sm"
                  : "bg-white/20 text-white border-white/35 hover:bg-white/30"
              }`}
            >
              Log in
            </motion.span>
          </Link>

          <Link
            href="/#shop"
            onClick={() => setActivePath("/")}
            style={{ fontFamily: "var(--font-display)" }}
          >
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-[#D9F27A] text-[#243000] text-xs sm:text-[13px] font-semibold shadow-sm"
            >
              <PawPrint className="w-3.5 h-3.5 fill-[#243000]" />
              <span>Shop now</span>
            </motion.span>
          </Link>

          <motion.button
            type="button"
            aria-label="Menu"
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 rounded-full bg-white text-[#E8457A] flex items-center justify-center cursor-pointer shadow-sm"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="pointer-events-auto md:hidden mx-auto max-w-[780px] mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-xl shadow-xl flex flex-col gap-1 border border-pink-100"
          >
            {navLinks.map((l) => {
              const isActive =
                l.href === "/"
                  ? activePath === "/"
                  : activePath?.startsWith(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => {
                    setActivePath(l.href);
                    setOpen(false);
                  }}
                  className={`py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? "bg-[#FFF0F5] text-[#E8457A] font-semibold"
                      : "text-[#1F1924] hover:bg-pink-50"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="h-px bg-pink-100 my-1.5" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => {
                  setActivePath("/login");
                  setOpen(false);
                }}
                className="py-2.5 px-4 text-center text-sm font-semibold rounded-xl bg-[#FFF0F5] text-[#E8457A] hover:bg-pink-100 active:scale-95 transition"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => {
                  setActivePath("/register");
                  setOpen(false);
                }}
                className="py-2.5 px-4 text-center text-sm font-semibold rounded-xl bg-[#E8457A] text-white hover:bg-[#d4376b] active:scale-95 transition"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

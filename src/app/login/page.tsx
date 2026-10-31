"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PawPrint,
} from "lucide-react";

const display = { fontFamily: "var(--font-display)" } as const;

function CatLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5c-3.87 0-7 3.13-7 7 0 2.3 1.12 4.34 2.85 5.6.6.44 1.37.74 2.15.85.66.09 1.34.09 2 0 .78-.11 1.55-.41 2.15-.85 1.73-1.26 2.85-3.3 2.85-5.6 0-3.87-3.13-7-7-7z" />
      <path d="M6 7.5L4.5 3.5l4 1.5" />
      <path d="M18 7.5L19.5 3.5l-4 1.5" />
      <circle cx="9.5" cy="12" r="1.1" fill="currentColor" />
      <circle cx="14.5" cy="12" r="1.1" fill="currentColor" />
      <path d="M11 14.5a1.2 1.2 0 0 0 2 0" />
    </svg>
  );
}

function DogLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 5c-.5-1.5-2-2.5-3.5-2C3.5 3.5 2.5 8 2.5 10c0 1 .5 2 2 1.5s3.5-4 4.5-6.5z" />
      <path d="M15 5c.5-1.5 2-2.5 3.5-2 2 0.5 3 5 3 7 0 1-.5 2-2 1.5s-3.5-4-4.5-6.5z" />
      <path d="M6.5 10c0 4 2.5 7.5 5.5 7.5s5.5-3.5 5.5-7.5c0-3-2.5-5.5-5.5-5.5S6.5 7 6.5 10z" />
      <circle cx="9.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="14.5" cy="10" r="1.1" fill="currentColor" />
      <ellipse cx="12" cy="13" rx="1.5" ry="1" fill="currentColor" />
      <path d="M12 14v1.5m-1.5 0a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

const petShowcaseSlides = [
  {
    image: "/images/pet-hero.png",
    badge: "Happy Mealtime Club",
    title: "Welcome Back to Mochi’s Kitchen",
    subtitle: "Manage your fresh pouch deliveries & custom recipes",
    petType: "cat" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    badge: "Tail-Wagging Freshness",
    title: "Fresh Steamed Bowls for Dogs & Cats",
    subtitle: "Pause, swap flavors, or adjust portions anytime",
    petType: "dog" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    badge: "100% Human-Grade",
    title: "Loved by 45,000+ Picky Pets",
    subtitle: "Slow-cooked at 82°C and delivered chilled to your door",
    petType: "cat" as const,
  },
];

export default function LoginPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % petShowcaseSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col justify-between relative overflow-hidden text-[#2A1621]"
      style={{
        background:
          "radial-gradient(70% 80% at 50% 45%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
      }}
    >
      {/* Subtle Background Watermark */}
      <div
        style={display}
        className="absolute top-[16%] inset-x-0 text-center text-[18vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
      >
        WELCOME
      </div>

      <Navbar />

      <section className="relative z-20 flex-1 max-w-[1340px] w-full mx-auto px-5 sm:px-8 md:px-14 pt-28 pb-14 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Animated Cat & Dog Visual Showcase with Floating Pet Thumbnails */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 15 }}
              className="relative w-full max-w-[470px] rounded-[38px] bg-[#FFE8F1]/90 backdrop-blur-md p-4 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.42)] border border-white/75"
            >
              {/* Floating Mini Dog Bubble (Top Right) */}
              <motion.div
                animate={{ y: [0, -9, 0], rotate: [2, 5, 2] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.2,
                  ease: "easeInOut",
                }}
                className="hidden sm:flex items-center gap-2.5 absolute -top-6 -right-6 z-30 bg-[#FFF2F7] p-2 pr-3.5 rounded-3xl shadow-xl border-2 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=240&q=80"
                  alt="Cute dog"
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 text-[#E8457A]">
                    <DogLogo className="w-3.5 h-3.5" />
                    <span
                      style={display}
                      className="text-xs font-bold text-[#1F1924]"
                    >
                      Cooper’s Box
                    </span>
                  </div>
                  <span className="text-[10px] text-[#2BB673] font-semibold block">
                    Freshly Steamed
                  </span>
                </div>
              </motion.div>

              {/* Floating Mini Cat Bubble (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [-3, -1, -3] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.8,
                  delay: 0.4,
                  ease: "easeInOut",
                }}
                className="hidden sm:flex items-center gap-2.5 absolute -bottom-5 -left-6 z-30 bg-[#FFF2F7] p-2 pr-3.5 rounded-3xl shadow-xl border-2 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=240&q=80"
                  alt="Cute cat"
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 text-[#E8457A]">
                    <CatLogo className="w-3.5 h-3.5" />
                    <span
                      style={display}
                      className="text-xs font-bold text-[#1F1924]"
                    >
                      Luna’s Salmon
                    </span>
                  </div>
                  <span className="text-[10px] text-[#7D6E85] font-medium block">
                    Delivered Monthly
                  </span>
                </div>
              </motion.div>

              {/* Main Crossfading Cat & Dog Image Frame */}
              <div className="relative h-80 sm:h-[380px] w-full rounded-[30px] overflow-hidden bg-[#FFE4EE]">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                    transition={{ duration: 0.95, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={petShowcaseSlides[activeSlide].image}
                      alt={petShowcaseSlides[activeSlide].title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Frosted Badge (No Dot) */}
                    <div className="absolute top-4 left-4 z-20 inline-flex items-center px-4 py-1.5 rounded-full bg-[#1F1924]/75 backdrop-blur-md border border-white/35 text-white shadow-lg">
                      <span
                        style={display}
                        className="text-[11px] font-bold tracking-wider uppercase text-white/95"
                      >
                        {petShowcaseSlides[activeSlide].badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
                  {petShowcaseSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        activeSlide === idx
                          ? "w-7 bg-[#D9F27A]"
                          : "w-2 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Caption Footer with Cat/Dog Vector Logo */}
              <div className="pt-4 px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] text-[#E8457A] flex items-center justify-center shrink-0 border border-[#F9BDD3] shadow-sm">
                      {petShowcaseSlides[activeSlide].petType === "dog" ? (
                        <DogLogo className="w-5 h-5" />
                      ) : (
                        <CatLogo className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p
                        style={display}
                        className="text-lg sm:text-xl font-bold text-[#1F1924]"
                      >
                        {petShowcaseSlides[activeSlide].title}
                      </p>
                      <p className="text-xs text-[#7D6E85]">
                        {petShowcaseSlides[activeSlide].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right: Animated Frosted Rose Login Card */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 16,
                delay: 0.15,
              }}
              className="w-full max-w-[480px] rounded-[38px] bg-[#FFF2F7]/92 backdrop-blur-xl border border-white/80 p-7 sm:p-10 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.38)]"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-18 h-18 rounded-full bg-[#D9F27A] text-[#233000] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2
                    style={display}
                    className="text-3xl font-bold text-[#1F1924]"
                  >
                    Welcome Back!
                  </h2>
                  <p className="text-sm text-[#6E5664]">
                    You’re signed in to your Wayora Pet Kitchen account.
                  </p>
                  <div className="pt-2">
                    <Link href="/recipes">
                      <Button variant="pink" size="lg" style={display}>
                        <span>Go to Fresh Recipes</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A]">
                        Pet Parent Portal
                      </span>
                      <h1
                        style={display}
                        className="text-3xl sm:text-4xl font-bold text-[#1F1924] mt-0.5"
                      >
                        Sign In to Wayora
                      </h1>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#FFE0EC] p-2 rounded-2xl border border-[#F8BCD2] text-[#E8457A]">
                      <CatLogo className="w-5 h-5" />
                      <DogLogo className="w-5 h-5" />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#9E7B8E] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] focus:ring-2 focus:ring-[#FF6F9C]/25 transition"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          style={display}
                          className="text-xs font-bold uppercase tracking-wider text-[#5C4653]"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#E8457A] hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#9E7B8E] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] focus:ring-2 focus:ring-[#FF6F9C]/25 transition"
                        />
                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E7B8E] hover:text-[#1F1924] cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="lime"
                        size="lg"
                        style={display}
                        className="w-full text-base"
                      >
                        <span>Sign In to My Bowl</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>

                  {/* Switch to Register */}
                  <div className="mt-6 pt-5 border-t border-[#F6C8D9] text-center">
                    <p className="text-xs sm:text-sm text-[#6E5664]">
                      New to Wayora Fresh Kitchen?{" "}
                      <Link
                        href="/register"
                        style={display}
                        className="font-bold text-[#E8457A] hover:underline"
                      >
                        Create Pet Parent Account →
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-6 border-t border-white/25 bg-white/15 backdrop-blur-md px-5 sm:px-8 md:px-14 text-white">
        <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5" style={display}>
            <span className="text-lg font-bold text-[#FFF6C5]">WAYORA</span>
            <PawPrint className="w-4 h-4 fill-current" />
          </div>
          <p className="text-white/90">
            © 2026 Wayora Pet Nutrition. Freshly steamed with love.
          </p>
        </div>
      </footer>
    </main>
  );
}


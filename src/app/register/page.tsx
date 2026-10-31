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
  User,
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

const registerSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    badge: "20% Off First Box",
    title: "Personalized Feline Nutrition",
    subtitle: "Slow-steamed salmon, chicken & turkey mousses",
    petType: "cat" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    badge: "Vet Formulated",
    title: "Tailored Canine Fresh Meals",
    subtitle: "Pasture-raised beef, duck & organic garden greens",
    petType: "dog" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=85",
    badge: "All Life Stages",
    title: "Kitten & Puppy Growth Formulas",
    subtitle: "Enriched with raw goat milk & marine DHA",
    petType: "cat" as const,
  },
];

export default function RegisterPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [petName, setPetName] = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % registerSlides.length);
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
        className="absolute top-[16%] inset-x-0 text-center text-[17vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
      >
        JOIN WAYORA
      </div>

      <Navbar />

      <section className="relative z-20 flex-1 max-w-[1340px] w-full mx-auto px-5 sm:px-8 md:px-14 pt-28 pb-14 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Registration Card with Pet Selector */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 115, damping: 16 }}
              className="w-full max-w-[500px] rounded-[38px] bg-[#FFF2F7]/92 backdrop-blur-xl border border-white/80 p-7 sm:p-10 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.38)]"
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
                    Welcome, {parentName || "Pet Parent"} &{" "}
                    {petName || "Friend"}!
                  </h2>
                  <p className="text-sm text-[#6E5664]">
                    Your 20% first-box discount has been unlocked for{" "}
                    {petName ? `${petName}’s` : "your pet’s"} custom bowl.
                  </p>
                  <div className="pt-2">
                    <Link href="/recipes">
                      <Button variant="pink" size="lg" style={display}>
                        <span>Choose First Recipes</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="mb-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A]">
                      20% Off First Tasting Box
                    </span>
                    <h1
                      style={display}
                      className="text-3xl sm:text-4xl font-bold text-[#1F1924] mt-0.5"
                    >
                      Create Pet Account
                    </h1>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Choose Cat or Dog */}
                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                      >
                        Who Are We Cooking For?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setPetType("cat");
                            setActiveSlide(0);
                          }}
                          style={display}
                          className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                            petType === "cat"
                              ? "bg-[#FF6F9C] text-white border-[#FF6F9C] shadow-md"
                              : "bg-white/85 text-[#1F1924] border-[#F6BFD3]"
                          }`}
                        >
                          <CatLogo className="w-5 h-5" />
                          <span>My Cat</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPetType("dog");
                            setActiveSlide(1);
                          }}
                          style={display}
                          className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                            petType === "dog"
                              ? "bg-[#FF6F9C] text-white border-[#FF6F9C] shadow-md"
                              : "bg-white/85 text-[#1F1924] border-[#F6BFD3]"
                          }`}
                        >
                          <DogLogo className="w-5 h-5" />
                          <span>My Dog</span>
                        </button>
                      </div>
                    </div>

                    {/* Pet Name & Parent Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          style={display}
                          className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                        >
                          Pet’s Name
                        </label>
                        <div className="relative">
                          <PawPrint className="w-4 h-4 text-[#9E7B8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            placeholder="e.g. Mochi"
                            className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          style={display}
                          className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                        >
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#9E7B8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            placeholder="Your name"
                            className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
                          />
                        </div>
                      </div>
                    </div>

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
                          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                      >
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#9E7B8E] absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
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
                        <span>
                          Create{" "}
                          {petName ? `${petName}’s Bowl` : "Pet Account"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>

                  {/* Switch to Login */}
                  <div className="mt-5 pt-4 border-t border-[#F6C8D9] text-center">
                    <p className="text-xs sm:text-sm text-[#6E5664]">
                      Already have a Wayora account?{" "}
                      <Link
                        href="/login"
                        style={display}
                        className="font-bold text-[#E8457A] hover:underline"
                      >
                        Sign In →
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right: Animated Cat & Dog Showcase with Live Pet Name Badge */}
          <div className="lg:col-span-6 relative flex flex-col items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 15,
                delay: 0.1,
              }}
              className="relative w-full max-w-[470px] rounded-[38px] bg-[#FFE8F1]/90 backdrop-blur-md p-4 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.42)] border border-white/75"
            >
              {/* Floating Live Pet Name Tag (Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="hidden sm:flex items-center gap-2.5 absolute -top-5 -right-5 z-30 bg-[#FFF2F7] px-4 py-2.5 rounded-3xl shadow-xl border-2 border-white"
              >
                <div className="w-9 h-9 rounded-2xl bg-[#D9F27A] text-[#233000] flex items-center justify-center">
                  {petType === "dog" ? (
                    <DogLogo className="w-5 h-5" />
                  ) : (
                    <CatLogo className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span
                    style={display}
                    className="text-xs font-bold text-[#1F1924] block"
                  >
                    {petName ? `${petName}’s Fresh Box` : "Custom Tasting Box"}
                  </span>
                  <span className="text-[10px] text-[#E8457A] font-semibold">
                    20% Welcome Gift Active
                  </span>
                </div>
              </motion.div>

              {/* Crossfading Cat & Dog Image Frame */}
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
                      src={registerSlides[activeSlide].image}
                      alt={registerSlides[activeSlide].title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Frosted Badge (No Dot) */}
                    <div className="absolute top-4 left-4 z-20 inline-flex items-center px-4 py-1.5 rounded-full bg-[#1F1924]/75 backdrop-blur-md border border-white/35 text-white shadow-lg">
                      <span
                        style={display}
                        className="text-[11px] font-bold tracking-wider uppercase text-white/95"
                      >
                        {registerSlides[activeSlide].badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
                  {registerSlides.map((_, idx) => (
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
                      {registerSlides[activeSlide].petType === "dog" ? (
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
                        {registerSlides[activeSlide].title}
                      </p>
                      <p className="text-xs text-[#7D6E85]">
                        {registerSlides[activeSlide].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
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


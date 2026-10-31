"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useBowl } from "@/components/BowlContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Minus,
  PawPrint,
  Plus,
  Scale,
  Star,
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

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    badge: "Signature Feline Recipe",
    title: "Wild Salmon & Pumpkin Bisque",
    subtitle: "42% Protein • Rich Omega-3 Broth",
    petType: "cat" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=85",
    badge: "Canine Favorite",
    title: "Grass-Fed Beef & Sweet Potato",
    subtitle: "38% Protein • Prebiotic Garden Greens",
    petType: "dog" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=85",
    badge: "Growth Formula",
    title: "Tender Turkey & Goat Milk Mousse",
    subtitle: "44% Protein • Whipped Velvety Texture",
    petType: "cat" as const,
  },
];

const allRecipes = [
  {
    id: 1,
    name: "Wild Salmon & Pumpkin Bisque",
    category: "Cats",
    petType: "cat" as const,
    badge: "Best Seller",
    protein: "42% Protein",
    moisture: "78% Moisture",
    calories: "380 kcal / cup",
    price: "$24.00",
    rating: "4.9",
    reviews: 218,
    superfoods: ["Pacific Salmon", "Organic Pumpkin", "Flaxseed"],
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    description:
      "Wild-caught Pacific salmon fillets gently steamed in fish bone broth with sweet pumpkin for hairball control and a glossy coat.",
  },
  {
    id: 2,
    name: "Free-Range Chicken & Cranberry",
    category: "Cats",
    petType: "cat" as const,
    badge: "Urinary Care",
    protein: "45% Protein",
    moisture: "80% Moisture",
    calories: "410 kcal / cup",
    price: "$22.00",
    rating: "5.0",
    reviews: 184,
    superfoods: ["Chicken Breast", "Whole Cranberries", "Taurine"],
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85",
    description:
      "Shredded cage-free chicken breast paired with tart organic cranberries to support urinary tract pH and lean muscle tone.",
  },
  {
    id: 3,
    name: "Grass-Fed Beef & Sweet Potato",
    category: "Dogs",
    petType: "dog" as const,
    badge: "High Energy",
    protein: "38% Protein",
    moisture: "75% Moisture",
    calories: "450 kcal / cup",
    price: "$28.00",
    rating: "4.9",
    reviews: 312,
    superfoods: ["Pasture Beef", "Sweet Potato", "Blueberries"],
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=85",
    description:
      "Hearty pasture-raised beef slow-cooked with beta-carotene sweet potatoes, garden carrots, and cold-pressed salmon oil.",
  },
  {
    id: 4,
    name: "Tender Turkey & Goat Milk Mousse",
    category: "Kittens & Puppies",
    petType: "cat" as const,
    badge: "Gentle Growth",
    protein: "44% Protein",
    moisture: "82% Moisture",
    calories: "395 kcal / cup",
    price: "$25.00",
    rating: "5.0",
    reviews: 146,
    superfoods: ["Farm Turkey", "Raw Goat Milk", "DHA Algae"],
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=85",
    description:
      "Silky whipped mousse enriched with probiotic goat milk and marine DHA for brain development and tiny sensitive tummies.",
  },
  {
    id: 5,
    name: "Ocean Cod & Green Lipped Mussel",
    category: "Cats",
    petType: "cat" as const,
    badge: "Joint & Coat",
    protein: "43% Protein",
    moisture: "79% Moisture",
    calories: "365 kcal / cup",
    price: "$26.00",
    rating: "4.9",
    reviews: 129,
    superfoods: ["Alaskan Cod", "NZ Green Mussel", "Kelp"],
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=85",
    description:
      "Flaky white ocean cod combined with New Zealand green-lipped mussels for natural glucosamine, joint mobility, and skin hydration.",
  },
  {
    id: 6,
    name: "Roast Duck & Butternut Squash",
    category: "Dogs",
    petType: "dog" as const,
    badge: "Hypoallergenic",
    protein: "40% Protein",
    moisture: "76% Moisture",
    calories: "430 kcal / cup",
    price: "$29.00",
    rating: "5.0",
    reviews: 195,
    superfoods: ["Novel Duck Protein", "Butternut Squash", "Turmeric"],
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    description:
      "Single-source novel duck protein ideal for dogs with chicken or beef sensitivities, blended with soothing squash and golden turmeric.",
  },
];

const ingredientSpotlight = [
  {
    name: "Wild Pacific Salmon",
    role: "Primary Omega-3 & Lean Protein",
    digestibility: "98.4%",
    origin: "Sustainably Caught • North Pacific",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    description:
      "Rich in bioavailable EPA and DHA fatty acids that nourish skin barriers, eliminate flaky dander, and give cats and dogs a plush, mirror-shine coat.",
    nutrients: [
      { label: "Crude Protein", value: "42%" },
      { label: "Omega-3 Fatty Acids", value: "3.8%" },
      { label: "Natural Taurine", value: "0.28%" },
    ],
  },
  {
    name: "Pasture-Raised Poultry",
    role: "Essential Amino Acids & Muscle Tone",
    digestibility: "97.8%",
    origin: "Cage-Free Family Farms",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85",
    description:
      "Whole breast and thigh cuts steamed gently at 82°C so natural meaty juices remain intact—never rendered into dry, oxidized meat meal.",
    nutrients: [
      { label: "Crude Protein", value: "45%" },
      { label: "Natural Moisture", value: "80%" },
      { label: "L-Carnitine", value: "High" },
    ],
  },
  {
    name: "Organic Pumpkin & Goat Milk",
    role: "Prebiotic Gut & Immune Support",
    digestibility: "99.1%",
    origin: "Certified Organic Harvest",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=85",
    description:
      "Soluble pumpkin fiber and creamy goat milk probiotics nurture healthy gut flora, firm up digestion, and make every bowl irresistible to picky eaters.",
    nutrients: [
      { label: "Prebiotic Fiber", value: "4.2%" },
      { label: "Calcium & Phosphorus", value: "1.2 : 1" },
      { label: "Live Probiotics", value: "Active" },
    ],
  },
];

export default function RecipesPage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeIngredient, setActiveIngredient] = useState(0);
  const { addToBowl, updateQuantity, getItemQuantity, openBowl } = useBowl();

  /* Portion Calculator State */
  const [calcPetType, setCalcPetType] = useState<"cat" | "dog">("cat");
  const [petWeight, setPetWeight] = useState(4);
  const [activityLevel, setActivityLevel] = useState<
    "chill" | "playful" | "active"
  >("playful");

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const categories = ["All", "Cats", "Dogs", "Kittens & Puppies"];
  const filteredRecipes =
    selectedCategory === "All"
      ? allRecipes
      : allRecipes.filter((r) => r.category === selectedCategory);

  /* Calculate daily pouches & calories */
  const baseCaloriesPerKg = calcPetType === "cat" ? 55 : 48;
  const activityMultiplier =
    activityLevel === "chill" ? 0.9 : activityLevel === "playful" ? 1.05 : 1.25;
  const dailyCalories = Math.round(
    petWeight * baseCaloriesPerKg * activityMultiplier
  );
  const dailyPouches = Math.max(
    1,
    Math.round((dailyCalories / 135) * 2) / 2
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* 1. Immersive Pink/Coral Recipes Hero */}
      <section
        className="relative w-full min-h-[88vh] flex flex-col justify-between overflow-hidden pt-20"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        {/* Subtle Background Watermark Text */}
        <div
          style={display}
          className="absolute top-[18%] inset-x-0 text-center text-[18vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          RECIPES
        </div>

        <Navbar />

        <div className="relative z-20 max-w-[1380px] mx-auto w-full px-6 sm:px-10 md:px-14 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold shadow-sm"
              style={display}
            >
              <span>100% Human-Grade • Gently Steamed at 82°C</span>
            </motion.div>

            <h1
              style={display}
              className="text-white font-bold leading-[0.93] tracking-tight text-5xl sm:text-6xl xl:text-[66px] drop-shadow-[0_6px_0_rgba(190,40,100,0.22)]"
            >
              {["FRESH MENUS", "CRAFTED FOR", "EVERY BOWL."].map((line, idx) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    initial={{ y: "110%", rotate: 3 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                      delay: 0.15 + idx * 0.14,
                    }}
                    className="inline-block"
                  >
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.8,
                        delay: idx * 0.3,
                        ease: "easeInOut",
                      }}
                      className="inline-block"
                    >
                      {line}
                    </motion.span>
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="text-white/95 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Explore our complete kitchen menu of slow-steamed bisques,
              shredded fillets, and velvety mousses. Formulated by board-certified
              veterinary nutritionists with zero grains or fillers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#menu"
                style={display}
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#D9F27A] text-[#2d3a00] text-base sm:text-lg font-semibold shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition"
              >
                Browse Full Menu
                <span className="w-10 h-10 rounded-full bg-[#2d3a00] text-[#D9F27A] flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>

              <a
                href="#calculator"
                style={display}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-sm sm:text-base font-semibold hover:bg-white hover:text-[#E8457A] transition"
              >
                <span>Portion Calculator</span>
              </a>
            </motion.div>
          </div>

          {/* Right Auto-Shading / Crossfading 3-Recipe Spotlight Card */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 15,
                delay: 0.25,
              }}
              className="relative w-full max-w-[420px] rounded-[36px] bg-[#FFE8F1]/90 backdrop-blur-md p-4 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.45)] border border-white/70"
            >
              <div className="relative h-80 sm:h-96 w-full rounded-[28px] overflow-hidden bg-[#FFE4EE]">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={heroSlide}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                    transition={{ duration: 0.95, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={heroSlides[heroSlide].image}
                      alt={heroSlides[heroSlide].title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 z-20 inline-flex items-center px-4 py-1.5 rounded-full bg-[#1F1924]/75 backdrop-blur-md border border-white/35 text-white shadow-lg">
                      <span
                        style={display}
                        className="text-[11px] font-bold tracking-wider uppercase text-white/95"
                      >
                        {heroSlides[heroSlide].badge}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicator Dots */}
                <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Slide ${idx + 1}`}
                      onClick={() => setHeroSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        heroSlide === idx
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
                    key={heroSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] text-[#E8457A] flex items-center justify-center shrink-0 border border-[#F9BDD3] shadow-sm">
                      {heroSlides[heroSlide].petType === "dog" ? (
                        <DogLogo className="w-5 h-5" />
                      ) : (
                        <CatLogo className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p style={display} className="text-xl font-bold text-[#1F1924]">
                        {heroSlides[heroSlide].title}
                      </p>
                      <p className="text-xs text-[#7D6E85]">
                        {heroSlides[heroSlide].subtitle}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Infinite Marquee Strip */}
        <div className="relative z-20 bg-white/15 backdrop-blur-md border-t border-white/30 py-3.5 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm tracking-[0.18em] font-semibold text-white uppercase">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-12 pr-12"
              >
                <span>GENTLY STEAMED AT 82°C</span>
                <span>100% WHOLE MUSCLE MEAT & ORGANS</span>
                <span>ZERO GRAINS, GLUTEN, OR FILLERS</span>
                <span>EXCEEDS AAFCO ALL LIFE STAGES</span>
                <span>78% HYDRATING NATURAL BROTH</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Full Recipe Catalog (#menu) */}
      <section
        id="menu"
        className="py-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="pink" className="mb-3">
              Complete Kitchen Menu
            </Badge>
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F1924] leading-[1.05]"
            >
              Choose Their{" "}
              <span className="text-[#E8457A]">Daily Favorite</span>
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 bg-[#FFE8F1] p-1.5 rounded-full border border-[#F8BCD2] w-fit"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={display}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat
                    ? "bg-[#FF6F9C] text-white shadow-md shadow-[#FF6F9C]/25"
                    : "text-[#6E5664] hover:text-[#1F1924]"
                }`}
              >
                {cat === "Cats" && <CatLogo className="w-4 h-4" />}
                {cat === "Dogs" && <DogLogo className="w-4 h-4" />}
                <span>{cat === "All" ? "All Recipes" : cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.86, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{
                  type: "spring",
                  stiffness: 115,
                  damping: 15,
                  delay: idx * 0.07,
                }}
              >
                <Card className="group h-full flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-[0_28px_60px_-15px_rgba(232,69,122,0.22)]">
                  <div>
                    {/* Image Header */}
                    <div className="relative h-60 w-full overflow-hidden bg-[#FFE4EE]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Top Left Frosted Badge (No Dot) */}
                      <div className="absolute top-3.5 left-3.5 inline-flex items-center px-3.5 py-1 rounded-full bg-[#1F1924]/75 backdrop-blur-md border border-white/35 text-white">
                        <span
                          style={display}
                          className="text-[11px] font-bold tracking-wider uppercase"
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Top Right Pet Icon Emblem */}
                      <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#E8457A] flex items-center justify-center shadow-sm">
                        {item.petType === "dog" ? (
                          <DogLogo className="w-4 h-4" />
                        ) : (
                          <CatLogo className="w-4 h-4" />
                        )}
                      </div>

                      {/* Bottom Nutrition Pills */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px] font-semibold">
                        <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md">
                          {item.protein} • {item.moisture}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#1F1924] flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#FFB400] text-[#FFB400]" />
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#E8457A]">
                        For {item.category} • {item.calories}
                      </div>
                      <CardTitle className="group-hover:text-[#E8457A] transition-colors">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="pt-1">
                        {item.description}
                      </CardDescription>

                      {/* Key Superfoods Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {item.superfoods.map((sf) => (
                          <span
                            key={sf}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFE2EE] text-[#B8285B]"
                          >
                            {sf}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                  </div>

                  <CardFooter className="pt-4 border-t border-[#F7C8DA]">
                    <div>
                      <span className="text-[11px] text-[#7E6B78] block">
                        Box of 7 Fresh Pouches
                      </span>
                      <span
                        style={display}
                        className="text-2xl font-bold text-[#1F1924]"
                      >
                        {item.price}
                      </span>
                    </div>
                    {getItemQuantity(item.id) > 0 ? (
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#1F1924] text-white px-2.5 py-1.5 shadow-md">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white/15 hover:bg-[#FF6F9C] flex items-center justify-center transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={openBowl}
                          style={display}
                          className="text-xs font-bold px-1.5 text-[#D9F27A] cursor-pointer"
                        >
                          {getItemQuantity(item.id)} in Bowl
                        </button>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-white/15 hover:bg-[#FF6F9C] flex items-center justify-center transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        variant="lime"
                        size="sm"
                        style={display}
                        onClick={() =>
                          addToBowl({
                            id: item.id,
                            name: item.name,
                            price: parseFloat(item.price.replace("$", "")),
                            priceFormatted: item.price,
                            image: item.image,
                            category: item.category,
                          })
                        }
                      >
                        <span>Add to Bowl</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Interactive "What's Inside the Bowl" Ingredient Explorer */}
      <section className="py-24 bg-gradient-to-b from-[#FFC4DA] via-[#FFD4E4] to-[#FFC9DE] border-y border-[#F7A8C4]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Badge variant="lime" className="mb-3">
              <Leaf className="w-3.5 h-3.5" />
              <span>100% Whole Food Transparency</span>
            </Badge>
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
            >
              Inside Every Wayora Pouch
            </h2>
            <p className="text-sm sm:text-base text-[#665260]">
              Click any core ingredient below to inspect its farm origin,
              digestibility score, and clinical nutrient profile.
            </p>
          </motion.div>

          {/* Ingredient Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {ingredientSpotlight.map((ing, idx) => (
              <button
                key={ing.name}
                type="button"
                onClick={() => setActiveIngredient(idx)}
                style={display}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer border ${
                  activeIngredient === idx
                    ? "bg-[#1F1924] text-[#D9F27A] border-[#1F1924] shadow-lg scale-105"
                    : "bg-[#FFF2F7] text-[#1F1924] border-[#F8BCD2] hover:bg-white"
                }`}
              >
                {ing.name}
              </button>
            ))}
          </div>

          {/* Active Ingredient Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIngredient}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 115, damping: 16 }}
              className="rounded-[36px] bg-[#FFF2F7] border border-[#FBBDD4] p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-[28px] overflow-hidden">
                <img
                  src={ingredientSpotlight[activeIngredient].image}
                  alt={ingredientSpotlight[activeIngredient].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                    {ingredientSpotlight[activeIngredient].origin}
                  </span>
                  <span
                    style={display}
                    className="px-3.5 py-1 rounded-full bg-[#D9F27A] text-[#243000] text-xs font-bold"
                  >
                    {ingredientSpotlight[activeIngredient].digestibility} Digestible
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <Badge variant="pink">
                  {ingredientSpotlight[activeIngredient].role}
                </Badge>
                <h3
                  style={display}
                  className="text-3xl sm:text-4xl font-bold text-[#1F1924]"
                >
                  {ingredientSpotlight[activeIngredient].name}
                </h3>
                <p className="text-[#5C4956] text-sm sm:text-base leading-relaxed">
                  {ingredientSpotlight[activeIngredient].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {ingredientSpotlight[activeIngredient].nutrients.map((n) => (
                    <div
                      key={n.label}
                      className="rounded-2xl bg-[#FFE2EE] border border-[#F8BCD2] p-4"
                    >
                      <div
                        style={display}
                        className="text-2xl font-bold text-[#E8457A]"
                      >
                        {n.value}
                      </div>
                      <div className="text-xs font-semibold text-[#5C4956] mt-0.5">
                        {n.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Interactive Daily Feeding Portion Calculator (#calculator) */}
      <section
        id="calculator"
        className="py-24 px-5 sm:px-8 md:px-14 max-w-[1160px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge variant="pink" className="mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Custom Meal Planner</span>
          </Badge>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
          >
            How Much Should You Feed?
          </h2>
          <p className="text-sm sm:text-base text-[#6E5C6B]">
            Select your pet’s species, weight, and daily playfulness to get an
            instant vet-calculated portion guide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
          className="rounded-[36px] bg-[#FFF2F7] border border-[#FBBDD4] p-7 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Pet Type */}
            <div>
              <label
                style={display}
                className="block text-sm font-bold text-[#1F1924] mb-2.5"
              >
                1. Select Your Pet
              </label>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setCalcPetType("cat");
                    setPetWeight(4);
                  }}
                  style={display}
                  className={`flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl border-2 font-bold text-base transition-all cursor-pointer ${
                    calcPetType === "cat"
                      ? "bg-[#FF6F9C] text-white border-[#FF6F9C] shadow-md"
                      : "bg-[#FFE6F0] text-[#1F1924] border-[#F8BCD2]"
                  }`}
                >
                  <CatLogo className="w-5 h-5" />
                  <span>Cat</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalcPetType("dog");
                    setPetWeight(10);
                  }}
                  style={display}
                  className={`flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl border-2 font-bold text-base transition-all cursor-pointer ${
                    calcPetType === "dog"
                      ? "bg-[#FF6F9C] text-white border-[#FF6F9C] shadow-md"
                      : "bg-[#FFE6F0] text-[#1F1924] border-[#F8BCD2]"
                  }`}
                >
                  <DogLogo className="w-5 h-5" />
                  <span>Dog</span>
                </button>
              </div>
            </div>

            {/* Step 2: Weight Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  style={display}
                  className="text-sm font-bold text-[#1F1924]"
                >
                  2. Pet’s Weight
                </label>
                <span
                  style={display}
                  className="px-3.5 py-1 rounded-full bg-[#FFE0EC] text-[#E8457A] text-sm font-bold"
                >
                  {petWeight} kg
                </span>
              </div>
              <input
                type="range"
                min={calcPetType === "cat" ? 2 : 3}
                max={calcPetType === "cat" ? 10 : 30}
                step={1}
                value={petWeight}
                onChange={(e) => setPetWeight(Number(e.target.value))}
                className="w-full accent-[#E8457A] h-2 bg-[#F8BCD2] rounded-lg cursor-pointer"
              />
            </div>

            {/* Step 3: Activity Level */}
            <div>
              <label
                style={display}
                className="block text-sm font-bold text-[#1F1924] mb-2.5"
              >
                3. Daily Activity Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "chill", label: "Indoor Chill" },
                  { id: "playful", label: "Playful Daily" },
                  { id: "active", label: "Super Active" },
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() =>
                      setActivityLevel(
                        act.id as "chill" | "playful" | "active"
                      )
                    }
                    style={display}
                    className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                      activityLevel === act.id
                        ? "bg-[#1F1924] text-[#D9F27A] border-[#1F1924]"
                        : "bg-[#FFE6F0] text-[#1F1924] border-[#F8BCD2]"
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Instant Result Card */}
          <div
            className="lg:col-span-5 rounded-[30px] p-7 text-white shadow-xl flex flex-col justify-between space-y-6"
            style={{
              background:
                "radial-gradient(85% 100% at 30% 20%, #FF8FB1 0%, #E8457A 100%)",
            }}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFF6C5]">
                Recommended Daily Portion
              </span>
              <div
                style={display}
                className="text-5xl sm:text-6xl font-bold mt-2 text-white"
              >
                {dailyPouches} <span className="text-2xl">Pouches / day</span>
              </div>
              <p className="text-sm text-white/90 mt-1">
                Approx. <strong>{dailyCalories} kcal</strong> per day (split
                into Morning & Evening bowls)
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/25 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9F27A]" />
                <span>Includes 100% daily taurine & vitamins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9F27A]" />
                <span>No extra supplements required</span>
              </div>
            </div>

            <Button
              variant="lime"
              size="lg"
              style={display}
              className="w-full"
              onClick={() => {
                const defaultRecipe =
                  calcPetType === "cat" ? allRecipes[0] : allRecipes[2];
                addToBowl({
                  id: defaultRecipe.id,
                  name: defaultRecipe.name,
                  price: parseFloat(defaultRecipe.price.replace("$", "")),
                  priceFormatted: defaultRecipe.price,
                  image: defaultRecipe.image,
                  category: defaultRecipe.category,
                });
                openBowl();
              }}
            >
              <span>Start Custom Box ({dailyPouches} Pouches/Day)</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 5. Footer */}
      <footer className="py-12 border-t border-[#F7B0C9] bg-[#FFC8DC] px-5 sm:px-8 md:px-14">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#E8457A]"
            style={display}
          >
            <span className="text-2xl font-bold tracking-wide">WAYORA</span>
            <PawPrint className="w-5 h-5 fill-current" />
          </Link>
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#6E6275] font-medium">
            <Link href="/" className="hover:text-[#E8457A] transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#E8457A] transition">
              Our Story
            </Link>
            <Link href="/recipes" className="text-[#E8457A] font-semibold">
              Recipes
            </Link>
            <Link href="/contact" className="hover:text-[#E8457A] transition">
              Contact
            </Link>
          </div>
          <p className="text-xs text-[#96889E]">
            © 2026 Wayora Pet Nutrition. Made with love for happy pets.
          </p>
        </div>
      </footer>
    </main>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flame,
  Leaf,
  Microscope,
  PawPrint,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

const display = { fontFamily: "var(--font-display)" } as const;

/* Smooth CountUp when scrolled into view */
function CountUp({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2.1,
      ease: "easeOut",
      onUpdate: (v) =>
        (node.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

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

const stats = [
  {
    value: 45,
    suffix: "k+",
    label: "Happy Pets Fed Daily",
    note: "Cats, dogs & growing kittens",
    accent: "from-[#FF6F9C] to-[#E8457A]",
  },
  {
    value: 100,
    suffix: "%",
    label: "Human-Grade Whole Cuts",
    note: "Zero meat meal or by-products",
    accent: "from-[#2BB673] to-[#1D945B]",
  },
  {
    value: 82,
    suffix: "°C",
    label: "Gentle Steam Cooking",
    note: "Locks in natural aroma & taurine",
    accent: "from-[#FF9F43] to-[#EE7B11]",
  },
  {
    value: 99,
    suffix: "%",
    label: "Clean-Bowl Excitement",
    note: "Tested by picky Persian cats",
    accent: "from-[#9B6BFF] to-[#7742E6]",
  },
];

const milestones = [
  {
    year: "2021",
    tag: "Where It Started",
    title: "One Picky Rescue Cat Named Mochi",
    description:
      "When Mochi refused ultra-processed dry pellets after a digestive flare-up, we teamed up with a holistic vet to steam our first wild salmon & sweet pumpkin recipe in a home kitchen.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80",
  },
  {
    year: "2023",
    tag: "Human-Grade Facility",
    title: "Our Dedicated Fresh Pet Kitchen",
    description:
      "We opened our own culinary kitchen where every batch is prepared using the exact same hygiene, cold-chain, and ingredient standards as human baby food.",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=80",
  },
  {
    year: "2025",
    tag: "Community Milestone",
    title: "1 Million+ Fresh Bowls Served",
    description:
      "From picky kittens to energetic Golden Retrievers, over 45,000 pet parents switched to Wayora for softer coats, healthier digestion, and happier mealtimes.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80",
  },
  {
    year: "2026",
    tag: "Future of Pet Care",
    title: "Personalized Superfood Nutrition",
    description:
      "Launching functional goat-milk mousses, sustainable wild-caught fish recipes, and 100% recyclable freshness pouches.",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=700&q=80",
  },
];

const kitchenSteps = [
  {
    step: "01",
    icon: Leaf,
    title: "Farm & Ocean Direct Sourcing",
    subtitle: "Whole Muscle Meat & Organic Produce",
    description:
      "We partner directly with sustainable fisheries and cage-free farms. Only whole salmon fillets, tender chicken breast, and organic pumpkin enter our kitchen.",
    highlights: ["Wild-Caught Pacific Salmon", "Pasture-Raised Poultry", "Zero Artificial Preservatives"],
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=85",
    badge: "100% Traceable Farms",
  },
  {
    step: "02",
    icon: Flame,
    title: "Slow-Steamed in Small Batches",
    subtitle: "Gently Cooked at Exactly 82°C",
    description:
      "Unlike factory kibble blasted at 180°C, our gentle 82°C steam method preserves natural meaty juices, delicate omega-3 oils, and essential amino acids.",
    highlights: ["78% Natural Moisture Retained", "Rich Meaty Broth Texture", "2x Higher Nutrient Absorption"],
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1000&q=85",
    badge: "82°C Gentle Steam",
  },
  {
    step: "03",
    icon: Microscope,
    title: "Vet-Tested & Freshness Sealed",
    subtitle: "Exceeds AAFCO All-Life-Stage Standards",
    description:
      "Every single batch undergoes microbiological safety checks and nutrient profile verification by board-certified veterinary nutritionists before sealing.",
    highlights: ["Lab-Tested Every Batch", "Pantry-Safe Steam Seal", "Balanced Taurine & Vitamins"],
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=85",
    badge: "Vet Approved",
  },
];

const comparisonRows = [
  {
    feature: "Primary Protein Source",
    wayora: "100% whole salmon, chicken & beef cuts",
    kibble: "Rendered meat meal & dehydrated powders",
  },
  {
    feature: "Cooking Method",
    wayora: "Gently steamed once at 82°C",
    kibble: "High-heat extruded up to 180°C multiple times",
  },
  {
    feature: "Natural Moisture Level",
    wayora: "78% hydrating natural broth",
    kibble: "Under 10% (causes chronic dehydration)",
  },
  {
    feature: "Preservatives & Fillers",
    wayora: "Zero corn, wheat, soy, or synthetic chemicals",
    kibble: "Loaded with starch binders & artificial sprays",
  },
];

const team = [
  {
    name: "Dr. Amaya Wijesinghe, DVM",
    role: "Chief Veterinary Nutritionist",
    bio: "14+ years specializing in small-animal clinical nutrition, gut microbiome health, and hypoallergenic feline diets.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85",
    specialty: "Feline & Canine Gut Health",
  },
  {
    name: "Chef Liam Calder",
    role: "Head of Culinary R&D",
    bio: "Former fine-dining sous chef who traded Michelin kitchens for crafting irresistible textures and broths for picky pets.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85",
    specialty: "Slow-Steam Gently Cooked Broths",
  },
  {
    name: "Dr. Kasun Fernando, PhD",
    role: "Director of Ingredient Science",
    bio: "Leads farm traceability, omega fatty acid bioavailability research, and zero-preservative pouch innovation.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85",
    specialty: "Clean Ingredient Sourcing",
  },
];

const heroSlides = [
  {
    image: "/images/pet-hero.png",
    badge: "Chief Taste Officer",
    title: "Mochi & Friends",
    subtitle: "100% Clean-Bowl Approved",
    petType: "cat" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    badge: "Omega-3 Rich",
    title: "Wild Salmon Lover",
    subtitle: "Silky Coat & Gentle Digestion",
    petType: "cat" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    badge: "Pasture-Raised",
    title: "Golden Tail Wags",
    subtitle: "All-Day Playful Energy",
    petType: "dog" as const,
  },
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* 1. Immersive Pink/Coral Hero */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        {/* Giant Background Watermark Text (Reverted to subtle style) */}
        <div
          style={display}
          className="absolute top-[22%] inset-x-0 text-center text-[19vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          OUR STORY
        </div>

        <Navbar />

        <div className="relative z-20 flex-1 flex items-center max-w-[1380px] mx-auto w-full px-6 sm:px-10 md:px-14 pt-28 sm:pt-32 pb-16 lg:py-24">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold shadow-sm"
                style={display}
              >
                <span>Born From Love • Backed By Veterinary Science</span>
              </motion.div>

              <h1
                style={display}
                className="text-white font-bold leading-[0.94] tracking-tight text-5xl sm:text-6xl xl:text-[72px] drop-shadow-[0_6px_0_rgba(190,40,100,0.22)]"
              >
                {["WE COOK REAL", "FOOD FOR PETS", "WHO ARE FAMILY."].map(
                  (line, idx) => (
                    <span
                      key={line}
                      className="block overflow-hidden pb-[0.06em]"
                    >
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
                  )
                )}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="text-white/95 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                We started Wayora with a simple question: why do we feed our most
                loyal companions ultra-processed brown pellets? Our kitchen
                gently steams real whole meats and garden superfoods for visible
                health in every bowl.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href="#kitchen"
                  style={display}
                  className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#D9F27A] text-[#2d3a00] text-base sm:text-lg font-semibold shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition"
                >
                  Tour Our Kitchen
                  <span className="w-10 h-10 rounded-full bg-[#2d3a00] text-[#D9F27A] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>

                <Link
                  href="/#shop"
                  style={display}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-sm sm:text-base font-semibold hover:bg-white hover:text-[#E8457A] transition"
                >
                  <span>View All Recipes</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Auto-Shading / Crossfading 3-Image Showcase */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 110, damping: 15, delay: 0.25 }}
                className="relative w-full max-w-[450px] rounded-[36px] bg-[#FFE8F1]/90 backdrop-blur-md p-4 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.45)] border border-white/70"
              >
                {/* Crossfading / Shading Image Container */}
                <div className="relative h-80 sm:h-[400px] w-full rounded-[28px] overflow-hidden bg-[#FFE4EE]">
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

                {/* Dynamic Caption Footer with Cat/Dog Logo */}
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
        </div>

        {/* Bottom Infinite Marquee Strip */}
        <div className="relative z-20 bg-white/15 backdrop-blur-md border-t border-white/30 py-3.5 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm tracking-[0.18em] font-semibold text-white uppercase">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
                <span>100% HUMAN-GRADE WHOLE CUTS</span>
                <span>SLOW-STEAMED AT 82°C</span>
                <span>FORMULATED BY BOARD-CERTIFIED VETS</span>
                <span>ZERO CORN, SOY, OR BY-PRODUCTS</span>
                <span>99.2% PICKY-EATER APPROVAL</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Colorful Impact Metrics Bento Strip */}
      <section className="py-20 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, scale: 0.84, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: idx * 0.1,
              }}
            >
              <Card className="relative overflow-hidden p-7 hover:-translate-y-2 group">
                <div
                  className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${st.accent} mb-5`}
                />
                <div
                  style={display}
                  className="text-5xl sm:text-6xl font-bold text-[#1F1924] tracking-tight mb-2 group-hover:text-[#E8457A] transition-colors"
                >
                  <CountUp to={st.value} suffix={st.suffix} />
                </div>
                <div
                  style={display}
                  className="text-lg font-bold text-[#1F1924]"
                >
                  {st.label}
                </div>
                <p className="text-xs text-[#7E7085] mt-1">{st.note}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Kitchen Process Switcher (#kitchen) */}
      <section
        id="kitchen"
        className="py-24 bg-gradient-to-b from-[#FFC4DA] via-[#FFD4E4] to-[#FFC9DE] border-y border-[#F7A8C4]"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <Badge variant="lime" className="mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Kitchen Transparency</span>
            </Badge>
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
            >
              Inside the Wayora Kitchen
            </h2>
            <p className="text-sm sm:text-base text-[#6E6275]">
              Click through each step of our culinary process to see how we lock
              in fresh flavor and clinical-grade nutrition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Interactive Step Selector Cards */}
            <div className="lg:col-span-6 space-y-4">
              {kitchenSteps.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = activeStep === idx;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer rounded-[28px] p-6 border-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-[#FFF3F8] border-[#FF5C8D] shadow-[0_22px_50px_-12px_rgba(232,69,122,0.25)] scale-[1.01]"
                        : "bg-[#FFE8F1]/75 border-[#F9BDD3] hover:bg-[#FFF0F6] hover:border-[#FF8FB1]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        style={display}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#FF6F9C] text-white"
                            : "bg-[#FFF0F5] text-[#E8457A]"
                        }`}
                      >
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#E8457A]">
                            {item.subtitle}
                          </span>
                          <Icon className="w-4 h-4 text-[#E8457A]" />
                        </div>
                        <h3
                          style={display}
                          className="text-xl font-bold text-[#1F1924] mt-0.5 mb-2"
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#6E6275] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Animated Large Preview Card */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                  className="rounded-[36px] bg-[#FFF2F7] p-5 sm:p-6 shadow-2xl border border-[#FBBDD4]"
                >
                  <div className="relative h-72 sm:h-80 rounded-[28px] overflow-hidden mb-6">
                    <img
                      src={kitchenSteps[activeStep].image}
                      alt={kitchenSteps[activeStep].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="lime">
                        {kitchenSteps[activeStep].badge}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <span
                        style={display}
                        className="text-sm uppercase tracking-widest text-[#FFF6C5]"
                      >
                        Step {kitchenSteps[activeStep].step}
                      </span>
                      <h4 style={display} className="text-2xl font-bold">
                        {kitchenSteps[activeStep].title}
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {kitchenSteps[activeStep].highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 rounded-2xl bg-[#FFF5F8] px-3.5 py-3 text-xs font-semibold text-[#1F1924]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2BB673] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Timeline with Photo Cards */}
      <section className="py-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Our Journey (2021 – 2026)</span>
          </Badge>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
          >
            From One Rescue Cat to{" "}
            <span className="text-[#FF5C8D]">1M+ Bowls</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6E6275]">
            Every milestone was inspired by real pet parents asking for cleaner,
            fresher, more honest nutrition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, scale: 0.85, y: 45 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 15,
                delay: idx * 0.12,
              }}
            >
              <Card className="group h-full overflow-hidden flex flex-col justify-between hover:-translate-y-2">
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="pink" style={display}>
                        {m.year}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E8457A]">
                      {m.tag}
                    </span>
                    <CardTitle>{m.title}</CardTitle>
                    <CardDescription className="pt-1">
                      {m.description}
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Wayora Fresh vs. Ordinary Kibble Comparison Section */}
      <section className="py-20 px-5 sm:px-8 md:px-14 max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="pink" className="mb-3">
            The Fresh Difference
          </Badge>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924]"
          >
            Why Fresh Beats Dry Kibble
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 105, damping: 16 }}
          className="rounded-[34px] bg-[#FFF2F7] border border-[#FBBDD4] shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#FFE0EC] border-b border-[#F8BBD2] p-5 sm:px-8 font-bold text-sm" style={display}>
            <div className="md:col-span-4 text-[#6E5C6B]">Nutritional Standard</div>
            <div className="md:col-span-4 text-[#E8457A] flex items-center gap-1.5 mt-2 md:mt-0">
              <PawPrint className="w-4 h-4 fill-current" />
              <span>Wayora Fresh Steamed</span>
            </div>
            <div className="md:col-span-4 text-[#8C7F91] mt-2 md:mt-0">
              Ordinary Dry Kibble
            </div>
          </div>

          <div className="divide-y divide-[#F6EBF0]">
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:px-8 gap-3 items-center text-sm"
              >
                <div
                  style={display}
                  className="md:col-span-4 font-bold text-[#1F1924]"
                >
                  {row.feature}
                </div>
                <div className="md:col-span-4 flex items-center gap-2 font-semibold text-[#1F1924] bg-[#F6FCE2] px-3.5 py-2 rounded-2xl">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB673] shrink-0" />
                  <span>{row.wayora}</span>
                </div>
                <div className="md:col-span-4 flex items-center gap-2 text-[#7D7082] px-2">
                  <XCircle className="w-4 h-4 text-[#D9778F] shrink-0" />
                  <span>{row.kibble}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 6. Meet Our Veterinary & Culinary Team */}
      <section className="py-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="lime" className="mb-3">
            The Minds Behind Wayora
          </Badge>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
          >
            Led by Vets, Perfected by Chefs
          </h2>
          <p className="text-sm sm:text-base text-[#6E6275]">
            Every formula is a collaboration between clinical veterinary
            nutritionists and culinary specialists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.86, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 15,
                delay: idx * 0.12,
              }}
            >
              <Card className="group overflow-hidden h-full flex flex-col justify-between hover:-translate-y-2">
                <div>
                  <div className="relative h-68 overflow-hidden bg-[#FFE8F0]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-1">
                      {member.specialty}
                    </Badge>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#E8457A]">
                      {member.role}
                    </p>
                    <CardDescription className="pt-2">
                      {member.bio}
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#2BB673]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Board-Certified Advisory Panel</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA Banner + Footer */}
      <section className="pb-20 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 16 }}
          className="rounded-[36px] p-8 sm:p-12 lg:p-16 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            background:
              "radial-gradient(80% 100% at 20% 20%, #FF9EBB 0%, #FF6F9C 55%, #E8457A 100%)",
          }}
        >
          <div className="space-y-4 max-w-xl">
            <Badge variant="lime">Taste the Wayora Difference</Badge>
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold leading-tight"
            >
              Give Your Pet Their First Fresh Bowl Today
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Backed by our 100% picky-eater clean bowl guarantee. If your cat
              or dog doesn’t love it, your trial box is on us.
            </p>
          </div>

          <Link href="/#shop">
            <Button variant="lime" size="lg" style={display}>
              <span>Shop Fresh Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
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
            <Link href="/about" className="text-[#E8457A] font-semibold">
              Our Story
            </Link>
            <Link href="/recipes" className="hover:text-[#E8457A] transition">
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

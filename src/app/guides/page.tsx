"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  Heart,
  HelpCircle,
  Leaf,
  PawPrint,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UserCheck,
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

const transitionSteps = [
  {
    step: 1,
    phase: "Days 1 – 2",
    title: "Gentle Introduction",
    freshPct: 25,
    oldPct: 75,
    desc: "Introduce a small spoonful of warm Wayora gently folded into their existing food. Lets gut microbiome adapt to bioavailable moisture.",
    tip: "Serve at room temperature or warm the pouch in warm water for 2 minutes to release irresistible natural aromas.",
  },
  {
    step: 2,
    phase: "Days 3 – 4",
    title: "The Balanced Halfway Mark",
    freshPct: 50,
    oldPct: 50,
    desc: "Half Wayora steamed whole cuts, half old food. Stool consistency begins firming up and tail-wagging anticipation increases.",
    tip: "You’ll notice more energy throughout the day with zero afternoon post-kibble carb crashes.",
  },
  {
    step: 3,
    phase: "Days 5 – 6",
    title: "The Fresh Majority",
    freshPct: 75,
    oldPct: 25,
    desc: "75% fresh steamed goodness. Digestive flora is fully adapted. Flaky skin diminishes and coat gloss noticeably elevates.",
    tip: "Your pet may start licking the bowl completely clean before touching remaining dry pellets.",
  },
  {
    step: 4,
    phase: "Day 7+",
    title: "100% Clean-Bowl Celebration",
    freshPct: 100,
    oldPct: 0,
    desc: "Full fresh transition achieved! Maximum hydration, optimal stool quality, silky fur, and pure mealtime joy in every single bowl.",
    tip: "Welcome to the Clean-Bowl Club! Store extra unopened pouches chilled at ≤4°C or frozen up to 6 months.",
  },
];

const guideCategories = [
  "All Articles",
  "Feline Health",
  "Canine Wellness",
  "Digestive Health",
  "Longevity",
];

const articles = [
  {
    id: 1,
    category: "Digestive Health",
    petType: "all" as const,
    title: "The 7-Day Kibble to Fresh Transition: Zero Tummy Upset Protocol",
    excerpt:
      "A step-by-step clinical guide to safely introducing gently steamed whole meats to picky eaters without gas, loose stools, or mealtime protest.",
    author: "Dr. Amaya Wijesinghe, DVM",
    readTime: "4 min read",
    badge: "Most Read",
    date: "Nov 2026",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    category: "Feline Health",
    petType: "cat" as const,
    title: "The Taurine Truth: Why High-Heat Extrusion Depletes Feline Heart Health",
    excerpt:
      "Cats cannot synthesize their own taurine. Learn why conventional 180°C dry processing degrades fragile amino acids, and why 82°C steaming preserves natural cellular integrity.",
    author: "Dr. Kasun Fernando, PhD",
    readTime: "6 min read",
    badge: "Vet Science",
    date: "Nov 2026",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    category: "Canine Wellness",
    petType: "dog" as const,
    title: "Marine Omega-3 vs Plant Oils: How Wild Pacific Salmon Eliminates Itchy Dander",
    excerpt:
      "Why dogs cannot efficiently convert flaxseed ALA into EPA & DHA. Discover how bioavailable marine fatty acids rebuild the epidermal skin barrier in 21 days.",
    author: "Dr. Amaya Wijesinghe, DVM",
    readTime: "5 min read",
    badge: "Skin & Coat",
    date: "Oct 2026",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    category: "Feline Health",
    petType: "cat" as const,
    title: "Hydration in Every Bowl: Preventing Feline Urinary Crystals with 78% Moisture",
    excerpt:
      "Cats have a low evolutionary thirst drive. Feeding dry pellets forces chronic subclinical dehydration. Here is how slow-simmered bone broths safeguard kidneys.",
    author: "Chef Liam Calder",
    readTime: "5 min read",
    badge: "Kidney Care",
    date: "Oct 2026",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    category: "Canine Wellness",
    petType: "dog" as const,
    title: "Novel Protein Elimination: Why Roast Duck & Squash Calm Sensitive Stomachs",
    excerpt:
      "If your dog suffers from ear-scratching, paw-licking, or sensitive bowel movements, single-source novel poultry proteins offer immediate anti-inflammatory relief.",
    author: "Dr. Amaya Wijesinghe, DVM",
    readTime: "4 min read",
    badge: "Allergy Care",
    date: "Sep 2026",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    category: "Longevity",
    petType: "all" as const,
    title: "Raw Goat Milk & Probiotics: Nurturing the Infant Pet Microbiome for Lifetime Vitality",
    excerpt:
      "The first 12 months determine lifetime allergy resistance and digestive strength. Why fresh fermented goat milk outperforms synthetic probiotic powders.",
    author: "Dr. Kasun Fernando, PhD",
    readTime: "7 min read",
    badge: "Gut Microbiome",
    date: "Aug 2026",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=700&q=85",
  },
];

const guideFaqs = [
  {
    q: "How long can a fresh Wayora pouch stay open in the refrigerator?",
    a: "Once opened, fold the top or place it in an airtight container in the fridge. Because we use zero artificial chemical preservatives, opened pouches should be enjoyed within 3 to 4 days.",
  },
  {
    q: "Can I warm Wayora before serving to my picky cat or dog?",
    a: "Yes! In fact, we highly recommend it. Submerge the sealed pouch in a bowl of warm tap water for 2 minutes. Gentle warmth releases the natural savory broth aroma that triggers your pet’s natural olfactory feeding instinct.",
  },
  {
    q: "What should I do if my pet experiences softer stools during the transition?",
    a: "Mild stool changes can happen as gut bacteria adapt to fresh, moisture-rich ingredients. Simply stay at your current mixing ratio (e.g., Day 2 or Day 4) for an extra 2 days until stools firm up, then proceed smoothly.",
  },
  {
    q: "Can I mix Wayora with my pet’s current dry food permanently?",
    a: "Absolutely! While a 100% fresh diet provides peak hydration and nutrient density, topping current food with even 25% or 50% Wayora delivers real whole-meat amino acids and essential hydration that dry kibble lacks.",
  },
];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [transitionPetType, setTransitionPetType] = useState<"cat" | "dog">("cat");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeTransition = transitionSteps[currentStepIndex];

  const filteredArticles =
    selectedCategory === "All Articles"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* 1. Header Banner */}
      <section
        className="relative w-full pt-28 sm:pt-32 pb-16 px-5 sm:px-8 md:px-14 overflow-hidden"
        style={{
          background:
            "radial-gradient(75% 85% at 50% 40%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        <div
          style={display}
          className="absolute top-[18%] inset-x-0 text-center text-[17vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          WELLNESS
        </div>

        <div className="relative z-20 max-w-[1240px] mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold shadow-sm"
            style={display}
          >
            <Stethoscope className="w-4 h-4 text-[#D9F27A]" />
            <span>Veterinary Nutrition & Transition Science</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={display}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-[0_4px_0_rgba(190,40,100,0.2)]"
          >
            Evidence-Backed Pet Wellness & Guides
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/95 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Real veterinary insights on transitioning picky eaters, repairing dull coats,
            preventing chronic dehydration, and extending your companion’s most energetic years.
          </motion.p>
        </div>
      </section>

      {/* 2. Interactive 7-Day Gentle Transition Tool */}
      <section className="relative z-30 max-w-[1240px] mx-auto px-5 sm:px-8 md:px-14 -mt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-[40px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 p-6 sm:p-10 md:p-12 shadow-[0_30px_80px_-15px_rgba(200,45,100,0.3)] space-y-8"
        >
          {/* Header of Transition Tool */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F7C9DA] pb-6">
            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFE0EC] text-[#E8457A] text-xs font-bold uppercase tracking-wider">
                Interactive Feeding Guide
              </span>
              <h2 style={display} className="text-3xl sm:text-4xl font-bold text-[#1F1924]">
                The 7-Day Fresh Food Transition Calculator
              </h2>
              <p className="text-sm text-[#6E5664] max-w-xl">
                Avoid digestive upset when switching from dry kibble. Click through the days below to
                see the exact bowl mixing ratios for your {transitionPetType}.
              </p>
            </div>

            {/* Cat / Dog Switcher for Transition */}
            <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-full border border-[#F6BFD3] shrink-0">
              <button
                type="button"
                onClick={() => setTransitionPetType("cat")}
                style={display}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  transitionPetType === "cat"
                    ? "bg-[#FF6F9C] text-white shadow-sm"
                    : "text-[#1F1924] hover:bg-pink-50"
                }`}
              >
                <CatLogo className="w-4 h-4" />
                <span>My Cat</span>
              </button>
              <button
                type="button"
                onClick={() => setTransitionPetType("dog")}
                style={display}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  transitionPetType === "dog"
                    ? "bg-[#FF6F9C] text-white shadow-sm"
                    : "text-[#1F1924] hover:bg-pink-50"
                }`}
              >
                <DogLogo className="w-4 h-4" />
                <span>My Dog</span>
              </button>
            </div>
          </div>

          {/* 4 Day Progression Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {transitionSteps.map((st, idx) => {
              const isActive = currentStepIndex === idx;
              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`p-4 rounded-3xl border-2 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-md shadow-[#FF6F9C]/15"
                      : "bg-white/80 border-[#F6BFD3] hover:bg-white"
                  }`}
                >
                  <span
                    style={display}
                    className="text-xs font-bold uppercase tracking-wider text-[#E8457A] block"
                  >
                    {st.phase}
                  </span>
                  <div style={display} className="text-base sm:text-lg font-bold text-[#1F1924] mt-0.5">
                    {st.freshPct}% Wayora
                  </div>
                  <div className="text-[11px] text-[#7A6270] mt-1 truncate">{st.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Visualizer & Bowl Ratio Display */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F6BFD3] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Dynamic Visual Bowl Mixing Bar */}
            <div className="lg:col-span-5 space-y-4">
              <span
                style={display}
                className="text-xs font-bold uppercase tracking-wider text-[#5C4653] block"
              >
                Bowl Composition for {activeTransition.phase}
              </span>

              {/* Graphical Mixing Bar */}
              <div className="h-10 rounded-2xl overflow-hidden flex shadow-inner border border-[#F6BFD3]">
                <motion.div
                  style={{ width: `${activeTransition.freshPct}%` }}
                  className="bg-gradient-to-r from-[#FF6F9C] to-[#E8457A] flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
                >
                  {activeTransition.freshPct}% Fresh
                </motion.div>
                {activeTransition.oldPct > 0 && (
                  <motion.div
                    style={{ width: `${activeTransition.oldPct}%` }}
                    className="bg-[#EBD8CF] flex items-center justify-center text-[#705244] text-xs font-bold transition-all duration-500"
                  >
                    {activeTransition.oldPct}% Current Food
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-[#6E5664] pt-1">
                <span className="flex items-center gap-1.5 font-bold text-[#E8457A]">
                  <span className="w-3 h-3 rounded-full bg-[#E8457A] inline-block" />
                  Wayora Steamed Whole Cuts
                </span>
                <span className="flex items-center gap-1.5 font-medium text-[#705244]">
                  <span className="w-3 h-3 rounded-full bg-[#EBD8CF] inline-block" />
                  Old Diet
                </span>
              </div>
            </div>

            {/* Right: Detailed Veterinary Feeding Advice */}
            <div className="lg:col-span-7 space-y-3.5 border-t lg:border-t-0 lg:border-l border-[#F7C9DA] pt-4 lg:pt-0 lg:pl-8">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#D9F27A] text-[#233000] text-xs font-bold uppercase">
                  {activeTransition.phase} Strategy
                </span>
                <span style={display} className="text-xl font-bold text-[#1F1924]">
                  {activeTransition.title}
                </span>
              </div>

              <p className="text-sm text-[#6E5664] leading-relaxed">
                {activeTransition.desc}
              </p>

              <div className="p-4 rounded-2xl bg-[#FFF2F7] border border-[#F6BFD3] text-xs text-[#8B6E7D] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#E8457A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F1924]">Veterinary Chef Tip:</span>{" "}
                  {activeTransition.tip}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Filterable Veterinary Articles Grid */}
      <section className="py-12 pb-24 px-5 sm:px-8 md:px-14 max-w-[1340px] mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFE3EE] text-[#E8457A] text-xs font-bold uppercase tracking-wider">
            Clinical Articles
          </span>
          <h2 style={display} className="text-4xl sm:text-5xl font-bold text-[#1F1924]">
            Nutrition Library & Deep Dives
          </h2>
          <p className="text-sm sm:text-base text-[#6E5664]">
            Peer-reviewed insights into hydration, whole-muscle bioavailability, and gut longevity.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {guideCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={display}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1F1924] text-[#D9F27A] shadow-md"
                  : "bg-white/90 text-[#5C4653] border border-[#F6BFD3] hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredArticles.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              whileHover={{ y: -8 }}
              className="rounded-[36px] bg-[#FFF2F7] border border-white/85 shadow-[0_20px_50px_-15px_rgba(200,45,100,0.2)] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-[#FFE0EC]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1F1924]/75 backdrop-blur-md border border-white/35 text-white shadow-lg text-[11px] font-bold">
                    <BookOpen className="w-3 h-3 text-[#D9F27A]" />
                    <span>{art.badge}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 z-20 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#E8457A]">
                    {art.readTime}
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8457A]">
                    {art.category}
                  </span>
                  <h3
                    style={display}
                    className="text-xl font-bold text-[#1F1924] leading-snug line-clamp-2"
                  >
                    {art.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E5664] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-[#F7C9DA] mt-4 flex items-center justify-between">
                <div>
                  <p style={display} className="text-xs font-bold text-[#1F1924]">
                    {art.author}
                  </p>
                  <p className="text-[10px] text-[#8B7280]">{art.date}</p>
                </div>

                <Link
                  href="/recipes"
                  style={display}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#E8457A] hover:underline"
                >
                  <span>Explore Bowls</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 4. Ask-a-Vet Micro-FAQ Accordion */}
      <section className="py-12 pb-24 px-5 sm:px-8 md:px-14 max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE3EE] text-[#E8457A] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transition Support</span>
          </div>
          <h2 style={display} className="text-3xl sm:text-4xl font-bold text-[#1F1924]">
            Transition & Feeding FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {guideFaqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-3xl bg-[#FFF2F7] border border-white/85 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span style={display} className="text-base sm:text-lg font-bold text-[#1F1924]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#E8457A] text-white" : "bg-[#FFE0EC] text-[#E8457A]"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 sm:px-8 pb-6 text-sm text-[#6E5664] leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Bottom Banner CTA */}
      <section className="pb-24 px-5 sm:px-8 md:px-14 max-w-[1240px] mx-auto">
        <div className="rounded-[40px] bg-gradient-to-br from-[#1F1924] via-[#332230] to-[#1F1924] text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3.5 py-1 rounded-full bg-[#D9F27A] text-[#233000] text-xs font-bold uppercase tracking-wider">
              Start Your Pet’s Journey
            </span>
            <h3 style={display} className="text-3xl sm:text-4xl font-bold">
              Ready to see cleaner bowls and softer fur in 7 days?
            </h3>
            <p className="text-sm text-white/80">
              Build your pet’s custom calorie profile or browse our 6 signature steamed recipes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link href="/plan">
              <Button variant="lime" size="lg" style={display} className="h-13 px-8 text-base">
                <span>Build Meal Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/recipes">
              <Button variant="outline" size="lg" style={display} className="h-13 px-6 text-base text-white border-white/40 bg-white/10 hover:bg-white hover:text-[#1F1924]">
                <span>View Recipes</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-10 border-t border-[#F7C9DA] bg-[#FFE8F1]/80 px-5 sm:px-8 md:px-14 text-[#5C4653]">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5" style={display}>
            <span className="text-xl font-bold text-[#E8457A]">WAYORA</span>
            <PawPrint className="w-4 h-4 text-[#E8457A] fill-current" />
          </div>
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <Link href="/" className="hover:text-[#E8457A] transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#E8457A] transition">
              Our Story
            </Link>
            <Link href="/recipes" className="hover:text-[#E8457A] transition">
              Recipes
            </Link>
            <Link href="/plan" className="hover:text-[#E8457A] transition">
              Meal Plan
            </Link>
            <Link href="/guides" className="text-[#E8457A] font-semibold">
              Guides
            </Link>
            <Link href="/dashboard" className="hover:text-[#E8457A] transition">
              Pet Portal
            </Link>
            <Link href="/contact" className="hover:text-[#E8457A] transition">
              Contact
            </Link>
          </div>
          <p>© 2026 Wayora Pet Nutrition. Freshly steamed with love.</p>
        </div>
      </footer>
    </main>
  );
}


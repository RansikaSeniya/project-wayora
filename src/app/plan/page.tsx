"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBowl } from "@/components/BowlContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Flame,
  Heart,
  Minus,
  PawPrint,
  Plus,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Utensils,
  Zap,
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

const ageBrackets = [
  { id: "baby", label: "Baby / Growth", sub: "Under 1 year old", icon: Sparkles },
  { id: "adult", label: "Prime Adult", sub: "1 to 7 years old", icon: Heart },
  { id: "senior", label: "Wise Senior", sub: "7+ years old", icon: ShieldCheck },
];

const activityLevels = [
  {
    id: "chill",
    label: "Couch Lounger",
    desc: "Enjoys naps, light stretching & gentle strolls",
    multiplier: 0.9,
    tag: "Low Activity",
  },
  {
    id: "playful",
    label: "Playful Explorer",
    desc: "Regular play sessions, daily walks & zooming",
    multiplier: 1.05,
    tag: "Balanced",
  },
  {
    id: "athletic",
    label: "Athletic Dynamo",
    desc: "High energy, agility, agility play & outdoor runs",
    multiplier: 1.25,
    tag: "High Energy",
  },
];

const healthGoals = [
  {
    id: "coat",
    label: "Silky Coat & Healthy Skin",
    detail: "Rich in wild marine Omega-3 DHA/EPA",
    benefit: "+3.8% EPA/DHA Fatty Acids",
  },
  {
    id: "gut",
    label: "Sensitive Tummy & Digestion",
    detail: "Gentle pumpkin, probiotics & steamed broths",
    benefit: "78% Hydrating Broth Base",
  },
  {
    id: "picky",
    label: "Picky Eater Appetite",
    detail: "Slow-steamed at 82°C for irresistible natural aroma",
    benefit: "99.2% Clean-Bowl Approved",
  },
  {
    id: "joints",
    label: "Joint Mobility & Lean Muscle",
    detail: "High-protein whole cuts with natural chondroitin",
    benefit: "100% Muscle Cuts • Zero Ash",
  },
];

export default function MealPlanPage() {
  const { addToBowl, openBowl } = useBowl();

  // Wizard State
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Pet Profile Inputs
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [petName, setPetName] = useState("Mochi");
  const [ageBracket, setAgeBracket] = useState("adult");
  const [weightKg, setWeightKg] = useState(4.5);
  const [activity, setActivity] = useState("playful");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["coat", "picky"]);
  const [addedToCart, setAddedToCart] = useState(false);

  // Toggle Health Goals
  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((g) => g !== id) : prev) : [...prev, id]
    );
  };

  // Calculations
  const baseKcalPerKg = petType === "cat" ? 52 : 46;
  const currentMultiplier =
    activityLevels.find((a) => a.id === activity)?.multiplier || 1.05;
  const ageFactor = ageBracket === "baby" ? 1.2 : ageBracket === "senior" ? 0.92 : 1.0;

  const dailyCalories = Math.round(weightKg * baseKcalPerKg * currentMultiplier * ageFactor);
  const dailyPouches = Math.max(1, Math.round((dailyCalories / 140) * 2) / 2);
  const monthlyPouches = Math.round(dailyPouches * 28);

  // Recommended recipes tailored to pet type & goals
  const recommendedRecipes =
    petType === "cat"
      ? [
          {
            id: 1,
            name: "Wild Pacific Salmon & Sweet Pumpkin",
            category: "Cats",
            price: 28.0,
            image:
              "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85",
            calories: "145 kcal / pouch",
            badge: "Top Pick for Shiny Coat",
          },
          {
            id: 2,
            name: "Steamed Cage-Free Chicken & Broth",
            category: "Cats",
            price: 26.0,
            image:
              "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=700&q=85",
            calories: "155 kcal / pouch",
            badge: "Gentle Digestion",
          },
        ]
      : [
          {
            id: 4,
            name: "Pasture-Raised Beef & Sweet Carrot",
            category: "Dogs",
            price: 32.0,
            image:
              "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85",
            calories: "380 kcal / cup",
            badge: "High-Energy Formula",
          },
          {
            id: 6,
            name: "Roast Duck & Butternut Squash",
            category: "Dogs",
            price: 29.0,
            image:
              "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=85",
            calories: "360 kcal / cup",
            badge: "Hypoallergenic",
          },
        ];

  const planBasePrice = petType === "cat" ? 54.0 : 61.0;
  const discountedPrice = (planBasePrice * 0.8).toFixed(2);

  const handleAddPlanToBowl = () => {
    // Add primary tailored recipes to bowl
    recommendedRecipes.forEach((recipe) => {
      addToBowl({
        id: recipe.id,
        name: `${petName}'s ${recipe.name}`,
        category: recipe.category,
        price: recipe.price,
        priceFormatted: `$${recipe.price.toFixed(2)}`,
        image: recipe.image,
      });
    });
    setAddedToCart(true);
    setTimeout(() => {
      openBowl();
    }, 400);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* 1. Header Hero with Ambient Gradient */}
      <section
        className="relative w-full pt-28 sm:pt-32 pb-14 px-5 sm:px-8 md:px-14 overflow-hidden"
        style={{
          background:
            "radial-gradient(75% 85% at 50% 40%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        {/* Giant Subtle Background Watermark */}
        <div
          style={display}
          className="absolute top-[20%] inset-x-0 text-center text-[17vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          MEAL PLAN
        </div>

        <div className="relative z-20 max-w-[1100px] mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold shadow-sm"
            style={display}
          >
            <Stethoscope className="w-4 h-4 text-[#D9F27A]" />
            <span>Veterinary-Guided Nutrition Engine • 100% Human-Grade</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={display}
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-[0_4px_0_rgba(190,40,100,0.2)]"
          >
            Build {petName ? `${petName}’s` : "Your Pet’s"} Custom Fresh Bowl
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/95 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Answer 4 quick questions about your pet’s age, weight, and taste preferences.
            We’ll calculate their exact daily calories and steam their custom fresh recipe box.
          </motion.p>
        </div>
      </section>

      {/* 2. Interactive Multi-Step Builder Wizard */}
      <section className="relative z-30 max-w-[980px] mx-auto px-4 sm:px-6 -mt-8 pb-24">
        <div className="rounded-[40px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 shadow-[0_30px_80px_-15px_rgba(200,45,100,0.3)] p-6 sm:p-10 md:p-12">
          {/* Progress Tracker */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#E8457A] mb-2.5">
              <span style={display}>
                Step {step} of {totalSteps}:{" "}
                {step === 1
                  ? "Pet Identity"
                  : step === 2
                  ? "Age & Weight"
                  : step === 3
                  ? "Lifestyle & Activity"
                  : "Health Goals & Plan"}
              </span>
              <span className="text-[#8B7280]">
                {Math.round((step / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#FFE0EC] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF6F9C] via-[#E8457A] to-[#D9F27A]"
                initial={{ width: "25%" }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Pet Type & Name */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2
                    style={display}
                    className="text-2xl sm:text-3xl font-bold text-[#1F1924] mb-2"
                  >
                    Who are we cooking for today?
                  </h2>
                  <p className="text-sm text-[#6E5664]">
                    Select whether your best friend is a cat or dog so we formulate the correct taurine & protein profile.
                  </p>
                </div>

                {/* Pet Type Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPetType("cat")}
                    className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      petType === "cat"
                        ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-lg shadow-[#FF6F9C]/15"
                        : "bg-white/80 border-[#F6BFD3] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6F9C] to-[#E8457A] text-white flex items-center justify-center shadow-md">
                        <CatLogo className="w-8 h-8" />
                      </div>
                      <div>
                        <div style={display} className="text-xl font-bold text-[#1F1924]">
                          A Loving Cat
                        </div>
                        <div className="text-xs text-[#7A6270]">
                          Kitten, Adult, or Senior Feline
                        </div>
                      </div>
                    </div>
                    {petType === "cat" && (
                      <span className="w-7 h-7 rounded-full bg-[#E8457A] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPetType("dog")}
                    className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      petType === "dog"
                        ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-lg shadow-[#FF6F9C]/15"
                        : "bg-white/80 border-[#F6BFD3] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6F9C] to-[#E8457A] text-white flex items-center justify-center shadow-md">
                        <DogLogo className="w-8 h-8" />
                      </div>
                      <div>
                        <div style={display} className="text-xl font-bold text-[#1F1924]">
                          A Faithful Dog
                        </div>
                        <div className="text-xs text-[#7A6270]">
                          Puppy, Adult, or Gentle Giant
                        </div>
                      </div>
                    </div>
                    {petType === "dog" && (
                      <span className="w-7 h-7 rounded-full bg-[#E8457A] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </button>
                </div>

                {/* Pet's Name Input */}
                <div className="space-y-2">
                  <label
                    style={display}
                    className="block text-sm font-bold uppercase tracking-wider text-[#5C4653]"
                  >
                    What is your {petType}’s name?
                  </label>
                  <div className="relative max-w-md">
                    <PawPrint className="w-5 h-5 text-[#E8457A] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="e.g. Mochi, Luna, Cooper"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-[#F6BFD3] text-base font-semibold text-[#1F1924] placeholder:text-[#B59DAA] focus:outline-none focus:border-[#E8457A] focus:ring-2 focus:ring-[#FF6F9C]/25 transition shadow-sm"
                    />
                  </div>
                </div>

                {/* Next Step Action */}
                <div className="pt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="lime"
                    size="lg"
                    style={display}
                    onClick={() => setStep(2)}
                    disabled={!petName.trim()}
                    className="text-base px-8"
                  >
                    <span>Continue to Age & Weight</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Age Bracket & Weight */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2
                    style={display}
                    className="text-2xl sm:text-3xl font-bold text-[#1F1924] mb-2"
                  >
                    How old and how heavy is {petName}?
                  </h2>
                  <p className="text-sm text-[#6E5664]">
                    Portion requirements vary significantly between developing kittens/puppies and mature pets.
                  </p>
                </div>

                {/* Age Brackets */}
                <div>
                  <label
                    style={display}
                    className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-3"
                  >
                    Life Stage
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {ageBrackets.map((ab) => {
                      const Icon = ab.icon;
                      const isSelected = ageBracket === ab.id;
                      return (
                        <button
                          key={ab.id}
                          type="button"
                          onClick={() => setAgeBracket(ab.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-md"
                              : "bg-white/80 border-[#F6BFD3] hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Icon
                              className={`w-5 h-5 ${
                                isSelected ? "text-[#E8457A]" : "text-[#7A6270]"
                              }`}
                            />
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#E8457A] text-white flex items-center justify-center">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <div style={display} className="font-bold text-sm text-[#1F1924]">
                            {ab.label}
                          </div>
                          <div className="text-xs text-[#7A6270] mt-0.5">{ab.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Weight Stepper / Slider */}
                <div className="p-6 rounded-3xl bg-white border border-[#F6BFD3] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        style={display}
                        className="text-xs font-bold uppercase tracking-wider text-[#E8457A]"
                      >
                        Target Weight
                      </span>
                      <div style={display} className="text-2xl font-bold text-[#1F1924]">
                        {weightKg.toFixed(1)} kg{" "}
                        <span className="text-sm font-medium text-[#7A6270]">
                          ({(weightKg * 2.20462).toFixed(1)} lbs)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setWeightKg((w) => Math.max(1, +(w - 0.5).toFixed(1)))}
                        className="w-10 h-10 rounded-full bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center hover:bg-[#FF6F9C] hover:text-white transition cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setWeightKg((w) => Math.min(60, +(w + 0.5).toFixed(1)))}
                        className="w-10 h-10 rounded-full bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center hover:bg-[#FF6F9C] hover:text-white transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max={petType === "cat" ? "12" : "50"}
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                    className="w-full accent-[#E8457A] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-[#8B7280]">
                    <span>1 kg (Tiny)</span>
                    <span>
                      {petType === "cat" ? "Typical Cat (4 - 5 kg)" : "Medium Dog (15 - 25 kg)"}
                    </span>
                    <span>{petType === "cat" ? "12 kg (Heavy)" : "50 kg (Giant)"}</span>
                  </div>
                </div>

                {/* Back / Next Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    style={display}
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>

                  <Button
                    type="button"
                    variant="lime"
                    size="lg"
                    style={display}
                    onClick={() => setStep(3)}
                    className="text-base px-8"
                  >
                    <span>Continue to Activity</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Activity Level & Daily Energy */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2
                    style={display}
                    className="text-2xl sm:text-3xl font-bold text-[#1F1924] mb-2"
                  >
                    What is {petName}’s daily energy level?
                  </h2>
                  <p className="text-sm text-[#6E5664]">
                    Energy expenditure determines exact daily calorie intake to prevent unintended weight gain or fatigue.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {activityLevels.map((act) => {
                    const isSelected = activity === act.id;
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => setActivity(act.id)}
                        className={`w-full p-5 rounded-3xl border-2 text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-md"
                            : "bg-white/80 border-[#F6BFD3] hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-[#E8457A] text-white"
                                : "bg-[#FFF0F5] text-[#E8457A]"
                            }`}
                          >
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                style={display}
                                className="text-base sm:text-lg font-bold text-[#1F1924]"
                              >
                                {act.label}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-white text-[11px] font-bold text-[#E8457A] border border-[#F6BFD3]">
                                {act.tag}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#7A6270] mt-0.5">{act.desc}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-[#E8457A] text-white flex items-center justify-center shrink-0 ml-3">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Back / Next Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    style={display}
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>

                  <Button
                    type="button"
                    variant="lime"
                    size="lg"
                    style={display}
                    onClick={() => setStep(4)}
                    className="text-base px-8"
                  >
                    <span>Calculate {petName}’s Bowl</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Health Focus & Complete Custom Plan Result */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D9F27A] text-[#233000] text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Custom Nutritional Formula Ready</span>
                  </div>
                  <h2
                    style={display}
                    className="text-3xl sm:text-4xl font-bold text-[#1F1924]"
                  >
                    {petName}’s Tailored Fresh Plan
                  </h2>
                  <p className="text-sm text-[#6E5664]">
                    Formulated for a {weightKg} kg {ageBracket} {petType} with{" "}
                    {activityLevels.find((a) => a.id === activity)?.label.toLowerCase()} activity.
                  </p>
                </div>

                {/* 3 Metric Pills Bento */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-white border border-[#F6BFD3] text-center shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center mx-auto mb-2">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div style={display} className="text-2xl font-bold text-[#1F1924]">
                      {dailyCalories}{" "}
                      <span className="text-xs font-normal text-[#7A6270]">kcal / day</span>
                    </div>
                    <div className="text-xs text-[#7A6270] mt-0.5">Precise Daily Energy</div>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#F6BFD3] text-center shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center mx-auto mb-2">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div style={display} className="text-2xl font-bold text-[#1F1924]">
                      {dailyPouches}{" "}
                      <span className="text-xs font-normal text-[#7A6270]">
                        {petType === "cat" ? "Pouches" : "Bowls"} / day
                      </span>
                    </div>
                    <div className="text-xs text-[#7A6270] mt-0.5">Pre-Portioned Meals</div>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#F6BFD3] text-center shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center mx-auto mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div style={display} className="text-2xl font-bold text-[#1F1924]">
                      {monthlyPouches}{" "}
                      <span className="text-xs font-normal text-[#7A6270]">Meals / 4 wks</span>
                    </div>
                    <div className="text-xs text-[#7A6270] mt-0.5">Chilled Box Delivery</div>
                  </div>
                </div>

                {/* Health Focus Multi-Selector */}
                <div>
                  <label
                    style={display}
                    className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-3"
                  >
                    Fine-Tune Specific Health Benefits (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {healthGoals.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoal(goal.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-sm"
                              : "bg-white/80 border-[#F6BFD3] hover:bg-white"
                          }`}
                        >
                          <div>
                            <div style={display} className="font-bold text-sm text-[#1F1924]">
                              {goal.label}
                            </div>
                            <div className="text-xs text-[#7A6270]">{goal.detail}</div>
                            <div className="text-[11px] font-semibold text-[#2BB673] mt-1">
                              ✓ {goal.benefit}
                            </div>
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#E8457A] text-white flex items-center justify-center shrink-0 ml-2">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tailored Recipe Recommendations Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={display}
                      className="text-xs font-bold uppercase tracking-wider text-[#5C4653]"
                    >
                      Included Fresh Steamed Recipes
                    </span>
                    <span className="text-xs font-semibold text-[#E8457A]">
                      Slow-Steamed at 82°C
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedRecipes.map((rec) => (
                      <div
                        key={rec.id}
                        className="rounded-3xl bg-white p-4 border border-[#F6BFD3] flex items-center gap-3.5 shadow-sm"
                      >
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#E8457A] uppercase block">
                            {rec.badge}
                          </span>
                          <h4
                            style={display}
                            className="font-bold text-sm text-[#1F1924] truncate"
                          >
                            {rec.name}
                          </h4>
                          <span className="text-xs text-[#7A6270] block">{rec.calories}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Pricing & 1-Click Bowl Action */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1F1924] to-[#362733] text-white shadow-xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-1 rounded-full bg-[#D9F27A] text-[#233000] text-xs font-bold uppercase tracking-wider">
                          20% Off First Tasting Box
                        </span>
                        <span className="text-xs text-white/70">Cancel Anytime</span>
                      </div>
                      <div style={display} className="text-2xl sm:text-3xl font-bold">
                        ${discountedPrice}{" "}
                        <span className="text-sm font-normal text-white/60 line-through">
                          ${planBasePrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-normal text-white/70 block sm:inline sm:ml-2">
                          (approx. ${(parseFloat(discountedPrice) / 28).toFixed(2)} / meal)
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="lime"
                      size="lg"
                      style={display}
                      onClick={handleAddPlanToBowl}
                      className="text-base px-8 h-14"
                    >
                      {addedToCart ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Added to Bowl!</span>
                        </>
                      ) : (
                        <>
                          <PawPrint className="w-5 h-5" />
                          <span>Add {petName}’s Plan to Bowl</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#D9F27A]" />
                      100% Clean-Bowl Guarantee (or Full Refund)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#D9F27A]" />
                      Recyclable Chilled Eco-Insulated Box
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[#FF8FB1] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Start Over</span>
                    </button>
                  </div>
                </div>

                {/* Back to Lifestyle Step */}
                <div className="pt-2 flex justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    style={display}
                    onClick={() => setStep(3)}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Adjust Lifestyle & Weight</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Footer */}
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
            <Link href="/contact" className="hover:text-[#E8457A] transition">
              Contact
            </Link>
            <Link href="/login" className="hover:text-[#E8457A] transition">
              Log in
            </Link>
          </div>
          <p>© 2026 Wayora Pet Nutrition. Freshly steamed with love.</p>
        </div>
      </footer>
    </main>
  );
}


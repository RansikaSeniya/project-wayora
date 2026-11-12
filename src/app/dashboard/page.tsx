"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBowl } from "@/components/BowlContext";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Heart,
  Package,
  PauseCircle,
  PawPrint,
  PlayCircle,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
  Truck,
  Utensils,
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

interface PetProfile {
  id: string;
  name: string;
  type: "cat" | "dog";
  breed: string;
  age: string;
  weight: string;
  dailyKcal: number;
  dailyPouches: string;
  nextDelivery: string;
  avatar: string;
  wellnessScore: number;
  streakWeeks: number;
  boxRecipes: {
    id: number;
    name: string;
    pouches: number;
    price: number;
    image: string;
  }[];
}

const initialPets: PetProfile[] = [
  {
    id: "mochi",
    name: "Mochi",
    type: "cat",
    breed: "British Shorthair",
    age: "3 Years",
    weight: "4.6 kg",
    dailyKcal: 245,
    dailyPouches: "2 Pouches / day",
    nextDelivery: "Tue, Nov 17 • 8:00 AM – 1:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=85",
    wellnessScore: 98,
    streakWeeks: 14,
    boxRecipes: [
      {
        id: 1,
        name: "Wild Salmon & Pumpkin Bisque",
        pouches: 14,
        price: 24.0,
        image:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 2,
        name: "Free-Range Chicken & Cranberry",
        pouches: 14,
        price: 22.0,
        image:
          "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    id: "cooper",
    name: "Cooper",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 Years",
    weight: "24.0 kg",
    dailyKcal: 1180,
    dailyPouches: "3 Bowls / day",
    nextDelivery: "Thu, Nov 19 • 1:00 PM – 6:00 PM",
    avatar:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=85",
    wellnessScore: 96,
    streakWeeks: 9,
    boxRecipes: [
      {
        id: 3,
        name: "Grass-Fed Beef & Sweet Potato",
        pouches: 14,
        price: 28.0,
        image:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 6,
        name: "Roast Duck & Butternut Squash",
        pouches: 7,
        price: 29.0,
        image:
          "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

const availableSwapRecipes = [
  {
    id: 1,
    name: "Wild Salmon & Pumpkin Bisque",
    tag: "Silky Coat",
    price: 24.0,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Free-Range Chicken & Cranberry",
    tag: "Vet Choice",
    price: 22.0,
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Grass-Fed Beef & Sweet Potato",
    tag: "High Energy",
    price: 28.0,
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Tender Turkey & Goat Milk Mousse",
    tag: "Sensitive Gut",
    price: 25.0,
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=400&q=80",
  },
];

const pastOrders = [
  {
    orderId: "#WAY-88412",
    date: "Oct 28, 2026",
    itemsSummary: "Wild Salmon & Pumpkin (x1) + Free-Range Chicken (x1)",
    total: 46.0,
    temp: "3.1°C Chilled",
    status: "Delivered",
  },
  {
    orderId: "#WAY-84109",
    date: "Oct 14, 2026",
    itemsSummary: "Grass-Fed Beef & Sweet Potato (x2)",
    total: 56.0,
    temp: "3.4°C Chilled",
    status: "Delivered",
  },
];

export default function DashboardPage() {
  const { addToBowl, openBowl } = useBowl();
  const [pets, setPets] = useState<PetProfile[]>(initialPets);
  const [selectedPetId, setSelectedPetId] = useState<string>("mochi");
  const [pausedPets, setPausedPets] = useState<Record<string, boolean>>({});
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const activePet = pets.find((p) => p.id === selectedPetId) || pets[0];
  const isPaused = !!pausedPets[activePet.id];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const togglePause = () => {
    setPausedPets((prev) => {
      const nextState = !prev[activePet.id];
      triggerToast(
        nextState
          ? `${activePet.name}’s next fresh box has been paused.`
          : `${activePet.name}’s fresh box is active & scheduled!`
      );
      return { ...prev, [activePet.id]: nextState };
    });
  };

  const handleSwapRecipe = (swapItem: (typeof availableSwapRecipes)[0]) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id !== activePet.id) return pet;
        const updated = [...pet.boxRecipes];
        updated[0] = {
          id: swapItem.id,
          name: swapItem.name,
          pouches: updated[0]?.pouches || 14,
          price: swapItem.price,
          image: swapItem.image,
        };
        return { ...pet, boxRecipes: updated };
      })
    );
    setShowSwapModal(false);
    triggerToast(`Updated ${activePet.name}’s box to ${swapItem.name}!`);
  };

  const handleReorderBox = () => {
    activePet.boxRecipes.forEach((rec) => {
      addToBowl({
        id: rec.id,
        name: `${activePet.name}’s ${rec.name}`,
        category: activePet.type === "cat" ? "Cats" : "Dogs",
        price: rec.price,
        priceFormatted: `$${rec.price.toFixed(2)}`,
        image: rec.image,
      });
    });
    openBowl();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-22 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#1F1924] text-[#D9F27A] text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 border border-white/20"
            style={display}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
          PET PORTAL
        </div>

        <div className="relative z-20 max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold shadow-sm"
              style={display}
            >
              <Sparkles className="w-4 h-4 text-[#D9F27A]" />
              <span>Pet Parent Club • 10% Auto-Delivery Savings Active</span>
            </div>
            <h1
              style={display}
              className="text-white text-4xl sm:text-5xl font-bold leading-tight drop-shadow-[0_4px_0_rgba(190,40,100,0.2)]"
            >
              Welcome Back, Amara!
            </h1>
            <p className="text-white/95 text-sm sm:text-base max-w-xl">
              Manage {activePet.name}’s freshly steamed boxes, swap weekly flavors, or adjust
              portions anytime.
            </p>
          </div>

          {/* Pet Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/35">
            {pets.map((pet) => {
              const isSelected = pet.id === activePet.id;
              return (
                <button
                  key={pet.id}
                  type="button"
                  onClick={() => setSelectedPetId(pet.id)}
                  style={display}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-[#E8457A] shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {pet.type === "dog" ? (
                    <DogLogo className="w-4 h-4" />
                  ) : (
                    <CatLogo className="w-4 h-4" />
                  )}
                  <span>{pet.name}</span>
                </button>
              );
            })}
            <Link
              href="/plan"
              className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#D9F27A] text-[#233000] text-xs font-bold hover:scale-105 transition"
              style={display}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Pet</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Dashboard Bento Grid */}
      <section className="relative z-30 max-w-[1320px] mx-auto px-5 sm:px-8 md:px-14 -mt-8 pb-24 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Left Column: Active Pet Profile & Wellness Metrics */}
          <motion.div
            key={activePet.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-4 rounded-[36px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 p-6 sm:p-7 shadow-[0_24px_60px_-15px_rgba(200,45,100,0.22)] space-y-6"
          >
            <div className="flex items-center gap-4">
              <img
                src={activePet.avatar}
                alt={activePet.name}
                className="w-20 h-20 rounded-3xl object-cover border-4 border-white shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 style={display} className="text-2xl font-bold text-[#1F1924]">
                    {activePet.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFE0EC] text-[#E8457A] text-[10px] font-bold uppercase">
                    {activePet.type}
                  </span>
                </div>
                <p className="text-xs text-[#6E5664] mt-0.5">{activePet.breed}</p>
                <p className="text-xs font-semibold text-[#E8457A] mt-1">
                  {activePet.age} • {activePet.weight}
                </p>
              </div>
            </div>

            {/* Nutrition Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#F6BFD3]">
                <Flame className="w-4 h-4 text-[#E8457A] mb-1" />
                <div style={display} className="text-lg font-bold text-[#1F1924]">
                  {activePet.dailyKcal} kcal
                </div>
                <div className="text-[11px] text-[#7A6270]">Daily Target</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#F6BFD3]">
                <Utensils className="w-4 h-4 text-[#E8457A] mb-1" />
                <div style={display} className="text-lg font-bold text-[#1F1924]">
                  {activePet.dailyPouches}
                </div>
                <div className="text-[11px] text-[#7A6270]">Steamed Portion</div>
              </div>
            </div>

            {/* Fresh Food Wellness Streak */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FF6F9C] to-[#E8457A] text-white space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                  Coat & Gut Wellness
                </span>
                <span
                  style={display}
                  className="px-2.5 py-0.5 rounded-full bg-[#D9F27A] text-[#233000] text-xs font-bold"
                >
                  {activePet.wellnessScore}% Optimal
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-[#D9F27A] rounded-full"
                  style={{ width: `${activePet.wellnessScore}%` }}
                />
              </div>
              <p className="text-xs text-white/90">
                🔥 {activePet.streakWeeks}-week fresh food streak! Silky coat & healthy digestion
                achieved.
              </p>
            </div>

            <Link href="/plan" className="block">
              <Button variant="outline" size="default" style={display} className="w-full">
                <span>Recalculate {activePet.name}’s Portions</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Column: Upcoming Chilled Box & Recipe Swapper */}
          <div className="lg:col-span-8 space-y-7">
            {/* Next Scheduled Delivery Card */}
            <div className="rounded-[36px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(200,45,100,0.22)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F7C9DA] pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isPaused
                          ? "bg-amber-100 text-amber-800"
                          : "bg-[#D9F27A] text-[#233000]"
                      }`}
                    >
                      {isPaused ? "Paused for Vacation" : "Scheduled & Confirmed"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#1E965B] font-semibold">
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      3.2°C Insulated
                    </span>
                  </div>
                  <h3 style={display} className="text-2xl sm:text-3xl font-bold text-[#1F1924]">
                    Next Chilled Box for {activePet.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E5664] flex items-center gap-1.5 mt-1">
                    <Calendar className="w-4 h-4 text-[#E8457A]" />
                    <span>{isPaused ? "Delivery Paused — Resume anytime" : activePet.nextDelivery}</span>
                  </p>
                </div>

                {/* Quick Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    style={display}
                    onClick={togglePause}
                  >
                    {isPaused ? (
                      <>
                        <PlayCircle className="w-4 h-4 text-[#2BB673]" />
                        <span>Resume Box</span>
                      </>
                    ) : (
                      <>
                        <PauseCircle className="w-4 h-4 text-[#E8457A]" />
                        <span>Pause Box</span>
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="pink"
                    size="sm"
                    style={display}
                    onClick={() => setShowSwapModal(!showSwapModal)}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Swap Flavor</span>
                  </Button>
                </div>
              </div>

              {/* Inline Flavor Swapper Panel */}
              <AnimatePresence>
                {showSwapModal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 rounded-3xl bg-white border-2 border-[#FF8FB1] space-y-3 mb-2">
                      <div className="flex items-center justify-between">
                        <span
                          style={display}
                          className="text-sm font-bold text-[#1F1924]"
                        >
                          Choose a New Primary Recipe for {activePet.name}:
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowSwapModal(false)}
                          className="text-xs text-[#E8457A] font-bold hover:underline cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableSwapRecipes.map((rec) => (
                          <button
                            key={rec.id}
                            type="button"
                            onClick={() => handleSwapRecipe(rec)}
                            className="p-3 rounded-2xl bg-[#FFF7FA] border border-[#F6BFD3] hover:border-[#E8457A] flex items-center gap-3 text-left transition cursor-pointer"
                          >
                            <img
                              src={rec.image}
                              alt={rec.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-[#E8457A] uppercase block">
                                {rec.tag}
                              </span>
                              <p
                                style={display}
                                className="text-xs font-bold text-[#1F1924] truncate"
                              >
                                {rec.name}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Current Recipes Inside Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePet.boxRecipes.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-3xl bg-white border border-[#F6BFD3] flex items-center gap-4 shadow-sm"
                  >
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-[#E8457A]">
                        {rec.pouches} Steamed Pouches
                      </span>
                      <h4
                        style={display}
                        className="font-bold text-sm text-[#1F1924] truncate"
                      >
                        {rec.name}
                      </h4>
                      <span className="text-xs text-[#7A6270]">
                        ${rec.price.toFixed(2)} / batch
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[#6E5664] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2BB673]" />
                  Need extra pouches early? Reorder directly to your bowl.
                </span>
                <Button
                  type="button"
                  variant="lime"
                  size="default"
                  style={display}
                  onClick={handleReorderBox}
                >
                  <PawPrint className="w-4 h-4" />
                  <span>Order Extra {activePet.name} Box Now</span>
                </Button>
              </div>
            </div>

            {/* Past Deliveries & Cold-Chain History */}
            <div className="rounded-[36px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(200,45,100,0.22)] space-y-5">
              <div className="flex items-center justify-between">
                <h3 style={display} className="text-xl sm:text-2xl font-bold text-[#1F1924]">
                  Recent Chilled Deliveries
                </h3>
                <Link
                  href="/checkout"
                  style={display}
                  className="text-xs font-bold text-[#E8457A] hover:underline"
                >
                  Track Active Shipment →
                </Link>
              </div>

              <div className="space-y-3">
                {pastOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-4 sm:p-5 rounded-3xl bg-white border border-[#F6BFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span style={display} className="font-bold text-sm text-[#1F1924]">
                          {ord.orderId}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#1E965B] text-[10px] font-bold">
                          {ord.status} • {ord.temp}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E5664]">{ord.itemsSummary}</p>
                      <p className="text-[11px] text-[#9E8292]">{ord.date}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span style={display} className="font-bold text-base text-[#1F1924]">
                        ${ord.total.toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        style={display}
                        onClick={handleReorderBox}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <Link href="/dashboard" className="text-[#E8457A] font-semibold">
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


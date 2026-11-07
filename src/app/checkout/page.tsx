"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBowl } from "@/components/BowlContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  HeartHandshake,
  MapPin,
  Minus,
  Package,
  PawPrint,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
  Trash2,
  Truck,
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

const deliveryDays = [
  { day: "Tue, Nov 11", slot: "8:00 AM – 1:00 PM (Morning)" },
  { day: "Thu, Nov 13", slot: "1:00 PM – 6:00 PM (Afternoon)" },
  { day: "Sat, Nov 15", slot: "9:00 AM – 2:00 PM (Weekend Priority)" },
];

export default function CheckoutPage() {
  const { items, totalPrice, updateQuantity, removeFromBowl, clearBowl } = useBowl();

  // Delivery & Customer Form
  const [parentName, setParentName] = useState("Amara Perera");
  const [petName, setPetName] = useState("Mochi");
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [phone, setPhone] = useState("+94 77 123 4567");
  const [address, setAddress] = useState("No. 42, Lotus Grove, Colombo 07");
  const [instructions, setInstructions] = useState("Leave by the front porch in the shade.");
  const [selectedDay, setSelectedDay] = useState(deliveryDays[0].day);
  const [frequency, setFrequency] = useState<"one-time" | "subscription">("subscription");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(true); // default 20% tasting box discount

  // Order Placement & Live Tracking
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingStep, setTrackingStep] = useState(2); // 1: Kitchen steaming, 2: Cold-Insulated, 3: Out for delivery

  // Math
  const subtotal = totalPrice > 0 ? totalPrice : 48.0; // fallback preview if visited directly
  const discountRate = promoApplied ? 0.2 : 0;
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal >= 50 ? 0 : 5.0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearBowl();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* 1. Checkout Top Header */}
      <section
        className="relative w-full pt-28 sm:pt-32 pb-12 px-5 sm:px-8 md:px-14 overflow-hidden"
        style={{
          background:
            "radial-gradient(75% 85% at 50% 40%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        {/* Subtle Watermark */}
        <div
          style={display}
          className="absolute top-[20%] inset-x-0 text-center text-[17vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          CHECKOUT
        </div>

        <div className="relative z-20 max-w-[1100px] mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <ThermometerSnowflake className="w-4 h-4 text-[#D9F27A]" />
            <span>Guaranteed Chilled Under 4°C • Recyclable Eco-Insulation</span>
          </div>

          <h1
            style={display}
            className="text-white text-4xl sm:text-5xl font-bold tracking-tight drop-shadow-[0_4px_0_rgba(190,40,100,0.2)]"
          >
            {orderPlaced ? "Order Confirmed & Cold-Chain Active!" : "Fresh Bowl Order & Delivery"}
          </h1>

          <p className="text-white/95 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {orderPlaced
              ? `We’re gently steaming ${petName}’s fresh recipes in our kitchen. Track your chilled shipment below.`
              : `Review ${petName ? `${petName}’s` : "your pet’s"} selected recipes, choose your delivery window, and complete your order.`}
          </p>
        </div>
      </section>

      {/* 2. Main Checkout / Tracking Body */}
      <section className="relative z-30 max-w-[1240px] mx-auto px-4 sm:px-6 -mt-6 pb-24">
        {orderPlaced ? (
          /* LIVE COLD-CHAIN TRACKING SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[40px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 shadow-[0_30px_80px_-15px_rgba(200,45,100,0.3)] p-6 sm:p-10 md:p-12 space-y-10"
          >
            {/* Success Hero Badge */}
            <div className="text-center space-y-3 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-[#D9F27A] text-[#233000] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="inline-block px-4 py-1 rounded-full bg-[#FFE0EC] text-[#E8457A] text-xs font-bold uppercase tracking-wider">
                Order #WAY-92841 Confirmed
              </span>
              <h2 style={display} className="text-3xl sm:text-4xl font-bold text-[#1F1924]">
                Cooking for {petName}!
              </h2>
              <p className="text-sm text-[#6E5664] leading-relaxed">
                Thank you, {parentName}. A confirmation with live temperature tracking has been sent
                to your mobile & email.
              </p>
            </div>

            {/* Cold-Chain Progress Visualizer */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F6BFD3] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7C9DA] pb-4">
                <div>
                  <span
                    style={display}
                    className="text-xs font-bold uppercase tracking-wider text-[#E8457A]"
                  >
                    Delivery Window
                  </span>
                  <div style={display} className="text-xl font-bold text-[#1F1924]">
                    {selectedDay} • 8:00 AM – 1:00 PM
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] text-[#1E965B] text-xs font-semibold">
                  <ThermometerSnowflake className="w-3.5 h-3.5" />
                  <span>Insulated Cold-Pack Active (3.2°C)</span>
                </div>
              </div>

              {/* 3 Step Indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    trackingStep >= 1
                      ? "bg-[#FFE8F1] border-[#FF6F9C]"
                      : "bg-[#FFF9FB] border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-[#E8457A]">
                    <Sparkles className="w-4 h-4" />
                    <span style={display} className="font-bold text-sm">
                      1. Steam Kitchen
                    </span>
                  </div>
                  <p className="text-xs text-[#7A6270]">
                    Ingredients slow-steamed at 82°C to lock in natural moisture.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    trackingStep >= 2
                      ? "bg-[#FFE8F1] border-[#FF6F9C]"
                      : "bg-[#FFF9FB] border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-[#E8457A]">
                    <Package className="w-4 h-4" />
                    <span style={display} className="font-bold text-sm">
                      2. Cold-Insulation Packed
                    </span>
                  </div>
                  <p className="text-xs text-[#7A6270]">
                    Chilled in recyclable cotton liners with non-toxic ice pouches.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    trackingStep >= 3
                      ? "bg-[#FFE8F1] border-[#FF6F9C]"
                      : "bg-[#FFF9FB] border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-[#E8457A]">
                    <Truck className="w-4 h-4" />
                    <span style={display} className="font-bold text-sm">
                      3. Chilled Courier
                    </span>
                  </div>
                  <p className="text-xs text-[#7A6270]">
                    Arriving at {address} during your scheduled window.
                  </p>
                </div>
              </div>
            </div>

            {/* Recipient Details & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#F6BFD3] space-y-3">
                <span
                  style={display}
                  className="text-xs font-bold uppercase tracking-wider text-[#5C4653]"
                >
                  Delivery Address & Notes
                </span>
                <div className="space-y-1 text-sm text-[#1F1924]">
                  <p className="font-bold">
                    {parentName} & {petName}
                  </p>
                  <p className="text-[#6E5664]">{address}</p>
                  <p className="text-[#6E5664]">{phone}</p>
                  <div className="mt-2 text-xs bg-[#FFF2F7] p-2.5 rounded-xl border border-[#F6BFD3] text-[#8B6E7D]">
                    <span className="font-bold">Driver Note:</span> {instructions}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#F6BFD3] space-y-3">
                <span
                  style={display}
                  className="text-xs font-bold uppercase tracking-wider text-[#5C4653]"
                >
                  Clean-Bowl Guarantee
                </span>
                <p className="text-xs text-[#6E5664] leading-relaxed">
                  Every Wayora box is backed by our 100% Picky-Pet Guarantee. If {petName} doesn’t
                  lick their bowl completely clean, we’ll swap the recipe free or refund your box in
                  full.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link href="/recipes">
                    <Button variant="outline" size="sm" style={display}>
                      <span>Explore More Recipes</span>
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="pink" size="sm" style={display}>
                      <span>Contact Vet Desk</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* CHECKOUT FORM & SUMMARY SPLIT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Customer, Delivery & Payment Form */}
            <div className="lg:col-span-7 space-y-6">
              <form
                onSubmit={handlePlaceOrder}
                className="rounded-[38px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 shadow-[0_24px_65px_-15px_rgba(200,45,100,0.25)] p-6 sm:p-9 space-y-7"
              >
                {/* Pet & Parent Identity */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A]">
                        Step 1
                      </span>
                      <h2
                        style={display}
                        className="text-2xl sm:text-3xl font-bold text-[#1F1924]"
                      >
                        Pet & Parent Details
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#FFE0EC] px-3 py-1.5 rounded-2xl border border-[#F8BCD2] text-[#E8457A]">
                      {petType === "dog" ? (
                        <DogLogo className="w-5 h-5" />
                      ) : (
                        <CatLogo className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                      >
                        Pet Parent Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#9E7B8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder="Your name"
                          className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-white border border-[#F6BFD3] text-sm text-[#1F1924] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>

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
                          className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-white border border-[#F6BFD3] text-sm text-[#1F1924] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address & Schedule */}
                <div className="pt-4 border-t border-[#F7C9DA]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A] block mb-1">
                    Step 2
                  </span>
                  <h3
                    style={display}
                    className="text-xl sm:text-2xl font-bold text-[#1F1924] mb-4"
                  >
                    Chilled Delivery Address & Slot
                  </h3>

                  <div className="space-y-3.5">
                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                      >
                        Street Address
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#9E7B8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Delivery address"
                          className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-white border border-[#F6BFD3] text-sm text-[#1F1924] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label
                          style={display}
                          className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                        >
                          Contact Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+94 77 ..."
                          className="w-full px-3.5 py-3 rounded-2xl bg-white border border-[#F6BFD3] text-sm text-[#1F1924] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>

                      <div>
                        <label
                          style={display}
                          className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                        >
                          Delivery Instructions
                        </label>
                        <input
                          type="text"
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                          placeholder="e.g. Leave in porch"
                          className="w-full px-3.5 py-3 rounded-2xl bg-white border border-[#F6BFD3] text-sm text-[#1F1924] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>

                    {/* Delivery Day Selector */}
                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-2"
                      >
                        Select Chilled Delivery Day
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {deliveryDays.map((d) => (
                          <button
                            key={d.day}
                            type="button"
                            onClick={() => setSelectedDay(d.day)}
                            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              selectedDay === d.day
                                ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-sm"
                                : "bg-white border-[#F6BFD3] hover:bg-white/90"
                            }`}
                          >
                            <div style={display} className="font-bold text-xs text-[#1F1924]">
                              {d.day}
                            </div>
                            <div className="text-[10px] text-[#7A6270] mt-0.5">{d.slot}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription / One-Time Toggle */}
                <div className="pt-4 border-t border-[#F7C9DA]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A] block mb-1">
                    Step 3
                  </span>
                  <h3
                    style={display}
                    className="text-xl sm:text-2xl font-bold text-[#1F1924] mb-3"
                  >
                    Fresh Feeding Schedule
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFrequency("subscription")}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        frequency === "subscription"
                          ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-md"
                          : "bg-white border-[#F6BFD3]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span style={display} className="font-bold text-sm text-[#1F1924]">
                          Auto-Deliver Every 2 Weeks
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#D9F27A] text-[#233000] text-[10px] font-bold">
                          SAVE 10%
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6270]">
                        Pause, reschedule, or cancel anytime with 1 click.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFrequency("one-time")}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        frequency === "one-time"
                          ? "bg-[#FFE8F1] border-[#FF6F9C] shadow-md"
                          : "bg-white border-[#F6BFD3]"
                      }`}
                    >
                      <span style={display} className="font-bold text-sm text-[#1F1924] block mb-1">
                        One-Time Tasting Box
                      </span>
                      <p className="text-xs text-[#7A6270]">
                        Try out fresh steamed meals with zero ongoing commitment.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="pt-4 border-t border-[#F7C9DA]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A] block mb-1">
                    Step 4
                  </span>
                  <h3
                    style={display}
                    className="text-xl sm:text-2xl font-bold text-[#1F1924] mb-3"
                  >
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-[#1F1924] text-white border-[#1F1924]"
                          : "bg-white text-[#1F1924] border-[#F6BFD3]"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "bg-[#1F1924] text-white border-[#1F1924]"
                          : "bg-white text-[#1F1924] border-[#F6BFD3]"
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Pay on Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="lime"
                    size="lg"
                    style={display}
                    className="w-full text-base h-14"
                  >
                    <span>Place Fresh Bowl Order (${grandTotal.toFixed(2)})</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <p className="text-center text-[11px] text-[#8B7280] mt-2">
                    🔒 256-Bit SSL Encrypted • 100% Clean-Bowl Guarantee
                  </p>
                </div>
              </form>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-[36px] bg-[#FFF2F7]/95 backdrop-blur-xl border border-white/85 p-6 sm:p-7 shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-[#F7C9DA] pb-3.5">
                  <h3 style={display} className="text-xl font-bold text-[#1F1924]">
                    Bowl Summary
                  </h3>
                  <span className="text-xs text-[#E8457A] font-semibold">
                    {items.length > 0 ? `${items.length} Recipe(s)` : "Sample Box"}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-white border border-[#F6BFD3] text-center space-y-2">
                      <p className="text-xs text-[#6E5664]">Your bowl currently has no items.</p>
                      <Link href="/recipes">
                        <Button variant="pink" size="sm" style={display}>
                          <span>Add Recipes</span>
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#F6BFD3]"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4
                            style={display}
                            className="font-bold text-xs text-[#1F1924] truncate"
                          >
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-[#7A6270]">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-full bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-full bg-[#FFE8F1] text-[#E8457A] flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#F6BFD3] text-xs uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => setPromoApplied(true)}
                    className="px-4 py-2 rounded-xl bg-[#E8457A] text-white text-xs font-bold hover:bg-[#d4376b] transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Pricing Calculations */}
                <div className="pt-3 border-t border-[#F7C9DA] space-y-2 text-xs text-[#5C4653]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1F1924]">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-[#E8457A]">
                      <span>First Tasting Box Discount (20%)</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Chilled Delivery</span>
                    <span className="font-semibold text-[#2BB673]">
                      {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div
                    style={display}
                    className="flex justify-between text-lg font-bold text-[#1F1924] pt-2 border-t border-[#F7C9DA]"
                  >
                    <span>Total Due</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-5 rounded-3xl bg-[#FFE8F1] border border-white/80 space-y-2.5 text-xs text-[#6E5664]">
                <div className="flex items-center gap-2 font-bold text-[#1F1924]" style={display}>
                  <ShieldCheck className="w-4 h-4 text-[#E8457A]" />
                  <span>The Wayora Pledge</span>
                </div>
                <p>
                  • Cold-insulated recyclable packaging keeps food fresh for up to 48h in transit.
                </p>
                <p>• Board-certified veterinary nutrition formulations with 0% fillers.</p>
                <p>• 100% money-back guarantee if your pet refuses their bowl.</p>
              </div>
            </div>
          </div>
        )}
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
          </div>
          <p>© 2026 Wayora Pet Nutrition. Freshly steamed with love.</p>
        </div>
      </footer>
    </main>
  );
}


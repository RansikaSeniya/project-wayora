"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquareHeart,
  PawPrint,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Stethoscope,
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

const heroSlides = [
  {
    image: "/images/pet-hero.png",
    badge: "Pet Parent Concierge",
    title: "Real Humans Who Love Pets",
    subtitle: "Average response time under 15 minutes",
    petType: "cat" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
    badge: "Vet Nutrition Desk",
    title: "Free 1-on-1 Meal Consultations",
    subtitle: "Tailored advice for allergies & picky eaters",
    petType: "dog" as const,
  },
  {
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    badge: "Cold-Chain Support",
    title: "Freshness Guaranteed to Your Door",
    subtitle: "Easy box rescheduling & flavor swaps anytime",
    petType: "cat" as const,
  },
];

const contactChannels = [
  {
    icon: MessageSquareHeart,
    badge: "Fastest Reply",
    title: "Pet Parent Care Team",
    description:
      "Questions about your tasting box, flavor swaps, or subscription schedule? Our friendly team is ready to help.",
    detail: "hello@wayorapets.com",
    subDetail: "Mon – Sun • 7:00 AM – 10:00 PM",
    accent: "from-[#FF6F9C] to-[#E8457A]",
  },
  {
    icon: Stethoscope,
    badge: "Free Vet Advice",
    title: "Veterinary Nutrition Desk",
    description:
      "Speak directly with our clinical nutrition specialists about sensitive stomachs, allergies, or transition plans.",
    detail: "vetcare@wayorapets.com",
    subDetail: "Response within 2 business hours",
    accent: "from-[#2BB673] to-[#1E965B]",
  },
  {
    icon: Truck,
    badge: "Chilled Delivery",
    title: "Order & Cold-Chain Support",
    description:
      "Need to update your delivery address, track an insulated box, or report a delayed shipment?",
    detail: "+1 (800) 555-BOWL",
    subDetail: "Live SMS & Phone Tracking",
    accent: "from-[#FF9F43] to-[#EE7B11]",
  },
  {
    icon: MapPin,
    badge: "Visit Us",
    title: "Wayora Fresh Kitchen",
    description:
      "Stop by our human-grade kitchen and pet tasting bar for a complimentary sample pouch.",
    detail: "420 Blossom Way, Suite 100",
    subDetail: "Open Tue – Sat • 10:00 AM – 6:00 PM",
    accent: "from-[#9B6BFF] to-[#7742E6]",
  },
];

const topicOptions = [
  "Custom Meal Plan",
  "Order & Delivery",
  "Picky Eater Advice",
  "Allergies & Vet Consult",
  "Partnership / Press",
];

const contactFaqs = [
  {
    q: "How quickly can I change or pause my upcoming fresh box?",
    a: "You can pause, skip, or swap recipes anytime from your account or by messaging us before your box enters the steam kitchen (up to 48 hours before your scheduled delivery day).",
  },
  {
    q: "Can I book a free consultation with a Wayora veterinary nutritionist?",
    a: "Yes! Select 'Allergies & Vet Consult' in the form above and share your pet’s age, weight, and dietary sensitivities. One of our veterinary nutritionists will send a tailored feeding guide within 2 hours.",
  },
  {
    q: "What if my picky cat or dog doesn’t finish their bowl?",
    a: "Every first Tasting Box is backed by our 100% Clean-Bowl Guarantee. If your pet isn’t purring or wagging their tail at mealtime, we’ll send a different protein recipe free of charge or refund your box in full.",
  },
  {
    q: "What happens if my insulated box arrives warm?",
    a: "Our recyclable eco-insulated liners keep pouches chilled at ≤4°C for up to 48 hours in transit. If a courier delay ever compromises temperature, simply snap a photo and we’ll rush a fresh replacement box immediately.",
  },
];

export default function ContactPage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [selectedTopic, setSelectedTopic] = useState(topicOptions[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFD4E3] via-[#FFDFEB] to-[#FFD2E2] text-[#2A1621] overflow-x-hidden">
      {/* 1. Full-Screen Balanced Pink/Coral Contact Hero */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        {/* Subtle Giant Background Watermark */}
        <div
          style={display}
          className="absolute top-[22%] inset-x-0 text-center text-[18vw] font-bold text-white/10 leading-none select-none pointer-events-none whitespace-nowrap"
        >
          CONTACT US
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
                <span>Pet Parent Concierge • Vet Nutrition Support</span>
              </motion.div>

              <h1
                style={display}
                className="text-white font-bold leading-[0.94] tracking-tight text-5xl sm:text-6xl xl:text-[72px] drop-shadow-[0_6px_0_rgba(190,40,100,0.22)]"
              >
                {["WE’RE HERE FOR", "EVERY PURR,", "BARK & BOWL."].map(
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
                Whether you need help picking a recipe for a picky Persian cat,
                adjusting portions for a growing Golden Retriever, or tracking a
                chilled delivery, our pet nutrition team is always a message away.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a
                  href="#message-form"
                  style={display}
                  className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#D9F27A] text-[#2d3a00] text-base sm:text-lg font-semibold shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition"
                >
                  Send Us a Message
                  <span className="w-10 h-10 rounded-full bg-[#2d3a00] text-[#D9F27A] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>

                <a
                  href="#faq"
                  style={display}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-sm sm:text-base font-semibold hover:bg-white hover:text-[#E8457A] transition"
                >
                  <span>Quick Help FAQs</span>
                </a>
              </motion.div>
            </div>

            {/* Right Auto-Crossfading 3-Image Cat & Dog Showcase */}
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
                className="relative w-full max-w-[450px] rounded-[36px] bg-[#FFE8F1]/90 backdrop-blur-md p-4 shadow-[0_30px_70px_-15px_rgba(140,20,70,0.45)] border border-white/70"
              >
                {/* Crossfading Image Frame */}
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
                      {/* Frosted Badge (No Dot) */}
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
                        <p
                          style={display}
                          className="text-xl font-bold text-[#1F1924]"
                        >
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
                <span>15-MINUTE AVERAGE RESPONSE TIME</span>
                <span>DIRECT VETERINARY NUTRITION DESK</span>
                <span>100% CLEAN-BOWL GUARANTEE</span>
                <span>7-DAY LIVE PET PARENT CONCIERGE</span>
                <span>FREE CUSTOM FEEDING CONSULTATIONS</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Direct Contact Channels Bento Grid */}
      <section className="py-20 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFE3EE] text-[#E8457A] text-xs font-bold uppercase tracking-wider mb-3">
            Direct Care Lines
          </span>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924] leading-[1.05]"
          >
            How Can We Help Your Best Friend Today?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactChannels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.title}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 16,
                  delay: idx * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="rounded-[34px] bg-[#FFF2F7] p-7 border border-white/80 shadow-[0_18px_45px_-15px_rgba(210,55,115,0.2)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${ch.accent} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#FFE0EC] text-[#E8457A] text-[11px] font-bold">
                      {ch.badge}
                    </span>
                  </div>

                  <h3
                    style={display}
                    className="text-xl font-bold text-[#1F1924] mb-2"
                  >
                    {ch.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E5664] leading-relaxed mb-5">
                    {ch.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F7C9DA]">
                  <p
                    style={display}
                    className="text-sm sm:text-base font-bold text-[#E8457A]"
                  >
                    {ch.detail}
                  </p>
                  <p className="text-[11px] text-[#8B7280] mt-0.5">
                    {ch.subDetail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Pet-Personalized Message Form & Kitchen Info */}
      <section
        id="message-form"
        className="py-12 pb-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 16 }}
            className="lg:col-span-7 rounded-[40px] bg-[#FFF2F7] p-7 sm:p-11 border border-white/85 shadow-[0_24px_60px_-15px_rgba(210,55,115,0.22)]"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5"
              >
                <div className="w-20 h-20 rounded-full bg-[#D9F27A] text-[#233000] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="inline-block px-4 py-1 rounded-full bg-[#FFE0EC] text-[#E8457A] text-xs font-bold uppercase tracking-wider">
                  Message Received
                </span>
                <h3
                  style={display}
                  className="text-3xl sm:text-4xl font-bold text-[#1F1924]"
                >
                  Thank You, {name || "Pet Parent"}!
                </h3>
                <p className="text-sm sm:text-base text-[#6E5664] max-w-md mx-auto leading-relaxed">
                  Our Pet Parent Care specialist has received your note about{" "}
                  <span className="font-semibold text-[#1F1924]">
                    {petName || `your ${petType}`}
                  </span>{" "}
                  and will reply to{" "}
                  <span className="font-semibold text-[#E8457A]">{email}</span>{" "}
                  within 15 minutes.
                </p>
                <div className="pt-3">
                  <Button
                    type="button"
                    variant="pink"
                    size="lg"
                    style={display}
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                  >
                    <span>Send Another Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E8457A]">
                      Personalized Support
                    </span>
                    <h2
                      style={display}
                      className="text-3xl sm:text-4xl font-bold text-[#1F1924] mt-0.5"
                    >
                      Send a Note to Our Kitchen
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFE0EC] px-3.5 py-2 rounded-2xl border border-[#F8BCD2] text-[#E8457A]">
                    <CatLogo className="w-5 h-5" />
                    <DogLogo className="w-5 h-5" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Pet Type Toggle */}
                  <div>
                    <label
                      style={display}
                      className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-2"
                    >
                      Who Are We Helping Today?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPetType("cat")}
                        style={display}
                        className={`flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                          petType === "cat"
                            ? "bg-[#FF6F9C] text-white border-[#FF6F9C] shadow-md"
                            : "bg-white/90 text-[#1F1924] border-[#F6BFD3] hover:bg-white"
                        }`}
                      >
                        <CatLogo className="w-5 h-5" />
                        <span>My Cat</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPetType("dog")}
                        style={display}
                        className={`flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                          petType === "dog"
                            ? "bg-[#FF6F9C] text-white border-[#FF6F9C] shadow-md"
                            : "bg-white/90 text-[#1F1924] border-[#F6BFD3] hover:bg-white"
                        }`}
                      >
                        <DogLogo className="w-5 h-5" />
                        <span>My Dog</span>
                      </button>
                    </div>
                  </div>

                  {/* Topic Selector Pills */}
                  <div>
                    <label
                      style={display}
                      className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-2"
                    >
                      Select a Topic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topicOptions.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          style={display}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            selectedTopic === topic
                              ? "bg-[#1F1924] text-[#D9F27A] shadow-sm"
                              : "bg-white/85 text-[#5C4653] border border-[#F6BFD3] hover:bg-white"
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name, Email, Pet Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        style={display}
                        className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#9E7B8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
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
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          placeholder="e.g. Mochi"
                          className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label
                      style={display}
                      className="block text-xs font-bold uppercase tracking-wider text-[#5C4653] mb-1.5"
                    >
                      How Can We Help?
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your pet’s age, favorite flavors, dietary needs, or your order question..."
                      className="w-full p-4 rounded-2xl bg-white/90 border border-[#F6BFD3] text-sm text-[#1F1924] placeholder:text-[#AD95A3] focus:outline-none focus:border-[#E8457A] transition resize-none"
                    />
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#6E5664]">
                      <Clock className="w-4 h-4 text-[#E8457A]" />
                      <span>Typical reply in under 15 minutes</span>
                    </div>

                    <Button
                      type="submit"
                      variant="lime"
                      size="lg"
                      style={display}
                      className="text-base px-8"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* Right: Kitchen Tasting Lounge & Vet Concierge Highlight Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tasting Lounge Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 110, damping: 16 }}
              className="rounded-[36px] bg-gradient-to-br from-[#FF6F9C] via-[#F25587] to-[#DF3B71] text-white p-7 sm:p-8 shadow-xl border border-white/40 relative overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                  Wayora Flagship Kitchen
                </span>
                <h3 style={display} className="text-2xl sm:text-3xl font-bold">
                  Visit Our Fresh Pet Tasting Bar
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Bring your dog or cat to our sunlit flagship kitchen! Watch our
                  chefs steam small batches through the viewing glass and pick up
                  a free chilled sample pouch.
                </p>

                <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-2xl">
                    <MapPin className="w-4 h-4 text-[#D9F27A] shrink-0" />
                    <span>420 Blossom Way, Suite 100, San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-2xl">
                    <Phone className="w-4 h-4 text-[#D9F27A] shrink-0" />
                    <span>+1 (800) 555-BOWL • Direct Kitchen Desk</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clean-Bowl Guarantee Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 16,
                delay: 0.1,
              }}
              className="rounded-[36px] bg-[#FFF2F7] p-7 sm:p-8 border border-white/85 shadow-[0_18px_45px_-15px_rgba(210,55,115,0.2)] space-y-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#D9F27A] text-[#233000] flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8457A]">
                    Zero Risk Promise
                  </span>
                  <h3
                    style={display}
                    className="text-xl sm:text-2xl font-bold text-[#1F1924]"
                  >
                    100% Picky-Pet Guarantee
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6E5664] leading-relaxed">
                Not sure which protein your cat or dog will love most? If they
                don’t lick their bowl clean on their first Tasting Box, our team
                will send a new recipe free or refund every penny.
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#F7C9DA] text-xs font-semibold text-[#1F1924]">
                <span className="flex items-center gap-1.5 text-[#2BB673]">
                  <HeartHandshake className="w-4 h-4" />
                  No-return hassle-free refund
                </span>
                <Link
                  href="/recipes"
                  style={display}
                  className="text-[#E8457A] hover:underline"
                >
                  Explore 6 Recipes →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Support & Delivery FAQ Accordion */}
      <section
        id="faq"
        className="py-16 pb-24 px-5 sm:px-8 md:px-14 max-w-[1000px] mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE3EE] text-[#E8457A] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quick Answers</span>
          </div>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924]"
          >
            Support & Delivery FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {contactFaqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-3xl bg-[#FFF2F7] border border-white/85 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span
                    style={display}
                    className="text-base sm:text-lg font-bold text-[#1F1924]"
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#E8457A] text-white"
                        : "bg-[#FFE0EC] text-[#E8457A]"
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

      {/* 5. Footer */}
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


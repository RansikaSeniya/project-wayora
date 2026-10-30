"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, motion, useInView } from "framer-motion";
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
  Heart,
  Leaf,
  Microscope,
  PawPrint,
  ShieldCheck,
  Sparkles,
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
      duration: 2,
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

const stats = [
  {
    value: 45,
    suffix: "k+",
    label: "Happy Pets Fed Daily",
    note: "Across cats, dogs & kittens",
  },
  {
    value: 100,
    suffix: "%",
    label: "Human-Grade Whole Cuts",
    note: "Zero meat meal or by-products",
  },
  {
    value: 82,
    suffix: "°C",
    label: "Gentle Steam Temperature",
    note: "Locks in natural nutrients",
  },
  {
    value: 30,
    suffix: "+",
    label: "Vet-Crafted Recipes",
    note: "Tailored for every life stage",
  },
];

const milestones = [
  {
    year: "2021",
    title: "The First Kitchen Batch",
    description:
      "When our founder’s rescue cat Mochi refused ultra-processed kibble after a digestive illness, we teamed up with a holistic vet to steam our first salmon & pumpkin recipe in a home kitchen.",
  },
  {
    year: "2023",
    title: "Dedicated Human-Grade Pet Kitchen",
    description:
      "We opened our own USDA-inspected culinary facility where every recipe is prepared using the exact same hygiene and ingredient standards as human baby food.",
  },
  {
    year: "2025",
    title: "Over 1 Million Clean Bowls",
    description:
      "Word spread from picky Persian cats to energetic Golden Retrievers—celebrating over one million fresh pouches served with a 99.2% clean-bowl rate.",
  },
  {
    year: "2026",
    title: "Next-Gen Personalized Nutrition",
    description:
      "Expanding our functional superfood blends with sustainably sourced wild fish, goat milk mousses, and recyclable freshness pouches.",
  },
];

const kitchenSteps = [
  {
    step: "01",
    icon: Leaf,
    title: "Farm & Ocean Direct Sourcing",
    description:
      "We partner directly with sustainable fisheries and cage-free farms. Only whole muscle meat, nutrient-rich organs, and organic garden produce enter our kitchen.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    badge: "100% Traceable",
  },
  {
    step: "02",
    icon: Flame,
    title: "Slow-Steamed in Small Batches",
    description:
      "Instead of high-heat extrusion that burns away amino acids, we gently steam ingredients at 82°C to preserve natural moisture, aroma, and taurine.",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85",
    badge: "82°C Gentle Steam",
  },
  {
    step: "03",
    icon: Microscope,
    title: "Vet-Tested & Freshness Sealed",
    description:
      "Every single batch undergoes microbiological and nutrient profile testing by board-certified veterinary nutritionists before leaving our doors.",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=85",
    badge: "AAFCO Exceeded",
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB] text-[#1F1924] overflow-x-hidden">
      {/* 1. Hero Section matching Wayora Pink/Coral Theme */}
      <section
        className="relative w-full min-h-[84vh] flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        <Navbar />

        <div className="relative z-20 max-w-[1360px] mx-auto w-full px-6 sm:px-10 md:px-14 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="lime"
                className="px-4 py-1.5 text-xs sm:text-sm shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Our Story & Mission</span>
              </Badge>
            </motion.div>

            <h1
              style={display}
              className="text-white font-bold leading-[0.94] tracking-tight text-5xl sm:text-6xl lg:text-7xl drop-shadow-[0_6px_0_rgba(190,40,100,0.22)]"
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
                      {line}
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
              At Wayora, we believe your best friend deserves better than brown
              factory pellets. We gently steam whole cuts of meat and organic
              superfoods so every bowl adds years of purrs, zoomies, and tail
              wags.
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
                Inside Our Kitchen
                <span className="w-10 h-10 rounded-full bg-[#2d3a00] text-[#D9F27A] flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Animated Floating Photo Collage */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 14,
                delay: 0.25,
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="w-72 sm:w-80 h-80 sm:h-96 rounded-[36px] overflow-hidden border-4 border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=85"
                  alt="Fluffy cat portrait"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Secondary overlapping floating pet image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, x: 40, y: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 14,
                delay: 0.45,
              }}
              className="absolute -bottom-6 right-2 sm:right-4 z-20"
            >
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [3, 5, 3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-44 sm:w-52 h-44 sm:h-52 rounded-[28px] overflow-hidden border-4 border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85"
                  alt="Happy golden dog"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Floating Glass Stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 0.65, duration: 0.5 },
                scale: { delay: 0.65, duration: 0.5 },
                y: { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
              }}
              className="absolute -top-5 left-2 sm:left-6 z-20 px-4 py-2.5 rounded-2xl bg-white/25 backdrop-blur-md border border-white/45 text-white shadow-lg"
              style={display}
            >
              <div className="flex items-center gap-2 text-sm font-bold">
                <Award className="w-4 h-4 text-[#FFF6C5]" />
                <span>Est. 2021 • Fresh Kitchen</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Scroll Pop-Up Impact Metrics Section */}
      <section className="py-16 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto -mt-10 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((st, idx) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, scale: 0.86, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: idx * 0.1,
              }}
            >
              <Card className="p-6 text-center hover:-translate-y-1.5">
                <div
                  style={display}
                  className="text-4xl sm:text-5xl font-bold text-[#E8457A] mb-1.5"
                >
                  <CountUp to={st.value} suffix={st.suffix} />
                </div>
                <div
                  style={display}
                  className="text-base font-bold text-[#1F1924]"
                >
                  {st.label}
                </div>
                <p className="text-xs text-[#7E7085] mt-1">{st.note}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Our Origin Story & Interactive Timeline */}
      <section className="py-20 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Story Image & Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 105, damping: 15 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-[34px] overflow-hidden border-4 border-white shadow-2xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=85"
                alt="Mochi the cat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <Badge variant="lime">Where It All Began</Badge>
                <p style={display} className="text-2xl font-bold leading-snug">
                  “If we wouldn’t eat the ingredients ourselves, we refused to
                  put them in Mochi’s bowl.”
                </p>
                <p className="text-xs text-white/80">
                  — Wayora Founding Kitchen Team
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Timeline Milestones */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>From One Bowl to Thousands</span>
              </Badge>
              <h2
                style={display}
                className="text-4xl sm:text-5xl font-bold text-[#1F1924] leading-[1.06]"
              >
                Started With a Picky Cat, Built on{" "}
                <span className="text-[#FF5C8D]">Honest Science</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 115,
                    damping: 15,
                    delay: idx * 0.1,
                  }}
                >
                  <Card className="p-6 h-full hover:border-[#FF8FB1]">
                    <Badge variant="pink" className="mb-3" style={display}>
                      {m.year}
                    </Badge>
                    <h3
                      style={display}
                      className="text-xl font-bold text-[#1F1924] mb-2"
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm text-[#6E6275] leading-relaxed">
                      {m.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inside Our Kitchen — 3-Step Pop-Up Cards (#kitchen) */}
      <section
        id="kitchen"
        className="py-24 bg-gradient-to-b from-[#FFF0F5] to-[#FFF9FB] border-y border-[#F6DFEA]"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <Badge variant="lime" className="mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Kitchen Transparency</span>
            </Badge>
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
            >
              How We Craft Every Pouch
            </h2>
            <p className="text-sm sm:text-base text-[#6E6275]">
              No rendering plants, no powdered meat meals, and no artificial
              dyes. Just three mindful steps from farm to bowl.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {kitchenSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.84, y: 45 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    type: "spring",
                    stiffness: 115,
                    damping: 15,
                    delay: idx * 0.14,
                  }}
                >
                  <Card className="group h-full overflow-hidden hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="lime">{item.badge}</Badge>
                      </div>
                      <div
                        style={display}
                        className="absolute bottom-3 right-4 text-4xl font-bold text-white drop-shadow-md"
                      >
                        {item.step}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="w-11 h-11 rounded-2xl bg-[#FFF0F5] text-[#E8457A] flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Meet Our Veterinary & Culinary Team */}
      <section className="py-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="pink" className="mb-3">
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
              <Card className="group overflow-hidden h-full flex flex-col justify-between hover:-translate-y-1.5">
                <div>
                  <div className="relative h-64 overflow-hidden bg-[#FFE8F0]">
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

      {/* 6. Bottom CTA Banner + Footer */}
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
      <footer className="py-12 border-t border-[#F2E2E9] bg-white px-5 sm:px-8 md:px-14">
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
              About Us
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


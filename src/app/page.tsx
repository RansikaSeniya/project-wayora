"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Leaf,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const display = { fontFamily: "var(--font-display)" } as const;

const products = [
  {
    id: 1,
    name: "Wild Salmon & Pumpkin Bisque",
    category: "Cats",
    tag: "Best Seller",
    tagVariant: "pink" as const,
    calories: "380 kcal / cup",
    protein: "42% Protein",
    price: "$24.00",
    rating: "4.9",
    reviews: 218,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
    description:
      "Omega-rich Pacific salmon blended with organic sweet pumpkin for silky fur and gentle digestion.",
  },
  {
    id: 2,
    name: "Free-Range Chicken & Cranberry",
    category: "Cats",
    tag: "Vet Choice",
    tagVariant: "lime" as const,
    calories: "410 kcal / cup",
    protein: "45% Protein",
    price: "$22.00",
    rating: "5.0",
    reviews: 184,
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85",
    description:
      "Tender slow-steamed chicken breast with antioxidant cranberries to support urinary & immune health.",
  },
  {
    id: 3,
    name: "Grass-Fed Beef & Sweet Potato",
    category: "Dogs",
    tag: "High Energy",
    tagVariant: "default" as const,
    calories: "450 kcal / cup",
    protein: "38% Protein",
    price: "$28.00",
    rating: "4.9",
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=85",
    description:
      "Pasture-raised lean beef paired with garden carrots, blueberries, and prebiotic chicory root.",
  },
  {
    id: 4,
    name: "Tender Turkey & Goat Milk Mousse",
    category: "Kittens",
    tag: "Gentle Formula",
    tagVariant: "secondary" as const,
    calories: "395 kcal / cup",
    protein: "44% Protein",
    price: "$25.00",
    rating: "5.0",
    reviews: 146,
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=85",
    description:
      "Whipped velvety mousse enriched with calcium-rich goat milk and DHA for growing kittens & puppies.",
  },
];

const nutritionPillars = [
  {
    icon: Leaf,
    title: "100% Human-Grade Ingredients",
    desc: "Every cut of meat and organic vegetable comes from trusted farms—zero meat meals, by-products, or artificial preservatives.",
    color: "bg-[#FFF0F5] text-[#E8457A]",
  },
  {
    icon: ShieldCheck,
    title: "Board-Certified Vet Formulated",
    desc: "Balanced amino acids, taurine, and chelated minerals crafted by veterinary nutritionists to exceed AAFCO standards.",
    color: "bg-[#F3FAD8] text-[#3B5200]",
  },
  {
    icon: Sparkles,
    title: "Gently Slow-Steamed at Low Heat",
    desc: "Cooked in small batches at 82°C to lock in natural meaty aroma, moisture, and bioavailable vitamins.",
    color: "bg-[#FFF4E5] text-[#B85D00]",
  },
];

const galleryMoments = [
  {
    title: "Milo's Morning Bowl",
    subtitle: "British Shorthair • 2 yrs",
    image:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=85",
    badge: "Salmon Lover",
  },
  {
    title: "Luna's Glossy Coat",
    subtitle: "Golden Retriever • 1 yr",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85",
    badge: "Zero Allergies",
  },
  {
    title: "Mochi's Nap After Lunch",
    subtitle: "Ragdoll • 8 mos",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=85",
    badge: "Kitten Mousse",
  },
  {
    title: "Cooper's Zoomie Fuel",
    subtitle: "French Bulldog • 3 yrs",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85",
    badge: "Beef & Sweet Potato",
  },
];

const reviews = [
  {
    name: "hashini Perera",
    pet: "Mom to Bambi (Persian Cat)",
    avatar:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80",
    quote:
      "Bambi used to walk away from every dry kibble we tried. The moment we opened Wayora Salmon Bisque, she licked the bowl spotless in two minutes!",
    highlight: "Picky Eater Approved",
  },
  {
    name: "Daniel K.",
    pet: "Dad to Oliver (Scottish Fold)",
    avatar:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=400&q=80",
    quote:
      "Within 3 weeks of switching to Wayora, Oliver's shedding dropped dramatically and his coat feels like plush velvet. Worth every cent.",
    highlight: "Softer Coat in 21 Days",
  },
  {
    name: "Nethmi Silva",
    pet: "Mom to Leo (Golden Puppy)",
    avatar:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80",
    quote:
      "You can actually see real shredded meat and pumpkin pieces. Leo's digestion is finally consistent and his energy at the park is incredible.",
    highlight: "100% Clean Digestion",
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "How do I transition my pet to Wayora fresh meals?",
    answer:
      "Start by mixing 25% Wayora with 75% of your pet's current food for days 1–3, then 50/50 on days 4–6, 75% Wayora on days 7–9, and 100% Wayora by day 10 for a smooth, happy tummy transition.",
  },
  {
    id: "faq-2",
    question: "Are Wayora recipes suitable for kittens and puppies?",
    answer:
      "Yes! Our Tender Turkey & Goat Milk Mousse and Salmon recipes are formulated to meet AAFCO nutritional profiles for all life stages, including rapid kitten and puppy growth.",
  },
  {
    id: "faq-3",
    question: "Do I need to refrigerate the pouches before opening?",
    answer:
      "Unopened pouches stay fresh in your pantry for up to 12 months thanks to our gentle steam-seal process. Once opened, refrigerate and serve within 72 hours.",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Cats", "Dogs", "Kittens"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#FFF9FB] text-[#1F1924] overflow-x-hidden">
      {/* 1. Full-Screen Animated Pet Hero */}
      <Hero />

      {/* 2. Best-Selling Recipes Section with Scroll Pop-Up Product Cards */}
      <section id="shop" className="py-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F1924] leading-[1.05]"
            >
              Bowls Worth{" "}
              <span className="text-[#FF5C8D]">Purring For</span>
            </h2>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 bg-[#FCEBF1] p-1.5 rounded-full w-fit"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={display}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#FF6F9C] text-white shadow-md shadow-[#FF6F9C]/25"
                    : "text-[#6E5664] hover:text-[#1F1924]"
                }`}
              >
                {cat === "All" ? "All Recipes" : `For ${cat}`}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid — Images & Cards Pop Up on Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.86, y: 45 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 15,
                delay: idx * 0.1,
              }}
            >
              <Card className="group h-full flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-[0_28px_60px_-15px_rgba(232,69,122,0.18)]">
                <div>
                  {/* Pop-up Image Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#FFE8F0]">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <Badge variant={item.tagVariant}>{item.tag}</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#1F1924] flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#FFB400] text-[#FFB400]" />
                      <span>{item.rating}</span>
                      <span className="text-[#85778B]">({item.reviews})</span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#E8457A]">
                      <span>{item.protein}</span>
                      <span>•</span>
                      <span>{item.calories}</span>
                    </div>
                    <CardTitle className="group-hover:text-[#E8457A] transition-colors">
                      {item.name}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </div>

                <CardFooter className="pt-4 border-t border-[#F7ECF0]">
                  <div>
                    <span className="text-[11px] text-[#8E7F94] block">
                      Pack of 7 Pouches
                    </span>
                    <span
                      style={display}
                      className="text-2xl font-bold text-[#1F1924]"
                    >
                      {item.price}
                    </span>
                  </div>
                  <Button variant="lime" size="sm" style={display}>
                    <span>Add to Bowl</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Nutrition & Ingredients Showcase with Scroll Pop-Up Images */}
      <section
        id="nutrition"
        className="py-24 bg-gradient-to-b from-[#FFF2F6] to-[#FFF9FB] border-y border-[#F8E2EA]"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Pop-Up Image Collage */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.82, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 100, damping: 14 }}
                className="relative rounded-[34px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]"
              >
                <img
                  src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1100&q=85"
                  alt="Happy cat enjoying healthy life"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <Badge variant="lime" className="mb-1.5">
                      Real Whole Food
                    </Badge>
                    <p
                      style={display}
                      className="text-xl sm:text-2xl font-bold"
                    >
                      Zero Fillers. Zero Mystery Meat.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Nutrition Pillars */}
            <div className="lg:col-span-6 lg:pl-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="pink" className="mb-3">
                  The Wayora Standard
                </Badge>
                <h2
                  style={display}
                  className="text-3xl sm:text-5xl font-bold text-[#1F1924] leading-[1.06] mb-4"
                >
                  Real Kitchen Ingredients, Never Factory Pellets
                </h2>
                <p className="text-[#66596D] text-sm sm:text-base leading-relaxed">
                  Conventional dry kibble is cooked at extreme temperatures that
                  destroy natural nutrients. We gently steam whole cuts of meat
                  and vibrant superfoods so every bite is bursting with real
                  flavor.
                </p>
              </motion.div>

              <div className="space-y-4 pt-2">
                {nutritionPillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, x: 35, scale: 0.94 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 110,
                        damping: 15,
                        delay: i * 0.12,
                      }}
                    >
                      <Card className="p-5 flex items-start gap-4 hover:border-[#FF8FB1]">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${pillar.color}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3
                            style={display}
                            className="text-lg font-bold text-[#1F1924] mb-1"
                          >
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-[#6E6275] leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Scroll Pop-Up Pet Moments Gallery */}
      <section className="py-24 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge variant="lime" className="mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Happy Bowls Everyday</span>
          </Badge>
          <h2
            style={display}
            className="text-4xl sm:text-5xl font-bold text-[#1F1924] mb-3"
          >
            See the Glow in Every Whisker
          </h2>
          <p className="text-sm sm:text-base text-[#6E6275]">
            Watch how real, moisture-rich nutrition transforms mealtime excitement,
            coat softness, and daily playfulness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryMoments.map((moment, idx) => (
            <motion.div
              key={moment.title}
              initial={{
                opacity: 0,
                scale: 0.78,
                y: 50,
                rotate: idx % 2 === 0 ? -3 : 3,
              }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 14,
                delay: idx * 0.12,
              }}
              className="group relative rounded-[30px] overflow-hidden aspect-[4/5] shadow-xl border-4 border-white"
            >
              <img
                src={moment.image}
                alt={moment.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="outline">{moment.badge}</Badge>
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 style={display} className="text-xl font-bold">
                  {moment.title}
                </h3>
                <p className="text-xs text-white/80 mt-0.5">{moment.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Verified Pet Parent Reviews & FAQ Accordion (#reviews) */}
      <section
        id="reviews"
        className="py-24 bg-[#FFF0F5]/70 border-t border-[#F7DFEA]"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <Badge variant="pink" className="mb-3">
              4.9 ★ Average Rating
            </Badge>
            <h2
              style={display}
              className="text-4xl sm:text-5xl font-bold text-[#1F1924]"
            >
              Pet Parents Are Obsessed
            </h2>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-24">
            {reviews.map((rev, i) => (
              <motion.div
                key={rev.name}
                initial={{ opacity: 0, scale: 0.88, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 115,
                  damping: 15,
                  delay: i * 0.12,
                }}
              >
                <Card className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, s) => (
                          <Star
                            key={s}
                            className="w-4 h-4 fill-[#FFB400] text-[#FFB400]"
                          />
                        ))}
                      </div>
                      <Badge variant="secondary">{rev.highlight}</Badge>
                    </div>
                    <p className="text-[#3C3144] text-sm sm:text-[15px] leading-relaxed mb-6">
                      “{rev.quote}”
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-[#F5E8EE]">
                    <img
                      src={rev.avatar}
                      alt={rev.pet}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div>
                      <h4
                        style={display}
                        className="text-base font-bold text-[#1F1924] capitalize"
                      >
                        {rev.name}
                      </h4>
                      <p className="text-xs text-[#7D6E85]">{rev.pet}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section with shadcn Accordion */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h3
                style={display}
                className="text-3xl sm:text-4xl font-bold text-[#1F1924]"
              >
                Frequently Asked Questions
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Accordion items={faqs} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Starter Box CTA Banner + Footer */}
      <section className="py-20 px-5 sm:px-8 md:px-14 max-w-[1360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 16 }}
          className="relative rounded-[36px] overflow-hidden p-8 sm:p-12 lg:p-16 text-white shadow-2xl"
          style={{
            background:
              "radial-gradient(80% 100% at 20% 20%, #FF9EBB 0%, #FF6F9C 55%, #E8457A 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="lime">20% Off First Tasting Box</Badge>
              <h2
                style={display}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98]"
              >
                Ready for Happier Mealtime Purrs?
              </h2>
              <p className="text-white/90 text-sm sm:text-base max-w-lg leading-relaxed">
                Build a custom tasting box tailored to your cat or dog’s age,
                weight, and favorite proteins. Free shipping on your first trial.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="lime" size="lg" style={display}>
                  <span>Build Your Tasting Box</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <span className="text-xs sm:text-sm text-white/90 font-medium">
                  ✦ 100% Clean-Bowl Guarantee
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <motion.img
                initial={{ scale: 0.8, rotate: 4 }}
                whileInView={{ scale: 1, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 110, damping: 13 }}
                src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=85"
                alt="Cute cat waiting for food"
                className="w-64 sm:w-72 h-64 sm:h-72 object-cover rounded-[32px] border-4 border-white/80 shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="py-12 border-t border-[#F2E2E9] bg-white px-5 sm:px-8 md:px-14">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div
            className="flex items-center gap-2 text-[#E8457A]"
            style={display}
          >
            <span className="text-2xl font-bold tracking-wide">WAYORA</span>
            <PawPrint className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#6E6275] font-medium">
            <a href="#shop" className="hover:text-[#E8457A] transition">
              Shop Recipes
            </a>
            <a href="#nutrition" className="hover:text-[#E8457A] transition">
              Our Nutrition
            </a>
            <a href="#reviews" className="hover:text-[#E8457A] transition">
              Reviews & FAQ
            </a>
          </div>
          <p className="text-xs text-[#96889E]">
            © 2026 Wayora Pet Nutrition. Made with love for happy pets.
          </p>
        </div>
      </footer>
    </main>
  );
}

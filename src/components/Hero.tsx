"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";

const display = { fontFamily: "var(--font-display)" } as const;

/* Counts up automatically once visible */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => (node.textContent = Math.round(v) + suffix),
    });
    return () => controls.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* Staggered word-by-word animated subtitle */
function AnimatedSubtitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.045, delayChildren: 0.5 },
        },
      }}
      className="text-white/95 text-sm sm:text-base max-w-[310px] mb-5 leading-snug flex flex-wrap gap-x-1.5 gap-y-0.5"
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.45, ease: "easeOut" },
            },
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* Headline: each line pops in and gently floats */
function Headline() {
  const lines = ["CHOOSE", "YOUR", "PURR-FECT"];
  return (
    <h1
      style={display}
      className="text-white font-bold leading-[0.92] tracking-tight text-[15cqw] sm:text-[11cqw] lg:text-[min(8.2cqw,13vh)] drop-shadow-[0_6px_0_rgba(190,40,100,0.25)]"
    >
      {lines.map((word, idx) => (
        <span key={word} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: 0.2 + 0.14 * idx,
            }}
            className="inline-block"
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.6,
                delay: idx * 0.35,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const catFaces = [
  "/images/pet-hero.png",
  "/images/cat-surprised.jpg",
  "/images/cat-happy.jpg",
  "/images/cat-sleepy.jpg",
];

export default function Hero() {
  /* Track both current and previous face so the new expression smoothly morphs in ON TOP
     of the previous one (100% opaque underneath -> zero dimming/shading, ultra-smooth morph) */
  const [faceState, setFaceState] = useState<{ prev: number; current: number }>({
    prev: 0,
    current: 0,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setFaceState((s) => ({
        prev: s.current,
        current: (s.current + 1) % catFaces.length,
      }));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[640px] bg-[#FF8FB1]">
      <div
        className="@container relative w-full h-full overflow-hidden flex flex-col"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 45%, #FFB3C8 0%, #FF8FB1 45%, #FF6F9C 100%)",
        }}
      >
        {/* Cat Scene with Smooth Zero-Shade Facial Expression Morphing */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* 1. Permanent solid base layer */}
          <Image
            src={catFaces[0]}
            alt="Fluffy cat changing expressions"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%] select-none"
          />

          {/* 2. Previous expression held at 100% opacity underneath during transition */}
          {catFaces.map((src, i) => (
            <Image
              key={`prev-${src}`}
              src={src}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_60%] select-none"
              style={{
                opacity: faceState.prev === i ? 1 : 0,
                zIndex: faceState.prev === i ? 1 : 0,
              }}
            />
          ))}

          {/* 3. Active expression smoothly morphing in on top */}
          {catFaces.map((src, i) => {
            const isActive = faceState.current === i;
            return (
              <motion.div
                key={`curr-${src}`}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  duration: isActive ? 0.55 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
                style={{ zIndex: isActive ? 2 : 0 }}
              >
                <Image
                  src={src}
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[50%_60%] select-none"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Professional Navbar */}
        <Navbar />

        {/* Content */}
        <div className="relative z-20 flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 pb-8 sm:pb-12 pt-10 sm:pt-12 flex flex-col justify-end">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left: Animated Subtitle, Headline & CTA */}
            <div className="max-w-full lg:max-w-[48%]">
              <AnimatedSubtitle text="Fresh, natural meals your pet will absolutely love. Made with real ingredients and a whole lot of care." />

              <Headline />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mt-6"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <Link
                    href="#shop"
                    style={display}
                    className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#D9F27A] text-[#2d3a00] text-lg font-semibold shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition"
                  >
                    Feed me!
                    <span className="w-10 h-10 rounded-full bg-[#2d3a00] text-[#D9F27A] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Animated Glass Stats Badges (Chicken & Salmon card removed) */}
            <div className="flex sm:flex-row lg:flex-col items-start sm:items-end justify-start lg:justify-end gap-4 sm:gap-5 pb-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 25 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: [0, -5, 0] }}
                transition={{
                  opacity: { delay: 0.7, duration: 0.6 },
                  scale: { delay: 0.7, duration: 0.6, type: "spring" },
                  x: { delay: 0.7, duration: 0.6 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                }}
                className="px-5 py-3.5 rounded-3xl bg-white/18 backdrop-blur-md border border-white/35 text-white text-left lg:text-right shadow-lg shadow-[#d43f73]/10"
                style={display}
              >
                <div className="text-3xl sm:text-4xl font-bold leading-none text-[#FFF6C5]">
                  <CountUp to={100} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-white/95 font-normal mt-1">
                  natural ingredients
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 25 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: [0, -5, 0] }}
                transition={{
                  opacity: { delay: 0.9, duration: 0.6 },
                  scale: { delay: 0.9, duration: 0.6, type: "spring" },
                  x: { delay: 0.9, duration: 0.6 },
                  y: {
                    repeat: Infinity,
                    duration: 4.4,
                    delay: 0.5,
                    ease: "easeInOut",
                  },
                }}
                className="px-5 py-3.5 rounded-3xl bg-white/18 backdrop-blur-md border border-white/35 text-white text-left lg:text-right shadow-lg shadow-[#d43f73]/10"
                style={display}
              >
                <div className="text-3xl sm:text-4xl font-bold leading-none text-[#FFF6C5]">
                  <CountUp to={30} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-white/95 font-normal mt-1">
                  tasty recipes
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

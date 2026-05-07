"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const words = ["Ship Faster.", "Collaborate", "Smarter."];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black/[0.96]">
      {/* Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Ambient blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-600/[0.08] rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12 py-16">
        {/* ── Left: text content ── */}
        <div className="flex-1 flex flex-col items-start">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={prefersReduced ? undefined : fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Now in public beta — free for teams up to 5
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={prefersReduced ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={prefersReduced ? undefined : wordVariants}
                className={`inline-block mr-[0.25em] ${
                  i === 1
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={0.8}
            variants={prefersReduced ? undefined : fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed"
          >
            FlowSync unifies your tasks, team, and timelines into one seamless
            workspace. Stop context-switching — start shipping.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={1.1}
            variants={prefersReduced ? undefined : fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-start gap-4 mb-12"
          >
            <motion.a
              href="#pricing"
              whileHover={prefersReduced ? undefined : { scale: 1.04 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              className="relative group px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow duration-300 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Start for free</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#features"
              whileHover={prefersReduced ? undefined : { scale: 1.03 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/20 hover:bg-white/10 font-medium text-base transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              See how it works
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={1.4}
            variants={prefersReduced ? undefined : fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/40 text-sm"
          >
            <div className="flex -space-x-2">
              {["A", "B", "C", "D", "E"].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `hsl(${200 + i * 30}, 70%, 45%)` }}
                >
                  {l}
                </div>
              ))}
            </div>
            <span>
              Trusted by{" "}
              <span className="text-white/70 font-semibold">2,400+ teams</span>{" "}
              worldwide
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="ml-1">4.9/5</span>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Spline 3D scene ── */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full h-[480px] lg:h-[580px] relative rounded-2xl overflow-hidden border border-white/10"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
          {/* Subtle edge fade */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}

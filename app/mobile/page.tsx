"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";

/* ─────────────────────────────────────────────
   SHARED ANIMATION VARIANTS  (same as desktop)
───────────────────────────────────────────── */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const priceVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const features = [
  { path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 12v4m-2-2h4", title: "Smart Task Boards", description: "Drag-and-drop kanban boards that adapt to your workflow. Auto-assign priorities before they slow you down.", accent: "blue" as const },
  { path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Team Collaboration", description: "Real-time presence, threaded comments, and shared workspaces. Your whole team, in sync.", accent: "purple" as const },
  { path: "M13 10V3L4 14h7v7l9-11h-7z", title: "AI-Powered Insights", description: "Predict delays, suggest reprioritizations, and keep you on track automatically.", accent: "cyan" as const },
  { path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Timeline & Gantt", description: "Visualize your entire roadmap. Drag milestones and keep stakeholders aligned.", accent: "blue" as const },
  { path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Advanced Analytics", description: "Velocity charts, burndown reports, and custom dashboards for confident decisions.", accent: "purple" as const },
  { path: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z", title: "100+ Integrations", description: "Connect GitHub, Slack, Figma, Jira, and 100+ tools. FlowSync lives where your team works.", accent: "cyan" as const },
];

const accentMap = {
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   icon: "text-blue-400",   glow: "group-hover:shadow-blue-500/20" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400", glow: "group-hover:shadow-purple-500/20" },
  cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   icon: "text-cyan-400",   glow: "group-hover:shadow-cyan-500/20" },
};

const plans = [
  { name: "Starter",    desc: "Perfect for small teams getting started.", monthly: 0,  annual: 0,  features: ["Up to 5 team members", "10 active projects", "Basic task boards", "1 GB file storage", "Community support"],                                                                   cta: "Start free",          popular: false },
  { name: "Pro",        desc: "The complete toolkit for growing teams.",  monthly: 18, annual: 14, features: ["Up to 50 team members", "Unlimited projects", "Advanced kanban & timeline", "AI-powered insights", "50 GB file storage", "Priority email support", "100+ integrations"], cta: "Start 14-day trial",  popular: true },
  { name: "Enterprise", desc: "Custom solutions for large organizations.",monthly: 45, annual: 36, features: ["Unlimited team members", "Unlimited everything", "Custom AI workflows", "SSO & SCIM provisioning", "Unlimited storage", "Dedicated success manager", "SLA guarantee"], cta: "Contact sales",        popular: false },
];

const testimonials = [
  { quote: "FlowSync replaced four tools we were juggling. Our sprint velocity went up 40% in the first month. I genuinely can't imagine going back.",              name: "Sarah Chen",      role: "VP of Engineering",     company: "Helion",         initials: "SC", color: "#3b82f6", stars: 5 },
  { quote: "The AI insights flagged a dependency bottleneck two weeks before it would have derailed our Q3 launch. Game-changer.",                                   name: "Marcus Webb",     role: "Product Lead",          company: "Archetype Labs", initials: "MW", color: "#8b5cf6", stars: 5 },
  { quote: "We've tried Asana, Linear, Jira. FlowSync is the first tool that fits how our remote team thinks. Setup took 20 minutes.",                              name: "Priya Nair",      role: "CTO",                   company: "Vanta Systems",  initials: "PN", color: "#06b6d4", stars: 5 },
  { quote: "The timeline view alone is worth the price. My stakeholders finally understand what's in flight without asking me.",                                     name: "James Kowalski",  role: "Director of Operations",company: "Meridian Co.",   initials: "JK", color: "#3b82f6", stars: 5 },
  { quote: "Customer support is outstanding. They jumped on a call within 30 minutes when we had a migration question. Rare to see that kind of care.",              name: "Lucia Fernandez", role: "Head of Product",       company: "Solaris AI",     initials: "LF", color: "#8b5cf6", stars: 5 },
  { quote: "FlowSync's integrations are deep, not shallow. The GitHub sync is particularly impressive — PRs and tasks stay perfectly linked.",                      name: "Tom Adeyemi",     role: "Senior Engineer",       company: "Crux Labs",      initials: "TA", color: "#06b6d4", stars: 5 },
];

const footerSections = [
  { title: "Product",   links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company",   links: ["About", "Blog", "Careers", "Press"] },
  { title: "Resources", links: ["Documentation", "API Reference", "Status", "Community"] },
  { title: "Legal",     links: ["Privacy", "Terms", "Security", "Cookies"] },
];

const socialPaths: Record<string, string> = {
  "Twitter / X": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635 5.904-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  GitHub:       "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  LinkedIn:     "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
};

/* ─────────────────────────────────────────────
   SMALL ICONS
───────────────────────────────────────────── */
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-400" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const LogoIcon = ({ size = 7 }: { size?: number }) => (
  <span
    className={`w-${size} h-${size} rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0`}
  >
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function MobilePage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const prefersReduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pass scroll container as IntersectionObserver root so whileInView
  // triggers relative to the phone's scroll area, not the window.
  const vp = { once: true, margin: "-40px", root: scrollRef };

  return (
    <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center py-12 px-4">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3  w-[600px] h-[500px] bg-purple-600/[0.07] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[110px]" />
      </div>


      {/* ═══════════════ PHONE FRAME ═══════════════ */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        {/* Volume buttons (left) */}
        <div className="absolute -left-[4px] top-[118px] w-[4px] h-8  bg-gradient-to-b from-[#404040] to-[#252525] rounded-l-full shadow-[-2px_0_4px_rgba(0,0,0,0.5)]" />
        <div className="absolute -left-[4px] top-[162px] w-[4px] h-12 bg-gradient-to-b from-[#404040] to-[#252525] rounded-l-full shadow-[-2px_0_4px_rgba(0,0,0,0.5)]" />
        <div className="absolute -left-[4px] top-[218px] w-[4px] h-12 bg-gradient-to-b from-[#404040] to-[#252525] rounded-l-full shadow-[-2px_0_4px_rgba(0,0,0,0.5)]" />
        {/* Power button (right) */}
        <div className="absolute -right-[4px] top-[162px] w-[4px] h-16 bg-gradient-to-b from-[#404040] to-[#252525] rounded-r-full shadow-[2px_0_4px_rgba(0,0,0,0.5)]" />

        {/* Outer metal frame */}
        <div
          className="relative w-[375px] rounded-[54px]"
          style={{
            background: "linear-gradient(160deg, #3e3e3e 0%, #1c1c1c 50%, #2a2a2a 100%)",
            padding: "3px",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.07), " +
              "0 60px 120px rgba(0,0,0,0.95), " +
              "0 30px 60px rgba(0,0,0,0.6), " +
              "inset 0 1px 0 rgba(255,255,255,0.13), " +
              "inset 0 -1px 0 rgba(0,0,0,0.4)",
          }}
        >
          {/* Screen bezel */}
          <div
            className="rounded-[51px] overflow-hidden bg-[#0a0a0a]"
            style={{ height: "812px" }}
          >
            {/* ── Status bar ── */}
            <div className="relative bg-[#0a0a0a] px-7 pt-3 pb-2.5 flex items-center justify-between">
              {/* Dynamic Island */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 bg-black rounded-full"
                style={{ width: "120px", height: "34px", boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
              />
              {/* Time */}
              <span className="text-white text-[13px] font-semibold relative z-10">9:41</span>
              {/* Icons */}
              <div className="flex items-center gap-1.5 relative z-10">
                {/* Signal bars */}
                <div className="flex items-end gap-[2px]">
                  {([3, 5, 7, 9] as number[]).map((h, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-[1px]"
                      style={{ height: `${h}px`, background: i < 3 ? "white" : "rgba(255,255,255,0.28)" }}
                    />
                  ))}
                </div>
                {/* Wifi */}
                <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] text-white">
                  <path d="M1.5 8.5C5 5 9.3 3 12 3s7 2 10.5 5.5M4.5 11.5C7 9 9.5 8 12 8s5 1 7.5 3.5M7.5 14.5C9 13 10.5 12.5 12 12.5s3 .5 4.5 2M12 18h.01"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-[22px] h-[11px] rounded-[3px] border border-white/55 relative flex items-center px-[2px]">
                    <div className="h-[6px] rounded-[1px] bg-white" style={{ width: "75%" }} />
                  </div>
                  <div className="w-[2px] h-[6px] bg-white/40 rounded-r-sm ml-[2px]" />
                </div>
              </div>
            </div>

            {/* ── Scrollable content ── */}
            <div
              ref={scrollRef}
              className="overflow-y-auto overflow-x-hidden bg-[#0a0a0a] text-white"
              style={{ height: "calc(812px - 52px)", scrollbarWidth: "none" }}
            >

              {/* ── NAVBAR ── */}
              <motion.header
                initial={prefersReduced ? false : { y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
              >
                <nav className="flex items-center justify-between px-4 py-3">
                  <a href="#" className="flex items-center gap-2 cursor-pointer">
                    <LogoIcon size={7} />
                    <span className="text-[15px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      FlowSync
                    </span>
                  </a>
                  <motion.a
                    href="#"
                    whileHover={prefersReduced ? {} : { scale: 1.03 }}
                    whileTap={prefersReduced ? {} : { scale: 0.97 }}
                    className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    Get Started
                  </motion.a>
                </nav>
              </motion.header>

              {/* ── HERO ── */}
              <section className="relative overflow-hidden bg-black/[0.96]">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-[280px] h-[220px] bg-purple-600/10 rounded-full blur-[70px]" />
                  <div className="absolute bottom-0 right-0 w-[200px] h-[160px] bg-blue-600/[0.08] rounded-full blur-[60px]" />
                  <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* Text content — padded */}
                <div className="relative z-10 px-5 pt-8 pb-6">
                  {/* Beta badge */}
                  <motion.div
                    custom={0}
                    variants={prefersReduced ? undefined : fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Now in public beta — free for teams up to 5
                  </motion.div>

                  {/* Headline — word-by-word stagger (same as desktop) */}
                  <motion.h1
                    variants={
                      prefersReduced
                        ? undefined
                        : { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
                    }
                    initial="hidden"
                    animate="visible"
                    className="text-[2rem] font-extrabold leading-[1.1] tracking-tight mb-4"
                  >
                    {(["Ship Faster.", "Collaborate", "Smarter."] as string[]).map((word, i) => (
                      <motion.span
                        key={i}
                        variants={prefersReduced ? undefined : wordVariants}
                        className={`inline-block mr-[0.2em] ${
                          i === 1
                            ? "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                            : "text-white"
                        }`}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>

                  {/* Sub */}
                  <motion.p
                    custom={0.8}
                    variants={prefersReduced ? undefined : fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-sm text-white/50 mb-8 leading-relaxed"
                  >
                    FlowSync unifies your tasks, team, and timelines into one seamless workspace.
                    Stop context-switching — start shipping.
                  </motion.p>

                  {/* CTA buttons */}
                  <motion.div
                    custom={1.0}
                    variants={prefersReduced ? undefined : fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-3 mb-8"
                  >
                    <motion.a
                      href="#"
                      whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                      className="relative group py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm text-center shadow-xl shadow-blue-500/30 cursor-pointer overflow-hidden"
                    >
                      <span className="relative z-10">Start for free</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.a>

                    <motion.a
                      href="#"
                      whileHover={prefersReduced ? undefined : { scale: 1.01 }}
                      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium cursor-pointer transition-all duration-200"
                    >
                      See how it works
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.a>
                  </motion.div>

                  {/* Social proof */}
                  <motion.div
                    custom={1.3}
                    variants={prefersReduced ? undefined : fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap items-center gap-3 text-white/40 text-xs"
                  >
                    <div className="flex -space-x-1.5">
                      {(["A", "B", "C", "D", "E"] as string[]).map((l, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-[9px] font-bold text-white"
                          style={{ background: `hsl(${200 + i * 30},70%,45%)` }}
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                    <span>
                      Trusted by{" "}
                      <span className="text-white/70 font-semibold">2,400+ teams</span>
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                      <span className="ml-1">4.9/5</span>
                    </div>
                  </motion.div>

                </div>

                {/* ── Interactive 3D scene — full width, outside padded div ── */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-[420px] border-t border-white/10 overflow-hidden"
                >
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none ring-inset ring-white/10" />
                  <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </motion.div>
              </section>

              {/* ── FEATURES ── */}
              <section id="features" className="relative py-12 px-5">
                <motion.div
                  variants={prefersReduced ? undefined : sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  className="text-center mb-8"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
                    Everything you need
                  </span>
                  <h2 className="text-[1.6rem] font-extrabold tracking-tight text-white mb-3">
                    Built for how modern{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      teams work
                    </span>
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed">
                    FlowSync combines task management, collaboration, and automation in one beautiful workspace.
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                  {features.map((feat, i) => {
                    const a = accentMap[feat.accent];
                    return (
                      <motion.div
                        key={feat.title}
                        custom={i}
                        variants={prefersReduced ? undefined : cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        whileHover={prefersReduced ? undefined : { y: -2, transition: { duration: 0.2 } }}
                        className={`group flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/15 hover:shadow-xl ${a.glow} transition-all duration-300 cursor-pointer`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center shrink-0`}>
                          <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${a.icon}`} stroke="currentColor" aria-hidden="true">
                            <path d={feat.path} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-1">{feat.title}</h3>
                          <p className="text-white/50 text-xs leading-relaxed">{feat.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* ── PRICING ── */}
              <section id="pricing" className="relative py-12 px-5">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-600/[0.07] rounded-full blur-[100px]" />
                </div>

                <div className="relative">
                  <motion.div
                    variants={prefersReduced ? undefined : sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    className="text-center mb-8"
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-3">
                      Simple pricing
                    </span>
                    <h2 className="text-[1.6rem] font-extrabold tracking-tight text-white mb-3">
                      Invest in your team&apos;s{" "}
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        velocity
                      </span>
                    </h2>
                    <p className="text-white/50 text-sm">Start free, scale when you&apos;re ready. No hidden fees.</p>

                    {/* Billing toggle — spring animation same as desktop */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <span className={`text-xs font-medium transition-colors ${!isAnnual ? "text-white" : "text-white/40"}`}>
                        Monthly
                      </span>
                      <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${
                          isAnnual ? "bg-blue-500" : "bg-white/20"
                        }`}
                        aria-label={`Switch to ${isAnnual ? "monthly" : "annual"} billing`}
                      >
                        <motion.span
                          layout
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow ${isAnnual ? "left-5" : "left-0.5"}`}
                        />
                      </button>
                      <span className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isAnnual ? "text-white" : "text-white/40"}`}>
                        Annual
                        <span className="px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-semibold">
                          Save 22%
                        </span>
                      </span>
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-4">
                    {plans.map((plan, i) => (
                      <motion.div
                        key={plan.name}
                        custom={i}
                        variants={prefersReduced ? undefined : cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        whileHover={prefersReduced ? undefined : { y: -2, transition: { duration: 0.2 } }}
                        className={`relative rounded-2xl p-5 backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                          plan.popular
                            ? "bg-gradient-to-b from-blue-500/15 to-purple-500/10 border-blue-500/40 shadow-2xl shadow-blue-500/10"
                            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                              Most Popular
                            </span>
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-base font-bold text-white mb-0.5">{plan.name}</h3>
                            <p className="text-xs text-white/50">{plan.desc}</p>
                          </div>

                          {/* AnimatePresence price swap — same as desktop */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={isAnnual ? "annual" : "monthly"}
                              variants={prefersReduced ? undefined : priceVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="text-right"
                            >
                              <span className="text-2xl font-extrabold text-white">
                                {plan.monthly === 0 ? "Free" : `$${isAnnual ? plan.annual : plan.monthly}`}
                              </span>
                              {plan.monthly > 0 && (
                                <span className="text-white/40 text-xs ml-0.5">/mo</span>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <motion.a
                          href="#"
                          whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                          whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                          className={`block w-full text-center py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer mb-4 ${
                            plan.popular
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                              : "bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20"
                          }`}
                        >
                          {plan.cta}
                        </motion.a>

                        <ul className="space-y-2">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                              <CheckIcon />
                              {f}
                            </li>
                          ))}
                        </ul>

                        {plan.monthly > 0 && isAnnual && (
                          <p className="text-[10px] text-white/30 mt-3">Billed ${plan.annual * 12}/year</p>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    variants={prefersReduced ? undefined : sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    className="text-center text-white/30 text-xs mt-6"
                  >
                    All plans include a 14-day free trial. No credit card required.
                  </motion.p>
                </div>
              </section>

              {/* ── TESTIMONIALS ── */}
              <section id="testimonials" className="relative py-12 px-5">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-[300px] h-[200px] bg-blue-600/[0.06] rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 right-0 w-[250px] h-[180px] bg-purple-600/[0.06] rounded-full blur-[70px]" />
                </div>

                <div className="relative">
                  <motion.div
                    variants={prefersReduced ? undefined : sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    className="text-center mb-8"
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-3">
                      What teams say
                    </span>
                    <h2 className="text-[1.6rem] font-extrabold tracking-tight text-white mb-3">
                      Trusted by teams who{" "}
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        ship fast
                      </span>
                    </h2>
                    <p className="text-white/50 text-sm">
                      Don&apos;t take our word for it — here&apos;s what engineering leads are saying.
                    </p>
                  </motion.div>

                  <div className="flex flex-col gap-3">
                    {testimonials.map((t, i) => (
                      <motion.div
                        key={t.name}
                        custom={i}
                        variants={prefersReduced ? undefined : cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={vp}
                        whileHover={prefersReduced ? undefined : { y: -2, transition: { duration: 0.2 } }}
                        className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300 cursor-pointer flex flex-col gap-3"
                      >
                        <div className="flex gap-0.5">
                          {[...Array(t.stars)].map((_, s) => <StarIcon key={s} />)}
                        </div>
                        <blockquote className="text-xs text-white/70 leading-relaxed">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.08]">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: t.color + "33", border: `1px solid ${t.color}66` }}
                          >
                            <span style={{ color: t.color }}>{t.initials}</span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">{t.name}</p>
                            <p className="text-[11px] text-white/40">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats bar */}
                  <motion.div
                    variants={prefersReduced ? undefined : sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={vp}
                    className="mt-8 flex flex-col gap-4 py-5 px-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    {[
                      { val: "2,400+", label: "Teams using FlowSync" },
                      { val: "98%",    label: "Customer satisfaction" },
                      { val: "4.9/5",  label: "Average rating" },
                    ].map(({ val, label }) => (
                      <div key={label} className="text-center">
                        <p className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {val}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* ── CTA ── */}
              <section className="relative py-12 px-5 overflow-hidden">
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl overflow-hidden border border-white/10 p-7 text-center"
                >
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-cyan-600/10" />
                  <div aria-hidden="true" className="absolute inset-0 backdrop-blur-sm" />
                  <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-blue-600/20 rounded-full blur-[60px]" />

                  <div className="relative z-10">
                    <motion.span
                      initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={vp}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-medium mb-4"
                    >
                      Start shipping today
                    </motion.span>

                    <motion.h2
                      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vp}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-2xl font-extrabold tracking-tight text-white mb-4 leading-tight"
                    >
                      Your team&apos;s best work{" "}
                      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        starts with FlowSync
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vp}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-white/50 text-sm mb-6 leading-relaxed"
                    >
                      Join 2,400+ teams already shipping faster. Set up your workspace in minutes, no credit card required.
                    </motion.p>

                    <motion.div
                      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vp}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex flex-col gap-3"
                    >
                      <motion.a
                        href="#"
                        whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                        className="group relative py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm text-center shadow-xl shadow-blue-500/30 cursor-pointer overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Get started for free
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>

                      <motion.a
                        href="#"
                        whileHover={prefersReduced ? undefined : { scale: 1.01 }}
                        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                        className="py-3.5 rounded-xl border border-white/20 bg-white/10 text-white text-sm font-medium text-center hover:bg-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer"
                      >
                        Book a demo
                      </motion.a>
                    </motion.div>

                    <motion.p
                      initial={prefersReduced ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={vp}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="mt-4 text-xs text-white/30"
                    >
                      Free forever for up to 5 users. Upgrade anytime.
                    </motion.p>
                  </div>
                </motion.div>
              </section>

              {/* ── FOOTER ── */}
              <footer className="border-t border-white/[0.08] px-5 py-8">
                {/* Brand + social */}
                <div className="mb-7">
                  <a href="#" className="flex items-center gap-2 cursor-pointer mb-3">
                    <LogoIcon size={7} />
                    <span className="text-[15px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      FlowSync
                    </span>
                  </a>
                  <p className="text-xs text-white/40 leading-relaxed mb-4 max-w-[200px]">
                    Project management that moves at your speed.
                  </p>
                  <div className="flex gap-2">
                    {Object.entries(socialPaths).map(([label, d]) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={label}
                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d={d} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Link grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-7">
                  {footerSections.map(({ title, links }) => (
                    <div key={title}>
                      <p className="text-xs font-semibold text-white mb-3">{title}</p>
                      <ul className="space-y-2">
                        {links.map((link) => (
                          <li key={link}>
                            <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-white/[0.08] text-center">
                  <p className="text-[11px] text-white/30">© 2025 FlowSync, Inc. All rights reserved.</p>
                </div>
              </footer>

              {/* Home indicator */}
              <div className="flex justify-center py-3 bg-[#0a0a0a]">
                <div className="w-28 h-[4px] bg-white/25 rounded-full" />
              </div>

            </div>{/* end scrollable */}
          </div>{/* end screen */}
        </div>{/* end outer frame */}
      </motion.div>

    </div>
  );
}

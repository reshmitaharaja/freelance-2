"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const testimonials = [
  {
    quote: "FlowSync replaced four tools we were juggling. Our sprint velocity went up 40% in the first month. I genuinely can't imagine going back.",
    name: "Sarah Chen", role: "VP of Engineering", company: "Helion", initials: "SC", color: "#3b82f6", stars: 5,
  },
  {
    quote: "The AI insights are scary good. It flagged a dependency bottleneck two weeks before it would have derailed our Q3 launch. Game-changer.",
    name: "Marcus Webb", role: "Product Lead", company: "Archetype Labs", initials: "MW", color: "#8b5cf6", stars: 5,
  },
  {
    quote: "We've tried everything — Asana, Linear, Jira. FlowSync is the first tool that actually fits how our remote team thinks. Setup took 20 minutes.",
    name: "Priya Nair", role: "CTO", company: "Vanta Systems", initials: "PN", color: "#06b6d4", stars: 5,
  },
  {
    quote: "The timeline view alone is worth the price. My stakeholders finally understand what's in flight and what's coming next without asking me.",
    name: "James Kowalski", role: "Director of Operations", company: "Meridian Co.", initials: "JK", color: "#3b82f6", stars: 5,
  },
  {
    quote: "Customer support is outstanding. They jumped on a call within 30 minutes when we had a migration question. Rare to see that kind of care.",
    name: "Lucia Fernandez", role: "Head of Product", company: "Solaris AI", initials: "LF", color: "#8b5cf6", stars: 5,
  },
  {
    quote: "FlowSync's integrations are deep, not shallow. The GitHub sync is particularly impressive — PRs and tasks stay perfectly linked.",
    name: "Tom Adeyemi", role: "Senior Engineer", company: "Crux Labs", initials: "TA", color: "#06b6d4", stars: 5,
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Testimonials() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="testimonials" className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-blue-600/[0.08] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-purple-600/[0.08] rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={prefersReduced ? undefined : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            What teams say
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Trusted by teams who{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ship fast
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what engineering leads and product teams are saying.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={prefersReduced ? undefined : cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300 cursor-pointer flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {[...Array(t.stars)].map((_, s) => <StarIcon key={s} />)}
              </div>

              <blockquote className="text-sm text-white/70 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.08]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: t.color + "33", border: `1px solid ${t.color}66` }}
                >
                  <span style={{ color: t.color }}>{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={prefersReduced ? undefined : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 py-6 px-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          {[
            { val: "2,400+", label: "Teams using FlowSync" },
            { val: "98%", label: "Customer satisfaction" },
            { val: "4.9/5", label: "Average rating" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{val}</p>
              <p className="text-sm text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

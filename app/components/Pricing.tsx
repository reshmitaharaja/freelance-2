"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for small teams getting started.",
    monthly: 0,
    annual: 0,
    features: ["Up to 5 team members", "10 active projects", "Basic task boards", "1 GB file storage", "Community support"],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    desc: "The complete toolkit for growing teams.",
    monthly: 18,
    annual: 14,
    features: ["Up to 50 team members", "Unlimited projects", "Advanced kanban & timeline", "AI-powered insights", "50 GB file storage", "Priority email support", "100+ integrations"],
    cta: "Start 14-day trial",
    popular: true,
  },
  {
    name: "Enterprise",
    desc: "Custom solutions for large organizations.",
    monthly: 45,
    annual: 36,
    features: ["Unlimited team members", "Unlimited everything", "Custom AI workflows", "SSO & SCIM provisioning", "Unlimited storage", "Dedicated success manager", "SLA guarantee"],
    cta: "Contact sales",
    popular: false,
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
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const priceVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const prefersReduced = useReducedMotion();

  return (
    <section id="pricing" className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/[0.08] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={prefersReduced ? undefined : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Simple pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Invest in your team&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">velocity</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Start free, scale when you&apos;re ready. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-white/40"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none ${isAnnual ? "bg-blue-500" : "bg-white/20"}`}
              aria-label={`Switch to ${isAnnual ? "monthly" : "annual"} billing`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow ${isAnnual ? "left-7" : "left-1"}`}
              />
            </button>
            <span className={`flex items-center gap-2 text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-white/40"}`}>
              Annual
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                Save 22%
              </span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i}
              variants={prefersReduced ? undefined : cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl p-7 backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                plan.popular
                  ? "bg-gradient-to-b from-blue-500/15 to-purple-500/10 border-blue-500/40 shadow-2xl shadow-blue-500/10 md:scale-105"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-white/50">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isAnnual ? "annual" : "monthly"}
                    variants={prefersReduced ? undefined : priceVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-end gap-1"
                  >
                    <span className="text-4xl font-extrabold text-white">
                      {plan.monthly === 0 ? "Free" : `$${isAnnual ? plan.annual : plan.monthly}`}
                    </span>
                    {plan.monthly > 0 && (
                      <span className="text-white/40 text-sm mb-1.5">/ mo</span>
                    )}
                  </motion.div>
                </AnimatePresence>
                {plan.monthly > 0 && isAnnual && (
                  <p className="text-xs text-white/30 mt-1">Billed ${plan.annual * 12}/year</p>
                )}
              </div>

              <motion.a
                href="#"
                whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer mb-7 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    : "bg-white/10 text-white hover:bg-white/15 border border-white/10 hover:border-white/20"
                }`}
              >
                {plan.cta}
              </motion.a>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={prefersReduced ? undefined : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-10"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function CTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/10 p-10 md:p-16 text-center"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-cyan-600/10" />
          <div aria-hidden="true" className="absolute inset-0 backdrop-blur-sm" />
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium mb-6"
            >
              Start shipping today
            </motion.span>

            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight"
            >
              Your team&apos;s best work{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                starts with FlowSync
              </span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Join 2,400+ teams already shipping faster. Set up your workspace in minutes, no credit card required.
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#"
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow duration-300 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get started for free
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={prefersReduced ? undefined : { scale: 1.03 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                className="px-8 py-4 rounded-xl border border-white/20 bg-white/10 text-white font-medium text-base hover:bg-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                Book a demo
              </motion.a>
            </motion.div>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-sm text-white/30"
            >
              Free forever for up to 5 users. Upgrade anytime.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

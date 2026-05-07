"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const navLinks = ["Features", "Pricing", "Testimonials"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={prefersReduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-black/70 border-white/10 backdrop-blur-xl shadow-2xl"
            : "bg-white/5 border-white/10 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 cursor-pointer group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-white"
              aria-hidden="true"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            FlowSync
          </span>
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Sign in
          </a>
          <motion.a
            href="#pricing"
            whileHover={prefersReduced ? {} : { scale: 1.03 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            className="text-sm font-semibold px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow duration-300 cursor-pointer"
          >
            Get Started
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}

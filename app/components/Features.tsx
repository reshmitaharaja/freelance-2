"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const features = [
  {
    icon: (
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 12v4m-2-2h4"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      />
    ),
    title: "Smart Task Boards",
    description: "Drag-and-drop kanban boards that adapt to your workflow. Auto-assign priorities and surface blockers before they slow you down.",
    accent: "blue",
  },
  {
    icon: (
      <path
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      />
    ),
    title: "Team Collaboration",
    description: "Real-time presence, threaded comments, and shared workspaces. Your whole team, in sync — from standup to ship.",
    accent: "purple",
  },
  {
    icon: (
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    ),
    title: "AI-Powered Insights",
    description: "FlowSync's AI analyzes patterns across your projects to predict delays, suggest reprioritizations, and keep you on track.",
    accent: "cyan",
  },
  {
    icon: (
      <path
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      />
    ),
    title: "Timeline & Gantt",
    description: "Visualize your entire roadmap at a glance. Drag milestones, adjust dependencies, and keep stakeholders aligned.",
    accent: "blue",
  },
  {
    icon: (
      <path
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      />
    ),
    title: "Advanced Analytics",
    description: "Velocity charts, burndown reports, and custom dashboards give you the clarity to make confident decisions fast.",
    accent: "purple",
  },
  {
    icon: (
      <path
        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      />
    ),
    title: "100+ Integrations",
    description: "Connect GitHub, Slack, Figma, Jira, and 100+ tools. FlowSync lives where your team works, not the other way around.",
    accent: "cyan",
  },
];

const accentMap = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400", glow: "group-hover:shadow-blue-500/20" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400", glow: "group-hover:shadow-purple-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20" },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Features() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="features" className="relative py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={prefersReduced ? undefined : sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Everything you need
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Built for how modern{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              teams work
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            FlowSync combines the best of task management, team collaboration, and intelligent automation in one beautiful workspace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const a = accentMap[feat.accent as keyof typeof accentMap];
            return (
              <motion.div
                key={feat.title}
                custom={i}
                variants={prefersReduced ? undefined : cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
                className={`group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/15 hover:shadow-xl ${a.glow} transition-all duration-300 cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center mb-5`}>
                  <svg viewBox="0 0 24 24" fill="none" className={`w-6 h-6 ${a.icon}`} stroke="currentColor" aria-hidden="true">
                    {feat.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

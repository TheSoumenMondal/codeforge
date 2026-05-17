"use client";

import { ArrowDownIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";

const fadeUp = {
  // biome-ignore lint/style/useNamingConvention: <>
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    // biome-ignore lint/style/useNamingConvention: <>
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function SignupIllustration() {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-50"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="30"
        y="20"
        width="140"
        height="100"
        rx="10"
        className="fill-card stroke-border"
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="52"
        r="18"
        className="fill-muted stroke-border"
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="47"
        r="7"
        className="fill-muted-foreground/30"
      />
      <ellipse
        cx="100"
        cy="64"
        rx="11"
        ry="7"
        className="fill-muted-foreground/30"
      />
      <rect
        x="50"
        y="78"
        width="100"
        height="8"
        rx="4"
        className="fill-muted stroke-border"
        strokeWidth="0.5"
      />
      <rect
        x="50"
        y="92"
        width="100"
        height="8"
        rx="4"
        className="fill-muted stroke-border"
        strokeWidth="0.5"
      />
      <rect
        x="60"
        y="106"
        width="80"
        height="9"
        rx="4.5"
        className="fill-primary"
      />
      <text
        x="100"
        y="113"
        textAnchor="middle"
        className="fill-primary-foreground"
        fontSize="5"
        fontFamily="sans-serif"
      >
        Get Started
      </text>
      <circle
        cx="34"
        cy="24"
        r="2"
        className="fill-violet-500/60"
      />
      <circle
        cx="166"
        cy="116"
        r="2"
        className="fill-emerald-500/60"
      />
      <circle
        cx="170"
        cy="26"
        r="1.5"
        className="fill-sky-500/60"
      />
    </svg>
  );
}

function BrowseIllustration() {
  const items = [40, 65, 50, 70, 45];

  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-50"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="20"
        y="14"
        width="160"
        height="112"
        rx="10"
        className="fill-card stroke-border"
        strokeWidth="1"
      />
      <rect
        x="20"
        y="14"
        width="160"
        height="22"
        rx="10"
        className="fill-muted/40"
      />
      <rect
        x="28"
        y="20"
        width="70"
        height="9"
        rx="4.5"
        className="fill-muted"
      />
      <rect
        x="148"
        y="20"
        width="24"
        height="9"
        rx="4.5"
        className="fill-violet-500/20 stroke-violet-500/30"
        strokeWidth="0.5"
      />
      {/** biome-ignore lint/style/useNamingConvention: <> */}
      {items.map((w, i) => (
        <g key={`item-${i}`}>
          <rect
            x="28"
            y={44 + i * 16}
            width={w}
            height="8"
            rx="4"
            className="fill-muted/70"
          />
          <circle
            cx="148"
            cy={48 + i * 16}
            r="4"
            className={
              i % 3 === 0
                ? "fill-emerald-500/60"
                : i % 3 === 1
                  ? "fill-amber-500/60"
                  : "fill-red-500/60"
            }
          />
        </g>
      ))}
    </svg>
  );
}

function SolveIllustration() {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-50"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="20"
        y="14"
        width="160"
        height="112"
        rx="10"
        className="fill-[#111] stroke-border"
        strokeWidth="1"
      />
      <rect
        x="20"
        y="14"
        width="160"
        height="18"
        rx="10"
        className="fill-white/5"
      />
      <circle
        cx="32"
        cy="23"
        r="3"
        className="fill-red-400/70"
      />
      <circle
        cx="42"
        cy="23"
        r="3"
        className="fill-amber-400/70"
      />
      <circle
        cx="52"
        cy="23"
        r="3"
        className="fill-emerald-400/70"
      />
      <rect
        x="28"
        y="40"
        width="50"
        height="6"
        rx="3"
        className="fill-violet-500/50"
      />
      <rect
        x="82"
        y="40"
        width="30"
        height="6"
        rx="3"
        className="fill-sky-400/50"
      />
      <rect
        x="116"
        y="40"
        width="40"
        height="6"
        rx="3"
        className="fill-white/20"
      />
      <rect
        x="36"
        y="52"
        width="80"
        height="6"
        rx="3"
        className="fill-white/20"
      />
      <rect
        x="36"
        y="64"
        width="60"
        height="6"
        rx="3"
        className="fill-emerald-400/40"
      />
      <circle
        cx="150"
        cy="96"
        r="18"
        className="fill-emerald-500/15 stroke-emerald-500/40"
        strokeWidth="1"
      />
      <path
        d="M143 96 L148 101 L157 91"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="28"
        y="90"
        width="92"
        height="12"
        rx="6"
        className="fill-emerald-500/10 stroke-emerald-500/25"
        strokeWidth="0.5"
      />
      <text
        x="74"
        y="98"
        textAnchor="middle"
        fontSize="5.5"
        fontFamily="monospace"
        className="fill-emerald-400"
      >
        All tests passed ✓
      </text>
    </svg>
  );
}

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up in seconds — no credit card, no friction. Jump straight into the platform.",
    checks: ["GitHub OAuth", "Email signup", "Instant access"],
    illustration: <SignupIllustration />,
    accent: "from-violet-500/10",
  },
  {
    number: "02",
    title: "Pick a problem",
    description:
      "Browse curated problems across categories. Filter by difficulty, topic, or popularity.",
    checks: ["320+ problems", "Tags & filters", "Community-rated"],
    illustration: <BrowseIllustration />,
    accent: "from-sky-500/10",
  },
  {
    number: "03",
    title: "Solve & grow",
    description:
      "Write code in the browser, submit solutions, and track your progress over time.",
    checks: ["Multi-language support", "Instant feedback", "XP & streaks"],
    illustration: <SolveIllustration />,
    accent: "from-amber-500/10",
  },
] as const;

export function IllustrationsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="border-y border-border bg-muted/20 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 flex flex-col items-center gap-3 text-center"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="h-auto gap-1.5 rounded-full px-3 py-1 text-xs"
            >
              <ArrowDownIcon
                size={12}
                weight="duotone"
                className="text-sky-500"
              />
              How it works
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            From zero to{" "}
            <em className="not-italic text-muted-foreground">expert</em> in 3
            steps
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-md text-sm leading-relaxed text-muted-foreground"
          >
            CodeForge is built for a seamless learning loop — no distractions,
            just deliberate practice.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col gap-5"
            >
              <div
                className={`relative flex h-50 items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-b ${step.accent} to-card shadow-sm`}
              >
                <div className="absolute left-3 top-3 text-[11px] font-bold font-mono text-muted-foreground/30">
                  {step.number}
                </div>
                {step.illustration}
              </div>

              <div className="flex gap-3">
                <div>
                  <h3 className="mb-1.5 text-sm font-semibold">{step.title}</h3>
                  <p className="mb-3 text-[12px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  <ul className="space-y-1">
                    {step.checks.map((check) => (
                      <li
                        key={check}
                        className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                      >
                        <CheckCircleIcon
                          size={12}
                          weight="duotone"
                          className="shrink-0 text-emerald-500"
                        />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < steps.length - 1 ? (
                <div className="absolute -right-5 top-25 hidden -translate-y-1/2 text-muted-foreground/20 md:flex">
                  <ArrowDownIcon
                    size={16}
                    className="-rotate-90"
                  />
                </div>
              ) : null}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

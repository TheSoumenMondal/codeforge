"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  TerminalIcon,
} from "@phosphor-icons/react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const fadeUp: Variants = {
  // biome-ignore lint/style/useNamingConvention: <>
  hidden: { opacity: 0, y: 24 },
  // biome-ignore lint/style/useNamingConvention: <>
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

type TToken = { text: string; cls: string };

const codeLines: TToken[][] = [
  [
    { text: "function ", cls: "text-[#ff7b72]" },
    { text: "twoSum", cls: "text-[#79c0ff]" },
    {
      text: "(nums: number[], target: number): number[] {",
      cls: "text-[#c9d1d9]",
    },
  ],
  [
    { text: "  const ", cls: "text-[#ff7b72]" },
    { text: "map ", cls: "text-[#c9d1d9]" },
    { text: "= new ", cls: "text-[#ff7b72]" },
    { text: "Map", cls: "text-[#ffa657]" },
    { text: "<number, number>();", cls: "text-[#c9d1d9]" },
  ],
  [],
  [
    { text: "  for ", cls: "text-[#ff7b72]" },
    { text: "(", cls: "text-[#c9d1d9]" },
    { text: "let ", cls: "text-[#ff7b72]" },
    { text: "i = 0; i < nums.", cls: "text-[#c9d1d9]" },
    { text: "length", cls: "text-[#d2a8ff]" },
    { text: "; i++) {", cls: "text-[#c9d1d9]" },
  ],
  [
    { text: "    const ", cls: "text-[#ff7b72]" },
    { text: "complement ", cls: "text-[#c9d1d9]" },
    { text: "= target - nums[i];", cls: "text-[#c9d1d9]" },
  ],
  [
    { text: "    if ", cls: "text-[#ff7b72]" },
    { text: "(map.", cls: "text-[#c9d1d9]" },
    { text: "has", cls: "text-[#79c0ff]" },
    { text: "(complement)) {", cls: "text-[#c9d1d9]" },
  ],
  [
    { text: "      return ", cls: "text-[#ff7b72]" },
    { text: "[map.", cls: "text-[#56d364]" },
    { text: "get", cls: "text-[#79c0ff] text-[#56d364]" },
    { text: "(complement)!, i];", cls: "text-[#56d364]" },
  ],
  [{ text: "    }", cls: "text-[#c9d1d9]" }],
  [
    { text: "    map.", cls: "text-[#c9d1d9]" },
    { text: "set", cls: "text-[#79c0ff]" },
    { text: "(nums[i], i);", cls: "text-[#c9d1d9]" },
  ],
  [{ text: "  }", cls: "text-[#c9d1d9]" }],
  [],
  [
    { text: "  return ", cls: "text-[#ff7b72]" },
    { text: "[];", cls: "text-[#56d364]" },
  ],
  [{ text: "}", cls: "text-[#c9d1d9]" }],
];

function CodeEditorIllustration() {
  return (
    <div className="w-full overflow-hidden border border-dashed p-2">
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-white/10 bg-[#0d0f12] px-5">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#ff5f56]" />
          <div className="size-3 rounded-full bg-[#ffbd2e]" />
          <div className="size-3 rounded-full bg-[#27c93f]" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-1 text-[12px] text-white/35">
            <TerminalIcon size={12} />
            <span>two-sum.ts - codeforge</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-white/30">
          <div className="size-2 animate-pulse rounded-full bg-[#27c93f]" />
          Running
        </div>
      </div>

      <div className="flex min-h-0 flex-row overflow-hidden">
        <div className="w-68 shrink-0 overflow-y-auto border-r border-white/10 bg-[#111316] p-5 text-left">
          <div className="mb-4">
            <span className="rounded-full border border-[#3fb9504d] bg-[#3fb9501a] px-2 py-0.5 text-[11px] font-semibold text-[#3fb950]">
              Easy
            </span>
          </div>

          <h3 className="mb-2 text-[16px] font-semibold text-[#e6edf3]">
            Two Sum
          </h3>

          <p className="mb-5 text-[12px] leading-relaxed text-[#8b949e]">
            Given an array of integers{" "}
            <code className="rounded bg-white/10 px-1 text-[#79c0ff]">
              nums
            </code>{" "}
            and an integer{" "}
            <code className="rounded bg-white/10 px-1 text-[#79c0ff]">
              target
            </code>
            , return indices of the two numbers such that they add up to target.
            Each input has exactly one solution.
          </p>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/30">
            Examples
          </p>

          <div className="mb-2 rounded-lg border border-white/10 bg-[#0a0c0f] p-3 text-[12px]">
            <div className="text-[#8b949e]">Input:</div>
            <div className="text-[#c9d1d9]">nums = [2,7,11,15], target = 9</div>
            <div className="mt-1.5 text-[#8b949e]">Output:</div>
            <div className="text-[#56d364]">[0, 1]</div>
          </div>

          <div className="mb-5 rounded-lg border border-white/10 bg-[#0a0c0f] p-3 text-[12px]">
            <div className="text-[#8b949e]">Input:</div>
            <div className="text-[#c9d1d9]">nums = [3,2,4], target = 6</div>
            <div className="mt-1.5 text-[#8b949e]">Output:</div>
            <div className="text-[#56d364]">[1, 2]</div>
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/30">
            Constraints
          </p>
          <ul className="space-y-1 text-[11px] text-[#8b949e]">
            <li>• 2 ≤ nums.length ≤ 10⁴</li>
            <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
            <li>• Only one valid answer exists</li>
          </ul>
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-[#16181d]">
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/6 px-4">
            <span className="rounded border border-[#79c0ff33] bg-[#79c0ff1f] px-2 py-0.5 text-[11px] text-[#79c0ff]">
              TypeScript
            </span>
            <span className="text-[11px] text-white/25">Ln 13, Col 1</span>
          </div>

          <div className="flex-1 overflow-x-auto p-4">
            <pre className="m-0 text-[13px] leading-[1.75] font-mono bg-transparent">
              {codeLines.map((line, index) => (
                <div
                  key={`line-${index}`}
                  className="flex"
                >
                  <span className="mr-5 w-6 shrink-0 select-none text-right text-[12px] leading-[1.75] text-[#484f58]">
                    {index + 1}
                  </span>
                  <span>
                    {line.length === 0
                      ? "\u00A0"
                      : line.map((tok, innerIndex) => (
                          <span
                            key={`t-${index}-${innerIndex}`}
                            className={tok.cls}
                          >
                            {tok.text}
                          </span>
                        ))}
                    {index === codeLines.length - 1 && (
                      <span className="inline-block h-3.25 w-0.5 translate-y-0.5 bg-[#79c0ff] align-middle animate-pulse" />
                    )}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      <div className="flex h-8 shrink-0 items-center gap-3 border-t border-white/10 bg-[#0d0f12] px-4 text-[11px] text-white/35">
        <CheckCircleIcon
          size={13}
          weight="duotone"
          className="shrink-0 text-[#27c93f]"
        />
        <span className="text-[#27c93f]">All 3 test cases passed</span>

        <div className="ml-auto flex items-center gap-4 whitespace-nowrap">
          <span>TypeScript 5.4</span>
          <span>Runtime: 56 ms</span>
          <span>Memory: 42.1 MB</span>
          <span className="rounded border border-[#56d36433] bg-[#56d3641f] px-1.5 py-0.5 text-[10px] text-[#56d364]">
            Beats 97%
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-14"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, transparent 0%, var(--background) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-17.5 w-43.75 -translate-x-1/2 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(50% 0.15 265 / 30%), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="h-auto gap-2 rounded-full border border-dashed px-3 py-1.5 text-xs font-medium"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              The developer practice platform
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-instrumental-serif font-semibold tracking-tight leading-[1.06] sm:text-6xl lg:text-7xl"
          >
            Forge your{" "}
            <span className="mr-3 font-instrumental-serif italic font-normal text-blue-600">
              coding
            </span>{" "}
            skills,
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">
              {" "}
              one problem at a time.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            A minimalist platform for developers to practice algorithms, read
            articles, and explore community challenges-all in one focused
            workspace.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex gap-2"
          >
            <Button
              variant="info"
              size="lg"
              className="py-4"
            >
              <Link href="/signup">Start practicing free</Link>
              <ArrowRightIcon size={14} />
            </Button>

            <Button
              variant="success"
              size="lg"
              className="py-4"
            >
              <Link
                href="/problems"
                id="hero-problems-btn"
              >
                Browse problems
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="w-full max-w-6xl xl:min-w-5xl mt-10 hidden md:block">
          <CodeEditorIllustration />
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  BooksIcon,
  BrainIcon,
  CodeIcon,
  CompassIcon,
  FlowerIcon,
  RocketLaunchIcon,
  SealCheckIcon,
  TrophyIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const fadeUp: Variants = {
  // biome-ignore lint/style/useNamingConvention: <>
  hidden: { opacity: 0, y: 20 },
  // biome-ignore lint/style/useNamingConvention: <>
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const floatingIcons = [
  {
    icon: BrainIcon,
    color: "text-violet-500",
    bg: "bg-violet-500/10  border-violet-500/20",
    delay: 0,
    pos: { top: "10%", left: "4%" },
  },
  {
    icon: CodeIcon,
    color: "text-sky-500",
    bg: "bg-sky-500/10     border-sky-500/20",
    delay: 0.3,
    pos: { top: "12%", right: "5%" },
  },
  {
    icon: TrophyIcon,
    color: "text-amber-500",
    bg: "bg-amber-500/10   border-amber-500/20",
    delay: 0.6,
    pos: { top: "42%", left: "2%" },
  },
  {
    icon: BooksIcon,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    delay: 0.1,
    pos: { top: "40%", right: "3%" },
  },
  {
    icon: UsersIcon,
    color: "text-pink-500",
    bg: "bg-pink-500/10    border-pink-500/20",
    delay: 0.4,
    pos: { bottom: "18%", left: "5%" },
  },
  {
    icon: CompassIcon,
    color: "text-orange-500",
    bg: "bg-orange-500/10  border-orange-500/20",
    delay: 0.7,
    pos: { bottom: "16%", right: "6%" },
  },
  {
    icon: RocketLaunchIcon,
    color: "text-blue-500",
    bg: "bg-blue-500/10    border-blue-500/20",
    delay: 0.2,
    pos: { top: "72%", left: "20%" },
  },
  {
    icon: SealCheckIcon,
    color: "text-teal-500",
    bg: "bg-teal-500/10    border-teal-500/20",
    delay: 0.5,
    pos: { top: "70%", right: "19%" },
  },
];

function FloatingIconGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map(
        ({ icon: IconComponent, color, bg, delay, pos }, index) => (
          <motion.div
            key={index}
            animate={{ translateY: [0, -10, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{
              duration: 3.5 + index * 0.25,
              repeat: Number.POSITIVE_INFINITY,
              delay,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute size-11 rounded-xl border flex items-center justify-center",
              bg,
            )}
            style={pos}
          >
            <Button
              size="icon-lg"
              variant="outline"
            >
              <IconComponent
                size={20}
                weight="duotone"
                className={color}
              />
            </Button>
          </motion.div>
        ),
      )}
    </div>
  );
}

// biome-ignore lint/style/useNamingConvention: <>
export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, var(--background) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(65% 0.18 265 / 8%), transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <FloatingIconGrid />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center gap-7"
        >
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1.5 h-auto rounded-full text-xs font-medium border border-dashed"
            >
              <RocketLaunchIcon
                size={12}
                weight="duotone"
                className="text-violet-500"
              />
              Ready to level up?
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-instrumental-serif font-semibold tracking-wide leading-[1.1]"
          >
            Start your journey today
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm text-muted-foreground max-w-sm leading-relaxed"
          >
            Join thousands of developers sharpening their skills every day. Free
            to start, powerful to grow with no strings attached.
          </motion.p>

          <div className=" flex gap-3">
            <Button
              size="lg"
              variant="info"
              className="py-4"
            >
              <Link
                href="/signup"
                id="cta-signup-btn"
              >
                Create free account
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="py-4"
            >
              <Link
                href="/login"
                id="cta-login-btn"
              >
                Log in
              </Link>
            </Button>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 flex-wrap justify-center pt-2"
          >
            {[
              { label: "TypeScript", icon: "TS" },
              { label: "Python", icon: "Py" },
              { label: "Java", icon: "J" },
              { label: "C++", icon: "C" },
            ].map((lang) => (
              <div
                key={lang.label}
                className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
              >
                <Button
                  size="icon-sm"
                  variant="info"
                >
                  {lang.icon}
                </Button>
                {lang.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const footerLinks = [
  {
    group: "Product",
    links: [
      { label: "Problems", href: "/problems" },
      { label: "Explore", href: "/explore" },
      { label: "Articles", href: "/articles" },
    ],
  },
  {
    group: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
      { label: "Profile", href: "/profile" },
    ],
  },
  {
    group: "Community",
    links: [{ label: "Challenges", href: "/explore" }],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 w-fit group"
          >
            <FlowerIcon
              size={22}
              weight="duotone"
            />
            <span className="text-sm font-semibold font-geist-sans">
              codeforge
            </span>
          </Link>
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-50">
            A minimalist platform for deliberate coding practice and growth.
          </p>
        </div>

        {footerLinks.map((group) => (
          <div
            key={group.group}
            className="flex flex-col gap-4"
          >
            <p className="text-[11px] font-semibold font-geist-sans uppercase tracking-widest text-muted-foreground/50">
              {group.group}
            </p>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <p className="text-[11px] text-muted-foreground/40 font-ubuntu-mono">
            © {new Date().getFullYear()} codeforge. Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}

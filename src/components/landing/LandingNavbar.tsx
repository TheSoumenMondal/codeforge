"use client";

import {
  CaretCircleDoubleRightIcon,
  FlowerIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Problems", href: "/problems", soon: false },
  { label: "Explore", href: "/explore", soon: true },
  { label: "Articles", href: "/articles", soon: true },
];

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 shrink-0 group"
          id="landing-logo"
        >
          <FlowerIcon
            size={24}
            weight="duotone"
            className="text-foreground"
          />
          <span className="text-lg font-semibold font-geist-sans tracking-tight">
            codeforge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4 font-serif">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-geist-sans text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            size="lg"
            animation="colors"
            variant="info"
          >
            <Link
              href="/login"
              id="nav-login-btn"
              className="flex items-center"
            >
              Log in
            </Link>
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="info"
          >
            <Link
              href="/signup"
              id="nav-signup-btn"
              className="flex items-center gap-1.5"
            >
              Get Started
              <CaretCircleDoubleRightIcon />
            </Link>
          </Button>
        </div>

        <Button
          size="icon-lg"
          type="button"
          variant="outline"
          className="md:hidden p-1.5 rounded-md hover:bg-muted transition-colors text-foreground"
          onClick={() => setMobileOpen((val) => !val)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <XIcon
              size={18}
              weight="bold"
            />
          ) : (
            <ListIcon
              size={18}
              weight="bold"
            />
          )}
        </Button>
      </div>

      <div
        className={cn(
          "md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-200",
          mobileOpen ? "max-h-72" : "max-h-0",
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button
              size="lg"
              variant="info"
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
            </Button>
            <Button
              size="lg"
              variant="info"
            >
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

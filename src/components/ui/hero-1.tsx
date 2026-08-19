"use client";

import React from "react";
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onOpenAuthModal?: () => void;
}

export function Hero({
  eyebrow = "DIRECT SALES CONSULTATION",
  title = "Book a 1-on-1 Sales Meeting with Our Experts",
  subtitle = "Connect directly with our senior solutions team. Pick a time slot that works for you and get tailored strategies for your business growth.",
  ctaLabel = "Book Appointment",
  onOpenAuthModal,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-36 sm:pt-40 md:pt-44 pb-20 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden flex flex-col items-center justify-center
      bg-[linear-gradient(to_bottom,var(--background),var(--background)_50%,var(--card)_88%)]
      rounded-b-3xl"
    >
      {/* High-Visibility Grid BG */}
      <div
        className="absolute inset-0 -z-10 h-full w-full 
        bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]
        bg-[size:4rem_4rem] 
        [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] opacity-70"
      />

      {/* Vibrant Ambient Glow Accent */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        h-[450px] w-[700px] sm:w-[900px] rounded-full 
        bg-gradient-to-tr from-primary/15 via-primary/10 to-transparent blur-[100px] 
        -z-10 pointer-events-none animate-pulse"
      />

      {/* Eyebrow Badge */}
      {eyebrow && (
        <div className="group inline-block mb-4 mt-2 cursor-default">
          <span
            className="text-xs font-mono font-bold text-primary mx-auto px-4 py-2 
            bg-card border border-primary/30 
            rounded-full w-fit tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{eyebrow}</span>
            <ChevronRight className="w-3.5 h-3.5 text-primary/70 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      )}

      {/* Main Title with non-breaking 1-on-1 formatting */}
      <h1
        className="animate-fade-in text-balance 
        py-4 text-4xl font-black leading-[1.1] tracking-tight 
        text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto"
      >
        Book a <span className="whitespace-nowrap">1-on-1</span> Sales Meeting with Our Experts
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-10 text-balance 
        text-base tracking-normal text-muted-foreground 
        sm:text-lg md:text-xl max-w-2xl mx-auto font-medium"
      >
        {subtitle}
      </p>

      {/* Single Hero Primary CTA */}
      {ctaLabel && (
        <div className="flex justify-center z-20">
          <Button
            size="lg"
            onClick={onOpenAuthModal}
            className="w-full sm:w-auto px-8 py-6 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 active:scale-95 group cursor-pointer flex items-center gap-2.5"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      {/* Bottom Fade Layer */}
      <div
        className="animate-fade-up relative mt-20 opacity-0 [perspective:2000px] 
        after:absolute after:inset-0 after:z-30 
        after:[background:linear-gradient(to_top,var(--background)_10%,transparent)]"
      />
    </section>
  );
}

export default Hero;

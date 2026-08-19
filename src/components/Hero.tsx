"use client";

import React from "react";
import { HeroSection } from "@/components/ui/hero-section-1";

interface HeroProps {
  onOpenAuthModal?: () => void;
}

export function Hero({ onOpenAuthModal }: HeroProps) {
  return <HeroSection onOpenAuthModal={onOpenAuthModal} />;
}

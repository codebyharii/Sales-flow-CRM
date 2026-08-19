"use client";

import React from "react";
import { Footerdemo } from "@/components/ui/footer-section";

interface FooterProps {
  onCtaClick?: () => void;
}

export function Footer({ onCtaClick }: FooterProps) {
  return <Footerdemo />;
}

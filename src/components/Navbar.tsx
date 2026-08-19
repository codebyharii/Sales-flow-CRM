"use client";

import React from "react";
import { Home, LogIn, LayoutGrid } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export function Navbar({ onOpenAuthModal }: NavbarProps) {
  const navItems = [
    {
      name: "Home",
      url: "#",
      icon: Home,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      name: "Login / Book Meeting",
      url: "#",
      icon: LogIn,
      onClick: () => {
        if (onOpenAuthModal) onOpenAuthModal();
      },
    },
    {
      name: "Footer",
      url: "#",
      icon: LayoutGrid,
      onClick: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
    },
  ];

  return <NavBar items={navItems} />;
}

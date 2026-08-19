"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "Home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight - 300) {
        setActiveTab("Footer");
      } else if (scrollPosition < 200) {
        setActiveTab("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto",
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 bg-card/90 border border-border/80 backdrop-blur-xl p-1.5 px-3 rounded-full shadow-xl shadow-black/10">
        
        {/* Unified SalesFlow Brand Logo inside floating Tubelight navbar */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-bold tracking-tight text-foreground cursor-pointer select-none pr-1 sm:pr-2 group"
        >
          <div className="w-7 h-7 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-foreground">SalesFlow</span>
        </div>

        {/* Subtle Vertical Divider */}
        <div className="h-5 w-[1px] bg-border/80 mx-1" />

        {/* Nav Items */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => {
                if (item.url === "#" || !item.url) {
                  e.preventDefault();
                }
                setActiveTab(item.name);
                if (item.onClick) {
                  item.onClick();
                }
              }}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors flex items-center gap-1.5 select-none",
                "text-muted-foreground hover:text-foreground",
                isActive && "bg-accent/70 text-primary font-bold"
              )}
            >
              <Icon size={15} strokeWidth={2.2} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="inline-block">{item.name}</span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-10 h-4 bg-primary/30 rounded-full blur-md -top-1.5 -left-1" />
                    <div className="absolute w-6 h-3 bg-primary/40 rounded-full blur-sm -top-1 left-1" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}

        {/* Subtle Vertical Divider */}
        <div className="h-5 w-[1px] bg-border/80 mx-1" />

        {/* Theme Toggle Button (Dark/Light Mode) */}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default NavBar;

"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Calendar, LogOut, User as UserIcon, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  userEmail?: string | null;
  userName?: string | null;
}

export function Header({ userEmail, userName }: HeaderProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("salesflow_has_account");
      }
      await signOut({ redirect: false });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-center gap-2 sm:gap-3 bg-card/90 border border-border/80 backdrop-blur-xl p-1.5 px-3 sm:px-4 rounded-full shadow-xl shadow-black/5">
        
        {/* SalesFlow Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-bold tracking-tight text-foreground cursor-pointer select-none pr-1 group"
        >
          <div className="w-7 h-7 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-foreground">SalesFlow</span>
        </div>

        {/* Subtle Vertical Divider */}
        <div className="h-5 w-[1px] bg-border/80 mx-0.5 sm:mx-1" />

        {/* User Identity Badge */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-accent/70 px-3 py-1.5 rounded-full border border-border/50">
          <UserIcon className="w-3.5 h-3.5 text-primary" />
          <span className="truncate max-w-[140px] sm:max-w-[200px] text-foreground font-semibold">
            {userEmail || userName || "Authenticated User"}
          </span>
        </div>

        {/* Subtle Vertical Divider */}
        <div className="h-5 w-[1px] bg-border/80 mx-0.5 sm:mx-1" />

        {/* Theme Toggle Button (Light/Dark Mode) */}
        <ThemeToggle />

        {/* Log out Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer active:scale-95 select-none disabled:opacity-50"
          title="Log out"
        >
          {isLoggingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
          ) : (
            <LogOut className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </button>

      </div>
    </div>
  );
}

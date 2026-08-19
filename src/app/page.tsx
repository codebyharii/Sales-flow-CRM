"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustMarkers } from "@/components/TrustMarkers";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";

function LandingContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<"signup" | "login">("signup");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Listen for ?login=1 query param (from middleware redirects)
    if (searchParams.get("login") === "1") {
      setInitialTab("login");
      setIsAuthModalOpen(true);
    } else {
      // Check localStorage to default to Log In tab if device previously logged in
      if (typeof window !== "undefined" && localStorage.getItem("salesflow_has_account") === "true") {
        setInitialTab("login");
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navbar onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      <main className="flex-1">
        <Hero onOpenAuthModal={() => setIsAuthModalOpen(true)} />
        <TrustMarkers />
      </main>
      <Footer onCtaClick={() => setIsAuthModalOpen(true)} />

      {/* Production Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={initialTab}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LandingContent />
    </Suspense>
  );
}

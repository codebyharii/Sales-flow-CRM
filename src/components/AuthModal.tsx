"use client";

import React from "react";
import { SignInDrawer } from "@/components/ui/family-signin-drawer";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signup" | "login";
}

export function AuthModal({ isOpen, onClose, initialTab = "signup" }: AuthModalProps) {
  return (
    <SignInDrawer
      isOpen={isOpen}
      onClose={onClose}
      initialTab={initialTab}
    />
  );
}

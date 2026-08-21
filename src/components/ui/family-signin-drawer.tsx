"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { X, Mail, Lock, User, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
} from "@/components/ui/family-signin-drawer-utils/drawer";
import {
  AnimatedTabs,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  useMeasure,
} from "@/components/ui/family-signin-drawer-utils/tabs";

interface SignInDrawerProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  initialTab?: "signup" | "login";
}

export function SignInDrawer({
  children,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  initialTab = "signup",
}: SignInDrawerProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalIsOpen !== undefined;
  const open = isControlled ? externalIsOpen : internalOpen;

  const [activeTab, setActiveTab] = useState<"signup" | "login">(initialTab);
  const [step, setStep] = useState<"form" | "submitting">("form");
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status & Error
  const [status, setStatus] = useState<"default" | "submitting" | "error" | "success">("default");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      setStatus("default");
      setErrorMessage(null);
      setStep("form");
      setShowPassword(false);
    }
  }, [open, initialTab]);

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setTimeout(() => {
        setStep("form");
        setStatus("default");
        setErrorMessage(null);
        setShowPassword(false);
      }, 300);
      if (externalOnClose) externalOnClose();
    }
    if (!isControlled) setInternalOpen(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    setStep("submitting");

    try {
      if (activeTab === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setStep("form");
          setErrorMessage(data.error || "Failed to create account. Please try again.");
          return;
        }

        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          setStatus("error");
          setStep("form");
          setErrorMessage("Account created, but automatic sign in failed. Please log in.");
          setActiveTab("login");
          return;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("salesflow_has_account", "true");
        }
        setStatus("success");
        handleOpenChange(false);
        router.push("/booking");
      } else {
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          setStatus("error");
          setStep("form");
          setErrorMessage("Invalid email or password. Please check your credentials.");
          return;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("salesflow_has_account", "true");
        }
        setStatus("success");
        handleOpenChange(false);
        router.push("/booking");
      }
    } catch (err) {
      console.error("Auth submit error:", err);
      setStatus("error");
      setStep("form");
      setErrorMessage("An unexpected network error occurred. Please check your connection.");
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      
      <DrawerContent className="bg-card text-card-foreground border-border">
        <DrawerClose className="bg-muted text-foreground hover:bg-muted/80 absolute right-6 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-transform active:scale-75 cursor-pointer">
          <X className="size-5 opacity-75" />
        </DrawerClose>

        <div className="flex items-center justify-between px-6 pt-6 pb-2 text-center text-xl font-bold tracking-tight text-foreground">
          <span className="flex-1 select-none text-center pr-6">
            {activeTab === "signup" ? "Book Appointment — Sign Up" : "Book Appointment — Log In"}
          </span>
        </div>

        <DrawerTitle className="sr-only">Book Appointment Authentication</DrawerTitle>
        <DrawerDescription className="sr-only">
          Sign up or log in to access the sales calendar
        </DrawerDescription>

        <motion.div
          animate={{
            height: bounds.height > 0 ? bounds.height : step === "submitting" ? 280 : 420,
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="overflow-hidden will-change-transform"
        >
          <div ref={ref} className="px-6 pb-6 pt-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {step === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                >
                  <AnimatedTabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                    <AnimatedTabsList className="bg-muted">
                      <AnimatedTabsTrigger value="signup">
                        Sign Up
                      </AnimatedTabsTrigger>
                      <AnimatedTabsTrigger value="login">
                        Log In
                      </AnimatedTabsTrigger>
                    </AnimatedTabsList>

                    <form onSubmit={handleSubmit} className="pt-4 space-y-4">
                      {/* Name Field (Sign Up Only) */}
                      {activeTab === "signup" && (
                        <div className="space-y-1.5">
                          <label htmlFor="drawer-name" className="text-xs font-medium font-mono text-muted-foreground uppercase tracking-wider block">
                            Full Name <span className="text-muted-foreground/60">(Optional)</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                            <input
                              id="drawer-name"
                              type="text"
                              placeholder="Hari om Singh"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              disabled={status === "submitting"}
                              className="bg-input border-border focus-visible:ring-primary flex h-11 w-full rounded-xl border pl-10 pr-4 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground text-foreground"
                            />
                          </div>
                        </div>
                      )}

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label htmlFor="drawer-email" className="text-xs font-medium font-mono text-muted-foreground uppercase tracking-wider block">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                          <input
                            id="drawer-email"
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "submitting"}
                            className="bg-input border-border focus-visible:ring-primary flex h-11 w-full rounded-xl border pl-10 pr-4 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground text-foreground"
                          />
                        </div>
                      </div>

                      {/* Password Field with Eye Show/Hide Toggle */}
                      <div className="space-y-1.5">
                        <label htmlFor="drawer-password" className="text-xs font-medium font-mono text-muted-foreground uppercase tracking-wider block">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                          <input
                            id="drawer-password"
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={status === "submitting"}
                            className="bg-input border-border focus-visible:ring-primary flex h-11 w-full rounded-xl border pl-10 pr-10 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground text-foreground"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 text-primary" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Reserved Height Error Container */}
                      <div className="min-h-[40px] flex items-center">
                        {status === "error" && errorMessage && (
                          <div className="w-full p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{errorMessage}</span>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground transition-all active:scale-95 shadow-sm hover:bg-primary/90 cursor-pointer disabled:opacity-50"
                      >
                        <span>{activeTab === "signup" ? "Create Account & Continue" : "Log In & Continue"}</span>
                      </button>
                    </form>
                  </AnimatedTabs>
                </motion.div>
              ) : (
                /* Submitting Glowing Animated Ring State */
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="flex items-center justify-center py-4">
                    <div className="relative flex items-center justify-center overflow-hidden rounded-[22px] p-0.5">
                      <motion.div
                        className="absolute left-[-50%] top-[-50%] h-[200%] w-[200%] bg-[conic-gradient(from_0deg,transparent_0%,var(--primary)_10%,var(--primary)_25%,transparent_35%)]"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.25,
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                      />
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[20px] bg-card text-primary shadow-inner">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {activeTab === "signup" ? "Creating Your Account..." : "Logging In..."}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      Securing your session & preparing calendar slots
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}

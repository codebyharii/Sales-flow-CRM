"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter, Calendar } from "lucide-react";

export function Footerdemo() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <footer className="relative border-t border-border bg-card text-foreground transition-colors duration-300">
      <div className="container mx-auto px-6 py-12 md:px-8 lg:px-12 max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Newsletter Column */}
          <div className="relative space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-foreground mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                <Calendar className="w-4 h-4" />
              </div>
              <span>SalesFlow</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Stay Connected</h2>
            <p className="text-sm text-muted-foreground">
              Join our newsletter for the latest sales strategies and exclusive appointment availability.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative pt-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm bg-background border-border"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-3 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-4 text-base font-bold uppercase tracking-wider text-foreground font-mono">Quick Links</h3>
            <nav className="space-y-2.5 text-sm font-medium">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="block transition-colors hover:text-primary text-muted-foreground">
                Home
              </a>
              <a href="#" className="block transition-colors hover:text-primary text-muted-foreground">
                About SalesFlow
              </a>
              <a href="#" className="block transition-colors hover:text-primary text-muted-foreground">
                Sales Consultation
              </a>
              <a href="#" className="block transition-colors hover:text-primary text-muted-foreground">
                Expert Advisors
              </a>
              <a href="#" className="block transition-colors hover:text-primary text-muted-foreground">
                Contact Support
              </a>
            </nav>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="mb-4 text-base font-bold uppercase tracking-wider text-foreground font-mono">Contact Us</h3>
            <address className="space-y-2.5 text-sm not-italic text-muted-foreground">
              <p className="font-semibold text-foreground">SalesFlow Corporate HQ</p>
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p className="pt-1">Phone: (123) 456-7890</p>
              <p>Email: support@salesflow.com</p>
            </address>
          </div>

          {/* Social Links & Theme Switch Column */}
          <div className="relative space-y-4">
            <h3 className="mb-4 text-base font-bold uppercase tracking-wider text-foreground font-mono">Follow Us</h3>
            <div className="flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-accent">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-accent">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-accent">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-accent">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Dark Mode Switch */}
            {mounted && (
              <div className="flex items-center space-x-3 pt-4">
                <Sun className="h-4 w-4 text-amber-500" />
                <Switch
                  id="dark-mode"
                  checked={isDark}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Moon className="h-4 w-4 text-primary" />
                <Label htmlFor="dark-mode" className="text-xs font-semibold text-muted-foreground font-mono">
                  {isDark ? "Dark Mode" : "Light Mode"}
                </Label>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground font-mono">
            © 2026 SalesFlow. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footerdemo;

"use client";

import React, { useState, useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";

interface CalendarEmbedProps {
  calLink?: string;
}

export function CalendarEmbed({ calLink = "cal/15min" }: CalendarEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const cal = await getCalApi();
        if (isMounted) {
          cal("ui", {
            theme: activeTheme,
            styles: { branding: { brandColor: "#1e9df1" } },
            hideEventTypeDetails: false,
            layout: "month_view",
          });
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Cal.com embed initialization error:", err);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    })();

    const timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        setIsLoading(false);
      }
    }, 8000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isLoading, activeTheme]);

  return (
    <div className="w-full min-h-[600px] rounded-2xl bg-card border border-border overflow-hidden relative flex flex-col justify-center items-center shadow-md transition-colors duration-300">
      
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-card/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm font-mono text-muted-foreground">Loading calendar availability...</p>
        </div>
      )}

      {/* Script / Network Failure Fallback Container */}
      {hasError ? (
        <div className="p-8 text-center max-w-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg text-foreground">
            Scheduling is temporarily unavailable — try refreshing
          </h3>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t load the interactive calendar widget. Please check your connection or refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>
        </div>
      ) : (
        <Cal
          key={activeTheme}
          calLink={calLink}
          style={{ width: "100%", height: "100%", minHeight: "600px" }}
          config={{ layout: "month_view", theme: activeTheme }}
        />
      )}
    </div>
  );
}

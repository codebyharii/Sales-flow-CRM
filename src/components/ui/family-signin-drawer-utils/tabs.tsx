"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (val: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export function AnimatedTabs({
  defaultValue,
  value: valueProp,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [val, setVal] = React.useState(valueProp || defaultValue || "");

  const handleValueChange = (newVal: string) => {
    setVal(newVal);
    if (onValueChange) onValueChange(newVal);
  };

  const currentVal = valueProp !== undefined ? valueProp : val;

  return (
    <TabsContext.Provider value={{ value: currentVal, onValueChange: handleValueChange }}>
      <TabsPrimitive.Root
        value={currentVal}
        onValueChange={handleValueChange}
        className={cn("w-full", className)}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  );
}

export function AnimatedTabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        "grid w-full grid-cols-2 rounded-2xl bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  );
}

export function AnimatedTabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx.value === value;

  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        isActive
          ? "bg-card text-foreground shadow-sm font-bold"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function AnimatedTabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn("outline-none transition-all duration-300", className)}
    >
      {children}
    </TabsPrimitive.Content>
  );
}

export function useMeasure<T extends HTMLElement>() {
  const [bounds, setBounds] = React.useState({ height: 0, width: 0 });
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setBounds({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
        });
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}

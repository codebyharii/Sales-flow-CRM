import React from "react";
import { Clock, UserCheck, Zap } from "lucide-react";

export function TrustMarkers() {
  const markers = [
    {
      icon: Clock,
      title: "15-30 Min Consultation",
      description: "Concise, focused sessions designed around your immediate business goals.",
    },
    {
      icon: UserCheck,
      title: "Dedicated Advisor",
      description: "Direct access to senior product specialists with domain expertise.",
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Real-time calendar availability with direct calendar invite integration.",
    },
  ];

  return (
    <section className="py-16 border-t border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {markers.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-card border border-border space-y-3 hover:border-primary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

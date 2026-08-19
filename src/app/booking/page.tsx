import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { Footer } from "@/components/Footer";

export default async function BookingPage() {
  const session = await auth();

  // Route protection fallback
  if (!session?.user) {
    redirect("/?login=1");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header userEmail={session.user.email} userName={session.user.name} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 pt-28 pb-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Select a Meeting Slot
          </h1>
          <p className="text-sm text-muted-foreground">
            Pick a time that works best for your schedule. You will receive a calendar invitation automatically.
          </p>
        </div>

        <CalendarEmbed calLink="cal/15min" />
      </main>

      <Footer />
    </div>
  );
}

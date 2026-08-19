"use client";

import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

interface HeroSectionProps {
    onOpenAuthModal?: () => void;
}

export function HeroSection({ onOpenAuthModal }: HeroSectionProps) {
    return (
        <main className="overflow-hidden relative bg-background text-foreground pt-12 sm:pt-16">
            {/* Background Ambient Radial Effects */}
            <div
                aria-hidden
                className="z-[2] absolute inset-0 pointer-events-none isolate opacity-40 contain-strict hidden lg:block">
                <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,var(--primary)_0%,hsla(200,80%,55%,.02)_50%,transparent_80%)] opacity-30" />
                <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--primary)_0%,hsla(200,80%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%] opacity-20" />
            </div>

            <section className="relative">
                <div className="relative pt-20 md:pt-28">
                    
                    {/* Radial Glow Overlay */}
                    <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />

                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto">
                            <AnimatedGroup variants={transitionVariants}>
                                
                                {/* Eyebrow Badge */}
                                <div
                                    onClick={onOpenAuthModal}
                                    className="hover:bg-accent/80 bg-card group mx-auto flex w-fit items-center gap-3 rounded-full border border-border p-1.5 pl-4 shadow-sm transition-all duration-300 cursor-pointer select-none">
                                    <span className="text-primary text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span>DIRECT SALES CONSULTATION</span>
                                    </span>
                                    <span className="block h-4 w-[1px] bg-border"></span>

                                    <div className="bg-primary text-primary-foreground group-hover:bg-primary/90 size-6 overflow-hidden rounded-full duration-500 flex items-center justify-center">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6 items-center justify-center">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                            <span className="flex size-6 items-center justify-center">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Title */}
                                <h1 className="mt-8 max-w-4xl mx-auto text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                                    Book a <span className="whitespace-nowrap text-primary">1-on-1</span> Sales Meeting with Our Experts
                                </h1>

                                {/* Subtitle */}
                                <p className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg text-muted-foreground font-medium">
                                    Connect directly with our senior solutions team. Pick a time slot that works for you and get tailored strategies for your business growth.
                                </p>
                            </AnimatedGroup>

                            {/* CTA Action Buttons */}
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.5,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
                                <div key={1}>
                                    <Button
                                        size="lg"
                                        onClick={onOpenAuthModal}
                                        className="rounded-2xl px-8 py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 active:scale-95 group cursor-pointer flex items-center gap-2">
                                        <span>Book Appointment</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <Button
                                    key={2}
                                    size="lg"
                                    variant="outline"
                                    onClick={() => {
                                        const el = document.getElementById("trust-markers") || document.body;
                                        el.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="rounded-2xl px-6 py-6 text-base font-semibold border-border bg-card hover:bg-accent text-foreground transition-all cursor-pointer">
                                    <span>Explore Solutions</span>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>

                    {/* High Quality MNC Dashboard Platform Mockup */}
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.75,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}>
                        <div className="relative mt-12 overflow-hidden px-4 max-w-6xl mx-auto">
                            <div
                                aria-hidden
                                className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-40%"
                            />
                            <div className="bg-card relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/80 p-3 sm:p-4 shadow-2xl shadow-black/10">
                                <img
                                    className="bg-card aspect-[16/9] relative hidden rounded-2xl dark:block w-full object-cover border border-border/50"
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2700&q=80"
                                    alt="SalesFlow Analytics Platform Dashboard"
                                    width="2700"
                                    height="1440"
                                />
                                <img
                                    className="z-2 aspect-[16/9] relative rounded-2xl border border-border/50 dark:hidden w-full object-cover"
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2700&q=80"
                                    alt="SalesFlow Analytics Platform Dashboard Light"
                                    width="2700"
                                    height="1440"
                                />
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>

            {/* MNC Enterprise Partner Logos (Bulletproof Vector Badges) */}
            <section className="bg-background pb-16 pt-16 md:pb-24">
                <div className="group relative m-auto max-w-5xl px-6">
                    <p className="text-center text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase mb-8">
                        Trusted by High-Growth Teams & Fortune 500 Enterprises
                    </p>
                    <div className="mx-auto grid max-w-4xl grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 transition-all duration-500">
                        
                        {/* Google */}
                        <div className="flex items-center justify-center p-3 rounded-2xl border border-border/60 bg-card/50 hover:bg-card transition-all cursor-default group">
                            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors font-extrabold text-base tracking-tight font-sans">
                                <svg className="w-5 h-5 fill-current text-primary" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                                </svg>
                                <span>Google</span>
                            </div>
                        </div>

                        {/* Microsoft */}
                        <div className="flex items-center justify-center p-3 rounded-2xl border border-border/60 bg-card/50 hover:bg-card transition-all cursor-default group">
                            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors font-extrabold text-base tracking-tight font-sans">
                                <svg className="w-4 h-4 fill-current text-primary" viewBox="0 0 23 23">
                                    <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
                                </svg>
                                <span>Microsoft</span>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="flex items-center justify-center p-3 rounded-2xl border border-border/60 bg-card/50 hover:bg-card transition-all cursor-default group">
                            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors font-extrabold text-base tracking-tight font-sans">
                                <svg className="w-5 h-5 fill-current text-primary" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                <span>GitHub</span>
                            </div>
                        </div>

                        {/* OpenAI */}
                        <div className="flex items-center justify-center p-3 rounded-2xl border border-border/60 bg-card/50 hover:bg-card transition-all cursor-default group">
                            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors font-extrabold text-base tracking-tight font-sans">
                                <svg className="w-5 h-5 fill-current text-primary" viewBox="0 0 24 24">
                                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9503a4.4992 4.4992 0 0 1-6.1408-1.6465zM2.3424 8.5856a4.466 4.466 0 0 1 2.3372-1.9729v5.6725a.7759.7759 0 0 0 .388.6766l5.819 3.3637-2.02 1.1638a.0804.0804 0 0 1-.071 0l-4.8303-2.7913A4.4944 4.4944 0 0 1 2.3424 8.5856zm16.5963 3.8558L13.101 9.0777l2.02-1.1638a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.388-.6766zm2.7107-3.0042l-.1419-.0852-4.7783-2.7582a.7712.7712 0 0 0-.7806 0L10.106 9.9625V7.6301a.0804.0804 0 0 1 .0332-.0615l4.8303-2.7913a4.4992 4.4992 0 0 1 6.6754 4.6601zm-12.6393-2.825v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V6.545a4.504 4.504 0 0 1 7.371-3.4536l-.142.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813z"/>
                                </svg>
                                <span>OpenAI</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default HeroSection;

"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { HeroText } from "./hero-text";

export default function HeroSection() {
  return (
    <section className="w-full relative min-h-[80dvh] bg-grid-black/[0.075] flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <HeroText />
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-400">
              Schedule, manage, and chat with your calendar. Boost your
              productivity with AI-powered task management.
            </p>
          </div>
          <div className="space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Get Started</Button>
              </SignInButton>
            </SignedOut>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

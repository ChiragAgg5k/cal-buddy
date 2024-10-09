import CTASection from "@/components/landing/cta";
import DemoSection from "@/components/landing/demo";
import FeaturesSection from "@/components/landing/features";
import HeroSection from "@/components/landing/hero";
import Navigation from "@/components/landing/navigation";
import PricingSection from "@/components/landing/pricing";
import { Metadata } from "next";
import Link from "next/link";
 
export const metadata: Metadata = {
  title: "Cal Buddy - Your Smart Calendar Assistant",
  description:
    "Schedule, manage, and chat with your calendar. Boost your productivity with AI-powered task management.",
  keywords: [
    "calendar",
    "AI assistant",
    "scheduling",
    "productivity",
    "task management",
  ],
  openGraph: {
    title: "Cal Buddy - Your Smart Calendar Assistant",
    description:
      "Schedule, manage, and chat with your calendar. Boost your productivity with AI-powered task management.",
    type: "website",
    url: "https://calbuddy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cal Buddy - Your Smart Calendar Assistant",
    description:
      "Schedule, manage, and chat with your calendar. Boost your productivity with AI-powered task management.",
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
        <CTASection />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Cal Buddy. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}

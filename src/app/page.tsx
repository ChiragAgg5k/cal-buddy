import CTASection from "@/components/landing/cta";
import DemoSection from "@/components/landing/demo";
import FeaturesSection from "@/components/landing/features";
import HeroSection from "@/components/landing/hero";
import PricingSection from "@/components/landing/pricing";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cal Buddy",
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
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
        <CTASection />
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t flex flex-col items-center justify-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
        <div className="text-center">
          <p className="text-sm">© 2024 Cal Buddy. All rights reserved.</p>
        </div>

        <nav className="flex gap-4 sm:gap-6 text-sm">
          <Link
            href="#"
            className="link-underline link-underline-black  underline-offset-4 focus:outline-none"
          >
            Terms of Service
          </Link>

          <Link
            href="#"
            className="link-underline link-underline-black  underline-offset-4 focus:outline-none"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}

import CTASection from "@/components/landing/cta";
import DemoSection from "@/components/landing/demo";
import FeaturesSection from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero";
import PricingSection from "@/components/landing/pricing";
import { Metadata } from "next";

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
    url: "https://cal-buddy.vercel.app/",
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
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section
      id="cta"
      className="w-full bg-black text-white flex items-center justify-center py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Revolutionize Your Calendar?
            </h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join Cal Buddy today and experience the future of smart
              scheduling.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-4">
            <Link href="/dashboard">
              <Button
                type="submit"
                variant="secondary"
                className="w-full max-w-[250px]"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

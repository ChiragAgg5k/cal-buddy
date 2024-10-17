"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function CTASection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section
      id="cta"
      className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground dark:bg-black"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
              Ready to Revolutionize Your Calendar?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join Cal Buddy today and experience the future of smart
              scheduling.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <Input
                className="max-w-lg flex-1 bg-primary-foreground text-primary"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button type="submit" variant="secondary">
                Get Started
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/60">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

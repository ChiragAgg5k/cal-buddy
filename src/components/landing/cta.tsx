"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner"; // Import the toast function

export default function CTASection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Display toast notification for email submission
    toast(
      <div>
        <h3>Coming Soon</h3>
        <p>You can subscribe to the newsletter very soon in the future.</p>
      </div>
    );
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
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <Input
                className="max-w-lg flex-1 bg-primary-foreground"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button type="submit" variant="secondary">
                Get Started
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
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
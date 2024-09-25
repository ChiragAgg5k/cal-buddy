"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Calendar, Check, Clock, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const targetId = target.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll as EventListener);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", smoothScroll as EventListener);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full bg-background z-50 w-full">
        <Link className="flex items-center justify-center" href="#">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">
            Cal Buddy
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#demo"
          >
            Demo
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
              <p className="text-sm font-medium hover:underline underline-offset-4 hover:cursor-pointer">
                Sign In
              </p>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </SignedIn>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Meet Cal Buddy: Your Smart Calendar Assistant
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Schedule, manage, and chat with your calendar. Boost your
                  productivity with AI-powered task management.
                </p>
              </div>
              <div className="space-x-4">
                {/* <Button>Get Started</Button> */}
                <SignedIn>
                  <Link href={"/dashboard"}>
                    <Button>Get Started</Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                    <Button>Get Started</Button>
                  </SignInButton>
                </SignedOut>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Chat with Your Calendar
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Interact with a smart chatbot to manage your schedule
                  effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Let AI find the perfect time slots for your tasks and
                  meetings.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Prompt-Powered Tasks</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create and manage tasks using natural language prompts.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              See Cal Buddy in Action
            </h2>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">
                    You: Schedule a meeting with John next Tuesday at 2 PM
                  </p>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  <p className="font-medium">
                    {
                      "Cal Buddy: I've scheduled a meeting with John for next Tuesday at 2 PM. Would you like me to send an invitation to John?"
                    }
                  </p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium">
                    You: Yes, please. And remind me to prepare the presentation
                    an hour before.
                  </p>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                  <p className="font-medium">
                    {
                      "Cal Buddy: Done! I've sent the invitation to John and set a reminder for you to prepare the presentation at 1 PM next Tuesday. Is there anything else you need?"
                    }
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Calendar className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Pricing Plans
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">Basic</h3>
                <p className="text-4xl font-bold text-center mb-4">
                  $0<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Basic calendar management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Simple task creation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Limited chatbot interactions</span>
                  </li>
                </ul>
                <Button className="mt-auto">Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border-2 border-primary">
                <h3 className="text-2xl font-bold text-center mb-4">Pro</h3>
                <p className="text-4xl font-bold text-center mb-4">
                  $0<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Advanced calendar management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Smart task scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Full chatbot functionality</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Team collaboration features</span>
                  </li>
                </ul>
                <Button className="mt-auto">Upgrade to Pro</Button>
              </div>
              <div className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-4">
                  Enterprise
                </h3>
                <p className="text-4xl font-bold text-center mb-4">
                  $0<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center opacity-50">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-center opacity-50">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Advanced analytics and reporting</span>
                  </li>
                  <li className="flex items-center opacity-50">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center opacity-50">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>24/7 premium support</span>
                  </li>
                </ul>
                <Button className="mt-auto" disabled>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Revolutionize Your Calendar?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join Cal Buddy today and experience the future of smart
                  scheduling.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    placeholder="Enter your email"
                    type="email"
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
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { Toaster, toast } from "sonner"; // Import Sonner components

const pricingPlans = [
  {
    title: "Basic",
    price: "$0",
    features: [
      "Basic calendar management",
      "Simple task creation",
      "Limited chatbot interactions",
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    title: "Pro",
    price: "$0",
    features: [
      "Advanced calendar management",
      "Smart task scheduling",
      "Full chatbot functionality",
      "Team collaboration features",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: "$0",
    features: [
      "Custom AI model training",
      "Advanced analytics and reporting",
      "Dedicated account manager",
      "24/7 premium support",
    ],
    buttonText: "Contact Sales",
    isDisabled: true,
  },
];

export default function PricingSection() {
  useEffect(() => {
    AOS.init();
  }, []);

  // Function to handle pricing plan click
  const handlePlanClick = (planTitle: string) => {
    toast(
      <div>
        <h3>It's Free!</h3>
        <p>Cal Buddy is completely free to use... (for now) :D</p>
      </div>
    );
  };

  return (
    <section
      id="pricing"
      className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <Toaster position="top-right" />{" "}
      {/* Add Toaster for displaying notifications */}
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Pricing Plans
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 bg-background rounded-lg shadow-lg ${
                plan.isPopular ? "border-2 border-primary" : ""
              }`}
              data-aos="flip-left"
              data-aos-delay={300 * index}
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-center mb-4">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-center ${
                      plan.isDisabled ? "opacity-50" : ""
                    }`}
                  >
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-auto"
                disabled={plan.isDisabled}
                onClick={() => handlePlanClick(plan.title)} // Handle click to show notification
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

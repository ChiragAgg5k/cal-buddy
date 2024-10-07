import { Clock, MessageSquare, Zap } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Chat with Your Calendar",
    description:
      "Interact with a smart chatbot to manage your schedule effortlessly.",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description:
      "Let AI find the perfect time slots for your tasks and meetings.",
  },
  {
    icon: Zap,
    title: "Prompt-Powered Tasks",
    description: "Create and manage tasks using natural language prompts.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Key Features
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

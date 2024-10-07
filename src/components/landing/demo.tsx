import SmartCalendar from "@/components/smart-calendar";

const chatMessages = [
  {
    type: "user",
    message: "Schedule a meeting with John next Tuesday at 2 PM",
  },
  {
    type: "assistant",
    message:
      "I've scheduled a meeting with John for next Tuesday at 2 PM. Would you like me to send an invitation to John?",
  },
  {
    type: "user",
    message:
      "Yes, please. And remind me to prepare the presentation an hour before.",
  },
  {
    type: "assistant",
    message:
      "Done! I've sent the invitation to John and set a reminder for you to prepare the presentation at 1 PM next Tuesday. Is there anything else you need?",
  },
];

export default function DemoSection() {
  return (
    <section
      id="demo"
      className="w-full flex flex-col items-center justify-center py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          See Cal Buddy in Action
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="w-full lg:w-1/2 space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 ${
                  msg.type === "user"
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-primary text-primary-foreground"
                } rounded-lg`}
              >
                <p className="font-medium">
                  {msg.type === "user" ? "You: " : "Cal Buddy: "}
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2">
            <SmartCalendar />
          </div>
        </div>
      </div>
    </section>
  );
}

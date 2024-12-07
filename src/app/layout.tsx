import { AuthProvider } from "@/components/context/auth-provider";
import { ThemeProvider } from "@/components/context/theme-provider";
import Navigation from "@/components/landing/navigation";
import { Toaster } from "@/components/ui/sonner";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cal Buddy",
  description:
    "Schedule, manage, and chat with your calendar. Boost your productivity with AI-powered task management.",
  icons: ["/icon-bordered.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="#000000" showSpinner={false} />
            <CopilotKit runtimeUrl="/api/copilotkit">
              <Navigation />
              {children}
              <CopilotPopup
                labels={{
                  title: "Cal Buddy 🗓️",
                  initial:
                    "Hello! I'm your Cal Buddy assistant. How can I help you today?",
                }}
              />
            </CopilotKit>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}

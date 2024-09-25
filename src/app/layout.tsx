import { ClerkProvider } from "@clerk/nextjs";
import { CopilotKit } from "@copilotkit/react-core";
import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Cal Buddy",
  description: "Your Smart Calendar Assistant, Powered by CopilotKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CopilotKit runtimeUrl="/api/copilotkit">{children}</CopilotKit>
        </body>
      </html>
    </ClerkProvider>
  );
}

// import { ClerkProvider } from "@clerk/nextjs";
// import { CopilotKit } from "@copilotkit/react-core";
// import { CopilotPopup } from "@copilotkit/react-ui";
// import "@copilotkit/react-ui/styles.css";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Cal Buddy",
//   description: "Your Smart Calendar Assistant, Powered by CopilotKit",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <head>
//           <link rel="icon" href="/icon.jpg" />
//         </head>
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           <CopilotKit runtimeUrl="/api/copilotkit">{children}
//             <CopilotPopup
//               labels={{
//                 title: "Cal Buddy 🗓️",
//                 initial:
//                   "Hello! I'm your Cal Buddy assistant. How can I help you today?",
//               }}
//             />
//           </CopilotKit>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import { ClerkProvider } from "@clerk/nextjs";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Define custom fonts
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

// Metadata for the page
export const metadata: Metadata = {
  title: "Cal Buddy",
  description: "Your Smart Calendar Assistant, Powered by CopilotKit",
};

// Define the RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Provide the Clerk publishableKey
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <head>
          <link rel="icon" href="/icon.jpg" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* CopilotKit configuration */}
          <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
            <CopilotPopup
              labels={{
                title: "Cal Buddy 🗓️",
                initial: "Hello! I'm your Cal Buddy assistant. How can I help you today?",
              }}
            />
          </CopilotKit>
        </body>
      </html>
    </ClerkProvider>
  );
}

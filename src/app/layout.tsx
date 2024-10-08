import NextTopLoader from 'nextjs-toploader'
import { ClerkProvider } from '@clerk/nextjs'
import { CopilotKit, CopilotPopup } from '@copilot-kit/react-core'
import { geistSans, geistMono } from './fonts'

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
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          
          <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
            <CopilotPopup
              labels={{
                title: "Cal Buddy 🗓️",
                initial:
                  "Hello! I'm your Cal Buddy assistant. How can I help you today?",
              }}
            />
          </CopilotKit>
        </body>
      </html>
    </ClerkProvider>
  );
}
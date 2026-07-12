import "./globals.css";
import { Metadata } from "next";
import { TRPCReactProvider } from "@/backend/trpc/provider";

type MainLayoutProps = {
  children: React.ReactNode
}
export const metadata: Metadata = {
  publisher: "Mohammad Hamzah Iqbal",
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  applicationName: "Portfolio by Mohammad Hamzah Iqbal",
  description: "A portfolio showcasing my work, skills, and projects. Explore my journey as a software engineer.",
  icons: {
    icon: [{ url: "/icon" }],
    apple: [{ url: "/apple-icon" }],
    shortcut: [{ url: "/icon" }],
  },
}

export default function MainLayout({
  children
}: MainLayoutProps) {
  return (
    <html lang="en">
      <TRPCReactProvider >
        <body>
          <main>
            {children}
          </main>
        </body>
      </TRPCReactProvider>
    </html>
  )
}
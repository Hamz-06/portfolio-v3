import { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

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
}

export default function MainLayout({
  children
}: MainLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
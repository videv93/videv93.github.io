import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
})

export const metadata: Metadata = {
  title: "Vi Tran - AI & Blockchain Developer",
  description: "Building AI-Powered Virtual Dev Agency. Expertise in AI/ML, Blockchain, Full-stack Development, and DevOps.",
  keywords: "AI, Blockchain, Full-stack, DevOps, React, Next.js, Solidity, Machine Learning",
  authors: [{ name: "Vi Tran" }],
  creator: "Vi Tran",
  openGraph: {
    type: "website",
    url: "https://videv93.github.io/",
    title: "Vi Tran - AI & Blockchain Developer",
    description: "Building AI-Powered Virtual Dev Agency. Expertise in AI/ML, Blockchain, Full-stack Development, and DevOps.",
    siteName: "Vi Tran Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vi Tran - AI & Blockchain Developer",
    description: "Building AI-Powered Virtual Dev Agency. Expertise in AI/ML, Blockchain, Full-stack Development, and DevOps.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"
import { SidebarProvider } from "../components/ui/sidebar"
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from "@/components/AuthProvider" // Import the AuthProvider
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "mrxtoday.ai - AI-Powered Market Research",
  description: "Streamline market research with AI-powered questionnaires and real-time data analysis",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'
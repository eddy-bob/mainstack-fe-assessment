import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { QueryProvider } from "@/providers/query-provider"
import "./globals.css"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mainstack Dashboard",
  description: "Mainstack assessment",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <QueryProvider>
          <Sidebar />
          <div className="flex flex-col ml-2">
            <Header />
           <div className="sm:px-18 px-5"> {children}</div>
          </div>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}

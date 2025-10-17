"use client"

import { useState } from "react"
import { AppsMenu } from "@/components/apps-menu"

export default function HomePage() {
  const [isAppsOpen, setIsAppsOpen] = useState(false)

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome Home</h1>
            <p className="text-muted-foreground">This is the home page. Navigate to Revenue to see the dashboard.</p>
          </div>
        </div>
      </div>

      <AppsMenu isOpen={isAppsOpen} onClose={() => setIsAppsOpen(false)} />
    </div>
  )
}

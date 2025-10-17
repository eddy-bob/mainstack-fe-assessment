import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"

export default function AppsPage() {
  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header />
        <Navigation />

        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Apps</h1>
            <p className="text-muted-foreground">Apps page coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

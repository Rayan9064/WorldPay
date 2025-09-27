import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
      <div className="space-y-4">
        <h1 className="text-pretty text-3xl md:text-5xl font-semibold leading-tight">
          Simple, user‑friendly UI for secure remittances
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Clean layout, clear actions, no distractions. Start with a minimal front end and integrate authentication,
          rate optimization, and payouts when you’re ready.
        </p>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/wallet">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 md:p-6">
        {/* Using placeholder image generator per guidelines */}
        <img
          src="/clean-dashboard-preview-cards-and-buttons.jpg"
          alt="Preview of a clean dashboard with cards and buttons"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  )
}

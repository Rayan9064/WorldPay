// Minimal, accessible landing page using existing design tokens and shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Hero from "@/components/hero"
import FeatureList from "@/components/feature-list"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            <span aria-label="Brand">WorldPay</span>
          </Link>
          <nav aria-label="Primary">
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="font-normal">
                <Link href="#features">Features</Link>
              </Button>
              <Button asChild>
                <Link href="/wallet">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Hero />
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-8">
        <FeatureList />
      </section>

      <section id="get-started" className="mx-auto max-w-6xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-pretty">Ready to try it?</CardTitle>
            <CardDescription className="text-pretty">
              A simple, clean starting point. Hook up auth and APIs later—today, just ship the UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Button asChild>
              <Link href="/wallet">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border mt-12">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">© {new Date().getFullYear()} WorldPay. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link className="hover:underline" href="#">
              Docs
            </Link>
            <Link className="hover:underline" href="#">
              GitHub
            </Link>
            <Link className="hover:underline" href="#">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

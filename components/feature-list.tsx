import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Human-first",
    desc: "Clear, accessible UI with sensible defaults. No complex flows—just the essentials.",
  },
  {
    title: "Modular",
    desc: "Start with UI only. Add verification, quotes, and escrow later without redesigning.",
  },
  {
    title: "Responsive",
    desc: "Mobile‑first layout that scales gracefully to tablets and desktops.",
  },
]

export default function FeatureList() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((f) => (
        <Card key={f.title} className="h-full">
          <CardHeader>
            <CardTitle className="text-balance">{f.title}</CardTitle>
            <CardDescription className="text-pretty">{f.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-dashed border-border bg-muted p-4 text-sm text-muted-foreground">
              {/* Simple visual tag without external icons or emojis */}
              Uses semantic colors and shadcn/ui components
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

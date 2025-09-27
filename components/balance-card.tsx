import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BalanceCard({
  title,
  amount,
  subtitle,
}: {
  title: string
  amount: string
  subtitle?: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-pretty text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{amount}</p>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </CardContent>
    </Card>
  )
}

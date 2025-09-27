import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type TxItem = {
  id: string
  type: "send" | "receive"
  counterparty: string
  amount: string
  date: string
  status?: "pending" | "confirmed" | "failed"
}

export function TransactionList({ items }: { items: TxItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {items.map((tx) => (
            <li key={tx.id} className="py-3 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm">
                  <span className="font-medium capitalize">{tx.type}</span>{" "}
                  <span className="text-muted-foreground">with</span>{" "}
                  <span className="font-mono">{tx.counterparty}</span>
                </p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{tx.amount}</p>
                {tx.status ? <p className="text-xs text-muted-foreground capitalize">{tx.status}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

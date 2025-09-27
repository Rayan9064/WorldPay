import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BalanceCard } from "@/components/balance-card"
import { TransactionList, type TxItem } from "@/components/transaction-list"

export default function WalletOverviewPage() {
  const txs: TxItem[] = [
    {
      id: "1",
      type: "send",
      counterparty: "0xA1b2...3c4D",
      amount: "-0.025 ETH",
      date: "Today, 10:21",
      status: "confirmed",
    },
    {
      id: "2",
      type: "receive",
      counterparty: "0x9eF0...12de",
      amount: "+50 USDC",
      date: "Yesterday, 16:02",
      status: "confirmed",
    },
    { id: "3", type: "send", counterparty: "alice.eth", amount: "-10 USDC", date: "Mon, 12:44", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <section aria-labelledby="balances">
        <h2 id="balances" className="sr-only">
          Balances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BalanceCard title="Total balance" amount="$1,842.10" subtitle="All assets, est. USD" />
          <BalanceCard title="ETH" amount="0.542 ETH" subtitle="~ $1,080.40" />
          <BalanceCard title="USDC" amount="762.00 USDC" subtitle="~ $762.00" />
          <BalanceCard title="Fees (mo.)" amount="$2.14" subtitle="Estimated network fees" />
        </div>
      </section>

      <section aria-labelledby="actions" className="flex items-center gap-3">
        <h2 id="actions" className="sr-only">
          Quick actions
        </h2>
        <Button asChild>
          <Link href="/wallet/send">Send</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/wallet/receive">Receive</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/wallet/transactions">View all</Link>
        </Button>
      </section>

      <section aria-labelledby="recent">
        <h2 id="recent" className="sr-only">
          Recent transactions
        </h2>
        <TransactionList items={txs} />
      </section>
    </div>
  )
}

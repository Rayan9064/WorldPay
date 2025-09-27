import { TransactionList, type TxItem } from "@/components/transaction-list"

export default function TransactionsPage() {
  const items: TxItem[] = [
    {
      id: "t1",
      type: "receive",
      counterparty: "0xF0...99eE",
      amount: "+120 USDC",
      date: "Sep 26, 15:21",
      status: "confirmed",
    },
    {
      id: "t2",
      type: "send",
      counterparty: "bob.eth",
      amount: "-0.015 ETH",
      date: "Sep 25, 10:03",
      status: "confirmed",
    },
    {
      id: "t3",
      type: "send",
      counterparty: "0x77...11AA",
      amount: "-24 USDC",
      date: "Sep 21, 09:54",
      status: "failed",
    },
    {
      id: "t4",
      type: "receive",
      counterparty: "charlie.eth",
      amount: "+0.004 ETH",
      date: "Sep 19, 18:08",
      status: "confirmed",
    },
  ]

  return (
    <div className="space-y-4">
      <TransactionList items={items} />
      <p className="text-xs text-muted-foreground">Demo data shown. Connect to a backend or chain indexer later.</p>
    </div>
  )
}

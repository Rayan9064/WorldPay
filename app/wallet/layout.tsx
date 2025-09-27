import type { ReactNode } from "react"
import WalletNav from "@/components/wallet-nav"
import WalletBottomNav from "@/components/wallet-bottom-nav"

export default function WalletLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight">Wallet</h1>
        </div>
        <WalletNav />
      </header>
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-24 md:pb-6">{children}</section>
      <WalletBottomNav />
    </main>
  )
}

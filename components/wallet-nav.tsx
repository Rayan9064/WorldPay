"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/wallet", label: "Overview" },
  { href: "/wallet/send", label: "Send" },
  { href: "/wallet/receive", label: "Receive" },
  { href: "/wallet/transactions", label: "Transactions" },
  { href: "/wallet/settings", label: "Settings" },
  { href: "/wallet/profile", label: "Profile" }, // new
]

export function WalletNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Wallet" className="hidden md:block w-full border-b border-border">
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap items-center gap-1 py-2">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Button
                  asChild
                  variant="ghost"
                  className={cn("font-normal", active && "bg-accent text-foreground")}
                  aria-current={active ? "page" : undefined}
                >
                  <Link href={l.href}>{l.label}</Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default WalletNav

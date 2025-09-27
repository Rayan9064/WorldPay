"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/wallet", label: "Overview" },
  { href: "/wallet/send", label: "Send" },
  { href: "/wallet/receive", label: "Receive" },
  { href: "/wallet/transactions", label: "Activity" },
  { href: "/wallet/profile", label: "Profile" },
]

export default function WalletBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Wallet bottom navigation"
      className="md:hidden fixed inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75"
      role="navigation"
    >
      <ul className="grid grid-cols-5">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <li key={l.href} className="text-center">
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn("block py-3 text-xs", active ? "text-foreground font-medium" : "text-muted-foreground")}
              >
                {l.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

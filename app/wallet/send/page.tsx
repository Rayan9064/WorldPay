"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SendPage() {
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [asset, setAsset] = useState("USDC")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Intentionally no backend. Extend later.
    alert(`Pretend sending ${amount} ${asset} to ${to}`)
  }

  return (
    <Card asChild>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-pretty">Send</CardTitle>
          <CardDescription className="text-pretty">
            Transfer funds to an address or ENS. This is UI-only; no real transactions occur.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="asset">Asset</Label>
            <select
              id="asset"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>USDC</option>
              <option>ETH</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="to">To (address or ENS)</Label>
            <Input id="to" placeholder="0x... or alice.eth" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" disabled={!to || !amount}>
              Send
            </Button>
            <Button variant="outline" asChild>
              <Link href="/wallet">Cancel</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Est. fee: ~$0.00 • Delivery time: ~15s • Network: World Chain (demo)
          </p>
        </CardContent>
      </form>
    </Card>
  )
}

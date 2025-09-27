"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const DEMO_ADDRESS = "0x1234...abcd"

export default function ReceivePage() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(DEMO_ADDRESS.replace("...", "0000"))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">Receive</CardTitle>
        <CardDescription className="text-pretty">Share your address or show the QR to receive funds.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm text-muted-foreground">Your address</label>
          <div className="flex items-center gap-2">
            <Input readOnly value={DEMO_ADDRESS} className="font-mono" aria-label="Your address" />
            <Button onClick={copy} aria-live="polite">
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">This is a demo address. Replace with a real one later.</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md border border-border p-4">
          <img src="/wallet-qr-code.jpg" alt="QR code placeholder" className="h-48 w-48" />
          <p className="mt-2 text-xs text-muted-foreground">Scan to receive</p>
        </div>
      </CardContent>
    </Card>
  )
}

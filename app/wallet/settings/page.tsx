"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function WalletSettingsPage() {
  const [currency, setCurrency] = useState("USD")
  const [privacy, setPrivacy] = useState(true)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Display</CardTitle>
          <CardDescription>Choose how values are shown.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="currency">Fiat currency</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>NGN</option>
              <option>INR</option>
              <option>MXN</option>
            </select>
            <p className="text-xs text-muted-foreground">Affects estimated values only.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Privacy</CardTitle>
          <CardDescription>Simple privacy preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <span className="text-sm">Hide small balances</span>
          </label>
          <p className="text-xs text-muted-foreground">UI-only preference for this demo.</p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const DEMO_ADDRESS = "0x1234...abcd"

export default function WalletProfilePage() {
  const [name, setName] = useState("Jane Doe")
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(DEMO_ADDRESS.replace("...", "0000"))
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Profile</CardTitle>
          <CardDescription>Basic info for display only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Display name</p>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 max-w-xs" />
            </div>
          </div>
          <div className="grid gap-2 max-w-xl">
            <Label htmlFor="address">Address</Label>
            <div className="flex items-center gap-2">
              <Input id="address" readOnly value={DEMO_ADDRESS} className="font-mono" />
              <Button onClick={copy} aria-live="polite">
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Demo data—replace with a real address later.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Preferences</CardTitle>
          <CardDescription>UI-only options for the demo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-input" defaultChecked />
            <span className="text-sm">Show balances on overview</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-input" />
            <span className="text-sm">Enable price hints</span>
          </label>
        </CardContent>
      </Card>
    </div>
  )
}

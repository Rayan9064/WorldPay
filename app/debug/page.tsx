'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const gatherDebugInfo = () => {
      const info = {
        userAgent: navigator.userAgent,
        location: window.location.href,
        referrer: document.referrer,
        miniKit: !!(window as any).MiniKit,
        miniKitLower: !!(window as any).miniKit,
        timestamp: new Date().toISOString(),
        windowKeys: Object.keys(window).filter(key => 
          key.toLowerCase().includes('mini') || 
          key.toLowerCase().includes('world') ||
          key.toLowerCase().includes('kit')
        )
      }

      // Try to call MiniKit methods if available
      if ((window as any).MiniKit) {
        try {
          const miniKit = (window as any).MiniKit
          info.miniKitMethods = Object.getOwnPropertyNames(miniKit)
          info.miniKitPrototype = Object.getOwnPropertyNames(Object.getPrototypeOf(miniKit))
        } catch (e) {
          info.miniKitError = e.message
        }
      }

      setDebugInfo(info)
    }

    gatherDebugInfo()
    const interval = setInterval(gatherDebugInfo, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="hover-lift gradient-border">
        <CardHeader>
          <CardTitle className="text-2xl">MiniKit Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Environment Detection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-between">
                <span>MiniKit (window.MiniKit):</span>
                <Badge variant={debugInfo.miniKit ? "default" : "secondary"}>
                  {debugInfo.miniKit ? "Found" : "Not Found"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>MiniKit (window.miniKit):</span>
                <Badge variant={debugInfo.miniKitLower ? "default" : "secondary"}>
                  {debugInfo.miniKitLower ? "Found" : "Not Found"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Browser Information</h3>
            <div className="bg-muted/30 p-4 rounded-lg text-sm font-mono space-y-2">
              <div><strong>User Agent:</strong> {debugInfo.userAgent}</div>
              <div><strong>Location:</strong> {debugInfo.location}</div>
              <div><strong>Referrer:</strong> {debugInfo.referrer || "None"}</div>
              <div><strong>Last Updated:</strong> {debugInfo.timestamp}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Window Properties</h3>
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              {debugInfo.windowKeys?.length > 0 ? (
                <div className="font-mono space-y-1">
                  {debugInfo.windowKeys.map((key, index) => (
                    <div key={index}>{key}</div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">No MiniKit-related properties found</div>
              )}
            </div>
          </div>

          {debugInfo.miniKitMethods && (
            <div>
              <h3 className="font-semibold mb-3">MiniKit Methods</h3>
              <div className="bg-muted/30 p-4 rounded-lg text-sm">
                <div className="font-mono space-y-1">
                  {debugInfo.miniKitMethods.map((method, index) => (
                    <div key={index}>{method}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {debugInfo.miniKitError && (
            <div>
              <h3 className="font-semibold mb-3">Error</h3>
              <div className="bg-destructive/10 p-4 rounded-lg text-sm text-destructive border border-destructive/20">
                {debugInfo.miniKitError}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-primary mb-3">How to Test</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>1. This debug page shows MiniKit detection status</div>
              <div>2. MiniKit only works when opened inside World App</div>
              <div>3. Install World App on your mobile device</div>
              <div>4. Open World App → Mini Apps → Open this app</div>
              <div>5. Check this debug page again when inside World App</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

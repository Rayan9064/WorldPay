'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, AlertCircle, Wallet } from 'lucide-react'
import { worldConfig } from '@/lib/world-config'

interface WorldAuthProps {
  onAuthSuccess?: (result: any) => void
  onAuthError?: (error: any) => void
}

export const WorldAuth = ({ onAuthSuccess, onAuthError }: WorldAuthProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isMiniKitInstalled, setIsMiniKitInstalled] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkMiniKit = () => {
      if (typeof window !== 'undefined') {
        // Check for MiniKit in different possible locations
        const MiniKit = (window as any).MiniKit
        
        // Check if MiniKit is properly installed
        const isInstalled = MiniKit?.isInstalled?.() || false
        
        // Also check if we're running inside World App
        const isInWorldApp = window.location.href.includes('worldapp') || 
                            document.referrer.includes('worldapp') ||
                            (window as any).navigator?.userAgent?.includes('WorldApp')
        
        console.log('MiniKit detection:', {
          miniKit: !!MiniKit,
          isInstalled,
          isInWorldApp,
          userAgent: navigator.userAgent,
          location: window.location.href
        })
        
        setIsMiniKitInstalled(isInstalled || isInWorldApp)
      }
    }

    // Check immediately
    checkMiniKit()

    // Check periodically in case MiniKit loads later
    const interval = setInterval(checkMiniKit, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleWorldIdVerification = async () => {
    if (!isMiniKitInstalled) {
      setError('World App is not installed. Please install World App to continue.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const MiniKit = (window as any).MiniKit
      if (!MiniKit) {
        throw new Error('MiniKit not available')
      }

      // Check if MiniKit is properly installed
      const isInstalled = MiniKit.isInstalled()
      if (!isInstalled) {
        throw new Error('MiniKit is not properly installed')
      }

      // Perform World ID verification using the correct API
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: worldConfig.action,
        verification_level: 'Orb', // Use 'Device' for testing
      })

      if (finalPayload.status === 'Success') {
        setVerificationResult(finalPayload)
        onAuthSuccess?.(finalPayload)
      } else {
        throw new Error('Verification failed')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Verification failed'
      setError(errorMessage)
      onAuthError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectWallet = async () => {
    if (!isMiniKitInstalled) {
      setError('World App is not installed. Please install World App to continue.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const MiniKit = (window as any).MiniKit
      if (!MiniKit) {
        throw new Error('MiniKit not available')
      }

      // Check if MiniKit is properly installed
      const isInstalled = MiniKit.isInstalled()
      if (!isInstalled) {
        throw new Error('MiniKit is not properly installed')
      }

      // Connect wallet using wallet authentication with correct API
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        // Add any required parameters here
      })

      if (finalPayload.status === 'Success') {
        setVerificationResult(finalPayload)
        onAuthSuccess?.(finalPayload)
      } else {
        throw new Error('Wallet connection failed')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Wallet connection failed'
      setError(errorMessage)
      onAuthError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationResult) {
    return (
      <Card className="w-full max-w-md hover-lift gradient-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-full bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            Authentication Successful
          </CardTitle>
          <CardDescription className="text-base">
            You have been successfully verified and connected to WorldPay.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {verificationResult.nullifier_hash && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground">World ID Verified</p>
              <Badge variant="secondary" className="font-mono text-xs px-3 py-1">
                {verificationResult.nullifier_hash.slice(0, 16)}...
              </Badge>
            </div>
          )}
          {verificationResult.wallet && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground">Wallet Connected</p>
              <Badge variant="secondary" className="font-mono text-xs px-3 py-1">
                {verificationResult.wallet.slice(0, 16)}...
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md hover-lift gradient-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-full bg-primary/10">
            <Wallet className="h-6 w-6" />
          </div>
          Connect to WorldPay
        </CardTitle>
        <CardDescription className="text-base">
          Verify your identity and connect your wallet to access WorldPay features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isMiniKitInstalled && (
          <div className="flex items-start gap-3 p-4 bg-muted/50 border border-muted rounded-lg">
            <div className="p-1 rounded-full bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground mb-2">World App not detected</p>
              <p className="text-muted-foreground">
                This mini app works only inside World App.
              </p>
              <div className="mt-2 text-xs space-y-1">
                <p><strong>To test:</strong></p>
                <p>1. Install World App on your mobile device</p>
                <p>2. Open World App and navigate to mini apps</p>
                <p>3. Open this app from within World App</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="p-1 rounded-full bg-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleConnectWallet}
            disabled={!isMiniKitInstalled || isLoading}
            size="lg"
            className="w-full hover-lift shadow-md"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-3" />
            ) : (
              <Wallet className="h-5 w-5 mr-3" />
            )}
            Connect Wallet
          </Button>

          <Button
            onClick={handleWorldIdVerification}
            disabled={!isMiniKitInstalled || isLoading}
            variant="outline"
            size="lg"
            className="w-full hover-lift"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-3" />
            ) : (
              <CheckCircle className="h-5 w-5 mr-3" />
            )}
            Verify with World ID
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
          By connecting, you agree to WorldPay's terms of service.
        </div>
      </CardContent>
    </Card>
  )
}

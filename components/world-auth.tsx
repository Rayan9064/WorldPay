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
        const miniKit = (window as any).MiniKit
        setIsMiniKitInstalled(!!miniKit)
      }
    }

    // Check immediately
    checkMiniKit()

    // Check periodically in case MiniKit loads later
    const interval = setInterval(checkMiniKit, 1000)
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
      const miniKit = (window as any).MiniKit
      if (!miniKit) {
        throw new Error('MiniKit not available')
      }

      // Perform World ID verification
      const result = await miniKit.verifyWorldId({
        app_id: worldConfig.appId,
        action: worldConfig.action,
        signal: worldConfig.signal,
      })

      setVerificationResult(result)
      onAuthSuccess?.(result)
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
      const miniKit = (window as any).MiniKit
      if (!miniKit) {
        throw new Error('MiniKit not available')
      }

      // Connect wallet
      const result = await miniKit.connectWallet()
      setVerificationResult(result)
      onAuthSuccess?.(result)
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Authentication Successful
          </CardTitle>
          <CardDescription>
            You have been successfully verified and connected to WorldPay.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationResult.nullifier_hash && (
            <div className="space-y-2">
              <p className="text-sm font-medium">World ID Verified</p>
              <Badge variant="secondary" className="font-mono text-xs">
                {verificationResult.nullifier_hash.slice(0, 16)}...
              </Badge>
            </div>
          )}
          {verificationResult.wallet && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Wallet Connected</p>
              <Badge variant="secondary" className="font-mono text-xs">
                {verificationResult.wallet.slice(0, 16)}...
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect to WorldPay
        </CardTitle>
        <CardDescription>
          Verify your identity and connect your wallet to access WorldPay features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isMiniKitInstalled && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              World App is not detected. Please install World App to continue.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleConnectWallet}
            disabled={!isMiniKitInstalled || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Wallet className="h-4 w-4 mr-2" />
            )}
            Connect Wallet
          </Button>

          <Button
            onClick={handleWorldIdVerification}
            disabled={!isMiniKitInstalled || isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Verify with World ID
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          By connecting, you agree to WorldPay's terms of service.
        </div>
      </CardContent>
    </Card>
  )
}

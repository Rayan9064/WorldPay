'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Copy, ExternalLink, RefreshCw } from 'lucide-react'
// Remove unused imports

interface WalletInfo {
  address: string
  balance: string
  network: string
}

export const WalletStatus = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    setIsLoading(true)
    try {
      if (typeof window !== 'undefined') {
        const miniKit = (window as any).MiniKit
        if (miniKit) {
          // Check if wallet is connected
          const accounts = await miniKit.getAccounts()
          if (accounts && accounts.length > 0) {
            setIsConnected(true)
            // Get balance for the first account
            const balance = await miniKit.getBalance(accounts[0])
            setWalletInfo({
              address: accounts[0],
              balance: balance || '0',
              network: 'World Chain'
            })
          } else {
            setIsConnected(false)
            setWalletInfo(null)
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
      setIsConnected(false)
      setWalletInfo(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyAddress = () => {
    if (walletInfo?.address) {
      navigator.clipboard.writeText(walletInfo.address)
    }
  }

  const handleDisconnect = async () => {
    try {
      if (typeof window !== 'undefined') {
        const miniKit = (window as any).MiniKit
        if (miniKit) {
          await miniKit.disconnect()
          setIsConnected(false)
          setWalletInfo(null)
        }
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  if (typeof window === 'undefined' || !(window as any).MiniKit) {
    return (
      <Card className="w-full hover-lift gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-muted/50">
              <Wallet className="h-5 w-5" />
            </div>
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            World App is not detected. Please install World App to connect your wallet.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="w-full hover-lift gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-muted/50">
              <Wallet className="h-5 w-5" />
            </div>
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Checking wallet connection...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isConnected || !walletInfo) {
    return (
      <Card className="w-full hover-lift gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-muted/50">
              <Wallet className="h-5 w-5" />
            </div>
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No wallet connected. Connect your wallet to view status.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full hover-lift gradient-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-500/10">
              <Wallet className="h-5 w-5 text-green-500" />
            </div>
            Wallet Status
          </div>
          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
            Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Address</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono bg-background px-3 py-2 rounded border">
                {walletInfo.address.slice(0, 16)}...{walletInfo.address.slice(-16)}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyAddress}
                className="h-8 w-8 p-0 hover-lift"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Balance</p>
            <p className="text-lg font-mono bg-background px-3 py-2 rounded border">
              {walletInfo.balance} USDC
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Network</p>
            <Badge variant="outline" className="px-3 py-1">{walletInfo.network}</Badge>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={checkWalletConnection}
            className="flex-1 hover-lift"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDisconnect}
            className="flex-1 hover-lift"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            World App is not detected. Please install World App to connect your wallet.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm">Checking wallet connection...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isConnected || !walletInfo) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            No wallet connected. Connect your wallet to view status.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Status
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">Address</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {walletInfo.address.slice(0, 16)}...{walletInfo.address.slice(-16)}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyAddress}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Balance</p>
            <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded inline-block">
              {walletInfo.balance} USDC
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Network</p>
            <Badge variant="outline">{walletInfo.network}</Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={checkWalletConnection}
            className="flex-1"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDisconnect}
            className="flex-1"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

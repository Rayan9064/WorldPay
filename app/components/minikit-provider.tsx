'use client'

import { ReactNode, useEffect } from 'react'

interface MiniKitProviderProps {
  children: ReactNode
}

export function MiniKitProvider({ children }: MiniKitProviderProps) {
  useEffect(() => {
    // Initialize MiniKit when component mounts
    const initializeMiniKit = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
          // Try to access MiniKit from window object
          const MiniKit = (window as any).MiniKit
          
          if (MiniKit && typeof MiniKit.install === 'function') {
            console.log('Installing MiniKit...')
            await MiniKit.install()
            console.log('MiniKit installed successfully')
          } else {
            console.log('MiniKit not available or install method not found')
          }
        }
      } catch (error) {
        console.error('Error initializing MiniKit:', error)
      }
    }

    initializeMiniKit()
  }, [])

  return <>{children}</>
}

// World Coin MiniKit Configuration
export const worldConfig = {
  // Replace with your actual App ID from World Developer Portal
  appId: process.env.NEXT_PUBLIC_WLD_APP_ID || 'app_staging_your_app_id_here',
  
  // Replace with your action name
  action: process.env.NEXT_PUBLIC_WLD_ACTION || 'worldpay-verify',
  
  // Replace with your signal (can be empty string for anonymous actions)
  signal: process.env.NEXT_PUBLIC_WLD_SIGNAL || '',
  
  // World Chain Configuration
  worldChainRpcUrl: process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL || 'https://world-chain-sepolia.g.alchemy.com/v2/demo',
  worldChainExplorer: process.env.NEXT_PUBLIC_WORLD_CHAIN_EXPLORER || 'https://sepolia.worldscan.org',
  
  // Environment
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
}

// Helper function to check if MiniKit is available
export const isMiniKitAvailable = (): boolean => {
  if (typeof window === 'undefined') return false
  return !!(window as any).MiniKit
}

// Helper function to get MiniKit instance
export const getMiniKit = () => {
  if (typeof window === 'undefined') return null
  return (window as any).MiniKit
}

# World Coin MiniKit Integration Setup

This document provides instructions for setting up World Coin MiniKit integration in your WorldPay application.

## Prerequisites

1. **World App**: Install the World App on your mobile device
2. **World Developer Account**: Create an account at [developer.world.org](https://developer.world.org)
3. **Project Setup**: Ensure you have completed the basic Next.js setup

## Configuration

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# World Coin MiniKit Configuration
NEXT_PUBLIC_WLD_APP_ID=app_staging_your_app_id_here
NEXT_PUBLIC_WLD_ACTION=your_action_name_here
NEXT_PUBLIC_WLD_SIGNAL=your_signal_here

# World Chain Configuration
NEXT_PUBLIC_WORLD_CHAIN_RPC_URL=https://world-chain-sepolia.g.alchemy.com/v2/your_api_key
NEXT_PUBLIC_WORLD_CHAIN_EXPLORER=https://sepolia.worldscan.org

# Development Configuration
NEXT_PUBLIC_ENVIRONMENT=development
```

### 2. Getting Your App ID

1. Go to [developer.world.org](https://developer.world.org)
2. Create a new project
3. Navigate to your project settings
4. Copy your App ID (starts with `app_staging_` or `app_`)
5. Replace `app_staging_your_app_id_here` with your actual App ID

### 3. Setting Up Actions

1. In your World Developer project, go to Actions
2. Create a new action for your app (e.g., "worldpay-verify")
3. Configure the action settings
4. Replace `your_action_name_here` with your action name

### 4. World Chain RPC

1. Sign up for an Alchemy account at [alchemy.com](https://alchemy.com)
2. Create a new app for World Chain Sepolia
3. Copy your API key
4. Replace `your_api_key` with your actual Alchemy API key

## Features Implemented

### 1. World ID Authentication (`components/world-auth.tsx`)
- Connect wallet functionality
- World ID verification
- Error handling and user feedback
- MiniKit availability detection
- Client-side only implementation for Next.js compatibility

### 2. Wallet Status (`components/wallet-status.tsx`)
- Real-time wallet connection status
- Balance display
- Address management
- Network information
- Disconnect functionality

### 3. Configuration (`lib/world-config.ts`)
- Centralized configuration management
- Helper functions for MiniKit detection
- Environment variable handling
- TypeScript support

### 4. App Integration
- Client-side components with proper SSR handling
- Updated landing page with authentication
- Wallet page integration
- Build-optimized for production deployment

## Usage

### Basic Authentication Flow

1. **Check MiniKit Availability**: The app automatically detects if World App is installed
2. **Connect Wallet**: Users can connect their wallet through the World App
3. **Verify Identity**: Users can verify their identity using World ID
4. **Access Features**: Once authenticated, users can access wallet features

### Components Usage

```tsx
// Basic authentication component
import { WorldAuth } from '@/components/world-auth'

function MyPage() {
  const handleAuthSuccess = (result) => {
    console.log('Authentication successful:', result)
  }

  const handleAuthError = (error) => {
    console.error('Authentication failed:', error)
  }

  return (
    <WorldAuth 
      onAuthSuccess={handleAuthSuccess}
      onAuthError={handleAuthError}
    />
  )
}

// Wallet status component
import { WalletStatus } from '@/components/wallet-status'

function WalletPage() {
  return <WalletStatus />
}
```

## Development

### Testing

1. **Install World App**: Download and install World App on your device
2. **Run Development Server**: Run `npm run dev` and note the local URL (e.g., http://localhost:3000)
3. **Debug MiniKit Detection**: Visit `/debug` page to check MiniKit detection status
4. **Test in World App**: 
   - Open World App on your mobile device
   - Navigate to Mini Apps section
   - Add your app URL (you may need to expose it publicly with ngrok)
   - Open the app from within World App
5. **Test Authentication**: Try connecting wallet and verifying World ID
6. **Check Wallet Status**: Verify wallet information displays correctly
7. **Build Test**: Run `npm run build` to ensure production build works

### Important Note
**MiniKit only works when the app is opened inside World App, not in a regular browser!** This is why the connect button appears disabled when testing in a browser.

### Debugging

- **Use Debug Page**: Visit `/debug` to see MiniKit detection status
- **Check Console**: Open browser dev tools and check console for MiniKit-related errors
- **Verify Environment**: Ensure environment variables are loaded correctly
- **World App Required**: MiniKit only works inside World App, not in regular browsers
- **Network Issues**: Check network connectivity for RPC calls
- **App Configuration**: Verify your app is properly configured in World Developer Portal

## Production Deployment

### Environment Setup

1. **Production App ID**: Create a production app in World Developer portal
2. **Production RPC**: Use production World Chain RPC endpoint
3. **Security**: Ensure all environment variables are properly secured
4. **Testing**: Test thoroughly with production configuration

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Production App ID set
- [ ] RPC endpoints updated
- [ ] Authentication flow tested
- [ ] Wallet functionality verified
- [ ] Error handling tested

## Troubleshooting

### Common Issues

1. **MiniKit Not Detected**
   - Ensure World App is installed
   - Check if the app is updated to the latest version
   - Verify browser compatibility

2. **Authentication Failures**
   - Check App ID configuration
   - Verify action name matches World Developer portal
   - Ensure network connectivity

3. **Wallet Connection Issues**
   - Check RPC endpoint configuration
   - Verify network settings
   - Ensure sufficient balance for transactions

### Support Resources

- [World Developer Documentation](https://docs.world.org)
- [MiniKit Documentation](https://docs.world.org/mini-apps)
- [World Chain Documentation](https://docs.world.org/world-chain)
- [GitHub Issues](https://github.com/worldcoin/minikit-js/issues)

## Next Steps

1. **Custom Actions**: Implement custom verification actions
2. **Payment Integration**: Add USDC payment functionality
3. **Transaction History**: Implement transaction tracking
4. **Advanced Features**: Add more sophisticated wallet features
5. **Testing**: Implement comprehensive testing suite

# 🌍 RemitFlow Optimizer

A Worldcoin Mini App that optimizes cross-border remittances by addressing high fees (~5-7%) and fraud in the $800B market, using World ID for sybil-resistant verification, 1inch for DeFi rate optimization, and World Chain for zero-fee settlements.

## 🎯 Problem Solved

Global remittances are inefficient with:
- *High fees:* 5-7% on average
- *Fraud:* 10-20% of transactions
- *Sybil attacks:* Duplicate accounts
- *Slow settlements:* Days to complete

## 💡 Solution

RemitFlow Optimizer provides:
- *Sybil resistance* via World ID ZK proofs
- *Real-time rate optimization* using 1inch aggregation
- *Zero-fee settlements* on World Chain
- *ENS integration* for readable recipient handles
- *Compliance checks* via Self Protocol

## 🚀 Features

### Core Functionality
- *World ID Verification:* One-person-one-transfer guarantee
- *Rate Optimization:* 1inch DeFi aggregation for best rates
- *ENS Resolution:* Human-readable addresses (alice.eth)
- *Compliance Proofs:* Optional KYC/AML verification
- *Zero-Fee Transfers:* World Chain settlement

### Technical Stack
- *Frontend:* React with styled-components
- *Backend:* Node.js with Express
- *Smart Contracts:* Solidity on World Chain
- *APIs:* 1inch, ENS, Self Protocol
- *Identity:* World ID with ZK proofs

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Setup
bash
# Clone repository
git clone <repository-url>
cd WorldPay

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your API keys
# - WORLD_ID_APP_ID
# - ONEINCH_API_KEY
# - SELF_API_KEY
# - PRIVATE_KEY (testnet only)


### Environment Variables
env
# World ID Configuration
WORLD_ID_APP_ID=app_staging_1234567890abcdef
WORLD_ID_ACTION=remitflow_transfer

# 1inch API Configuration
ONEINCH_API_KEY=your_1inch_api_key_here

# Self Protocol Configuration
SELF_API_KEY=your_self_api_key_here

# World Chain Configuration
WORLD_CHAIN_RPC=https://worldchain-testnet.optimism.io
ESCROW_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# ENS Configuration
ENS_RPC=https://eth.llamarpc.com

# Server Configuration
PORT=3000
NODE_ENV=development

# Private Key for Contract Interactions (TESTNET ONLY)
PRIVATE_KEY=your_testnet_private_key_here


## 🏃‍♂ Quick Start

### 1. Start Backend
bash
cd packages/backend
npm start


### 2. Start Frontend
bash
cd packages/react-app
npm start


### 3. Deploy Contracts (Optional)
bash
cd packages/contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network worldchain


### 4. Test API
bash
node test-api.js


## 🧪 Testing

### API Testing
bash
# Run comprehensive API tests
node test-api.js

# Test specific endpoints
curl http://localhost:3000/health
curl http://localhost:3000/api/optimize/quote?fromTokenAddress=0xA0b86a33E6441b8c4C8C0E4b8b8b8b8b8b8b8b8b&toTokenAddress=0xD0b86a33E6441b8c4C8C0E4b8b8b8b8b8b8b8b8b&amount=1000000&chainId=480


### Frontend Testing
1. Open http://localhost:3000
2. Connect MetaMask wallet
3. Verify World ID
4. Create test remittance
5. Check ENS resolution
6. Verify rate optimization

## 📊 Demo Flow

### 1. World ID Verification
- Click "Verify World ID"
- Show sybil resistance
- Demonstrate one-person-one-transfer

### 2. Create Remittance
- Enter amount (e.g., $100 USDC)
- Select recipient (alice.eth)
- Resolve ENS to address
- Get optimized quote

### 3. Rate Optimization
- Show 1inch aggregation
- Display savings (1-3% vs 5-7%)
- Compare with traditional fees

### 4. Transaction
- Create escrow transaction
- Show World Chain settlement
- Demonstrate zero fees

## 🏗 Architecture

### Smart Contracts

RemitFlowEscrow.sol
├── World ID verification
├── Token escrow functionality
├── Sybil resistance
└── Zero-fee settlements


### Backend API

/api/verify          - World ID verification
/api/optimize        - 1inch rate optimization
/api/compliance      - Self Protocol compliance
/api/transact        - Transaction management
/api/ens             - ENS resolution


### Frontend

App.js
├── World ID integration
├── Remittance form
├── Rate optimization
└── Transaction flow


## 🔧 Development

### Project Structure

WorldPay/
├── packages/
│   ├── backend/          # Node.js API server
│   ├── react-app/        # React frontend
│   ├── contracts/        # Solidity smart contracts
│   └── subgraph/         # The Graph subgraph
├── test-api.js           # API testing script
├── demo-script.md        # Demo instructions
└── README.md            # This file


### Available Scripts
bash
# Backend
npm run start:backend

# Frontend
npm run start:frontend

# Contracts
npm run compile:contracts
npm run deploy:contracts

# Testing
npm run test:api
npm run test:frontend


## 🌐 API Endpoints

### Health Check
http
GET /health


### World ID Verification
http
POST /api/verify
Content-Type: application/json

{
  "idToken": "world_id_token",
  "appId": "app_staging_123",
  "action": "remitflow_transfer"
}


### Rate Optimization
http
GET /api/optimize/quote?fromTokenAddress=0x...&toTokenAddress=0x...&amount=1000000&chainId=480


### ENS Resolution
http
GET /api/ens/resolve/alice.eth


### Compliance Verification
http
POST /api/compliance/verify
Content-Type: application/json

{
  "proofId": "proof_123",
  "proofType": "country_verification",
  "userAddress": "0x...",
  "country": "US"
}


## 🔐 Security

### World ID Integration
- ZK proofs for privacy
- Nullifier hashes for sybil resistance
- Merkle tree verification

### Smart Contract Security
- Reentrancy protection
- Access control
- Input validation
- Emergency functions

### API Security
- Rate limiting
- Input sanitization
- Error handling
- CORS protection

## 🚀 Deployment

### Backend Deployment
bash
# Production build
npm run build:backend

# Deploy to cloud provider
# (AWS, GCP, Azure, etc.)


### Frontend Deployment
bash
# Build for production
npm run build:frontend

# Deploy to IPFS
npm run deploy:ipfs

# Or deploy to traditional hosting


### Smart Contract Deployment
bash
# Deploy to World Chain
npx hardhat run scripts/deploy.js --network worldchain

# Verify contracts
npx hardhat verify --network worldchain <contract-address>


## 📈 Performance

### Optimization Targets
- *Page Load:* < 3 seconds
- *API Response:* < 2 seconds
- *Transaction:* < 30 seconds
- *Rate Quote:* < 1 second

### Monitoring
- API response times
- Transaction success rates
- User engagement metrics
- Error rates

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript types
- Test coverage

## 📄 License

MIT License - see LICENSE file for details.

## 🎯 Hackathon Tracks

### World Mini Apps
- Core SDK integration
- World ID verification
- World Chain settlement

### 1inch DeFi
- Rate optimization
- Token swaps
- Aggregation protocol

### Self Protocol
- Compliance proofs
- KYC/AML verification
- Privacy-preserving identity

## 🆘 Support

### Documentation
- [World ID Docs](https://docs.worldcoin.org/)
- [1inch API Docs](https://docs.1inch.io/)
- [Self Protocol Docs](https://docs.self.id/)

### Community
- [Discord](https://discord.gg/remitflow)
- [Twitter](https://twitter.com/remitflow)
- [GitHub Issues](https://github.com/remitflow/issues)

---

*Built for ETHGlobal New Delhi 2025 Hackathon* 🚀

This project was bootstrapped with [Create Eth App](https://github.com/paulrberg/create-eth-app).

## Project Structure

The default template is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Workspaces makes it possible to setup multiple packages in such a way that we only need to run yarn install once to install all of them in
a single pass. Dependencies are hoisted at the root.


my-eth-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── packages
    ├── contracts
    │   ├── README.json
    │   ├── package.json
    │   └── src
    │       ├── abis
    │       │   ├── erc20.json
    │       │   └── ownable.json
    │       ├── addresses.js
    │       └── index.js
    ├── react-app
    │   ├── README.md
    │   ├── node_modules
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── ethereumLogo.svg
    │       ├── index.css
    │       ├── index.js
    │       ├── serviceWorker.js
    │       └── setupTests.js
    └── subgraph
        ├── README.md
        ├── abis
        │   └── erc20.json
        ├── package.json
        ├── schema.graphql
        ├── src
        │   └── mappings
        │       ├── tokens.ts
        │       └── transfers.ts
        └── subgraph.yaml


Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.

## Available Scripts

In the project directory, you can run:

### React App

#### yarn react-app:start

Runs the React app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

#### yarn react-app:test

Runs the React test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing React.](https://facebook.github.io/create-react-app/docs/running-tests)

#### yarn react-app:build

Builds the React app for production to the build folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the React documentation on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### yarn react-app:eject

**Note: this is a one-way operation. Once you react-app:eject, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can eject the React app at any time. This command will
remove the single build dependency from your React package.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right
into the react-app package so you have full control over them. All of the commands except react-app:eject will still work,
but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use react-app:eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. <br/>

To learn more, check out the [The Graph documentation](https://thegraph.com/docs).

#### yarn subgraph:codegen

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### yarn subgraph:build

Compiles the subgraph to WebAssembly.

#### yarn subgraph:auth

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth


#### yarn subgraph:deploy

Deploys the subgraph to the official Graph Node.<br/>

Replace paulrberg/create-eth-app in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).
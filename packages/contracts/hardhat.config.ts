import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: __dirname + "/.env" });

const chainIds = {
  goerli: 5, // deprecated
  hardhat: 31337,
  kovan: 42, // deprecated
  mainnet: 1,
  rinkeby: 4, // deprecated
  sepolia: 11155111,
  ropsten: 3, // deprecated
  bsctest: 97,
  bscmain: 56,
  amoy: 80002,
  polygon: 137,
  fuji: 43113,
  avalanche: 43114,
  alfajores: 44787,
  celo: 42220,
  lineaSepolia: 59141,
  linea: 59144,
  arbitrumSepolia: 421614,
  arbitrum: 42161
};

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY  = process.env.RPC_NODE_API_KEY;
const MNEMONIC  = process.env.MNEMONIC;
const ETHERSCAN_API_KEY  = process.env.ETHERSCAN_API_KEY as string;
const defaultRPCNodeProvider = process.env.RPC_PROVIDER as string;

const getRPCURL = (network: string, RPCNodeProvider: string) => {
  switch (RPCNodeProvider) {
    case "moralis":
      return `https://speedy-nodes-nyc.moralis.io/${API_KEY}/eth/${network}`;
      
    case "alchemy":
      return `https://eth-${network}.g.alchemy.com/v2/${API_KEY}`;
  
    case "infura":
      return `https://${network}.infura.io/v3/${API_KEY}`;
      
    case "datahub":
      return `https://ethereum-${network}--rpc.datahub.figment.io//apikey/${API_KEY}`;
      
    default:
      console.error("Unknown provider:", RPCNodeProvider);
  }
  return;
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    // hardhat: {
    //   accounts: {
    //     mnemonic: MNEMONIC,
    //   },
    //   chainId: chainIds.hardhat,
    // },
    ropsten: {
      url: getRPCURL('ropsten', defaultRPCNodeProvider),
      accounts:  [`0x${PRIVATE_KEY}`],
      chainId: chainIds.ropsten,
    },
    rinkeby: {
      url: getRPCURL('rinkeby', defaultRPCNodeProvider),
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: chainIds.rinkeby,
    },
    kovan: {
      url: getRPCURL('kovan', defaultRPCNodeProvider),
      accounts:  [`0x${PRIVATE_KEY}`],
      chainId: chainIds.kovan,
    },
    goerli: {
      url: getRPCURL('goerli', defaultRPCNodeProvider),
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: chainIds.goerli,
    },
    sepolia: {
      url: getRPCURL('sepolia', defaultRPCNodeProvider),
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: chainIds.sepolia,
    },
    mainnet: {
      url: getRPCURL('mainnet', defaultRPCNodeProvider),
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: chainIds.mainnet,
    },
    bsctest: {
      url: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
      chainId: chainIds.bsctest,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    bscmain: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: chainIds.bscmain,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    amoy: {
      url: 'https://rpc-amoy.polygon.technology/',
      chainId: chainIds.amoy,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygon: {
      url: 'https://polygon-rpc.com/',
      chainId: chainIds.polygon,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: chainIds.fuji,
      // gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    avalanche: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: chainIds.avalanche,
      // gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      chainId: chainIds.alfajores,
      // gasPrice: 20000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    celo: {
      url: 'https://forno.celo.org',
      chainId: chainIds.celo,
      // gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    lineaSepolia: {
      url: getRPCURL("linea-sepolia", defaultRPCNodeProvider), // public URL: 'https://linea-sepolia.blockpi.network/v1/rpc/',
      chainId: chainIds.lineaSepolia,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    linea: {
      url: getRPCURL("linea", defaultRPCNodeProvider), // public URL: 'https://rpc.linea.build',
      chainId: chainIds.linea,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    arbitrumSepolia: {
      url: getRPCURL("arbitrum-sepolia", defaultRPCNodeProvider),
      chainId: chainIds.arbitrumSepolia,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    arbitrum: {
      url: getRPCURL("arbitrum", defaultRPCNodeProvider),
      chainId: chainIds.arbitrum,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    ],
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  }
};

export default config;
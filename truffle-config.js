/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require("truffle-hdwallet-provider");
const dotenv = require("dotenv");
dotenv.config();

const infuraKey = process.env.infura_key;
const mnemonic = process.env.mnemonic_key;
module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.etherscan_key,
  },

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1001",
    },
    testnet: {
      network_id: "97",
      provider: () =>
        new HDWalletProvider(
          [process.env.DEPLOYER_PRIVATE_KEY],
          "https://data-seed-prebsc-2-s1.binance.org:8545/"
        ),
      from: process.env.DEPLOYER_ACCOUNT,
      timeoutBlocks: 800,
    },
  },

  mocha: {
    timeout: 100000,
  },

  compilers: {
    solc: {
      version: "v0.6.2",
      settings: {
        optimizer: {
          enabled: true,
          runs: 50000,
        },
        evmVersion: "istanbul",
      },
    },
  },
};

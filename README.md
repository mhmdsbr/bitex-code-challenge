# Next.js+Wagmi ERC20 Token Minting and Transfering App

## Overview

This is a simple Next.js application using the Wagmi library to interact with an ERC20 smart contract on the Ethereum network. The app allows users to mint new tokens and send them to another wallet address.

## Prerequisites

Before running the app, make sure you have the following:

1. **Node.js:** Install Node.js from [nodejs.org](https://nodejs.org/).

2. **Metamask Wallet:**
    - Install the Metamask browser extension from [metamask.io](https://metamask.io/).
    - Create an account or import an existing one.
    - Connect Metamask to the Goerli test network.

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install

2. **Run Development Environment:**

   ```bash
   npm run dev
The app will be accessible at http://localhost:3000.

3. **Connect Metamask:**
    - Open the app in your browser.
    - Click the "Connect" button to connect your Metamask wallet.
    - Make sure you are connecting to GOERLI network (If you don't the application only connect to wallet and there will be no functioning)
4. **Mint Tokens:**
    - After connecting, enter the amount of tokens you want to mint in the input field.
    - Click the "Mint" button.
    - Confirm the transaction in Metamask.
5. **Send Tokens:**
   - Once the minting is successful, a new input field will appear.
   - Enter the wallet address where you want to send the minted tokens.
   - Click the "Send Tokens" button.
   - Confirm the transaction in Metamask.
## Additional Information 
   1. If you are using your own smart contract, provide the address in the application code.
   2. Ensure the contract is deployed on the Goerli test network. (If you don't, the application only connect to wallet and there will be no functioning)
   3. You can customize the application behavior by setting environment variables in a .env file.


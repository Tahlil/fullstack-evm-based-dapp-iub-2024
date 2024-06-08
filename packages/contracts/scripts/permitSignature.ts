import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
    // Load private key from environment variables
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('Private key not found in environment variables');
    }

    // Replace with your contract details
    const owner = '0x3cFeC7EA56878059B15c3A13f34F28bE0cad2195';
    const spender = '0xcb482912Fd8461B8BF8408BA1509192930766C8B';
    const value = ethers.parseUnits('1', 18); // Amount of tokens to permit
    const nonce = 0; // Replace with the actual nonce
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now

    // Token contract details
    const tokenName = 'MyToken';
    const tokenAddress = '0xF52D31217ED90fdEeA37e24Bcdd3de8d1133Dde3';
    const chainId = 59141; // Replace with the actual chain ID

    const wallet = new ethers.Wallet(privateKey);

    // EIP-712 domain data
    const domain = {
        name: tokenName,
        version: '1',
        chainId,
        verifyingContract: tokenAddress
    };

    // EIP-712 types
    const types = {
        Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
        ]
    };

    // EIP-712 values
    const values = {
        owner,
        spender,
        value,
        nonce,
        deadline
    };

    // Sign the typed data
    const signature = await wallet.signTypedData(domain, types, values);
    const { r, s, v } = ethers.Signature.from(signature);

    console.log('v:', v);
    console.log('r:', r);
    console.log('s:', s);
}

main().catch(console.error);
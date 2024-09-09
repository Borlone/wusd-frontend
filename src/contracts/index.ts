import { client } from '@/configs/thirdweb/client';
import { getContract } from 'thirdweb';
import { abi } from './abi';
import { ChainOptions } from 'thirdweb/chains';

const app_env = process.env.NEXT_PUBLIC_APP_ENV;
console.log({ app_env });

type CONTRACT_INFO = {
    EXPLORER_URL: string;
    SWAP_ADDRESS: string;
    USDT_TOKEN: string;
    WUSD_TOKEN: string;
};

type Chain = Readonly<
    ChainOptions & {
        rpc: string;
    }
>;

const contractInfos: { [key: string]: CONTRACT_INFO } = {
    development: {
        EXPLORER_URL: 'https://sepolia.etherscan.io/tx',
        SWAP_ADDRESS: '0x7Cea40f250Da7B53231DCb47FCCBB885Ccd6C824',
        USDT_TOKEN: '0x2eA755250F9620a6C66B0Cd0D41740e3EaEc1765',
        WUSD_TOKEN: '0xE29d93aCc7a860756253fC849b51C76E1fe1aE18',
    },
    staging: {
        EXPLORER_URL: 'https://sepolia.etherscan.io/tx',
        SWAP_ADDRESS: '0xc1EB9abff5e868eB87C0dD0AF4d1907b298a3b84',
        USDT_TOKEN: '0xcd802A3E6D2F7d56170A2E1C389de83Ee9EBAA23',
        WUSD_TOKEN: '0xB31Dc642eCa4D6b7912227AD620e96d90d52A92c',
    },
    production: {
        EXPLORER_URL: 'https://etherscan.io/tx',
        SWAP_ADDRESS: '0xc5d7a63768d05E0F344f4798E6560441ff6fa984',
        USDT_TOKEN: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        WUSD_TOKEN: '0xb6667b04Cb61Aa16B59617f90FFA068722Cf21dA',
    },
};

export const contractInfo = contractInfos[app_env ?? 'development'];

const defaultOptions = { client, abi };

export const getDecimals = (chain: Chain, token?: string) =>
    getContract({
        ...defaultOptions,
        chain,
        address: token ?? '',
    });

export const getPoolAddressContract = (chain: Chain) =>
    getContract({
        ...defaultOptions,
        chain,
        address: contractInfo.SWAP_ADDRESS,
    });

export const getRateContract = (chain: Chain) =>
    getContract({
        ...defaultOptions,
        chain,
        address: contractInfo.SWAP_ADDRESS,
    });

export const getPoolAmountContract = (chain: Chain, tokenOut?: string) =>
    getContract({
        ...defaultOptions,
        chain,
        address: tokenOut ?? contractInfo.SWAP_ADDRESS,
    });

export const approveContract = (chain: Chain, tokenIn: string) =>
    getContract({
        ...defaultOptions,
        chain,
        address: tokenIn,
    });

export const swapContract = (chain: Chain) =>
    getContract({
        ...defaultOptions,
        chain,
        address: contractInfo.SWAP_ADDRESS,
    });

export const getAllowance = (chain: Chain, tokenIn: string) =>
    getContract({
        ...defaultOptions,
        chain,
        address: tokenIn,
    });

export const getSymbolContract = (chain: Chain, token: string) =>
    getContract({
        ...defaultOptions,
        chain,
        address: token,
    });

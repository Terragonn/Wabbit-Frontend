import { Token, TokenData } from ".";

interface ChainData {
    name: string;
    rpcUrl: string;
    blockExplorer: string;
    token: string;
}

export const SUPPORTED_CHAIN_ID = [250] as const;

export type SupportedChainId = typeof SUPPORTED_CHAIN_ID[number];

export const chainDataConfig: { [key in SupportedChainId]: ChainData } = {
    250: {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com/",
        token: "https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png",
    },
};

import { Token, TokenData } from ".";

interface ChainData {
    name: string;
    rpcUrl: string;
    blockExplorer: string;
    token: Token;
}

export const SUPPORTED_CHAIN_ID = [250] as const;

export type SupportedChainId = typeof SUPPORTED_CHAIN_ID[number];

export const chainDataConfig: { [key in SupportedChainId]: ChainData } = {
    250: {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com/",
        token: TokenData.FTM,
    },
};

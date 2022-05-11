interface ChainData {
    name: string;
    rpcUrl: string;
    blockExplorer: string;
    token: string;
}

const SUPPORTED_CHAIN_ID = [250] as const;

export type SupportedChainId = typeof SUPPORTED_CHAIN_ID[number];

export const chainDataConfig: { [key in SupportedChainId]: ChainData } = {
    250: {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com/",
        token: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
    },
};

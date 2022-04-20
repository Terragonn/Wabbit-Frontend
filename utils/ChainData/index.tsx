export interface ChainData {
    name: string;
    rpcUrl: string;
    blockExplorer: string;
}

export type SupportedChainId = 250;

export const chainDataConfig: { [key in SupportedChainId]: ChainData } = {
    250: {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com/",
    },
};

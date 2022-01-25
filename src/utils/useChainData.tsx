import {createContext, useContext, useEffect, useState} from "react";

import mainConfig from "../config/config.main.json";
import testConfig from "../config/config.test.json";
import forkConfig from "../config/config.fork.json";
import {useWeb3React} from "@web3-react/core";

export const SUPPORTED_CHAIN_IDS = [4, 250, 31337] as const;
export type SupportedChainIds = typeof SUPPORTED_CHAIN_IDS[number];

export interface Approved {
    name: string;
    symbol: string;
    icon: string;
    address: string;
    decimals: number;
    priceFeed: string;
    reservePriceFeed: string;
    oracle: boolean;
    marginLongCollateral: boolean;
    marginLongBorrow: boolean;
    leveragePool: boolean;
}

export interface Config {
    avgBlockTime: number;
    routerAddress: string;
    gelatoPokeMe: string;
    LPPrefixName: string;
    LPPrefixSymbol: string;
    approved: Approved[];
    leveragePoolAddress: string;
    oracleAddress: string;
    converterAddress: string;
    marginLongAddress: string;
    resolverAddress: string;
}

export interface ChainData {
    blockExplorer: string;
    config: Config | null;
}

const chainDataCtx = createContext<ChainData>(undefined as any);

export default function useChainData() {
    return useContext(chainDataCtx);
}

export function ChainDataProvider({children}: {children: any}) {
    const {chainId} = useWeb3React();

    const chainDataConfig: {[key in SupportedChainIds]: ChainData} = {
        4: {
            blockExplorer: "https://rinkeby.etherscan.io/address/",
            config: testConfig,
        },
        250: {
            blockExplorer: "https://ftmscan.com/address/",
            config: mainConfig,
        },
        31337: {
            blockExplorer: "",
            config: forkConfig,
        },
    };

    const [chainData, setChainData] = useState<ChainData>({blockExplorer: "", config: null});

    useEffect(() => {
        let newChainId = chainId;
        if (chainId && Object.keys(chainDataConfig).includes(newChainId?.toString() as string)) {
            const newChainDataConfig = chainDataConfig[newChainId as SupportedChainIds];
            setChainData(newChainDataConfig);
        }
    }, [chainId]);

    return <chainDataCtx.Provider value={chainData}>{children}</chainDataCtx.Provider>;
}

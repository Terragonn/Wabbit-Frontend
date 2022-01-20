import {createContext, useContext, useEffect, useState} from "react";

import mainConfig from "../config/config.main.json";
import testConfig from "../config/config.test.json";
import forkConfig from "../config/config.fork.json";
import {useWeb3React} from "@web3-react/core";

export const SUPPORTED_CHAIN_IDS = [4, 250, 31337] as const;
type SupportedChainIds = typeof SUPPORTED_CHAIN_IDS[number];

export interface Approved {
    name: string;
    symbol: string;
    icon: string;
    address: string;
    decimals: number;
    priceFeed: string;
    reservePriceFeed: string;
    marginLongCollateral: boolean;
    marginLongBorrow: boolean;
    leveragePool: boolean;
}

interface Config {
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

interface ChainData {
    blockExplorer: string;
    config: Config;
}

const chainDataCtx = createContext<ChainData>(undefined as any);

export default function useChainData() {
    return useContext(chainDataCtx);
}

export function ChainDataProvider({children}: {children: any}) {
    const {chainId} = useWeb3React();

    const chainDataConfig: {[key in SupportedChainIds]: ChainData} = {
        4: {
            blockExplorer: "https://ropsten.etherscan.io/address/",
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

    const [chainData, setChainData] = useState<ChainData>(chainDataConfig[250]);

    useEffect(() => {
        let newChainId: SupportedChainIds = chainId as any;
        if (chainId && SUPPORTED_CHAIN_IDS.includes(newChainId)) setChainData(chainDataConfig[newChainId]);
    }, [chainId]);

    return <chainDataCtx.Provider value={chainData}>{children}</chainDataCtx.Provider>;
}

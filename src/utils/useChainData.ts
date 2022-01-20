import {createContext, useContext, useState} from "react";

import mainConfig from "../config/config.main.json";
import testConfig from "../config/config.test.json";
import forkConfig from "../config/config.fork.json";

export const supportedChainIds = [4, 250, 31337];

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
    const [chainData, setChainData] = useState<ChainData>({blockExplorer: "", config: mainConfig});
}

import {useWeb3React} from "@web3-react/core";
import {createContext, useContext, useEffect, useState} from "react";

import mainConfig from "../../config/config.main.json";
import testConfig from "../../config/config.test.json";
import forkConfig from "../../config/config.fork.json";

export const SUPPORTED_CHAIN_IDS = [0, 4, 250, 1337] as const;
export type SupportedChainIds = typeof SUPPORTED_CHAIN_IDS[number];

type Color = "zinc" | "yellow" | "sky" | "emerald";

interface ChainData {
    name: string;
    rpcUrl: string;
    blockExplorer: string;
    config: Config | null;
    color: Color;
    priority: number;
    disabled: boolean;
}
export const chainDataConfig: {[key in SupportedChainIds]: ChainData} = {
    250: {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com/",
        config: mainConfig,
        color: "sky",
        priority: 4,
        disabled: false,
    },
    4: {
        name: "Rinkeby",
        rpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/SbTuBtBxbJL2aEO2-f5S4bkc797ZDEwT",
        blockExplorer: "https://rinkeby.etherscan.io/",
        config: testConfig,
        color: "yellow",
        priority: 3,
        disabled: false,
    },
    1337: {
        name: "Localhost",
        rpcUrl: "http://127.0.0.1:8545/",
        blockExplorer: "",
        config: forkConfig,
        color: "emerald",
        priority: 2,
        disabled: true,
    },
    0: {
        name: "Invalid",
        rpcUrl: "",
        blockExplorer: "",
        config: null,
        color: "zinc",
        priority: 1,
        disabled: true,
    },
};

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
    setup: {
        maxInterestMinNumerator: number;
        maxInterestMinDenominator: number;
        maxInterestMaxNumerator: number;
        maxInterestMaxDenominator: number;
        maxUtilizationNumerator: number;
        maxUtilizationDenominator: number;
    };
}

export interface Config {
    nativeCoin: Approved;
    wrappedCoin: Approved;
    routerAddress: string;
    taskTreasury: string;
    LPPrefixName: string;
    LPPrefixSymbol: string;
    approved: Approved[];
    leveragePoolAddress: string;
    leveragePoolLogicAddress: string;
    oracleAddress: string;
    converterAddress: string;
    marginLongAddress: string;
    marginLongLogicAddress: string;
    resolverAddress: string;
    timelockAddress: string;
}

const chainDataCtx = createContext<ChainData>(undefined as any);

export default function useChainData() {
    return useContext(chainDataCtx);
}

export function ChainDataProvider({children}: {children: any}) {
    const {chainId} = useWeb3React();

    const [chainData, setChainData] = useState<ChainData>(chainDataConfig[0]);

    useEffect(() => {
        let newChainId = chainId;
        if (chainId && Object.keys(chainDataConfig).includes(newChainId?.toString() as string)) {
            const newChainDataConfig = chainDataConfig[newChainId as SupportedChainIds];
            setChainData(newChainDataConfig);
        } else setChainData(chainDataConfig[0]);
    }, [chainId]);

    return <chainDataCtx.Provider value={chainData}>{children}</chainDataCtx.Provider>;
}

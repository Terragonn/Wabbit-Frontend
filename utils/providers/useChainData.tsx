import {useWeb3React} from "@web3-react/core";
import {createContext, useContext, useEffect, useState} from "react";

import mainConfig from "../../config/config.main.json";
import testConfig from "../../config/config.test.json";
import forkConfig from "../../config/config.fork.json";

export const SUPPORTED_CHAIN_IDS = [0, 4, 250, 31337] as const;
export type SupportedChainIds = typeof SUPPORTED_CHAIN_IDS[number];
interface ChainData {
    name: string;
    rpcUrl: string;
    blockExplorer: string;
    config: Config | null;
    textColor: string;
    bgColor: string;
}
export const chainDataConfig: {[key in SupportedChainIds]: ChainData} = {
    0: {
        name: "Invalid",
        rpcUrl: "",
        blockExplorer: "",
        config: null,
        textColor: "text-zinc-600",
        bgColor: "bg-zinc-900",
    },
    4: {
        name: "Rinkeby",
        rpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/SbTuBtBxbJL2aEO2-f5S4bkc797ZDEwT",
        blockExplorer: "https://rinkeby.etherscan.io/address/",
        config: testConfig,
        textColor: "text-yellow-300",
        bgColor: "bg-yellow-600",
    },
    250: {
        name: "Fantom",
        rpcUrl: "https://rpc.ftm.tools/",
        blockExplorer: "https://ftmscan.com/address/",
        config: mainConfig,
        textColor: "text-sky-500",
        bgColor: "bg-sky-800",
    },
    31337: {
        name: "Localhost",
        rpcUrl: "http://127.0.0.1:8545/",
        blockExplorer: "",
        config: forkConfig,
        textColor: "text-emerald-500",
        bgColor: "bg-emerald-800",
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
        }
    }, [chainId]);

    return <chainDataCtx.Provider value={chainData}>{children}</chainDataCtx.Provider>;
}

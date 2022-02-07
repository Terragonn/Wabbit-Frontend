import {useWeb3React} from "@web3-react/core";
import {createContext, useContext, useEffect, useState} from "react";

import mainConfig from "../../config/config.main.json";
import testConfig from "../../config/config.test.json";
import forkConfig from "../../config/config.fork.json";

export const SUPPORTED_CHAIN_IDS = [0, 4, 250, 31337] as const;
export type SupportedChainIds = typeof SUPPORTED_CHAIN_IDS[number];
export const chains: {[key in SupportedChainIds]: {name: string; rpc: string; color: string}} = {
    0: {name: "Invalid", rpc: "", color: "text-zinc-600"},
    4: {name: "Rinkeby", rpc: "https://eth-rinkeby.alchemyapi.io/v2/SbTuBtBxbJL2aEO2-f5S4bkc797ZDEwT", color: "text-yellow-300"},
    250: {name: "Fantom", rpc: "https://rpc.ftm.tools/", color: "text-sky-500"},
    31337: {name: "Localhost", rpc: "http://127.0.0.1:8545/", color: "text-emerald-500"},
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

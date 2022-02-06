import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";

import LPoolAbi from "../../config/LPool.json";
import OracleAbi from "../../config/Oracle.json";
import MarginLongAbi from "../../config/MarginLong.json";
import ConverterAbi from "../../config/Converter.json";

import {LPool, Oracle, MarginLong, Converter} from "../../typechain-types";

import useChainData, {Config} from "./useChainData";

interface Contracts {
    signer: ethers.providers.JsonRpcSigner;
    config: Config;
    lPool: LPool;
    oracle: Oracle;
    marginLong: MarginLong;
    converter: Converter;
}

const contractCtx = createContext<Contracts | null>(undefined as any);

export default function useContracts() {
    return useContext(contractCtx);
}

export function ContractsProvider({children}: {children: any}) {
    const {active, library, account} = useWeb3React();
    const {config} = useChainData();

    async function getContracts() {
        if (active && config) {
            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();

            const lPool = new ethers.Contract(config.leveragePoolAddress, LPoolAbi.abi, signer) as LPool;
            const oracle = new ethers.Contract(config.oracleAddress, OracleAbi.abi, signer) as Oracle;
            const marginLong = new ethers.Contract(config.marginLongAddress, MarginLongAbi.abi, signer) as MarginLong;
            const converter = new ethers.Contract(config.converterAddress, ConverterAbi.abi, signer) as Converter;

            return {signer, config, lPool, oracle, marginLong, converter} as Contracts;
        }
        return null;
    }

    const [contracts, setContracts] = useState<Contracts | null>(null);

    useEffect(() => {
        (async () => {
            const newContracts = await getContracts();
            setContracts(newContracts);
        })();
    }, [config, account]);

    return <contractCtx.Provider value={contracts}>{children}</contractCtx.Provider>;
}

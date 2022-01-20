import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";

import config from "../config/config.json";

import LPool from "../config/LPool.json";
import Oracle from "../config/Oracle.json";
import MarginLong from "../config/MarginLong.json";

interface Contracts {
    lPool: ethers.Contract;
    oracle: ethers.Contract;
    marginLong: ethers.Contract;
}

const contractCtx = createContext<Contracts | null>(undefined as any);

export default function useContracts() {
    return useContext(contractCtx);
}

export function ContractsProvider({children}: {children: any}) {
    const {active, library} = useWeb3React();

    async function getContracts() {
        if (active) {
            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();

            const lPool = new ethers.Contract(config.leveragePoolAddress, LPool.abi, signer);
            const oracle = new ethers.Contract(config.oracleAddress, Oracle.abi, signer);
            const marginLong = new ethers.Contract(config.marginLongAddress, MarginLong.abi, signer);

            return {lPool, oracle, marginLong};
        }
        return null;
    }

    const [contracts, setContracts] = useState<Contracts | null>(null);

    useEffect(() => {
        (async () => {
            setContracts(await getContracts());
        })();
    }, [active]);

    return <contractCtx.Provider value={contracts}>{children}</contractCtx.Provider>;
}

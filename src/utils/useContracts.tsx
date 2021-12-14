import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import IVPool from "../config/IVPool.json";
import IMargin from "../config/IMargin.json";
import config from "../config/config.json";

export interface Contracts {
    pool: ethers.Contract;
    margin: ethers.Contract;
}

export function useContracts() {
    return useContext(contractCtx);
}

export const contractCtx = createContext<[Contracts | null, (contracts: Contracts | null) => void]>(undefined as any);

export default function ContractsProvider(props: { children: any }) {
    const { active, library } = useWeb3React();
    const [contracts, setContracts] = useState<Contracts | null>(getContracts);

    function getContracts() {
        if (active) {
            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();

            const pool = new ethers.Contract(config.poolAddress, IVPool.abi, signer);
            const margin = new ethers.Contract(config.marginAddress, IMargin.abi, signer);

            return { pool, margin };
        }
        return null;
    }

    useEffect(() => {
        setContracts(getContracts());
    }, [active]);

    return <contractCtx.Provider value={[contracts, setContracts]}>{props.children}</contractCtx.Provider>;
}

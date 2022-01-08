import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import LPool from "../config/LPool.json";
import Margin from "../config/Margin.json";
import Oracle from "../config/Oracle.json";
import config from "../config/config.json";

interface Contracts {
  pool: ethers.Contract;
  oracle: ethers.Contract;
  margin: ethers.Contract;
  periodId: number;
}

const contractCtx = createContext<
  [Contracts | null, (contracts: Contracts | null) => void]
>(undefined as any);

export default function useContracts() {
  return useContext(contractCtx);
}

export function ContractsProvider(props: { children: any }) {
  const { active, library } = useWeb3React();

  async function getContracts() {
    if (active) {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();

      const pool = new ethers.Contract(config.poolAddress, LPool.abi, signer);
      const oracle = new ethers.Contract(
        config.oracleAddress,
        Oracle.abi,
        signer
      );
      const margin = new ethers.Contract(
        config.marginAddress,
        Margin.abi,
        signer
      );

      const periodId = (await pool.currentPeriodId()).toNumber();

      return { pool, oracle, margin, periodId };
    }
    return null;
  }

  const [contracts, setContracts] = useState<Contracts | null>(null);

  useEffect(() => {
    (async () => {
      setContracts(await getContracts());
    })();
  }, [active]);

  return (
    <contractCtx.Provider value={[contracts, setContracts]}>
      {props.children}
    </contractCtx.Provider>
  );
}

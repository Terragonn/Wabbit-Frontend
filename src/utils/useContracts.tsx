import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import config from "../config/config.json";

import LPool from "../config/LPool.json";
import Oracle from "../config/Oracle.json";
import FlashSwapDefault from "../config/FlashSwapDefault.json";
import MarginLong from "../config/MarginLong.json";
import Reserve from "../config/Reserve.json";

interface Contracts {
  lPool: ethers.Contract;
  oracle: ethers.Contract;
  flashSwapDefault: ethers.Contract;
  marginLong: ethers.Contract;
  reserve: ethers.Contract;
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

      const lPool = new ethers.Contract(
        config.leveragePoolAddress,
        LPool.abi,
        signer
      );
      const oracle = new ethers.Contract(
        config.oracleAddress,
        Oracle.abi,
        signer
      );
      const flashSwapDefault = new ethers.Contract(
        config.flashSwapDefaultAddress,
        FlashSwapDefault.abi,
        signer
      );
      const marginLong = new ethers.Contract(
        config.marginLongAddress,
        MarginLong.abi,
        signer
      );
      const reserve = new ethers.Contract(
        config.reserveAddress,
        Reserve.abi,
        signer
      );

      return { lPool, oracle, flashSwapDefault, marginLong, reserve };
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

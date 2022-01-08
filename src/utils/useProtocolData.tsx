import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import useContracts from "./useContracts";
import config from "../config/config.json";

interface ProtocolData {
  totalPoolPriceLocked: (address: string) => ethers.BigNumber;
  minimumMarginLevel: (address: string) => ethers.BigNumber;
  minimumCollateralPrice: (address: string) => ethers.BigNumber;

  totalPriceLocked: (address: string) => ethers.BigNumber;
  totalAmountLocked: (address: string) => ethers.BigNumber;
  totalBorrowed: (address: string) => ethers.BigNumber;
  totalBorrowedLong: (address: string) => ethers.BigNumber;
  liquidityAvailable: (address: string) => ethers.BigNumber;
  stakeAPY: (address: string) => ethers.BigNumber;
  borrowAPY: (address: string) => ethers.BigNumber;
  utilizationRate: (address: string) => ethers.BigNumber;

  totalAvailable: (address: string) => ethers.BigNumber;
  collateralTotalPrice: (address: string) => ethers.BigNumber;
  collateralPrice: (address: string) => ethers.BigNumber;
  collateralAmount: (address: string) => ethers.BigNumber;
  borrowedTotalPrice: (address: string) => ethers.BigNumber;
  borrowedPrice: (address: string) => ethers.BigNumber;
  borrowedAmount: (address: string) => ethers.BigNumber;
  marginLevel: (address: string) => ethers.BigNumber;
  stakeLPTokenAmount: (address: string) => ethers.BigNumber;
  stakeRedeemValue: (address: string) => ethers.BigNumber;
  stakeRedeemPrice: (address: string) => ethers.BigNumber;

  reserveYieldAPR: (address: string) => ethers.BigNumber;
  totalStaked: (address: string) => ethers.BigNumber;
  totalTAUSupply: (address: string) => ethers.BigNumber;
  backingPerTAU: (address: string) => ethers.BigNumber;
  TAUTotalLocked: (address: string) => ethers.BigNumber;
}

const protocolDataCtx = createContext<ProtocolData | null>(undefined as any);

export default function useProtocolData() {
  return useContext(protocolDataCtx);
}

export function ProtocolDataProvider({ children }: { children: any }) {
  const { active, library } = useWeb3React();
  const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);
  const contracts = useContracts();

  // Calculate the total price of all of the assets locked in the pool
  async function totalPoolPriceLocked(address: string) {
    if (contracts) {
      const assets = config.approved.map((approved) => approved.address);
      let totalPrice = ethers.BigNumber.from(0);
      for (const asset of assets) {
        const totalLocked = await contracts.lPool.tvl(asset);
        const price = await contracts.oracle.price(asset, totalLocked);
        totalPrice = totalPrice.add(price);
      }
      const decimals = contracts.oracle.decimals(
        contracts.oracle.defaultStablecoin()
      );
      totalPrice = totalPrice.div(decimals);
      return totalPrice;
    }
  }

  useEffect(() => {
    if (!active) setProtocolData(null);
    else {
      // **** Here we will set all of the functions to be used throughout the protocol
    }
  }, [active]);

  return (
    <protocolDataCtx.Provider value={protocolData}></protocolDataCtx.Provider>
  );
}

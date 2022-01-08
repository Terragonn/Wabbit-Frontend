import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import useContracts from "./useContracts";
import config from "../config/config.json";
import {ROUND_CONSTANT} from "./parseNumber";

interface ProtocolData {
    totalPoolPriceLocked: () => ethers.BigNumber;
    minMarginLevel: () => number;
    minCollateralPrice: (address: string) => ethers.BigNumber;

    totalPriceLocked: (address: string) => ethers.BigNumber;
    totalLocked: (address: string) => ethers.BigNumber;
    totalBorrowed: (address: string) => ethers.BigNumber;
    totalBorrowedLong: (address: string) => ethers.BigNumber;
    liquidityAvailable: (address: string) => ethers.BigNumber;
    stakeAPY: (address: string) => number;
    borrowAPY: (address: string) => number;
    utilizationRate: (address: string) => number;

    totalLiquidity: (address: string) => ethers.BigNumber;
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

export function ProtocolDataProvider({children}: {children: any}) {
    const {active, library}: {active?: boolean; library?: ethers.providers.JsonRpcProvider} = useWeb3React();
    const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);
    const contracts = useContracts();

    // Parse decimals
    async function parseDecimals(num: ethers.BigNumber, address: string) {
        const decimals = await contracts?.oracle.decimals(address);
        return num.div(ethers.BigNumber.from(10).pow(decimals));
    }

    // Calculate the total price of all of the assets locked in the pool
    async function totalPoolPriceLocked() {
        if (contracts) {
            const assets = config.approved.map((approved) => approved.address);
            let totalPrice = ethers.BigNumber.from(0);
            for (const asset of assets) {
                const totalLocked = await contracts.lPool.tvl(asset);
                const price = await contracts.oracle.price(asset, totalLocked);
                totalPrice = totalPrice.add(price);
            }
            totalPrice = await parseDecimals(totalPrice, await contracts.oracle.defaultStablecoin());
            return totalPrice;
        }
    }

    // Get the minimum margin level
    async function minMarginLevel() {
        if (contracts) {
            const [numerator, denominator] = await contracts.marginLong.minMarginLevel();
            return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
        }
    }

    // Get the minimum margin collateral price to borrow
    async function minCollateralPrice() {
        if (contracts) {
            const price = await contracts.marginLong.minCollateralPrice();
            return await parseDecimals(price, await contracts.oracle.defaultStablecoin());
        }
    }

    // Get the total price locked in the pool for a given asset
    async function totalPriceLocked(address: string) {
        if (contracts) {
            const totalLocked = await contracts.lPool.tvl(address);
            const price = await contracts.oracle.price(address, totalLocked);
            return await parseDecimals(price, await contracts.oracle.defaultStablecoin());
        }
    }

    // Total amount of a given asset locked in the pool
    async function totalLocked(address: string) {
        if (contracts) {
            const totalLocked = await contracts.lPool.tvl(address);
            return await parseDecimals(totalLocked, address);
        }
    }

    // Get the total amount borrowed
    async function totalBorrowed(address: string) {
        if (contracts) {
            const borrowed = await contracts.marginLong.totalBorrowed(address);
            return await parseDecimals(borrowed, address);
        }
    }

    // Get the total amount borrowed long
    async function totalBorrowedLong(address: string) {
        return await totalBorrowed(address);
    }

    // **** Add in some prices and total borrow price for all of the pools

    // Get the liquidity of a given asset available
    async function liquidityAvailable(address: string) {
        if (contracts) {
            const liquidity = await contracts.lPool.liquidity(address);
            return await parseDecimals(liquidity, address);
        }
    }

    // Get the stake APY
    async function stakeAPY(address: string) {
        if (contracts) return ((await borrowAPY(address)) as number) * ((await utilizationRate(address)) as number);
    }

    // Get the borrow APY
    async function borrowAPY(address: string) {
        if (contracts) {
            const blocksPerYear = ethers.BigNumber.from(10).pow(4).mul(3154).div(config.avgBlockTime);
            const currentBlock = ethers.BigNumber.from(await library?.getBlockNumber());
            const borrowBlock = currentBlock.sub(blocksPerYear);

            const initialBorrow = ethers.BigNumber.from(10).pow(5);
            const interest = await contracts.lPool.interest(address, initialBorrow, borrowBlock);

            const apy = interest.mul(ROUND_CONSTANT).div(initialBorrow).sub(ROUND_CONSTANT).mul(100).toNumber() / ROUND_CONSTANT;
            return apy;
        }
    }

    // **** Add in a global collateral price and collateral amount

    // Get the utilization rate
    async function utilizationRate(address: string) {
        if (contracts) {
            const [numerator, denominator] = await contracts.lPool.utilizationRate(address);
            return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
        }
    }

    // Get the total liquidity of an asset

    // Get the total amount locked of an asset as collateral

    // Get the total collateral price of an asset

    // Get the total borrowed price

    // Get the borrowed amount of an asset

    // Get the borrowed price of an asset

    // Get the margin level of an asset

    // Get the amount of available LP tokens for a given token

    // Get the amount of assets for redeeming given tokens

    // Get the price of redeeming the given underlying tokens

    totalLiquidity: (address: string) => ethers.BigNumber;
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

    useEffect(() => {
        if (!active) setProtocolData(null);
        else {
            // **** Here we will set all of the functions to be used throughout the protocol
        }
    }, [active]);

    return <protocolDataCtx.Provider value={protocolData}></protocolDataCtx.Provider>;
}

import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import useContracts from "./useContracts";
import config from "../config/config.json";
import {parseDecimals, parseDecimalsFromAddress, ROUND_CONSTANT} from "./parseNumber";
import loadERC20 from "./loadERC20";

interface ProtocolData {
    totalPoolPrice: () => Promise<ethers.BigNumber>;
    totalBorrowedPrice: () => Promise<ethers.BigNumber>;

    totalPriceLocked: (address: string) => Promise<ethers.BigNumber>;
    totalAmountLocked: (address: string) => Promise<ethers.BigNumber>;
    totalBorrowed: (address: string) => Promise<ethers.BigNumber>;
    stakeAPY: (address: string) => Promise<number>;
    borrowAPR: (address: string) => Promise<number>;

    getAvailableBalance: (address: string) => Promise<ethers.BigNumber>;
    getAvailableBalanceValue: (address: string) => Promise<ethers.BigNumber>;

    getStakedAmount: (address: string) => Promise<ethers.BigNumber>;
    getStakedRedeemAmount: (address: string) => Promise<ethers.BigNumber>;
    getStakedRedeemValue: (address: string) => Promise<ethers.BigNumber>;

    liquidity: (address: string) => Promise<ethers.BigNumber>;
    utilizationRate: (address: string) => Promise<number>;

    getCollateralTotalValue: () => Promise<ethers.BigNumber>;
    getCollateralAmount: (address: string) => Promise<ethers.BigNumber>;
    getCollateralValue: (address: string) => Promise<ethers.BigNumber>;
    minMarginLevel: () => Promise<number>;
    maxLeverage: () => Promise<ethers.BigNumber>;
    minCollateralPrice: () => Promise<ethers.BigNumber>;
}

const protocolDataCtx = createContext<ProtocolData | null>(undefined as any);

export default function useProtocolData() {
    return useContext(protocolDataCtx);
}

export function ProtocolDataProvider({children}: {children: any}) {
    const {library}: {library?: ethers.providers.JsonRpcProvider} = useWeb3React();
    const contracts = useContracts();

    const [safetyThresholdNumerator, safetyThresholdDenominator] = [20, 100];

    const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);

    async function totalPoolPrice() {
        let totalPoolPrice;
        const assets = config.approved.filter((approved) => approved.leveragePool).map((approved) => approved.address);
        totalPoolPrice = ethers.BigNumber.from(0);
        for (const asset of assets) {
            const totalLocked = await contracts?.lPool.tvl(asset);
            const price = await contracts?.oracle.priceMax(asset, totalLocked);
            totalPoolPrice = totalPoolPrice.add(price);
        }
        totalPoolPrice = parseDecimals(totalPoolPrice, await contracts?.oracle.priceDecimals());
        return totalPoolPrice;
    }

    async function totalBorrowedPrice() {
        let totalBorrowedPrice;
        const assets = config.approved.filter((approved) => approved.leveragePool).map((approved) => approved.address);
        totalBorrowedPrice = ethers.BigNumber.from(0);
        for (const asset of assets) {
            const totalBorrowed = await contracts?.lPool.utilized(asset);
            const price = await contracts?.oracle.priceMax(asset, totalBorrowed);
            totalBorrowedPrice = totalBorrowedPrice.add(price);
        }
        totalBorrowedPrice = parseDecimals(totalBorrowedPrice, await contracts?.oracle.priceDecimals());
        return totalBorrowedPrice;
    }

    async function totalPriceLocked(address: string) {
        const totalLocked = await contracts?.lPool.tvl(address);
        const price = await contracts?.oracle.priceMax(address, totalLocked);
        return parseDecimals(price, await contracts?.oracle.priceDecimals());
    }

    async function totalAmountLocked(address: string) {
        const totalLocked = await contracts?.lPool.tvl(address);
        return parseDecimalsFromAddress(totalLocked, address);
    }

    async function totalBorrowed(address: string) {
        const borrowed = await contracts?.marginLong.totalBorrowed(address);
        return parseDecimalsFromAddress(borrowed, address);
    }

    async function stakeAPY(address: string) {
        const [utilizationNumerator, utilizationDenominator] = await contracts?.lPool.utilizationRate(address);

        const _borrowAPY = ethers.BigNumber.from((await borrowAPR(address)) * ROUND_CONSTANT);
        if (utilizationDenominator.lte(0)) return 0;

        return _borrowAPY.mul(utilizationNumerator).div(utilizationDenominator).toNumber() / ROUND_CONSTANT;
    }

    async function borrowAPR(address: string) {
        const [numerator, denominator] = await contracts?.lPool.interestRate(address);
        if (denominator.eq(0)) return 0;
        return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
    }

    async function getAvailableBalance(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const token = loadERC20(address, signer as any);
        const rawBalance = await token.balanceOf(signerAddress);
        return parseDecimalsFromAddress(rawBalance, address);
    }

    async function getAvailableBalanceValue(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const token = loadERC20(address, signer as any);
        const rawBalance = await token.balanceOf(signerAddress);
        const value = await contracts?.oracle.priceMax(address, rawBalance);
        return parseDecimals(value, await contracts?.oracle.priceDecimals());
    }

    async function getStakedAmount(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const LPTokenAddress = await contracts?.lPool.LPFromPT(address);
        const LPToken = loadERC20(LPTokenAddress, signer as any);
        const rawBalance = await LPToken.balanceOf(signerAddress);
        return parseDecimalsFromAddress(rawBalance, address);
    }

    async function getStakedRedeemAmount(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const LPTokenAddress = await contracts?.lPool.LPFromPT(address);
        const LPToken = loadERC20(LPTokenAddress, signer as any);
        const rawBalance = await LPToken.balanceOf(signerAddress);

        let redeemAmount;
        try {
            redeemAmount = await contracts?.lPool.redeemValue(LPTokenAddress, rawBalance);
        } catch (e) {
            return ethers.BigNumber.from(0);
        }
        return parseDecimalsFromAddress(redeemAmount, address);
    }

    async function getStakedRedeemValue(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const LPTokenAddress = await contracts?.lPool.LPFromPT(address);
        const LPToken = loadERC20(LPTokenAddress, signer as any);
        const rawBalance = await LPToken.balanceOf(signerAddress);

        let redeemAmount;
        try {
            redeemAmount = await contracts?.lPool.redeemValue(LPTokenAddress, rawBalance);
        } catch (e) {
            return ethers.BigNumber.from(0);
        }
        const value = await contracts?.oracle.priceMax(address, redeemAmount);
        return parseDecimals(value, await contracts?.oracle.priceDecimals());
    }

    async function getCollateralTotalValue() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const totalPrice = await contracts?.marginLong.collateralPrice(signerAddress);
        return parseDecimals(totalPrice, await contracts?.oracle.priceDecimals());
    }

    async function getCollateralAmount(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const collateralAmount = await contracts?.marginLong.collateral(address, signerAddress);
        return parseDecimalsFromAddress(collateralAmount, address);
    }

    async function getCollateralValue(address: string) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();
        const collateralAmount = await contracts?.marginLong.collateral(address, signerAddress);
        const collateralPrice = await contracts?.oracle.priceMin(address, collateralAmount);
        return parseDecimals(collateralPrice, await contracts?.oracle.priceDecimals());
    }

    async function minMarginLevel() {
        const [numerator, denominator] = await contracts?.marginLong.minMarginLevel();
        const level = numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
        return level;
    }

    async function maxLeverage() {
        const leverage = await contracts?.marginLong.maxLeverage();
        return leverage.mul(safetyThresholdDenominator).div(ethers.BigNumber.from(safetyThresholdDenominator).add(safetyThresholdNumerator));
    }

    async function minCollateralPrice() {
        const minCollateral = await contracts?.marginLong.minCollateralPrice();
        const parsedPrice = parseDecimals(minCollateral, await contracts?.oracle.priceDecimals());
        return parsedPrice.mul(safetyThresholdDenominator).div(ethers.BigNumber.from(safetyThresholdDenominator).sub(safetyThresholdNumerator));
    }

    async function liquidity(address: string) {
        const available = await contracts?.lPool.liquidity(address);
        return parseDecimalsFromAddress(available, address);
    }

    async function utilizationRate(address: string) {
        const [numerator, denominator] = await contracts?.lPool.utilizationRate(address);
        if (denominator.eq(0)) return 0;
        return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
    }

    useEffect(() => {
        if (!contracts) setProtocolData(null);
        else {
            (async () => {
                setProtocolData({
                    totalPoolPrice,
                    totalBorrowedPrice,
                    totalPriceLocked,
                    totalAmountLocked,
                    totalBorrowed,
                    stakeAPY,
                    borrowAPR,
                    getAvailableBalance,
                    getAvailableBalanceValue,
                    getStakedAmount,
                    getStakedRedeemAmount,
                    getStakedRedeemValue,
                    liquidity,
                    utilizationRate,
                    getCollateralTotalValue,
                    getCollateralAmount,
                    getCollateralValue,
                    minMarginLevel,
                    maxLeverage,
                    minCollateralPrice,
                });
            })();
        }
    }, [contracts]);

    return <protocolDataCtx.Provider value={protocolData}>{children}</protocolDataCtx.Provider>;
}

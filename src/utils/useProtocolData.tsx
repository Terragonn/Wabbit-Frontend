import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import useContracts from "./useContracts";
import {parseDecimals, ROUND_CONSTANT} from "./parseNumber";
import loadERC20 from "./loadERC20";
import useChainData, {Approved} from "./useChainData";

interface ProtocolData {
    totalPoolPrice: () => Promise<ethers.BigNumber>;
    totalBorrowedPrice: () => Promise<ethers.BigNumber>;

    totalPriceLocked: (token: Approved) => Promise<ethers.BigNumber>;
    totalAmountLocked: (token: Approved) => Promise<ethers.BigNumber>;
    totalBorrowed: (token: Approved) => Promise<ethers.BigNumber>;
    provideLiquidityAPR: (token: Approved) => Promise<number>;
    borrowAPR: (token: Approved) => Promise<number>;

    getAvailableBalance: (token: Approved) => Promise<ethers.BigNumber>;
    getAvailableBalanceValue: (token: Approved) => Promise<ethers.BigNumber>;

    getLPTokenAmount: (token: Approved) => Promise<ethers.BigNumber>;
    getLiquidityProvidedAmount: (token: Approved) => Promise<ethers.BigNumber>;
    getRedeemLiquidityAmount: (token: Approved) => Promise<ethers.BigNumber>;
    getRedeemLiquidityValue: (token: Approved) => Promise<ethers.BigNumber>;

    liquidity: (token: Approved) => Promise<ethers.BigNumber>;
    utilizationRate: (token: Approved) => Promise<number>;

    getCollateralTotalValue: () => Promise<ethers.BigNumber>;
    getCollateralAmount: (token: Approved) => Promise<ethers.BigNumber>;
    getCollateralValue: (token: Approved) => Promise<ethers.BigNumber>;
    minMarginLevel: () => Promise<number>;
    maxLeverage: () => Promise<ethers.BigNumber>;
    minCollateralPrice: () => Promise<ethers.BigNumber>;

    marginLevel: () => Promise<number>;
    marginBalanceAll: () => Promise<ethers.BigNumber>;
    currentLeverage: () => Promise<number>;
    borrowedAmount: (token: Approved) => Promise<ethers.BigNumber>;
    borrowedValue: (token: Approved) => Promise<ethers.BigNumber>;
    totalBorrowedValue: () => Promise<ethers.BigNumber>;
    interest: (token: Approved) => Promise<ethers.BigNumber>;
    interestAll: () => Promise<ethers.BigNumber>;
    initialBorrowedValue: (token: Approved) => Promise<ethers.BigNumber>;
    initialBorrowedValueAll: () => Promise<ethers.BigNumber>;
}

const protocolDataCtx = createContext<ProtocolData | null>(undefined as any);

export default function useProtocolData() {
    return useContext(protocolDataCtx);
}

export function ProtocolDataProvider({children}: {children: any}) {
    const {library}: {library?: ethers.providers.JsonRpcProvider} = useWeb3React();
    const contracts = useContracts();

    const {config} = useChainData();

    const [safetyThresholdNumerator, safetyThresholdDenominator] = [20, 100];

    const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);

    async function totalPoolPrice() {
        let totalPoolPrice = ethers.BigNumber.from(0);

        const assets = config.approved.filter((approved) => approved.oracle && approved.leveragePool).map((approved) => approved.address);
        for (const asset of assets) {
            const totalLocked = await contracts?.lPool.tvl(asset);
            const price = await contracts?.oracle.priceMax(asset, totalLocked);
            totalPoolPrice = totalPoolPrice.add(price);
        }

        totalPoolPrice = parseDecimals(totalPoolPrice, await contracts?.oracle.priceDecimals());

        return totalPoolPrice;
    }

    async function totalBorrowedPrice() {
        let totalBorrowedPrice = ethers.BigNumber.from(0);

        const assets = config.approved.filter((approved) => approved.oracle && approved.marginLongBorrow).map((approved) => approved.address);
        for (const asset of assets) {
            const totalBorrowed = await contracts?.lPool.utilized(asset);
            const price = await contracts?.oracle.priceMax(asset, totalBorrowed);
            totalBorrowedPrice = totalBorrowedPrice.add(price);
        }

        totalBorrowedPrice = parseDecimals(totalBorrowedPrice, await contracts?.oracle.priceDecimals());

        return totalBorrowedPrice;
    }

    async function totalPriceLocked(token: Approved) {
        const totalLocked = await contracts?.lPool.tvl(token.address);
        const price = await contracts?.oracle.priceMax(token.address, totalLocked);

        return parseDecimals(price, await contracts?.oracle.priceDecimals());
    }

    async function totalAmountLocked(token: Approved) {
        const totalLocked = await contracts?.lPool.tvl(token.address);

        return parseDecimals(totalLocked, token.decimals);
    }

    async function totalBorrowed(token: Approved) {
        const borrowed = await contracts?.marginLong.totalBorrowed(token.address);

        return parseDecimals(borrowed, token.decimals);
    }

    async function provideLiquidityAPR(token: Approved) {
        const [utilizationNumerator, utilizationDenominator] = await contracts?.lPool.utilizationRate(token.address);
        if (utilizationDenominator.eq(0)) return 0;

        const [interestNumerator, interestDenominator] = await contracts?.lPool.interestRate(token.address);

        const provideLiquidityAPR =
            interestNumerator.mul(utilizationNumerator).mul(ROUND_CONSTANT).div(utilizationDenominator).div(interestDenominator).toNumber() / ROUND_CONSTANT;
        return provideLiquidityAPR;
    }

    async function borrowAPR(token: Approved) {
        const [numerator, denominator] = await contracts?.lPool.interestRate(token.address);
        if (denominator.eq(0)) return 0;

        return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
    }

    async function getAvailableBalance(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const tokenContract = loadERC20(token.address, signer as any);
        const rawBalance = await tokenContract.balanceOf(signerAddress);

        return parseDecimals(rawBalance, token.decimals);
    }

    async function getAvailableBalanceValue(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const tokenContract = loadERC20(token.address, signer as any);
        const rawBalance = await tokenContract.balanceOf(signerAddress);
        const value = await contracts?.oracle.priceMax(token.address, rawBalance);

        return parseDecimals(value, await contracts?.oracle.priceDecimals());
    }

    async function getLPTokenAmount(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const tokenContract = loadERC20(token.address, signer as any);
        const rawBalance = await tokenContract.balanceOf(signerAddress);
        const LPAmount = await contracts?.lPool.provideLiquidityValue(token.address, rawBalance);

        return parseDecimals(LPAmount, token.decimals);
    }

    async function getLiquidityProvidedAmount(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const LPTokenAddress = await contracts?.lPool.LPFromPT(token.address);
        const LPToken = loadERC20(LPTokenAddress, signer as any);
        const rawBalance = await LPToken.balanceOf(signerAddress);

        return parseDecimals(rawBalance, token.decimals);
    }

    async function getRedeemLiquidityAmount(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const LPTokenAddress = await contracts?.lPool.LPFromPT(token.address);
        const LPToken = loadERC20(LPTokenAddress, signer as any);
        const rawBalance = await LPToken.balanceOf(signerAddress);

        let redeemAmount;
        try {
            redeemAmount = await contracts?.lPool.redeemLiquidityValue(LPTokenAddress, rawBalance);
        } catch (e) {
            return ethers.BigNumber.from(0);
        }

        return parseDecimals(redeemAmount, token.decimals);
    }

    async function getRedeemLiquidityValue(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const LPTokenAddress = await contracts?.lPool.LPFromPT(token.address);
        const LPToken = loadERC20(LPTokenAddress, signer as any);
        const rawBalance = await LPToken.balanceOf(signerAddress);

        let redeemAmount;
        try {
            redeemAmount = await contracts?.lPool.redeemLiquidityValue(LPTokenAddress, rawBalance);
        } catch (e) {
            return ethers.BigNumber.from(0);
        }
        const value = await contracts?.oracle.priceMax(token.address, redeemAmount);

        return parseDecimals(value, await contracts?.oracle.priceDecimals());
    }

    async function getCollateralTotalValue() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const totalPrice = await contracts?.marginLong.collateralPrice(signerAddress);

        return parseDecimals(totalPrice, await contracts?.oracle.priceDecimals());
    }

    async function getCollateralAmount(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const collateralAmount = await contracts?.marginLong.collateral(token.address, signerAddress);

        return parseDecimals(collateralAmount, token.decimals);
    }

    async function getCollateralValue(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const collateralAmount = await contracts?.marginLong.collateral(token.address, signerAddress);
        const collateralPrice = await contracts?.oracle.priceMin(token.address, collateralAmount);

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

    async function liquidity(token: Approved) {
        const available = await contracts?.lPool.liquidity(token.address);

        return parseDecimals(available, token.decimals);
    }

    async function utilizationRate(token: Approved) {
        const [numerator, denominator] = await contracts?.lPool.utilizationRate(token.address);
        if (denominator.eq(0)) return 0;

        return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
    }

    async function marginLevel() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const [numerator, denominator] = await contracts?.marginLong.marginLevel(signerAddress);
        if (denominator.eq(0)) return 999;
        const level = numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;

        return level;
    }

    async function marginBalanceAll() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const interest = await contracts?.marginLong["interest(address)"](signerAddress);
        const initialPrice = await contracts?.marginLong["initialBorrowPrice(address)"](signerAddress);
        const collateralPrice = await contracts?.marginLong.collateralPrice(signerAddress);
        const borrowPrice = await contracts?.marginLong.borrowedPrice(signerAddress);

        const balance = collateralPrice.add(borrowPrice).sub(initialPrice).sub(interest);

        return parseDecimals(balance, await contracts?.oracle.priceDecimals());
    }

    async function currentLeverage() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const initialPrice = await contracts?.marginLong["initialBorrowPrice(address)"](signerAddress);
        const collateralPrice = await contracts?.marginLong.collateralPrice(signerAddress);
        if (collateralPrice.eq(0)) return 0;

        return initialPrice.mul(ROUND_CONSTANT).div(collateralPrice).toNumber() / ROUND_CONSTANT;
    }

    async function borrowedAmount(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const amount = await contracts?.marginLong.borrowed(token.address, signerAddress);

        return parseDecimals(amount, token.decimals);
    }

    async function borrowedValue(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const amount = await contracts?.marginLong.borrowed(token.address, signerAddress);
        const price = await contracts?.oracle.priceMin(token.address, amount);

        return parseDecimals(price, await contracts?.oracle.priceDecimals());
    }

    async function totalBorrowedValue() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const value = await contracts?.marginLong.borrowedPrice(signerAddress);

        return parseDecimals(value, await contracts?.oracle.priceDecimals());
    }

    async function interest(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        let interest;
        try {
            interest = await contracts?.marginLong["interest(address,address)"](token.address, signerAddress);
        } catch {
            interest = ethers.BigNumber.from(0);
        }

        return parseDecimals(interest, await contracts?.oracle.priceDecimals());
    }

    async function interestAll() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const interest = await contracts?.marginLong["interest(address)"](signerAddress);

        return parseDecimals(interest, await contracts?.oracle.priceDecimals());
    }

    async function initialBorrowedValue(token: Approved) {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const initialPrice = await contracts?.marginLong["initialBorrowPrice(address,address)"](token.address, signerAddress);

        return parseDecimals(initialPrice, await contracts?.oracle.priceDecimals());
    }

    async function initialBorrowedValueAll() {
        const signer = library?.getSigner();
        const signerAddress = await signer?.getAddress();

        const initialPrice = await contracts?.marginLong["initialBorrowPrice(address)"](signerAddress);

        return parseDecimals(initialPrice, await contracts?.oracle.priceDecimals());
    }

    useEffect(() => {
        if (!contracts) setProtocolData(null);
        else {
            setProtocolData({
                totalPoolPrice,
                totalBorrowedPrice,
                totalPriceLocked,
                totalAmountLocked,
                totalBorrowed,
                provideLiquidityAPR,
                borrowAPR,
                getAvailableBalance,
                getAvailableBalanceValue,
                getLPTokenAmount,
                getLiquidityProvidedAmount,
                getRedeemLiquidityAmount,
                getRedeemLiquidityValue,
                liquidity,
                utilizationRate,
                getCollateralTotalValue,
                getCollateralAmount,
                getCollateralValue,
                minMarginLevel,
                maxLeverage,
                minCollateralPrice,
                marginLevel,
                marginBalanceAll,
                currentLeverage,
                borrowedAmount,
                borrowedValue,
                totalBorrowedValue,
                interest,
                interestAll,
                initialBorrowedValue,
                initialBorrowedValueAll,
            });
        }
    }, [contracts]);

    return <protocolDataCtx.Provider value={protocolData}>{children}</protocolDataCtx.Provider>;
}

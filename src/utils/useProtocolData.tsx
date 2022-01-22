import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import useContracts from "./useContracts";
import {parseDecimals, ROUND_CONSTANT} from "./parseNumber";
import loadERC20 from "./loadERC20";
import {Approved} from "./useChainData";
import getApproved from "./getApproved";

interface ProtocolData {
    totalPoolPrice: () => Promise<ethers.BigNumber | undefined>;
    totalBorrowedPrice: () => Promise<ethers.BigNumber | undefined>;

    totalPriceLocked: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    totalAmountLocked: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    totalBorrowed: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    provideLiquidityAPR: (token: Approved) => Promise<number | undefined>;
    borrowAPR: (token: Approved) => Promise<number | undefined>;

    getAvailableBalance: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    getAvailableBalanceValue: (token: Approved) => Promise<ethers.BigNumber | undefined>;

    getLPTokenAmount: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    getLiquidityProvidedAmount: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    getRedeemLiquidityAmount: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    getRedeemLiquidityValue: (token: Approved) => Promise<ethers.BigNumber | undefined>;

    liquidity: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    totalCollateral: (token: Approved) => Promise<ethers.BigNumber | undefined>;

    getCollateralTotalValue: () => Promise<ethers.BigNumber | undefined>;
    getCollateralAmount: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    getCollateralValue: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    minMarginLevel: () => Promise<number | undefined>;
    maxLeverage: () => Promise<ethers.BigNumber | undefined>;
    minCollateralPrice: () => Promise<ethers.BigNumber | undefined>;

    marginLevel: () => Promise<number | undefined>;
    marginBalanceAll: () => Promise<ethers.BigNumber | undefined>;
    currentLeverage: () => Promise<number | undefined>;
    borrowedAmount: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    borrowedValue: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    totalBorrowedValue: () => Promise<ethers.BigNumber | undefined>;
    interest: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    interestAll: () => Promise<ethers.BigNumber | undefined>;
    initialBorrowedValue: (token: Approved) => Promise<ethers.BigNumber | undefined>;
    initialBorrowedValueAll: () => Promise<ethers.BigNumber | undefined>;
}

const protocolDataCtx = createContext<ProtocolData | null>(undefined as any);

export default function useProtocolData() {
    return useContext(protocolDataCtx);
}

export function ProtocolDataProvider({children}: {children: any}) {
    const contracts = useContracts();

    const [safetyThresholdNumerator, safetyThresholdDenominator] = [20, 100];

    const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);

    async function totalPoolPrice() {
        if (contracts) {
            let totalPoolPrice = ethers.BigNumber.from(0);

            const assets = contracts.config.approved.filter((approved) => approved.oracle && approved.leveragePool).map((approved) => approved.address);
            for (const asset of assets) {
                const totalLocked = await contracts.lPool.tvl(asset);
                const price = await contracts.oracle.priceMax(asset, totalLocked);
                totalPoolPrice = totalPoolPrice.add(price);
            }

            totalPoolPrice = parseDecimals(totalPoolPrice, (await contracts.oracle.priceDecimals()).toNumber());

            return totalPoolPrice;
        }
    }

    async function totalBorrowedPrice() {
        if (contracts) {
            let totalBorrowedPrice = ethers.BigNumber.from(0);

            const assets = contracts.config.approved.filter((approved) => approved.oracle && approved.marginLongBorrow).map((approved) => approved.address);
            for (const asset of assets) {
                const totalBorrowed = await contracts.lPool.utilized(asset);
                const price = await contracts.oracle.priceMax(asset, totalBorrowed);
                totalBorrowedPrice = totalBorrowedPrice.add(price);
            }

            totalBorrowedPrice = parseDecimals(totalBorrowedPrice, (await contracts.oracle.priceDecimals()).toNumber());

            return totalBorrowedPrice;
        }
    }

    async function totalPriceLocked(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const totalLocked = await contracts.lPool.tvl(token.address);
            const price = await contracts.oracle.priceMax(token.address, totalLocked);

            return parseDecimals(price, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function totalAmountLocked(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const totalLocked = await contracts.lPool.tvl(token.address);

            return parseDecimals(totalLocked, token.decimals);
        }
    }

    async function totalBorrowed(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const borrowed = await contracts.marginLong.totalBorrowed(token.address);

            return parseDecimals(borrowed, token.decimals);
        }
    }

    async function provideLiquidityAPR(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const [utilizationNumerator, utilizationDenominator] = await contracts.lPool.utilizationRate(token.address);
            if (utilizationDenominator.eq(0)) return 0;

            const [interestNumerator, interestDenominator] = await contracts.lPool.interestRate(token.address);

            const provideLiquidityAPR =
                interestNumerator.mul(utilizationNumerator).mul(ROUND_CONSTANT).div(utilizationDenominator).div(interestDenominator).toNumber() / ROUND_CONSTANT;
            return provideLiquidityAPR;
        }
    }

    async function borrowAPR(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const [numerator, denominator] = await contracts.lPool.interestRate(token.address);
            if (denominator.eq(0)) return 0;

            return numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;
        }
    }

    async function getAvailableBalance(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const tokenContract = loadERC20(token.address, contracts.signer);
            const rawBalance = await tokenContract.balanceOf(signerAddress);

            return parseDecimals(rawBalance, token.decimals);
        }
    }

    async function getAvailableBalanceValue(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const tokenContract = loadERC20(token.address, contracts.signer);
            const rawBalance = await tokenContract.balanceOf(signerAddress);
            const value = await contracts.oracle.priceMax(token.address, rawBalance);

            return parseDecimals(value, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function getLPTokenAmount(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const tokenContract = loadERC20(token.address, contracts.signer);
            const rawBalance = await tokenContract.balanceOf(signerAddress);
            const LPAmount = await contracts.lPool.provideLiquidityValue(token.address, rawBalance);

            return parseDecimals(LPAmount, token.decimals);
        }
    }

    async function getLiquidityProvidedAmount(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const LPTokenAddress = await contracts.lPool.LPFromPT(token.address);
            const LPToken = loadERC20(LPTokenAddress, contracts.signer);
            const rawBalance = await LPToken.balanceOf(signerAddress);

            return parseDecimals(rawBalance, token.decimals);
        }
    }

    async function getRedeemLiquidityAmount(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const LPTokenAddress = await contracts.lPool.LPFromPT(token.address);
            const LPToken = loadERC20(LPTokenAddress, contracts.signer);
            const rawBalance = await LPToken.balanceOf(signerAddress);

            let redeemAmount;
            try {
                redeemAmount = await contracts.lPool.redeemLiquidityValue(LPTokenAddress, rawBalance);
            } catch (e) {
                return ethers.BigNumber.from(0);
            }

            return parseDecimals(redeemAmount, token.decimals);
        }
    }

    async function getRedeemLiquidityValue(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const LPTokenAddress = await contracts.lPool.LPFromPT(token.address);
            const LPToken = loadERC20(LPTokenAddress, contracts.signer);
            const rawBalance = await LPToken.balanceOf(signerAddress);

            let redeemAmount;
            try {
                redeemAmount = await contracts.lPool.redeemLiquidityValue(LPTokenAddress, rawBalance);
            } catch (e) {
                return ethers.BigNumber.from(0);
            }
            const value = await contracts.oracle.priceMax(token.address, redeemAmount);

            return parseDecimals(value, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function getCollateralTotalValue() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const totalPrice = await contracts.marginLong.collateralPrice(signerAddress);

            return parseDecimals(totalPrice, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function getCollateralAmount(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const collateralAmount = await contracts.marginLong.collateral(token.address, signerAddress);

            return parseDecimals(collateralAmount, token.decimals);
        }
    }

    async function getCollateralValue(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const collateralAmount = await contracts.marginLong.collateral(token.address, signerAddress);
            const collateralPrice = await contracts.oracle.priceMin(token.address, collateralAmount);

            return parseDecimals(collateralPrice, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function minMarginLevel() {
        if (contracts) {
            const [numerator, denominator] = await contracts.marginLong.minMarginLevel();
            const level = numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;

            return level;
        }
    }

    async function maxLeverage() {
        if (contracts) {
            const leverage = await contracts.marginLong.maxLeverage();

            return leverage.mul(safetyThresholdDenominator).div(ethers.BigNumber.from(safetyThresholdDenominator).add(safetyThresholdNumerator));
        }
    }

    async function minCollateralPrice() {
        if (contracts) {
            const minCollateral = await contracts.marginLong.minCollateralPrice();
            const parsedPrice = parseDecimals(minCollateral, (await contracts.oracle.priceDecimals()).toNumber());

            return parsedPrice.mul(safetyThresholdDenominator).div(ethers.BigNumber.from(safetyThresholdDenominator).sub(safetyThresholdNumerator));
        }
    }

    async function liquidity(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const available = await contracts.lPool.liquidity(token.address);

            return parseDecimals(available, token.decimals);
        }
    }

    async function totalCollateral(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const collateral = await contracts.marginLong.totalCollateral(token.address);

            return parseDecimals(collateral, token.decimals);
        }
    }

    async function marginLevel() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const [numerator, denominator] = await contracts.marginLong.marginLevel(signerAddress);
            if (denominator.eq(0)) return 999;
            const level = numerator.mul(ROUND_CONSTANT).div(denominator).toNumber() / ROUND_CONSTANT;

            return level;
        }
    }

    async function marginBalanceAll() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const interest = await contracts.marginLong["interest(address)"](signerAddress);
            const initialPrice = await contracts.marginLong["initialBorrowPrice(address)"](signerAddress);
            const collateralPrice = await contracts.marginLong.collateralPrice(signerAddress);
            const borrowPrice = await contracts.marginLong.borrowedPrice(signerAddress);

            const balance = collateralPrice.add(borrowPrice).sub(initialPrice).sub(interest);

            return parseDecimals(balance, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function currentLeverage() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const initialPrice = await contracts.marginLong["initialBorrowPrice(address)"](signerAddress);
            const collateralPrice = await contracts.marginLong.collateralPrice(signerAddress);
            if (collateralPrice.eq(0)) return 0;

            return initialPrice.mul(ROUND_CONSTANT).div(collateralPrice).toNumber() / ROUND_CONSTANT;
        }
    }

    async function borrowedAmount(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const amount = await contracts.marginLong.borrowed(token.address, signerAddress);

            return parseDecimals(amount, token.decimals);
        }
    }

    async function borrowedValue(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const amount = await contracts.marginLong.borrowed(token.address, signerAddress);
            const price = await contracts.oracle.priceMin(token.address, amount);

            return parseDecimals(price, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function totalBorrowedValue() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const value = await contracts.marginLong.borrowedPrice(signerAddress);

            return parseDecimals(value, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function interest(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            let interest;
            try {
                interest = await contracts.marginLong["interest(address,address)"](token.address, signerAddress);
            } catch {
                interest = ethers.BigNumber.from(0);
            }

            return parseDecimals(interest, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function interestAll() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const interest = await contracts.marginLong["interest(address)"](signerAddress);

            return parseDecimals(interest, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function initialBorrowedValue(token: Approved) {
        if (contracts && getApproved(contracts.config, token.address)) {
            const signerAddress = await contracts.signer.getAddress();

            const initialPrice = await contracts.marginLong["initialBorrowPrice(address,address)"](token.address, signerAddress);

            return parseDecimals(initialPrice, (await contracts.oracle.priceDecimals()).toNumber());
        }
    }

    async function initialBorrowedValueAll() {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const initialPrice = await contracts.marginLong["initialBorrowPrice(address)"](signerAddress);

            return parseDecimals(initialPrice, (await contracts.oracle.priceDecimals()).toNumber());
        }
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
                totalCollateral,
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

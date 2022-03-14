import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";

import {Approved} from "./useChainData";
import useContracts from "./useContracts";

import {loadERC20} from "../utils/ERC20Utils";
import {parseDecimals, ROUND_CONSTANT} from "../utils/parseNumber";
import {safeMaxLeveragePrice} from "../utils/safeLevels";

export interface ProtocolMaxData {
    availableToken: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;
    availableLPToken: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;

    availableCollateral: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;
    availableLeverage: (token: Approved) => Promise<[ethers.BigNumber, number] | undefined>;

    availableNativeCoinAmount: () => Promise<[ethers.BigNumber, number] | undefined>;
}

const protocolMaxCtx = createContext<ProtocolMaxData | null>(undefined as any);

export default function useProtocolMax() {
    return useContext(protocolMaxCtx);
}

export function ProtocolMaxProvider({children}: {children: any}) {
    const contracts = useContracts();

    const [protocolMax, setProtocolMax] = useState<ProtocolMaxData | null>(null);

    async function availableToken(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const tokenContract = loadERC20(token.address, contracts.signer);
            const rawBalance = await tokenContract.balanceOf(signerAddress);

            const parsed = parseDecimals(rawBalance, parseInt(token.decimals)).toNumber() / ROUND_CONSTANT;

            return [rawBalance, parsed] as any;
        }
    }

    async function availableLPToken(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const LPTokenAddress = await contracts.lPool.LPFromPT(token.address);
            const LPToken = loadERC20(LPTokenAddress, contracts.signer);
            const rawBalance = await LPToken.balanceOf(signerAddress);

            const parsed = parseDecimals(rawBalance, parseInt(token.decimals)).toNumber() / ROUND_CONSTANT;

            return [rawBalance, parsed] as any;
        }
    }

    async function availableCollateral(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const collateralAmount = await contracts.marginLong.collateral(token.address, signerAddress);

            const parsed = parseDecimals(collateralAmount, parseInt(token.decimals)).toNumber() / ROUND_CONSTANT;

            return [collateralAmount, parsed] as any;
        }
    }

    async function availableLeverage(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const currentPriceBorrowed = await contracts.marginLong["initialBorrowPrice(address)"](signerAddress);

            const [currentLeverageNumerator, currentLeverageDenominator] = await contracts.marginLong.currentLeverage(signerAddress);
            const [maxLeverageNumerator, maxLeverageDenominator] = await contracts.marginLong.maxLeverage();

            const currentLeverage = currentLeverageNumerator.mul(ROUND_CONSTANT).div(currentLeverageDenominator).toNumber() / ROUND_CONSTANT;
            const maxLeverage = maxLeverageNumerator.mul(ROUND_CONSTANT).div(maxLeverageDenominator).toNumber() / ROUND_CONSTANT;

            const collateralPrice = await contracts.marginLong.collateralPrice(signerAddress);

            const safePrice = safeMaxLeveragePrice(currentPriceBorrowed, currentLeverage, maxLeverage, collateralPrice);
            let safeAmount = await contracts.oracle.amountMin(token.address, safePrice);
            const liquidity = await contracts.lPool.liquidity(token.address);
            if (liquidity.lt(safeAmount)) safeAmount = liquidity;

            const parsed = parseDecimals(safeAmount, parseInt(token.decimals)).toNumber() / ROUND_CONSTANT;

            return [safeAmount, parsed] as any;
        }
    }

    async function availableNativeCoinAmount() {
        if (contracts) {
            const numerator = 80;
            const denominator = 100;

            const balance = (await contracts.signer.getBalance()).mul(numerator).div(denominator);

            const parsed = parseDecimals(balance, parseInt(contracts.config.tokens.nativeCoin.decimals)).toNumber() / ROUND_CONSTANT;

            return [balance, parsed] as any;
        }
    }

    useEffect(() => {
        if (!contracts) {
        } else {
            setProtocolMax({
                availableToken,
                availableLPToken,
                availableCollateral,
                availableLeverage,
                availableNativeCoinAmount,
            });
        }
    }, [contracts]);

    return <protocolMaxCtx.Provider value={protocolMax}>{children}</protocolMaxCtx.Provider>;
}

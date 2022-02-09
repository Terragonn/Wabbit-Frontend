import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";

import {Approved} from "./useChainData";
import useContracts from "./useContracts";

import {loadERC20} from "../ERC20Utils";
import {parseDecimals, ROUND_CONSTANT} from "../parseNumber";
import {safeMaxLeverageAmount} from "../safeLevels";

interface ProtocolMaxData {
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

            const parsed = parseDecimals(rawBalance, token.decimals).toNumber() / ROUND_CONSTANT;

            return [rawBalance, parsed] as any;
        }
    }

    async function availableLPToken(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const LPTokenAddress = await contracts.lPool.LPFromPT(token.address);
            const LPToken = loadERC20(LPTokenAddress, contracts.signer);
            const rawBalance = await LPToken.balanceOf(signerAddress);

            const parsed = parseDecimals(rawBalance, token.decimals).toNumber() / ROUND_CONSTANT;

            return [rawBalance, parsed] as any;
        }
    }

    async function availableCollateral(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const collateralAmount = await contracts.marginLong.collateral(token.address, signerAddress);

            const parsed = parseDecimals(collateralAmount, token.decimals).toNumber() / ROUND_CONSTANT;

            return [collateralAmount, parsed] as any;
        }
    }

    async function availableLeverage(token: Approved) {
        if (contracts) {
            const signerAddress = await contracts.signer.getAddress();

            const collateralPrice = await contracts.marginLong.collateralPrice(signerAddress);

            const currentAmountBorrowed = await contracts.marginLong.borrowed(token.address, signerAddress);

            const [maxLeverageNumerator, maxLeverageDenominator] = await contracts.marginLong.maxLeverage();
            const [currentLeverageNumerator, currentLeverageDenominator] = await contracts.marginLong.currentLeverage(signerAddress);

            const maxLeverage = maxLeverageNumerator.mul(ROUND_CONSTANT).div(maxLeverageDenominator).toNumber() / ROUND_CONSTANT;
            const currentLeverage = currentLeverageNumerator.mul(ROUND_CONSTANT).div(currentLeverageDenominator).toNumber() / ROUND_CONSTANT;

            const safeAmount = safeMaxLeverageAmount(currentAmountBorrowed, currentLeverage, maxLeverage, collateralPrice);

            const parsed = parseDecimals(safeAmount, token.decimals).toNumber() / ROUND_CONSTANT;

            return [safeAmount, parsed] as any;
        }
    }

    async function availableNativeCoinAmount() {
        if (contracts) {
            const balance = await contracts.signer.getBalance();

            const parsed = parseDecimals(balance, contracts.config.nativeCoin.decimals).toNumber() / ROUND_CONSTANT;

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

import {useWeb3React} from "@web3-react/core";
import {ethers, Overrides} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";

import {Approved} from "./useChainData";
import useContracts from "./useContracts";
import useError from "./useError";
import {useUpdateProtocolData} from "./useProtocolData";

import {isApprovedERC20, approveERC20} from "../utils/ERC20Utils";
import {ROUND_CONSTANT} from "../utils/parseNumber";
import {isSafeLeveragePrice, safeCollateralPrice} from "../utils/safeLevels";

export interface ProtocolMethods {
    wrap: (amount: ethers.BigNumber) => Promise<void>;
    unwrap: (amount: ethers.BigNumber) => Promise<void>;

    provideLiquidity: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    redeem: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    depositCollateral: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    withdrawCollateral: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    borrowLong: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    repayLong: (token: Approved) => Promise<void>;
    repayLongAll: () => Promise<void>;

    approve: (token: string, contractAddress: string, amount: ethers.BigNumber) => Promise<(() => Promise<void>) | null>;
}

const protocolMethodsCtx = createContext<ProtocolMethods | null>(undefined as any);

export default function useProtocolMethods() {
    return useContext(protocolMethodsCtx);
}

export const OVERRIDE: Overrides = {};

export function ProtocolMethodsProvider({children}: {children: any}) {
    const contracts = useContracts();

    const [protocolMethods, setProtocolMethods] = useState<ProtocolMethods | null>(null);
    const updateProtocolData = useUpdateProtocolData();

    const {library}: {library?: ethers.providers.JsonRpcProvider} = useWeb3React();

    const [, setError] = useError();

    async function handleError(fn: () => Promise<any>) {
        try {
            await fn();
            updateProtocolData();
        } catch (e: any) {
            setError(JSON.stringify(e));
            window.scroll(0, 0);
        }
    }

    async function approve(token: string, contractAddress: string, amount: ethers.BigNumber) {
        if (library && !(await isApprovedERC20(token, amount, contractAddress, library.getSigner())))
            return async () => await handleError(async () => await approveERC20(token, amount, contractAddress, library.getSigner()));
        return null;
    }

    async function wrap(amount: ethers.BigNumber) {
        if (contracts)
            await handleError(async () => await (await contracts.converter.swapMaxEthIn(contracts.config.wrappedCoin.address, {...OVERRIDE, value: amount})).wait());
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function unwrap(amount: ethers.BigNumber) {
        if (contracts) await handleError(async () => await (await contracts.converter.swapMaxEthOut(contracts.config.wrappedCoin.address, amount)).wait());
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function provideLiquidity(token: Approved, amount: ethers.BigNumber) {
        if (contracts) await handleError(async () => await (await contracts.lPool.addLiquidity(token.address, amount, OVERRIDE)).wait());
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function redeem(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            const redeemToken = await contracts.lPool.LPFromPT(token.address);
            await handleError(async () => await (await contracts.lPool.removeLiquidity(redeemToken, amount, OVERRIDE)).wait());
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function depositCollateral(token: Approved, amount: ethers.BigNumber) {
        if (contracts) await handleError(async () => await (await contracts.marginLong.addCollateral(token.address, amount, OVERRIDE)).wait());
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function withdrawCollateral(token: Approved, amount: ethers.BigNumber) {
        if (contracts) await handleError(async () => await (await contracts.marginLong.removeCollateral(token.address, amount, OVERRIDE)).wait());
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function borrowLong(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            await handleError(async () => {
                const signerAddress = await contracts.signer.getAddress();

                const minCollateralPrice = await contracts.marginLong.minCollateralPrice();
                const _safeCollateralPrice = safeCollateralPrice(minCollateralPrice);
                const collateralPrice = await contracts.marginLong.collateralPrice(signerAddress);
                if (collateralPrice.lt(_safeCollateralPrice))
                    throw "UsafeBorrow: Borrowing with this collateral price is forbidden on the dApp due to the small price decrease required to reset your position. If you know what you are doing and you still wish to borrow this amount, please interact with the contract itself.";

                const priceToBorrow = await contracts.oracle.priceMax(token.address, amount);
                const currentPriceBorrowed = await contracts.marginLong["initialBorrowPrice(address)"](signerAddress);

                const [currentLeverageNumerator, currentLeverageDenominator] = await contracts.marginLong.currentLeverage(signerAddress);
                const [maxLeverageNumerator, maxLeverageDenominator] = await contracts.marginLong.maxLeverage();

                const currentLeverage = currentLeverageNumerator.mul(ROUND_CONSTANT).div(currentLeverageDenominator).toNumber() / ROUND_CONSTANT;
                const maxLeverage = maxLeverageNumerator.mul(ROUND_CONSTANT).div(maxLeverageDenominator).toNumber() / ROUND_CONSTANT;

                const isSafePosition = isSafeLeveragePrice(priceToBorrow, currentPriceBorrowed, currentLeverage, maxLeverage, collateralPrice);
                if (!isSafePosition)
                    throw "UnsafeBorrow: Borrowing this amount is forbidden on the dApp due to the small price decrease required to liquidate your position. If you know what you are doing and still wish to borrow this amount, please interact with the contract itself.";

                await (await contracts.marginLong.borrow(token.address, amount, OVERRIDE)).wait();
            });
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function repayLong(token: Approved) {
        if (contracts) {
            await handleError(async () => await (await contracts?.marginLong["repayAccount(address)"](token.address, OVERRIDE)).wait());
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function repayLongAll() {
        if (contracts) await handleError(async () => await (await contracts?.marginLong["repayAccount()"](OVERRIDE)).wait());
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    useEffect(() => {
        if (!contracts) setProtocolMethods(null);
        else {
            setProtocolMethods({
                wrap,
                unwrap,
                provideLiquidity,
                redeem,
                depositCollateral,
                withdrawCollateral,
                borrowLong,
                repayLong,
                repayLongAll,
                approve,
            });
        }
    }, [contracts]);

    return <protocolMethodsCtx.Provider value={protocolMethods}>{children}</protocolMethodsCtx.Provider>;
}

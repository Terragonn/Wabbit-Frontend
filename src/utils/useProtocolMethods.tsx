import {useWeb3React} from "@web3-react/core";
import {ethers, Overrides} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import approveERC20 from "./approveERC20";
import useContracts from "./useContracts";
import useError from "./useError";

interface ProtocolMethods {
    provideLiquidity: (address: string, amount: ethers.BigNumber) => Promise<void>;
    redeem: (address: string, amount: ethers.BigNumber) => Promise<void>;
    depositCollateral: (address: string, amount: ethers.BigNumber) => Promise<void>;
    withdrawCollateral: (address: string, amount: ethers.BigNumber) => Promise<void>;
    borrowLong: (address: string, amount: ethers.BigNumber) => Promise<void>;
    repayLong: (address: string) => Promise<void>;
    repayLongAll: () => Promise<void>;
}

const protocolMethodsCtx = createContext<ProtocolMethods | null>(undefined as any);

export default function useProtocolMethods() {
    return useContext(protocolMethodsCtx);
}

export const OVERRIDE: Overrides = {gasLimit: 230000};

export function ProtocolMethodsProvider({children}: {children: any}) {
    const [protocolMethods, setProtocolMethods] = useState<ProtocolMethods | null>(null);
    const contracts = useContracts();

    const {library}: {library?: ethers.providers.JsonRpcProvider} = useWeb3React();

    const [, setError] = useError();

    async function approve(tokenAddress: string, address: string, amount: ethers.BigNumber) {
        if (library) await approveERC20(tokenAddress, amount, address, library?.getSigner());
    }

    async function handleError(fn: (...args: any[]) => Promise<any>) {
        try {
            return await fn();
        } catch (e: any) {
            setError(e.data?.message || null);
            window.scroll(0, 0);
        }
    }

    async function provideLiquidity(address: string, amount: ethers.BigNumber) {
        if (contracts) {
            await approve(address, contracts.lPool.address as string, amount);

            await handleError(async () => await contracts.lPool.addLiquidity(address, amount, OVERRIDE));
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function redeem(address: string, amount: ethers.BigNumber) {
        if (contracts) {
            const redeemToken = await contracts.lPool.LPFromPT(address);
            await approve(redeemToken, contracts.lPool.address as string, amount);

            await handleError(async () => await contracts.lPool.removeLiquidity(redeemToken, amount, OVERRIDE));
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function depositCollateral(address: string, amount: ethers.BigNumber) {
        if (contracts) {
            await approve(address, contracts.marginLong.address as string, amount);

            await handleError(async () => await contracts.marginLong.addCollateral(address, amount, OVERRIDE));
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function withdrawCollateral(address: string, amount: ethers.BigNumber) {
        if (contracts) await handleError(async () => await contracts.marginLong.removeCollateral(address, amount, OVERRIDE));
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function borrowLong(address: string, amount: ethers.BigNumber) {
        if (contracts) await handleError(async () => await contracts.marginLong.borrow(address, amount, OVERRIDE));
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function repayLong(address: string) {
        if (contracts) await handleError(async () => await contracts?.marginLong.repayAccount(address, OVERRIDE));
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function repayLongAll() {
        if (contracts) await handleError(async () => await contracts?.marginLong.repayAccountAll(OVERRIDE));
        else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    useEffect(() => {
        if (!contracts) setProtocolMethods(null);
        else {
            setProtocolMethods({
                provideLiquidity,
                redeem,
                depositCollateral,
                withdrawCollateral,
                borrowLong,
                repayLong,
                repayLongAll,
            });
        }
    }, [contracts]);

    return <protocolMethodsCtx.Provider value={protocolMethods}>{children}</protocolMethodsCtx.Provider>;
}

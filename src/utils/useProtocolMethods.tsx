import {useWeb3React} from "@web3-react/core";
import {ethers, Overrides} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import {isApprovedERC20, approveERC20} from "./approveERC20";
import {Approved} from "./useChainData";
import useContracts from "./useContracts";
import useError from "./useError";
import {useUpdateProtocolData} from "./useProtocolData";

interface ProtocolMethods {
    approve: (token: string, contractAddress: string, amount: ethers.BigNumber) => Promise<[boolean, (() => Promise<void>) | null]>;
    provideLiquidity: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    redeem: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    depositCollateral: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    withdrawCollateral: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    borrowLong: (token: Approved, amount: ethers.BigNumber) => Promise<void>;
    repayLong: (token: Approved) => Promise<void>;
    repayLongAll: () => Promise<void>;
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
            return await fn();
        } catch (e: any) {
            setError(e.data?.message || e.message || null);
            window.scroll(0, 0);
        }
    }

    async function approve(token: string, contractAddress: string, amount: ethers.BigNumber) {
        if (library && isApprovedERC20(token, amount, contractAddress, library.getSigner()))
            return [true, async () => await approveERC20(token, amount, contractAddress, library.getSigner())] as any;
        else return [false, null] as any;
    }

    async function provideLiquidity(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            await handleError(async () => await (await contracts.lPool.addLiquidity(token.address, amount, OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function redeem(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            const redeemToken = await contracts.lPool.LPFromPT(token.address);
            await handleError(async () => await (await contracts.lPool.removeLiquidity(redeemToken, amount, OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function depositCollateral(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            await handleError(async () => await (await contracts.marginLong.addCollateral(token.address, amount, OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function withdrawCollateral(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            await handleError(async () => await (await contracts.marginLong.removeCollateral(token.address, amount, OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function borrowLong(token: Approved, amount: ethers.BigNumber) {
        if (contracts) {
            await handleError(async () => await (await contracts.marginLong.borrow(token.address, amount, OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function repayLong(token: Approved) {
        if (contracts) {
            await handleError(async () => await (await contracts?.marginLong["repayAccount(address)"](token.address, OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    async function repayLongAll() {
        if (contracts) {
            await handleError(async () => await (await contracts?.marginLong["repayAccount()"](OVERRIDE)).wait());
            updateProtocolData();
        } else setError("Your wallet is not connected. Please connect your wallet then try again.");
    }

    useEffect(() => {
        if (!contracts) setProtocolMethods(null);
        else {
            setProtocolMethods({
                approve,
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

import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import {useConnect} from "../components/Wallet";
import approveERC20 from "./approveERC20";
import useContracts from "./useContracts";
import useError from "./useError";

interface ProtocolMethods {
    stake: (address: string, amount: ethers.BigNumber) => Promise<void>;
    redeem: (address: string, amount: ethers.BigNumber) => Promise<void>;
    depositCollateral: (address: string, amount: ethers.BigNumber) => Promise<void>;
    withdrawCollateral: (address: string, amount: ethers.BigNumber) => Promise<void>;
    borrowLong: (address: string, amount: ethers.BigNumber) => Promise<void>;
    repayLong: () => Promise<void>;
}

const protocolMethodsCtx = createContext<ProtocolMethods | null>(undefined as any);

export default function useProtocolMethods() {
    return useContext(protocolMethodsCtx);
}

export function ProtocolMethodsProvider({children}: {children: any}) {
    const [protocolMethods, setProtocolMethods] = useState<ProtocolMethods | null>(null);
    const contracts = useContracts();

    const {library}: {library?: ethers.providers.JsonRpcProvider} = useWeb3React();

    const connect = useConnect();
    const [, setError] = useError();

    function approve(address: string, amount: ethers.BigNumber) {
        approveERC20(amount, address, library?.getSigner() as ethers.providers.JsonRpcSigner);
    }

    async function handleError(fn: (...args: any[]) => Promise<void>) {
        try {
            await fn();
        } catch (e: any) {
            setError(e.data?.message || null);
            window.scroll(0, 0);
        }
    }

    async function stake(address: string, amount: ethers.BigNumber) {
        await connect();
        approve(address, amount);

        handleError(async () => await contracts?.lPool.stake(address, amount));
    }

    async function redeem(address: string, amount: ethers.BigNumber) {
        await connect();

        const redeemToken = await contracts?.lPool.LPFromPT(address);
        approve(redeemToken, amount);

        handleError(async () => await contracts?.lPool.redeem(redeemToken, amount));
    }

    async function depositCollateral(address: string, amount: ethers.BigNumber) {
        await connect();
        approve(address, amount);

        handleError(async () => await contracts?.marginLong.addCollateral(address, amount));
    }

    async function withdrawCollateral(address: string, amount: ethers.BigNumber) {
        await connect();

        handleError(async () => await contracts?.marginLong.removeCollateral(address, amount));
    }

    async function borrowLong(address: string, amount: ethers.BigNumber) {
        await connect();

        handleError(async () => await contracts?.marginLong.borrow(address, amount));
    }

    async function repayLong() {
        await connect();

        handleError(async () => await contracts?.marginLong.repayAccount());
    }

    useEffect(() => {
        if (!contracts) setProtocolMethods(null);
        else {
            setProtocolMethods({
                stake,
                redeem,
                depositCollateral,
                withdrawCollateral,
                borrowLong,
                repayLong,
            });
        }
    }, [contracts]);

    return <protocolMethodsCtx.Provider value={protocolMethods}>{children}</protocolMethodsCtx.Provider>;
}

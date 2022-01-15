import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {createContext, useContext, useEffect, useState} from "react";
import {useConnect} from "../components/Wallet";
import approveERC20 from "./approveERC20";
import useContracts from "./useContracts";
import useError from "./useError";

interface ProtocolMethods {}

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

    async function stake(address: string, amount: ethers.BigNumber) {
        await connect();
        approve(address, amount);

        try {
            await contracts?.lPool.stake(address, amount);
        } catch (e: any) {
            setError(e.data?.message || null);
        }
    }

    async function redeem(address: string, amount: ethers.BigNumber) {
        await connect();

        const redeemToken = await contracts?.lPool.PTToLP(address);
        approve(redeemToken, amount);

        try {
            await contracts?.lPool.redeem(redeemToken, amount);
        } catch (e: any) {
            setError(e.data?.message || null);
        }
    }

    async function depositCollateral(address: string, amount: ethers.BigNumber) {}

    async function withdrawCollateral(address: string, amount: ethers.BigNumber) {}

    async function borrowLong(address: string, amount: ethers.BigNumber) {}

    async function repayLong() {}

    useEffect(() => {
        if (!contracts) setProtocolMethods(null);
        else {
            setProtocolMethods({});
        }
    }, [contracts]);

    return <protocolMethodsCtx.Provider value={protocolMethods}>{children}</protocolMethodsCtx.Provider>;
}

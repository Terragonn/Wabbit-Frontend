import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";
import {SUPPORTED_CHAIN_IDS} from "../../utils/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    useEffect(() => {}, [chainId]);

    return (
        <div className="bg-neutral-900 lg:px-6 px-3 lg:py-4 py-2 rounded-xl font-bold glow">
            <select className="text-white font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full">
                <option>Fantom</option>
                <option>Rinkeby</option>
                <option>Localhost</option>
            </select>
        </div>
    );
}

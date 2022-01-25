import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";
import {SupportedChainIds} from "../../utils/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    useEffect(() => {}, [chainId]);

    const chainConfig: {[key in SupportedChainIds | 0]: {name: string; color: string}} = {
        0: {name: "Invalid", color: "text-neutral-500"},
        4: {name: "Rinkeby", color: "text-yellow-500"},
        250: {name: "Fantom", color: "text-blue-500"},
        31337: {name: "Localhost", color: "text-green-500"},
    };

    return (
        <div className="bg-neutral-900 lg:px-4 px-2 lg:py-4 py-2 rounded-xl font-bold glow">
            <select className="text-white font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center">
                <option>Invalid</option>
                <option>Fantom</option>
                <option>Rinkeby</option>
                <option>Localhost</option>
            </select>
        </div>
    );
}

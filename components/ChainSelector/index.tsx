import {useWeb3React} from "@web3-react/core";

import {SupportedChainIds} from "../../utils/providers/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    const chainConfig: {[key in SupportedChainIds | 0]: {name: string; color: string}} = {
        0: {name: "Invalid", color: "text-zinc-600"},
        4: {name: "Rinkeby", color: "text-yellow-300"},
        250: {name: "Fantom", color: "text-sky-500"},
        31337: {name: "Localhost", color: "text-emerald-500"},
    };

    return (
        <select
            className={`font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center pr-12 ${
                chainId && Object.keys(chainConfig).includes(chainId.toString()) ? chainConfig[chainId as SupportedChainIds | 0].color : chainConfig[0].color
            }`}
        >
            {Object.entries(chainConfig).map(([key, value]) => {
                return (
                    <option
                        key={key}
                        selected={chainId?.toString() === key || (!chainId && key === "0")}
                        disabled={true}
                        className={`${value.color} font-medium bg-neutral-900`}
                    >
                        {value.name}
                    </option>
                );
            })}
        </select>
    );
}

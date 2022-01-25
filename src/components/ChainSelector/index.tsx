import {useWeb3React} from "@web3-react/core";
import {SupportedChainIds} from "../../utils/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    const chainConfig: {[key in SupportedChainIds | 0]: {name: string; color: string}} = {
        0: {name: "Invalid", color: "text-neutral-500"},
        4: {name: "Rinkeby", color: "text-yellow-500"},
        250: {name: "Fantom", color: "text-blue-500"},
        31337: {name: "Localhost", color: "text-green-500"},
    };

    return (
        <div className="bg-neutral-900 lg:py-4 py-2 rounded-xl font-bold glow">
            <select
                className={`mr-4 font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center ${
                    chainId && Object.keys(chainConfig).includes(chainId.toString()) ? chainConfig[chainId as SupportedChainIds | 0].color : chainConfig[0].color
                }`}
            >
                {Object.entries(chainConfig).map(([key, value]) => {
                    return (
                        <option
                            selected={chainId?.toString() === key || (!chainId && key === "0")}
                            disabled={true}
                            className={`${value.color} font-medium bg-neutral-900`}
                        >
                            {value.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

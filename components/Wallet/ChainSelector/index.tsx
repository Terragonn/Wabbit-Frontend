import {useWeb3React} from "@web3-react/core";

import {chainDataConfig, chooseColor, SupportedChainIds} from "../../../utils/providers/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    const color = chainId && Object.keys(chainDataConfig).includes(chainId.toString()) ? chainDataConfig[chainId as SupportedChainIds].color : undefined;

    return (
        <select className={`font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center pr-12 ${chooseColor("text", color)}`}>
            {Object.entries(chainDataConfig).map(([key, value]) => (
                <option
                    key={key}
                    selected={chainId?.toString() === key || (!chainId && key === "0")}
                    disabled={true}
                    className={`font-medium bg-neutral-900 ${chooseColor("text", value.color)}`}
                >
                    {value.name}
                </option>
            ))}
        </select>
    );
}

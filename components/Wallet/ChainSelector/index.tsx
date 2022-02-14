import {useWeb3React} from "@web3-react/core";

import {chainDataConfig, SupportedChainIds} from "../../../providers/useChainData";
import sortedChainDataConfigEntries from "../../../utils/sortedChainDataConfigEntries";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    const selectColor = chainId && Object.keys(chainDataConfig).includes(chainId.toString()) ? chainDataConfig[chainId as SupportedChainIds].color : undefined;
    const selectTextColor = selectColor
        ? selectColor === "zinc"
            ? "text-zinc-600"
            : selectColor === "yellow"
            ? "text-yellow-300"
            : selectColor === "sky"
            ? "text-sky-500"
            : "text-emerald-500"
        : "text-zinc-600";

    return (
        <select className={`font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center pr-12 ${selectTextColor}`}>
            {sortedChainDataConfigEntries().map(([key, value]) => {
                const optionTextColor =
                    value.color === "zinc" ? "text-zinc-600" : value.color === "yellow" ? "text-yellow-300" : value.color === "sky" ? "text-sky-500" : "text-emerald-500";

                return (
                    <option
                        key={key}
                        selected={chainId?.toString() === key || (!chainId && key === "0")}
                        disabled={true}
                        className={`font-medium bg-neutral-900 ${optionTextColor}`}
                    >
                        {value.name}
                    </option>
                );
            })}
        </select>
    );
}

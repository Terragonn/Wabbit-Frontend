import {chainDataConfig, SupportedChainIds} from "../../../utils/providers/useChainData";

export default function WalletSelectorChainSelector({chainId, setChainId}: {chainId: SupportedChainIds; setChainId: (chainId: SupportedChainIds) => void}) {
    const selectColor = chainDataConfig[chainId].color;
    const selectTextColor =
        selectColor === "zinc" ? "text-zinc-600" : selectColor === "yellow" ? "text-yellow-300" : selectColor === "sky" ? "text-sky-500" : "text-emerald-500";
    const selectBgColor = selectColor === "zinc" ? "bg-zinc-900" : selectColor === "yellow" ? "bg-yellow-600" : selectColor === "sky" ? "bg-sky-800" : "bg-emerald-800";

    return (
        <select
            className={`font-bold text-2xl rounded-xl border-transparent text-center ${selectTextColor} ${selectBgColor}`}
            onChange={(e) => setChainId(Number(e.target.value) as SupportedChainIds)}
        >
            {Object.entries(chainDataConfig)
                .slice(1)
                .map(([key, value]) => {
                    const optionTextColor =
                        value.color === "zinc"
                            ? "text-zinc-600"
                            : value.color === "yellow"
                            ? "text-yellow-300"
                            : value.color === "sky"
                            ? "text-sky-500"
                            : "text-emerald-500";

                    return (
                        <option selected={Number(key) === chainId} key={key} className={`${optionTextColor} font-medium bg-neutral-900`} value={key}>
                            {value.name}
                        </option>
                    );
                })}
        </select>
    );
}

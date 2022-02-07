import {useWeb3React} from "@web3-react/core";

import {chainDataConfig, SupportedChainIds} from "../../../utils/providers/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    return (
        <select
            className={`font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center pr-12 ${
                chainId && Object.keys(chainDataConfig).includes(chainId.toString())
                    ? chainDataConfig[chainId as SupportedChainIds | 0].textColor
                    : chainDataConfig[0].textColor
            }`}
        >
            {Object.entries(chainDataConfig).map(([key, value]) => (
                <option
                    key={key}
                    selected={chainId?.toString() === key || (!chainId && key === "0")}
                    disabled={true}
                    className={`${value.textColor} font-medium bg-neutral-900`}
                >
                    {value.name}
                </option>
            ))}
        </select>
    );
}

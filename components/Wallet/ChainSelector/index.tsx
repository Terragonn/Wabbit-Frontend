import {useWeb3React} from "@web3-react/core";

import {chainDataConfig, SupportedChainIds} from "../../../utils/providers/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    // **** It is not being compiled as it cannot check that it exists - this means that I need to specifiy the styles somewhere to make sure that they get loaded

    return (
        <select
            className={`font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center pr-12 ${
                chainId && Object.keys(chainDataConfig).includes(chainId.toString())
                    ? chainDataConfig[chainId as SupportedChainIds].textColor
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

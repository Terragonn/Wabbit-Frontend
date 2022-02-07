import {useWeb3React} from "@web3-react/core";

import {chains, SupportedChainIds} from "../../../utils/providers/useChainData";

export default function ChainSelector() {
    const {chainId} = useWeb3React();

    return (
        <select
            className={`font-bold bg-transparent border-transparent lg:text-3xl text-2xl rounded-xl w-full text-center pr-12 ${
                chainId && Object.keys(chains).includes(chainId.toString()) ? chains[chainId as SupportedChainIds | 0].color : chains[0].color
            }`}
        >
            {Object.entries(chains).map(([key, value]) => {
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

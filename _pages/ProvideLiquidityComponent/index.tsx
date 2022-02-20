import {useState} from "react";

import {Approved} from "../../providers/useChainData";
import useContracts from "../../providers/useContracts";
import useProtocolData from "../../providers/useProtocolData";
import useProtocolMax from "../../providers/useProtocolMax";
import useProtocolMethods from "../../providers/useProtocolMethods";

import TokenSelect from "../../components/TokenSelect";
import HeaderBanner from "./headerBanner";
import ProvideLiquidity from "./provideLiquidity";
import RedeemLiquidity from "./redeemLiquidity";

export default function ProvideLiquidityComponent() {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [token, setToken] = useState<Approved | null>(null);

    return (
        <>
            {token && protocolData ? <HeaderBanner token={token} protocolData={protocolData} /> : null}
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Provide Liquidity</h2>
            <div className="p-12 bg-neutral-900 bg-opacity-75 rounded-xl glow flex flex-col items-start pb-10 my-10">
                {contracts ? (
                    <div className="w-full lg:mb-16 mb-20">
                        <TokenSelect title="Token" setToken={setToken} allowed={["leveragePool"]} contracts={contracts} />
                    </div>
                ) : null}
                {token && contracts && protocolData && protocolMethods && protocolMax ? (
                    <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                        <div className="w-full lg:mr-6">
                            <ProvideLiquidity
                                token={token}
                                protocolData={protocolData}
                                protocolMethods={protocolMethods}
                                protocolMax={protocolMax}
                                contracts={contracts}
                            />
                        </div>
                        <div className="w-full lg:ml-6">
                            <RedeemLiquidity
                                token={token}
                                protocolData={protocolData}
                                protocolMethods={protocolMethods}
                                protocolMax={protocolMax}
                                contracts={contracts}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

import {useState} from "react";
import TokenSelect from "../../components/TokenSelect";
import {Approved} from "../../providers/useChainData";
import useContracts from "../../providers/useContracts";
import useProtocolData from "../../providers/useProtocolData";
import useProtocolMax from "../../providers/useProtocolMax";
import useProtocolMethods from "../../providers/useProtocolMethods";
import HeaderBanner from "./headerBanner";

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
            <div className="p-12 bg-neutral-900 bg-opacity-75 rounded-xl glow flex flex-col items-start pb-10 my-10"></div>
            {contracts ? (
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} allowed={["leveragePool"]} contracts={contracts} />
                </div>
            ) : null}
            {token && contracts ? (
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Provide Liquidity"
                            keys={[
                                ["Available", parseNumber(mainData?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(mainData?.availableValue)],
                                [
                                    "Potential LP tokens",
                                    parseNumber(mainData?.totalPotentialLP) + " " + displayString(contracts?.config.LPPrefixSymbol) + displayString(token?.symbol),
                                ],
                            ]}
                            token={token}
                            max={maxData?.maxAvailableToken}
                            callback={
                                protocolMethods && contracts
                                    ? [
                                          {
                                              cta: "Provide",
                                              fn: async (token, num) => await protocolMethods.provideLiquidity(token, num),
                                              approve: async (token, num) => await protocolMethods.approve(token.address, contracts.lPool.address, num),
                                          },
                                      ]
                                    : []
                            }
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Redeem Liquidity"
                            keys={[
                                ["Available", parseNumber(mainData?.availableLP) + " " + displayString(contracts?.config.LPPrefixSymbol) + displayString(token?.symbol)],
                                ["Total redeem amount", parseNumber(mainData?.LPRedeemAmount) + " " + displayString(token?.symbol)],
                                ["Total redeem value", "$ " + parseNumber(mainData?.LPRedeemValue)],
                            ]}
                            token={token}
                            max={maxData?.maxAvailableLPToken}
                            callback={
                                protocolMethods && contracts
                                    ? [
                                          {
                                              cta: "Redeem",
                                              fn: async (token, num) => await protocolMethods.redeem(token, num),
                                              approve: async (token, num) => {
                                                  const lpToken = await contracts.lPool.LPFromPT(token.address);
                                                  return await protocolMethods.approve(lpToken, contracts.lPool.address, num);
                                              },
                                          },
                                      ]
                                    : []
                            }
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
}

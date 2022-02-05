import TokenSegment from "../../components/TokenSegment";

export default function Wrap() {
    return (
        <>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Wrap</h2>
            <div className="lg:mt-20 p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start pb-10 my-10">
                <p className="text-white font-medium text-lg">
                    To use your native chain coins (e.g. ETH, FTM) with Torque, you must first wrap them into their ERC20 equivalent (e.g. wETH, wFTM).
                </p>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Provide Liquidity"
                            keys={[
                                ["Available", parseNumber(data?.available) + " " + displayString(token?.symbol)],
                                ["Available value", "$ " + parseNumber(data?.availableValue)],
                                ["Potential LP tokens", parseNumber(data?.totalPotentialLP) + " " + displayString(config?.LPPrefixSymbol) + displayString(token?.symbol)],
                            ]}
                            cta="Provide"
                            token={token}
                            max={data?.maxAvailableToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.provideLiquidity(token, num) : undefined}
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Redeem"
                            keys={[
                                ["Available", parseNumber(data?.availableLP) + " " + displayString(config?.LPPrefixSymbol) + displayString(token?.symbol)],
                                ["Total redeem amount", parseNumber(data?.LPRedeemAmount) + " " + displayString(token?.symbol)],
                                ["Total redeem value", "$ " + parseNumber(data?.LPRedeemValue)],
                            ]}
                            cta="Redeem"
                            token={token}
                            max={data?.maxAvailableLPToken}
                            callback={protocolMethods ? (token, num) => protocolMethods?.redeem(token, num) : undefined}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

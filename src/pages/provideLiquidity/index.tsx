import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";
import useProtocolData from "../../utils/useProtocolData";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import useProtocolMethods from "../../utils/useProtocolMethods";
import useChainData, {Approved} from "../../utils/useChainData";

export default function ProvideLiquidity() {
    const {config} = useChainData();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();

    const [data, setData] = useState<{
        provideLiquidityAPR: number | undefined;
        amountLocked: ethers.BigNumber | undefined;
        valueLocked: ethers.BigNumber | undefined;
        totalPotentialLP: ethers.BigNumber | undefined;
        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        availableLP: ethers.BigNumber | undefined;
        LPRedeemAmount: ethers.BigNumber | undefined;
        LPRedeemValue: ethers.BigNumber | undefined;
    } | null>(null);
    const [token, setToken] = useState<Approved>(config.approved.filter((approved) => approved.oracle && approved.leveragePool)[0]);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const provideLiquidityAPR = await protocolData.provideLiquidityAPR(token);
                const amountLocked = await protocolData.totalAmountLocked(token);
                const valueLocked = await protocolData.totalPriceLocked(token);

                const totalPotentialLP = await protocolData.getLPTokenAmount(token);
                const available = await protocolData.getAvailableBalance(token);
                const availableValue = await protocolData.getAvailableBalanceValue(token);

                const availableLP = await protocolData.getLiquidityProvidedAmount(token);
                const LPRedeemAmount = await protocolData.getRedeemLiquidityAmount(token);
                const LPRedeemValue = await protocolData.getRedeemLiquidityValue(token);

                setData({provideLiquidityAPR, amountLocked, valueLocked, totalPotentialLP, available, availableValue, availableLP, LPRedeemAmount, LPRedeemValue});
            })();
        }
    }, [protocolData, token]);

    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Provide Liquidity APR", body: parseNumberFloat(data?.provideLiquidityAPR) + " %"},
                        {title: "Total Amount Locked", body: parseNumber(data?.amountLocked) + " " + token.symbol},
                        {title: "Total Value Locked", body: "$ " + parseNumber(data?.valueLocked)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Provide Liquidity</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start justify-evenly pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} allowed={["leveragePool"]} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Provide Liquidity"
                            keys={{
                                Available: parseNumber(data?.available) + " " + token.symbol,
                                "Available value": "$ " + parseNumber(data?.availableValue),
                                "Potential LP tokens": parseNumber(data?.totalPotentialLP) + " " + config.LPPrefixSymbol + token.symbol,
                            }}
                            cta="Provide"
                            token={token}
                            callback={(num, token) => protocolMethods?.provideLiquidity(token.address, num)}
                        />
                    </div>
                    <div className="w-full lg:ml-6">
                        <TokenSegment
                            title="Redeem"
                            keys={{
                                Available: parseNumber(data?.availableLP) + " " + config.LPPrefixSymbol + token.symbol,
                                "Total redeem amount": parseNumber(data?.LPRedeemAmount) + " " + token.symbol,
                                "Total redeem value": "$ " + parseNumber(data?.LPRedeemValue),
                            }}
                            cta="Redeem"
                            token={token}
                            callback={(num, token) => protocolMethods?.redeem(token.address, num)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

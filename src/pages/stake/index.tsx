import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";
import useProtocolData from "../../utils/useProtocolData";
import config from "../../config/config.json";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import {Approved} from "../../utils/getApproved";

export default function StakeLeverage() {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        stakeAPY: number;
        amountLocked: ethers.BigNumber;
        valueLocked: ethers.BigNumber;
        available: ethers.BigNumber;
        availableValue: ethers.BigNumber;
        availableLP: ethers.BigNumber;
        LPRedeemAmount: ethers.BigNumber;
        LPRedeemValue: ethers.BigNumber;
    } | null>(null);
    const [token, setToken] = useState<Approved>(config.approved[0]);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const stakeAPY = await protocolData.stakeAPY(token.address);
                const amountLocked = await protocolData.totalAmountLocked(token.address);
                const valueLocked = await protocolData.totalPriceLocked(token.address);

                const available = await protocolData.getAvailableBalance(token.address);
                const availableValue = await protocolData.getAvailableBalanceValue(token.address);

                const availableLP = await protocolData.getStakedAmount(token.address);
                const LPRedeemAmount = await protocolData.getStakedRedeemAmount(token.address);
                const LPRedeemValue = await protocolData.getStakedRedeemValue(token.address);

                setData({stakeAPY, amountLocked, valueLocked, available, availableValue, availableLP, LPRedeemAmount, LPRedeemValue});
            })();
        }
    }, [protocolData, token]);

    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Stake APY", body: parseNumberFloat(data?.stakeAPY) + " %"},
                        {title: "Total Amount Locked", body: parseNumber(data?.amountLocked) + " " + token.symbol},
                        {title: "Total Value Locked", body: "$ " + parseNumber(data?.valueLocked)},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Stake</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start justify-evenly pb-10 my-10">
                <div className="w-full lg:mb-16 mb-20">
                    <TokenSelect title="Token" setToken={setToken} />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full lg:mr-6">
                        <TokenSegment
                            title="Stake"
                            keys={{
                                Available: parseNumber(data?.available) + " " + token.symbol,
                                "Available value": "$ " + parseNumber(data?.availableValue),
                            }}
                            cta="Stake"
                            token={token}
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {Contracts} from "../../providers/useContracts";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function RedeemLiquidity({
    token,
    protocolData,
    protocolMethods,
    protocolMax,
    contracts,
}: {
    token: Approved;
    protocolData: ProtocolData;
    protocolMethods: ProtocolMethods;
    protocolMax: ProtocolMaxData;
    contracts: Contracts;
}) {
    const [data, setData] = useState<{
        availableLP: ethers.BigNumber | undefined;
        LPRedeemAmount: ethers.BigNumber | undefined;
        LPRedeemValue: ethers.BigNumber | undefined;
    } | null>(null);

    const [maxData, setMaxData] = useState<{
        maxAvailableLPToken: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    const [lpToken, setLPToken] = useState<Approved | null>(null);

    useEffect(() => {
        (async () => {
            const newLPToken = await contracts.lPool.LPFromPT(token.address);
            const newApproved: Approved = {
                name: contracts.config.setup.LPPrefixName + " " + token.name,
                symbol: contracts.config.setup.LPPrefixSymbol + token.symbol,
                icon: token.icon,
                address: newLPToken,
                decimals: token.decimals,
                priceFeed: "",
                oracle: false,
                marginLongCollateral: false,
                marginLongBorrow: false,
                leveragePool: false,
                flashLender: false,
                setup: {
                    maxInterestMinNumerator: 0,
                    maxInterestMinDenominator: 0,
                    maxInterestMaxNumerator: 0,
                    maxInterestMaxDenominator: 0,
                    maxUtilizationNumerator: 0,
                    maxUtilizationDenominator: 0,
                },
            };
            setLPToken(newApproved);
        })();
    }, [token, contracts]);

    useEffect(() => {
        (async () => {
            const availableLP = await parseError(async () => await protocolData.liquidityProvidedTokenAmount(token));
            const LPRedeemAmount = await parseError(async () => await protocolData.redeemLiquidityTokenAmount(token));
            const LPRedeemValue = await parseError(async () => await protocolData.redeemLiquidityTokenPrice(token));

            setData({
                availableLP,
                LPRedeemAmount,
                LPRedeemValue,
            });
        })();
    }, [token, protocolData]);

    useEffect(() => {
        (async () => {
            const maxAvailableLPToken = await parseError(async () => await protocolMax.availableLPToken(token));
            setMaxData({maxAvailableLPToken});
        })();
    }, [token, protocolMax]);

    return (
        <>
            {lpToken ? (
                <TokenSegment
                    title="Redeem Liquidity"
                    keys={[
                        ["Available", parseNumber(data?.availableLP) + " " + contracts.config.setup.LPPrefixSymbol + token.symbol],
                        ["Total redeem amount", parseNumber(data?.LPRedeemAmount) + " " + token.symbol],
                        ["Total redeem value", "$ " + parseNumber(data?.LPRedeemValue)],
                    ]}
                    token={lpToken}
                    max={maxData?.maxAvailableLPToken}
                    callback={[
                        {
                            cta: "Redeem",
                            fn: async (token, num) => await protocolMethods.redeem(token, num),
                            approve: async (token, num) => await protocolMethods.approve(token.address, contracts.lPool.address, num),
                        },
                    ]}
                />
            ) : null}
        </>
    );
}

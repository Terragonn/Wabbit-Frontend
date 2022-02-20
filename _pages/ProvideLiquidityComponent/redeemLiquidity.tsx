import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {Contracts} from "../../providers/useContracts";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import displayString from "../../utils/displayString";
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
        <TokenSegment
            title="Redeem Liquidity"
            keys={[
                ["Available", parseNumber(data?.availableLP) + " " + displayString(contracts?.config.LPPrefixSymbol) + displayString(token?.symbol)],
                ["Total redeem amount", parseNumber(data?.LPRedeemAmount) + " " + displayString(token?.symbol)],
                ["Total redeem value", "$ " + parseNumber(data?.LPRedeemValue)],
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
    );
}

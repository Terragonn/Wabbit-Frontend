import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function CollateralWithdraw({
    token,
    protocolData,
    protocolMethods,
    protocolMax,
}: {
    token: Approved;
    protocolData: ProtocolData;
    protocolMethods: ProtocolMethods;
    protocolMax: ProtocolMaxData;
}) {
    const [data, setData] = useState<{
        collateralAmount: ethers.BigNumber | undefined;
        collateralValue: ethers.BigNumber | undefined;
    } | null>(null);
    const [maxData, setMaxData] = useState<{
        maxAvailableCollateral: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const collateralAmount = await parseError(async () => await protocolData.accountCollateralAmount(token));
            const collateralValue = await parseError(async () => await protocolData.accountCollateralPrice(token));

            setData({
                collateralAmount,
                collateralValue,
            });
        })();
    }, [token, protocolData]);

    useEffect(() => {
        (async () => {
            const maxAvailableCollateral = await parseError(async () => await protocolMax.availableCollateral(token));

            setMaxData({
                maxAvailableCollateral,
            });
        })();
    }, [token, protocolMax]);

    return (
        <TokenSegment
            title="Withdraw"
            keys={[
                ["Available amount", parseNumber(data?.collateralAmount) + " " + token.symbol],
                ["Available value", "$ " + parseNumber(data?.collateralValue)],
            ]}
            token={token}
            max={maxData?.maxAvailableCollateral}
            callback={protocolMethods ? [{cta: "Withdraw", fn: async (token, num) => await protocolMethods.withdrawCollateral(token, num)}] : []}
        />
    );
}

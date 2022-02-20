import {ethers} from "ethers";
import {useEffect, useState} from "react";
import TokenSegment from "../../components/TokenSegment";
import {Approved} from "../../providers/useChainData";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";
import parseError from "../../utils/parseError";
import {parseNumber, parseNumberFloat} from "../../utils/parseNumber";

export default function LeverageTotal({
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
        totalAccountValue: ethers.BigNumber | undefined;
        totalAccountCollateralValue: ethers.BigNumber | undefined;
        totalAccountInterest: ethers.BigNumber | undefined;
        totalAccountInitialBorrowedValue: ethers.BigNumber | undefined;
        totalAccountBorrowedValue: ethers.BigNumber | undefined;
        marginLevel: number | undefined;
        currentLeverage: number | undefined;
        liquidatableBorrowPrice: ethers.BigNumber;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const totalAccountValue = await parseError(async () => await protocolData.accountTotalPrice());
            const totalAccountCollateralValue = await parseError(async () => await protocolData.accountCollateralTotalPrice());
            const totalAccountInterest = await parseError(async () => await protocolData.totalInterest());
            const totalAccountInitialBorrowedValue = await parseError(async () => await protocolData.totalInitialBorrowedPrice());
            const totalAccountBorrowedValue = await parseError(async () => await protocolData.accountBorrowedTotalPrice());
            const marginLevel = await parseError(async () => await protocolData.marginLevel());
            const currentLeverage = await parseError(async () => await protocolData.currentLeverage());
            const liquidatableBorrowPrice = await parseError(async () => await protocolData.liquidatablePrice());

            setData({
                totalAccountValue,
                totalAccountCollateralValue,
                totalAccountInterest,
                totalAccountInitialBorrowedValue,
                totalAccountBorrowedValue,
                marginLevel,
                currentLeverage,
                liquidatableBorrowPrice,
            });
        })();
    }, [token, protocolData]);

    return (
        <TokenSegment
            title="Total Leverage"
            keys={[
                ["Total account value", "$ " + parseNumber(data?.totalAccountValue)],
                ["", ""],
                ["Total collateral value", "$ " + parseNumber(data?.totalAccountCollateralValue)],
                ["Total accumulated interest", "$ " + parseNumber(data?.totalAccountInterest)],
                ["Total initial borrowed value", "$ " + parseNumber(data?.totalAccountInitialBorrowedValue)],
                ["Total current borrowed value", "$ " + parseNumber(data?.totalAccountBorrowedValue)],
                ["", ""],
                ["Margin level", parseNumberFloat(data?.marginLevel)],
                ["Current leverage", parseNumberFloat(data?.currentLeverage) + "x"],
                ["Liquidatable borrowed price", "$ " + parseNumber(data?.liquidatableBorrowPrice)],
            ]}
            token={token}
            hideInput={true}
            callback={[{cta: "Repay All", fn: async (num, token) => await protocolMethods?.repayLongAll()}]}
        />
    );
}

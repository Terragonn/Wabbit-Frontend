import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {ProtocolData} from "../../providers/useProtocolData";
import {ProtocolMaxData} from "../../providers/useProtocolMax";
import {ProtocolMethods} from "../../providers/useProtocolMethods";

import TokenSegment from "../../components/TokenSegment";
import displayString from "../../utils/displayString";
import parseError from "../../utils/parseError";
import {parseNumber, parseNumberFloat} from "../../utils/parseNumber";

export default function LeverageLeverage({
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
        borrowedAmount: ethers.BigNumber | undefined;
        currentBorrowedValue: ethers.BigNumber | undefined;
        initialBorrowedValue: ethers.BigNumber | undefined;
        minMarginLevel: number | undefined;
        maxLeverage: number | undefined;
    } | null>(null);

    const [maxData, setMaxData] = useState<{
        maxAvailableLeverage: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const borrowedAmount = await parseError(async () => await protocolData.accountBorrowedAmount(token));
            const currentBorrowedValue = await parseError(async () => await protocolData.accountBorrowedPrice(token));
            const initialBorrowedValue = await parseError(async () => await protocolData.initialBorrowedPrice(token));
            const minMarginLevel = await parseError(async () => await protocolData.minMarginLevel());
            const maxLeverage = await parseError(async () => await protocolData.maxLeverage());

            setData({
                borrowedAmount,
                currentBorrowedValue,
                initialBorrowedValue,
                minMarginLevel,
                maxLeverage,
            });
        })();
    }, [token, protocolData]);

    useEffect(() => {
        (async () => {
            const maxAvailableLeverage = await parseError(async () => protocolMax.availableLeverage(token));
            setMaxData({maxAvailableLeverage});
        })();
    }, [token, protocolMax]);

    return (
        <TokenSegment
            title="Leverage"
            keys={[
                ["Borrowed amount", parseNumber(data?.borrowedAmount) + " " + displayString(token.symbol)],
                ["Initial borrowed value", "$ " + parseNumber(data?.initialBorrowedValue)],
                ["Current borrowed value", "$ " + parseNumber(data?.currentBorrowedValue)],
                ["", ""],
                ["Min margin level", parseNumberFloat(data?.minMarginLevel)],
                ["Maximum leverage", parseNumberFloat(data?.maxLeverage) + "x"],
            ]}
            token={token}
            max={maxData?.maxAvailableLeverage}
            callback={[
                {cta: "Leverage", fn: async (token, num) => await protocolMethods.borrowLong(token, num)},
                {cta: "Repay", fn: async (token, num) => await protocolMethods.repayLong(token)},
            ]}
        />
    );
}

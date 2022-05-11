import { useEffect, useState } from "react";

import { formatNumber, getTokenDataByAddress, Token } from "../../../../../utils";
import { usePrice } from "../../../../../hooks";

export function useDepositData(token: Token[], tokenAmount: { [key: string]: number }) {
    const getPrice = usePrice(token);

    const [total, setTotal] = useState<string>("$ 0.00");
    const [breakdown, setBreakdown] = useState<[Token, string][]>(() => {
        return token.map((tkn) => [getTokenDataByAddress(tkn.address), "$ 0.00"] as [Token, string]);
    });

    useEffect(() => {
        let totalRaw = 0;

        for (const [address, amount] of Object.entries(tokenAmount)) {
            const token = getTokenDataByAddress(address);
            const price = getPrice(token);
            if (price) totalRaw += price * amount;
        }

        setTotal("$ " + formatNumber(totalRaw));
    }, [tokenAmount]);

    useEffect(() => {
        const out: [Token, string][] = [];

        for (const [address, amount] of Object.entries(tokenAmount)) {
            const token = getTokenDataByAddress(address);

            const unitPrice = getPrice(token);
            let price = "$ 0.00";
            if (unitPrice) price = "$ " + formatNumber(unitPrice * amount);

            out.push([token, price]);
        }

        setBreakdown(out);
    }, [tokenAmount]);

    return { total, breakdown };
}

import { useEffect, useState } from "react";

import { formatNumber, getTokenDataByAddress, Token } from "../../utils";
import { usePrice } from "..";

export function useDepositData(tokenAmount: { [key: string]: number }) {
    const getPrice = usePrice();

    const [total, setTotal] = useState<string>("$ 0.00");
    const [breakdown, setBreakdown] = useState<[Token, string][]>(() => {
        const pairs = Object.entries(tokenAmount);
        return pairs.map((pair) => [getTokenDataByAddress(pair[0]), "$ 0.00"] as [Token, string]);
    });

    useEffect(() => {
        (async () => {
            let totalRaw = 0;

            for (const pair of Object.entries(tokenAmount)) {
                const token = getTokenDataByAddress(pair[0]);
                const price = await getPrice(token);
                if (price) totalRaw += price * pair[1];
            }

            setTotal("$ " + formatNumber(totalRaw));
        })();
    }, [tokenAmount]);

    useEffect(() => {
        (async () => {
            const pairs = Object.entries(tokenAmount);

            const out: [Token, string][] = [];
            for (const pair of pairs) {
                const token = getTokenDataByAddress(pair[0]);

                const unitPrice = await getPrice(token);
                let price = "$ 0.00";
                if (unitPrice) price = "$ " + formatNumber(unitPrice * tokenAmount[token.address]);

                out.push([token, price]);
            }

            setBreakdown(out);
        })();
    }, [tokenAmount]);

    return { total, breakdown };
}

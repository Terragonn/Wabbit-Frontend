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

    async function getBreakdown() {
        const pairs = Object.entries(tokenAmount);

        const out: [Token, string][] = [];
        for (const pair of pairs) {
            const token = getTokenDataByAddress(pair[0]);

            const unitPrice = await getPrice(token);
            let price = "$ 0.00";
            if (unitPrice) price = "$ " + formatNumber(unitPrice * tokenAmount[token.address]);

            out.push([token, price]);
        }

        return out;
    }

    useEffect(() => {
        console.log("Updated");

        (async () => {
            let totalRaw = 0;

            for (const tkn of Object.keys(tokenAmount)) {
                const token = getTokenDataByAddress(tkn);
                const price = await getPrice(token);
                if (price) totalRaw += price;
            }

            setTotal("$ " + formatNumber(totalRaw));
        })();
    }, [tokenAmount]);

    useEffect(() => {
        (async () => setBreakdown(await getBreakdown()))();
    }, [tokenAmount]);

    return { total, breakdown };
}

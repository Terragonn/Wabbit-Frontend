import { useEffect, useState } from "react";

import { formatNumber, getTokenDataByAddress, Token } from "../../utils";
import { usePrice } from "..";

export function useWithdrawData(percentage: number) {
    const getPrice = usePrice();

    const [total, setTotal] = useState<string>("$ 0.00");
    // **** We will get the balance from the tokens as well
    const [breakdown, setBreakdown] = useState<[Token, string][]>(() => {});

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
        (async () => setBreakdown(await getBreakdown()))();
    }, [tokenAmount]);

    return { total, breakdown };
}

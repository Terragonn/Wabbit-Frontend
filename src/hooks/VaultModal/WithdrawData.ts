import { useEffect, useState } from "react";

import { formatNumber, getTokenDataByAddress, onFail, Token, vaultUserBalance } from "../../utils";
import { usePrice } from "..";

export function useWithdrawData(token: Token[], vault: string, account: string, percent: number) {
    const getPrice = usePrice();

    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const out: { [key: string]: number } = {};
        token.forEach((tkn) => (out[tkn.address] = 0));
        return out;
    });

    const [total, setTotal] = useState<string>("$ 0.00");
    const [breakdown, setBreakdown] = useState<[Token, string, string][]>([]);

    useEffect(() => {
        onFail(async () => setTokenAmount(await vaultUserBalance(vault, account)));
    }, []);

    useEffect(() => {
        (async () => {
            let totalRaw = 0;

            // **** Change this to use given token param above ^^^
            for (const pair of Object.entries(tokenAmount)) {
                const token = getTokenDataByAddress(pair[0]);
                const price = await getPrice(token);
                if (price) totalRaw += price * pair[1] * percent;
            }

            setTotal("$ " + formatNumber(totalRaw));
        })();
    }, [tokenAmount, percent]);

    useEffect(() => {
        (async () => {
            const pairs = Object.entries(tokenAmount);

            const out: [Token, string, string][] = [];
            for (const pair of pairs) {
                const token = getTokenDataByAddress(pair[0]);

                const unitPrice = await getPrice(token);
                let price = "$ 0.00";
                if (unitPrice) price = "$ " + formatNumber(unitPrice * tokenAmount[token.address] * percent);

                out.push([token, formatNumber(pair[1]), price]);
            }

            setBreakdown(out);
        })();
    }, [tokenAmount, percent]);

    return { total, breakdown };
}

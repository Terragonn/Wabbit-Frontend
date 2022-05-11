import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { formatNumber, getTokenDataByAddress, isApproved, onFail, Token, vaultUserBalance } from "../../../../../utils";
import { usePrice } from "../../../../../hooks";

export function useWithdrawData(token: Token[], vault: string, account: string, percent: number, library: ethers.providers.JsonRpcSigner, wrapper: string) {
    const getPrice = usePrice(token);

    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const out: { [key: string]: number } = {};
        token.forEach((tkn) => (out[tkn.address] = 0));
        return out;
    });

    const [total, setTotal] = useState<string>("$ 0.00");
    const [breakdown, setBreakdown] = useState<[Token, string, string][]>([]);

    const [approved, setApproved] = useState<boolean>(true);

    useEffect(() => {
        onFail(async () => setTokenAmount(await vaultUserBalance(vault, account)));
    }, [vault, account]);

    useEffect(() => {
        let totalRaw = 0;

        for (const pair of Object.entries(tokenAmount)) {
            const token = getTokenDataByAddress(pair[0]);
            const price = getPrice(token);
            if (price) totalRaw += price * pair[1] * percent;
        }

        setTotal("$ " + formatNumber(totalRaw));
    }, [tokenAmount, percent]);

    useEffect(() => {
        (async () => setApproved(await isApproved(vault, wrapper, library)))();
    }, [library]);

    useEffect(() => {
        const pairs = Object.entries(tokenAmount);

        const out: [Token, string, string][] = [];
        for (const pair of pairs) {
            const token = getTokenDataByAddress(pair[0]);

            const unitPrice = getPrice(token);
            let price = "$ 0.00";
            if (unitPrice) price = "$ " + formatNumber(unitPrice * tokenAmount[token.address] * percent);

            out.push([token, formatNumber(pair[1]), price]);
        }

        setBreakdown(out);
    }, [tokenAmount, percent]);

    return { total, breakdown, approved, setApproved };
}

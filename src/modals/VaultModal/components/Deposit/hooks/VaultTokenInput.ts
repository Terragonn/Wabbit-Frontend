import { useState } from "react";

import { Token, vaultBalance, parseAddress, parseToBigNumber, getTokenDataByAddress, ROUND_NUMBER } from "../../../../../utils";

export function useVaultDeposit(token: Token[], vault: string) {
    const [tokenBalance, setTokenBalance] = useState<{ [key: string]: number } | null>(null);
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    async function _setTokenAmount(_token: Token, amount: number) {
        try {
            if (token.length < 2) {
                setTokenAmount((tknAmnt) => {
                    tknAmnt[_token.address] = amount;

                    return { ...tknAmnt };
                });
                return;
            }

            let balance: { [key: string]: number };
            if (!tokenBalance) {
                balance = await vaultBalance(vault);
                setTokenBalance(balance);
            } else balance = tokenBalance;

            if (balance[_token.address] <= 0) {
                setTokenAmount((tknAmnt) => {
                    tknAmnt[_token.address] = amount;

                    return { ...tknAmnt };
                });
                return;
            }

            const ratio = amount / balance[_token.address];

            setTokenAmount((tknAmnt) => {
                for (const tkn of token)
                    if (balance[tkn.address] > 0) tknAmnt[tkn.address] = balance[tkn.address] * ratio;
                    else if (tkn.address === _token.address) tknAmnt[tkn.address] = amount;

                return { ...tknAmnt };
            });
        } catch (e: any) {}
    }

    return { tokenAmount, setTokenAmount: _setTokenAmount };
}

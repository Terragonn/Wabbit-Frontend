import { useState } from "react";

import { Token, vaultBalance } from "../../../../../utils";

export function useVaultDeposit(token: Token[], vault: string) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });
    const [tokenBalance, setTokenBalance] = useState<{ [key: string]: number } | null>(null);

    async function _setTokenAmount(_token: Token, amount: number) {
        try {
            if (token.length < 2) throw new Error("Invalid length");

            let balance: { [key: string]: number };
            if (!tokenBalance) {
                balance = await vaultBalance(vault);
                setTokenBalance(balance);
            } else balance = tokenBalance;

            if (balance[_token.address] <= 0) throw new Error("Invalid balance");

            setTokenAmount((tknAmnt) => {
                for (const tkn of token)
                    if (tkn.address === _token.address) tknAmnt[tkn.address] = amount;
                    else if (balance[tkn.address] > 0) tknAmnt[tkn.address] = (balance[tkn.address] * amount) / balance[_token.address];

                return { ...tknAmnt };
            });
        } catch (e: any) {
            setTokenAmount((tknAmnt) => {
                tknAmnt[_token.address] = amount;

                return { ...tknAmnt };
            });
        }
    }

    return { tokenAmount, setTokenAmount: _setTokenAmount };
}

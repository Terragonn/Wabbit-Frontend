import { useEffect, useState } from "react";

import { Token, vaultBalance } from "../../../../../utils";

export function useVaultDeposit(token: Token[], vault: string) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });
    const [tokenBalance, setTokenBalance] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    useEffect(() => {
        (async () => {
            const balance = await vaultBalance(vault);
            setTokenBalance(balance);
        })();
    }, []);

    async function _setTokenAmount(_token: Token, amount: number) {
        try {
            if (token.length < 2) throw new Error("Invalid length");
            if (tokenBalance[_token.address] <= 0) throw new Error("Invalid balance");

            setTokenAmount((tknAmnt) => {
                for (const tkn of token)
                    if (tkn.address === _token.address) tknAmnt[tkn.address] = amount;
                    else if (tokenBalance[tkn.address] > 0) tknAmnt[tkn.address] = (tokenBalance[tkn.address] * amount) / tokenBalance[_token.address];

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

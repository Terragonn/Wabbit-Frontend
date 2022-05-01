import { useState } from "react";

import { Token, vaultQuote, parseAddress } from "../../utils";

export function useVaultDeposit(token: Token[], vault: string) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    async function _setTokenAmount(token: Token, amount: number) {
        let quote: {
            [key: string]: number | null;
        } | null = null;
        try {
            quote = await vaultQuote(token, vault, amount);
        } catch (e: any) {}

        setTokenAmount((tknAmnt) => {
            tknAmnt[token.address] = amount;
            if (quote) for (const [address, amount] of Object.entries(quote)) if (amount) tknAmnt[parseAddress(address)] = amount;

            return { ...tknAmnt };
        });
    }

    return { tokenAmount, setTokenAmount: _setTokenAmount };
}

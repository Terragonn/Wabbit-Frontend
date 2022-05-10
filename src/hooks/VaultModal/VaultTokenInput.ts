import { useState } from "react";

import { Token, vaultBalance, parseAddress, parseToBigNumber, getTokenDataByAddress } from "../../utils";

export function useVaultDeposit(token: Token[], vault: string) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    async function _setTokenAmount(_token: Token, amount: number) {
        try {
            if (token.length < 2) return;

            const balance = await vaultBalance(vault);
            if (balance[_token.address] <= 0) return;

            const parsedAmount = parseToBigNumber(amount, _token.decimals);

            // **** Set the new token balance at the end
        } catch (e: any) {}

        // setTokenAmount((tknAmnt) => {
        //     tknAmnt[token.address] = amount;
        //     if (quote) for (const [address, amount] of Object.entries(quote)) if (amount) tknAmnt[parseAddress(address)] = amount;

        //     return { ...tknAmnt };
        // });
    }

    return { tokenAmount, setTokenAmount: _setTokenAmount };
}

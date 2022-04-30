import { useState } from "react";

import { Token } from "../../utils";

export function useVaultDeposit(token: Token[]) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    function _setTokenAmount(token: Token, amount: number) {
        setTokenAmount((tknAmnt) => {
            tknAmnt[token.address] = amount;
            return { ...tknAmnt };
        });
    }

    return { tokenAmount, setTokenAmount: _setTokenAmount };
}

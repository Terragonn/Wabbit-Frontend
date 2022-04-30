import { useEffect, useState } from "react";

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

            // **** In addition to this we are going to run some sort of function on this which will try and update the slot ASSUMING that the value has not been updated yet ??? (to avoid duplicate calls)

            return { ...tknAmnt };
        });
    }

    return { tokenAmount, setTokenAmount: _setTokenAmount };
}

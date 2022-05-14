import { useEffect, useState } from "react";

import { onFail, Token, tokenPrice } from "../utils";
import { useRefresh } from ".";

export function usePrice(token: Token[]) {
    const { refresh } = useRefresh();

    const [prices, setPrices] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    useEffect(() => {
        onFail(async () => {
            const hydratedPrices: { [key: string]: number } = {};

            for (const tkn of token) hydratedPrices[tkn.address] = await tokenPrice(tkn);
            setPrices(hydratedPrices);
        });
    }, [refresh]);

    function getPrice(token: Token) {
        return prices[token.address];
    }

    return getPrice;
}

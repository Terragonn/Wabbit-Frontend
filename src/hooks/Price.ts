import { useEffect, useState } from "react";

import { Token, tokenPrice } from "../utils";

export function usePrice(token: Token[]) {
    const [prices, setPrices] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    useEffect(() => {
        (async () => {
            const hydratedPrices: { [key: string]: number } = {};

            for (const tkn of token) hydratedPrices[tkn.address] = await tokenPrice(tkn);
            setPrices(hydratedPrices);
        })();
    }, []);

    function getPrice(token: Token) {
        return prices[token.address];
    }

    return getPrice;
}

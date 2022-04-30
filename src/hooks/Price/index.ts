import { useState } from "react";
import axios from "axios";

import { Token, tokenPrice } from "../../utils";

export function usePrice() {
    const [prices, setPrices] = useState<{ [key: string]: number | undefined }>({});

    async function getPrice(token: Token) {
        if (prices[token.address]) return prices[token.address];

        let price: number | undefined;
        try {
            price = await tokenPrice(token);
        } catch {
            price = undefined;
        }

        setPrices((old) => {
            old[token.address] = price;
            return old;
        });

        return price;
    }

    return getPrice;
}

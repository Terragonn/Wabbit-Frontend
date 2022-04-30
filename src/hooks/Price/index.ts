import { useState } from "react";
import axios from "axios";

import { API_URL, Token } from "../../utils";

export function usePrice() {
    // **** We need to return a function to get the price of a given token and a way of storing the price state in the function

    const [prices, setPrices] = useState<{ [key: string]: number }>({});

    async function getPrice(token: Token) {
        if (prices[token.address]) return prices[token.address];

        const url = `${API_URL}/utils/price/${token.address}`;
        const {
            data: { price },
        } = await axios.get<{ price: number }>(url);

        setPrices((old) => {
            old[token.address] = price;
            return old;
        });

        return price;
    }

    return getPrice;
}

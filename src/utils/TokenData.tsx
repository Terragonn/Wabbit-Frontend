import { parseAddress } from ".";

export interface Token {
    ticker: string;
    address: string;
    name: string;
    decimals: number;
    icon: string;
}

export function getTokenDataByAddress(token: string) {
    const data = Object.values(TokenData).filter((tkn) => tkn.address === parseAddress(token));
    if (data.length === 0) throw new Error("Token with given address does not exist");

    return data[0] as Token;
}

export const TokenData = {
    FTM: {
        ticker: "FTM",
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        name: "Fantom",
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png",
    },
    USDC: {
        ticker: "USDC",
        address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
        name: "USD Coin",
        decimals: 6,
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    },
};

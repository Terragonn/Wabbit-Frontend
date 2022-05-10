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
    BIFI: {
        ticker: "BIFI",
        address: "0xd6070ae98b8069de6b494332d1a1a81b6179d960",
        name: "Beefy Finance",
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/7311.png",
    },
    BOO: {
        ticker: "BOO",
        address: "0x841fad6eae12c286d1fd18d1d525dffa75c7effe",
        name: "SpookySwap",
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/9608.png",
    },
    SUSHI: {
        ticker: "SUSHI",
        address: "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC",
        name: "SushiSwap",
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6758.png",
    },
    SPIRIT: {
        ticker: "SPIRIT",
        address: "0x5cc61a78f164885776aa610fb0fe1257df78e59b",
        name: "SpiritSwap",
        decimals: 18,
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/10239.png",
    },
};

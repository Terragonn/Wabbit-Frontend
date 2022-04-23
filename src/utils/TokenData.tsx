import { Image } from "@mantine/core";
import { parseAddress } from ".";

function TokenIcon({ name, src }: { name: string; src: string }) {
    return <Image src={src} alt={name} width={40} radius="xl" />;
}

export interface Token {
    ticker: string;
    address: string;
    name: string;
    decimals: number;
    icon: JSX.Element;
}

export function getTokenDataByAddress(token: string) {
    const data = Object.values(TokenData).filter((tkn) => parseAddress(tkn.address) === parseAddress(token));
    if (data.length === 0) throw new Error("Token with given address does not exist");

    return data[0] as Token;
}

export const TokenData = {
    FTM: {
        ticker: "FTM",
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        name: "Fantom",
        decimals: 18,
        icon: <TokenIcon name="Fantom" src="https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png" />,
    },
    USDC: {
        ticker: "USDC",
        address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
        name: "USD Coin",
        decimals: 6,
        icon: <TokenIcon name="USD Coin" src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png" />,
    },
    DAI: {
        ticker: "DAI",
        address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
        name: "DAI",
        decimals: 18,
        icon: <TokenIcon name="DAI" src="https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png" />,
    },
    BTC: {
        ticker: "BTC",
        address: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
        name: "Bitcoin",
        decimals: 8,
        icon: <TokenIcon name="Bitcoin" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" />,
    },
    ETH: {
        ticker: "ETH",
        address: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
        name: "Ethereum",
        decimals: 18,
        icon: <TokenIcon name="Ethereum" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" />,
    },
    USDT: {
        ticker: "USDT",
        address: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
        name: "Tether",
        decimals: 6,
        icon: <TokenIcon name="Tether" src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" />,
    },
    LINK: {
        ticker: "LINK",
        address: "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8",
        name: "Chainlink",
        decimals: 18,
        icon: <TokenIcon name="Chainlink" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png" />,
    },
};

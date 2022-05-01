import axios from "axios";

import { API_URL } from "./Constants";
import { Token } from "./TokenData";

// Get the vault APY
export async function vaultAPY(vault: string) {
    const url = `${API_URL}/lens/vault/apy/${vault}`;
    const {
        data: { apy },
    } = await axios.get<{ apy: number }>(url);

    return apy;
}

// Get the vault user TVL
export async function vaultUserTVL(vault: string, wallet: string) {
    const url = `${API_URL}/lens/userVault/tvl/${vault}?wallet=${wallet}`;
    const {
        data: { tvl },
    } = await axios.get<{ tvl: number }>(url);

    return tvl;
}

// Get the users vault balance
export async function vaultUserBalance(vault: string, wallet: string) {
    const url = `${API_URL}/lens/userVault/balance/${vault}?wallet=${wallet}`;
    const {
        data: { balance },
    } = await axios.get<{ balance: { [key: string]: number } }>(url);

    return balance;
}

// Get the vault TVL
export async function vaultTVL(vault: string) {
    const url = `${API_URL}/lens/vault/tvl/${vault}`;
    const {
        data: { tvl },
    } = await axios.get<{ tvl: number }>(url);

    return tvl;
}

// Get the vault fee
export async function vaultFee(vault: string) {
    const url = `${API_URL}/lens/vault/fee/${vault}`;
    const {
        data: { fee },
    } = await axios.get<{ fee: number }>(url);

    return fee;
}

// Get the price
export async function tokenPrice(token: Token) {
    const url = `${API_URL}/utils/price/${token.address}`;
    const {
        data: { price },
    } = await axios.get<{ price: number }>(url);

    return price;
}

// Get a quote for a given token amount for a vault
export async function vaultQuote(token: Token, vault: string, amount: number) {
    const url = `${API_URL}/lens/utils/quote/${vault}?token=${token.address}&amount=${amount}`;
    const {
        data: { quote },
    } = await axios.get<{ quote: { [key: string]: number | null } | null }>(url);

    return quote;
}

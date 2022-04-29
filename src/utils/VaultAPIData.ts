import axios from "axios";
import { API_URL } from "./Constants";

// Get the vault APY
export async function vaultAPY(vault: string) {
    const url = `${API_URL}/vault/apy/${vault}`;
    const {
        data: { apy },
    } = await axios.get<{ apy: number }>(url);

    return apy;
}

// Get the vault user TVL
export async function vaultUserTVL(vault: string) {
    const url = `${API_URL}/userVault/tvl/${vault}`;
    const {
        data: { userTvl },
    } = await axios.get<{ userTvl: number }>(url);

    return userTvl;
}

// Get the vault TVL
export async function vaultTVL(vault: string) {
    const url = `${API_URL}/vault/tvl/${vault}`;
    const {
        data: { tvl },
    } = await axios.get<{ tvl: number }>(url);

    return tvl;
}

// Get the vault fee
export async function vaultFee(vault: string) {
    const url = `${API_URL}/vault/fee/${vault}`;
    const {
        data: { fee },
    } = await axios.get<{ fee: number }>(url);

    return fee;
}

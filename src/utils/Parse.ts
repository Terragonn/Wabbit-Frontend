import { BigNumber } from "ethers";

import { ROUND_NUMBER } from ".";

// Format a number to given decimal places
export function formatNumber(raw: number) {
    return raw.toFixed(2);
}

// Parse a number into its shortened form
export function parseNumber(raw: number) {
    if (raw > 1e9) return formatNumber(raw / 1e9) + "B";
    else if (raw > 1e6) return formatNumber(raw / 1e6) + "M";
    else if (raw > 1e3) return formatNumber(raw / 1e3) + "K";
    else return formatNumber(raw);
}

// Parse an address to be compatible with all addresses
export function parseAddress(address: string) {
    return address.toLowerCase();
}

// Parse a number to a big number
export function parseToBigNumber(raw: number, decimals: number) {
    return BigNumber.from(10)
        .pow(decimals)
        .mul(Math.floor(raw * ROUND_NUMBER))
        .div(ROUND_NUMBER);
}

// Parse a proportion to a percentage
export function parseToPercentage(proportion: number) {
    return formatNumber(100 * proportion);
}

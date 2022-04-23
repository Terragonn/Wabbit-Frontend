import { BigNumber } from "ethers";
import { ROUND_NUMBER } from "./Constants";

export function parseAddress(address: string) {
    return address.toLowerCase();
}

export function parseToBigNumber(raw: number, decimals: number) {
    return BigNumber.from(10)
        .pow(decimals)
        .mul(Math.floor(raw * ROUND_NUMBER))
        .div(ROUND_NUMBER);
}

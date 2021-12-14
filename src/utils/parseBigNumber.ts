import { ethers } from "ethers";
import parseNumber from "./parseNumber";

export default function parseBigNumber(num: ethers.BigNumber, decimals: number): string {
    // Parse a big number to a regular string
    const finalDecimals = 1e3;
    const parsedBn = num
        .mul(finalDecimals)
        .div(ethers.BigNumber.from("1" + "0".repeat(decimals)))
        .div(finalDecimals);
    return parseNumber(parsedBn);
}

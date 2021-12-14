import { ethers } from "ethers";
import parseNumber from "./parseNumber";

export default function parseBigNumber(num: ethers.BigNumber, decimals: number): string {
    // Parse a big number to a regular string
    const finalDecimals = ethers.BigNumber.from(1e3);
    const parsedBn = num.mul(finalDecimals).div(ethers.BigNumber.from(decimals)).div(finalDecimals).toNumber();
    return parseNumber(parsedBn);
}

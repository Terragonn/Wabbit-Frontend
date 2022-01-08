import {ethers} from "ethers";

export const ROUND_CONSTANT = 1e3;

export default function parseNumber(num: ethers.BigNumber | string, decimals: number | ethers.BigNumber): string {
    // Appreviate a number with its alphabetical representation
    if (!(num instanceof ethers.BigNumber)) num = ethers.BigNumber.from(num);
    let exponent;
    if (decimals instanceof ethers.BigNumber) exponent = decimals;
    else exponent = ethers.BigNumber.from(10).pow(decimals);
    num = num.mul(ROUND_CONSTANT).div(exponent);

    // Set num as number
    if (num.div(ROUND_CONSTANT).gt(1e9)) return (num.mul(100).div(1e9).toNumber() / (100 * ROUND_CONSTANT)).toFixed(2).toString() + "B";
    else if (num.div(ROUND_CONSTANT).gt(1e6)) return (num.mul(100).div(1e6).toNumber() / (100 * ROUND_CONSTANT)).toFixed(2).toString() + "M";
    else if (num.div(ROUND_CONSTANT).gt(1e3)) return (num.mul(100).div(1e3).toNumber() / (100 * ROUND_CONSTANT)).toFixed(2).toString() + "K";
    else return (num.mul(100).toNumber() / (100 * ROUND_CONSTANT)).toFixed(2).toString();
}

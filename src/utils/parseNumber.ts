import { ethers } from "ethers";

export default function parseNumber(num: number | ethers.BigNumber): string {
    // Appreviate a number with its alphabetical representation

    // Set num as number
    if (num <= 1) return num.toString();
    num = ethers.BigNumber.from(num);

    if (num.abs().gt(1e9)) return (num.mul(100).div(1e9).toNumber() / 100).toString() + "B";
    else if (num.abs().gt(1e6)) return (num.mul(100).div(1e6).toNumber() / 100).toString() + "M";
    else if (num.abs().gt(1e3)) return (num.mul(100).div(1e3).toNumber() / 100).toString() + "K";
    else return (num.mul(100).toNumber() / 100).toString();
}

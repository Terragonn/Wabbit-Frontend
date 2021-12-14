import { ethers } from "ethers";

export default function parseNumber(num: ethers.BigNumber | string, decimals: number): string {
    // Appreviate a number with its alphabetical representation
    if (!(num instanceof ethers.BigNumber)) num = ethers.BigNumber.from(num);
    const exponent = ethers.BigNumber.from(10).pow(decimals);
    num = num.div(exponent);

    // Set num as number
    if (num.abs().gt(1e9)) return (num.mul(100).div(1e9).toNumber() / 100).toString() + "B";
    else if (num.abs().gt(1e6)) return (num.mul(100).div(1e6).toNumber() / 100).toString() + "M";
    else if (num.abs().gt(1e3)) return (num.mul(100).div(1e3).toNumber() / 100).toString() + "K";
    else return (num.mul(100).toNumber() / 100).toString();
}

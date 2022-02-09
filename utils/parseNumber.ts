import {ethers} from "ethers";

export const ROUND_CONSTANT = 1e3;
export const DISPLAY_DECIMALS = 2;

export function parseNumberFloat(num?: number): string {
    if (typeof num === "undefined") return "-";

    return num.toFixed(DISPLAY_DECIMALS);
}

export default function parseNumber(num?: ethers.BigNumber | string): string {
    if (!num) return "-";

    if (!(num instanceof ethers.BigNumber)) num = ethers.BigNumber.from(num);

    if (num.div(ROUND_CONSTANT).gt(1e9))
        return (
            (
                num
                    .mul(10 ** DISPLAY_DECIMALS)
                    .div(1e9)
                    .toNumber() /
                (10 ** DISPLAY_DECIMALS * ROUND_CONSTANT)
            )
                .toFixed(DISPLAY_DECIMALS)
                .toString() + "B"
        );
    else if (num.div(ROUND_CONSTANT).gt(1e6))
        return (
            (
                num
                    .mul(10 ** DISPLAY_DECIMALS)
                    .div(1e6)
                    .toNumber() /
                (10 ** DISPLAY_DECIMALS * ROUND_CONSTANT)
            )
                .toFixed(DISPLAY_DECIMALS)
                .toString() + "M"
        );
    else if (num.div(ROUND_CONSTANT).gt(1e3))
        return (
            (
                num
                    .mul(10 ** DISPLAY_DECIMALS)
                    .div(1e3)
                    .toNumber() /
                (10 ** DISPLAY_DECIMALS * ROUND_CONSTANT)
            )
                .toFixed(DISPLAY_DECIMALS)
                .toString() + "K"
        );
    else return (num.mul(10 ** DISPLAY_DECIMALS).toNumber() / (10 ** DISPLAY_DECIMALS * ROUND_CONSTANT)).toFixed(DISPLAY_DECIMALS).toString();
}

export function parseDecimals(num: ethers.BigNumber, decimals: number) {
    const parsed = num.mul(ROUND_CONSTANT).div(ethers.BigNumber.from(10).pow(decimals));
    return parsed;
}

export function parseDecimalsAsNumber(num: ethers.BigNumber, decimals: number) {
    const parsed = parseDecimals(num, decimals);
    return parsed.toNumber() / ROUND_CONSTANT;
}

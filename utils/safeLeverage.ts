import {ethers} from "ethers";
import {ROUND_CONSTANT} from "./parseNumber";

export const SAFE_PRICE_DROP_PERCENT = 0.4;

export function safeLeverage(maxLeverage: number) {
    return 100 / (100 / maxLeverage + SAFE_PRICE_DROP_PERCENT);
}

export function liquidatablePriceDropPercent(currentLeverage: number, maxLeverage: number) {
    return 100 / currentLeverage - 100 / maxLeverage;
}

export function isSafeLeverageAmount(amountBorrowed: ethers.BigNumber, currentAmountBorrowed: ethers.BigNumber, currentLeverage: number, maxLeverage: number) {
    const newDepositMultiplier = amountBorrowed.mul(ROUND_CONSTANT).div(currentAmountBorrowed).toNumber() / ROUND_CONSTANT;
    const newLeverage = currentLeverage * newDepositMultiplier;

    const allowedLeverage = safeLeverage(maxLeverage);

    return newLeverage <= allowedLeverage;
}

export function calculateSafeLeverageAmount(currentAmountBorrowed: ethers.BigNumber, currentLeverage: number, maxLeverage: number) {
    //
}

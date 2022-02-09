import {ethers} from "ethers";
import {ROUND_CONSTANT} from "./parseNumber";

export const SAFE_PRICE_DROP_LEVERAGE_PERCENT = 0.4;
export const SAFE_PRICE_DROP_COLLATERAL_PERCENT = 5;

export function safeLeverage(maxLeverage: number) {
    return 100 / (100 / maxLeverage + SAFE_PRICE_DROP_LEVERAGE_PERCENT);
}

export function liquidatablePriceDropPercent(currentLeverage: number, maxLeverage: number) {
    return 100 / currentLeverage - 100 / maxLeverage;
}

export function isSafeLeverageAmount(
    amountBorrowed: ethers.BigNumber,
    currentAmountBorrowed: ethers.BigNumber,
    currentLeverage: number,
    maxLeverage: number,
    collateralPrice?: ethers.BigNumber
) {
    let newLeverage;
    if (currentAmountBorrowed.gt(0)) {
        const newDepositMultiplier = amountBorrowed.mul(ROUND_CONSTANT).div(currentAmountBorrowed).toNumber() / ROUND_CONSTANT;
        newLeverage = currentLeverage * (1 + newDepositMultiplier);
    } else {
        if (!collateralPrice) throw Error("Collateral price cannot be undefined");
        newLeverage = amountBorrowed.mul(ROUND_CONSTANT).div(collateralPrice).toNumber() / ROUND_CONSTANT;
    }

    const allowedLeverage = safeLeverage(maxLeverage);

    return newLeverage <= allowedLeverage;
}

export function safeMaxLeverageAmount(currentAmountBorrowed: ethers.BigNumber, currentLeverage: number, maxLeverage: number) {
    const allowedLeverage = safeLeverage(maxLeverage);

    const numerator = (allowedLeverage / currentLeverage - 1) * ROUND_CONSTANT;
    const denominator = ROUND_CONSTANT;

    // **** What do we do if there is no collateral borrowed ?

    return ethers.BigNumber.from(numerator).mul(currentAmountBorrowed).div(denominator);
}

export function safeCollateralPrice(minimumCollateralPrice: ethers.BigNumber) {
    return minimumCollateralPrice.mul(100).div(ethers.BigNumber.from(100).sub(SAFE_PRICE_DROP_COLLATERAL_PERCENT));
}

// **** The above does not consider cases where there is no current leverage...

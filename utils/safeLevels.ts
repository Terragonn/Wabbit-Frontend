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

export function isSafeLeveragePrice(
    priceToBorrow: ethers.BigNumber,
    currentPriceBorrowed: ethers.BigNumber,
    currentLeverage: number,
    maxLeverage: number,
    collateralPrice?: ethers.BigNumber
) {
    let newLeverage;
    if (currentPriceBorrowed.gt(0)) {
        const newDepositMultiplier = priceToBorrow.mul(ROUND_CONSTANT).div(currentPriceBorrowed).toNumber() / ROUND_CONSTANT;
        newLeverage = currentLeverage * (1 + newDepositMultiplier);
    } else {
        if (!collateralPrice) throw Error("Collateral price cannot be undefined");
        newLeverage = priceToBorrow.mul(ROUND_CONSTANT).div(collateralPrice).toNumber() / ROUND_CONSTANT;
    }

    const allowedLeverage = safeLeverage(maxLeverage);

    return newLeverage <= allowedLeverage;
}

export function safeMaxLeveragePrice(currentPriceBorrowed: ethers.BigNumber, currentLeverage: number, maxLeverage: number, collateralPrice?: ethers.BigNumber) {
    const allowedLeverage = safeLeverage(maxLeverage);

    if (currentPriceBorrowed.gt(0)) {
        const numerator = Math.floor((allowedLeverage / currentLeverage - 1) * ROUND_CONSTANT);
        const denominator = ROUND_CONSTANT;

        return ethers.BigNumber.from(numerator).mul(currentPriceBorrowed).div(denominator);
    } else {
        if (!collateralPrice) throw Error("Collateral price cannot be undefined");

        return collateralPrice.mul(Math.floor(allowedLeverage * ROUND_CONSTANT)).div(ROUND_CONSTANT);
    }
}

export function safeCollateralPrice(minimumCollateralPrice: ethers.BigNumber) {
    return minimumCollateralPrice.mul(100).div(ethers.BigNumber.from(100).sub(SAFE_PRICE_DROP_COLLATERAL_PERCENT));
}

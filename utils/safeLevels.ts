import {ethers} from "ethers";
import {ROUND_CONSTANT} from "./parseNumber";
import {Approved} from "./providers/useChainData";

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

export function safeMaxLeverageAmount(currentAmountBorrowed: ethers.BigNumber, currentLeverage: number, maxLeverage: number, collateralPriceAsAmount?: ethers.BigNumber) {
    const allowedLeverage = safeLeverage(maxLeverage);

    if (currentAmountBorrowed.gt(0)) {
        const numerator = (allowedLeverage / currentLeverage - 1) * ROUND_CONSTANT;
        const denominator = ROUND_CONSTANT;

        return ethers.BigNumber.from(numerator).mul(currentAmountBorrowed).div(denominator);
    } else {
        if (!collateralPriceAsAmount) throw Error("Collateral price cannot be undefined");

        return collateralPriceAsAmount.mul(Math.floor(allowedLeverage * ROUND_CONSTANT)).div(ROUND_CONSTANT);
    }
}

export function safeCollateralPrice(minimumCollateralPrice: ethers.BigNumber) {
    return minimumCollateralPrice.mul(100).div(ethers.BigNumber.from(100).sub(SAFE_PRICE_DROP_COLLATERAL_PERCENT));
}

// **** I believe there is either a couple of problems HERE or in the max function somewhere (Ill have to check the leverage function too)

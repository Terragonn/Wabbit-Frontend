export const SAFE_PRICE_DROP_PERCENT = 0.4;

export function safeLeverage(maxLeverage: number) {
    return 100 / (100 / maxLeverage + SAFE_PRICE_DROP_PERCENT);
}

export function liquidatablePriceDropPercent(currentLeverage: number, maxLeverage: number) {
    return 100 / currentLeverage - 100 / maxLeverage;
}

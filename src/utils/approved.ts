export default interface Approved {
    name: string;
    symbol: string;
    icon: string;
    address: string;
    whale: string;
    decimals: number;
    priceFeed: string;
    reservePriceFeed: string;
    marginLongCollateral: boolean;
    marginLongBorrow: boolean;
    leveragePool: boolean;
    oracle: boolean;
}

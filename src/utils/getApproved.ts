import config from "../config/config.json";

export interface Approved {
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

export default function getApproved(address: string) {
    const item = config.approved.filter((approved) => approved.address === address);
    if (item.length === 0) return undefined;
    return item[0];
}

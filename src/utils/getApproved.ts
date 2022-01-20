import {Approved, Config} from "./useChainData";

export default function getApproved(config: Config, address: string): Approved | undefined {
    address = address.toLowerCase();
    const item = config.approved.filter((approved) => approved.address === address);
    if (item.length === 0) return undefined;
    return item[0];
}

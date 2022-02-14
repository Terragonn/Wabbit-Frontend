import {Approved, Config} from "../providers/useChainData";

export default function getApproved(config: Config, address: string): Approved | undefined {
    const item = config.approved.filter((approved) => approved.address.toLowerCase() === address.toLowerCase());
    if (item.length === 0) return undefined;
    return item[0];
}

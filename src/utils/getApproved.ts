import config from "../config/config.json";

export default function getApproved(address: string) {
    const item = config.approved.filter((approved) => approved.address === address);
    if (item.length === 0) return undefined;
    return item[0];
}

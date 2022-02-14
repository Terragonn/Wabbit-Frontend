import {chainDataConfig} from "../providers/useChainData";

export default function sortedChainDataConfigEntries() {
    const sortable = Object.entries(chainDataConfig);
    sortable.sort((a, b) => b[1].priority - a[1].priority);
    return sortable;
}

import { useEffect, useState } from "react";
import { getTokenDataByAddress, Token } from "../../utils";

export function useDepositData(tokenAmount: { [key: string]: number }) {
    const [total, setTotal] = useState<string>("$ 0.00");
    const [breakdown, setBreakdown] = useState<[Token, string][]>(getBreakdown);

    function getBreakdown() {
        const pairs = Object.entries(tokenAmount);
        // **** I need to get the prices properly of course
        return pairs.map((pair) => [getTokenDataByAddress(pair[0]), "$ 0.00"] as [Token, string]);
    }

    useEffect(() => {
        // Update the total with the prices
    }, [tokenAmount]);

    useEffect(() => {
        // Update the breakdown with the prices
        getBreakdown();
    }, [tokenAmount]);

    return { total, breakdown };
}

import { useEffect, useState } from "react";
import { Token } from "../../utils";

export function useDepositData(tokenAmount: { [key: string]: number }) {
    const [] = useState<string>("$ 0.00");
    const [] = useState<[[Token, string]]>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    useEffect(() => {}, [tokenAmount]);
}

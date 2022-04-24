import { useState } from "react";

import { Token } from "../../utils";
import { Input } from "..";

export default function VaultInput({ token, account, vault, library }: { token: Token[]; account: string; vault: string; library: any }) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    return (
        <>
            {token.map((tkn, index) => (
                <Input key={index} token={tkn} account={account} vault={vault} library={library} />
            ))}
        </>
    );
}

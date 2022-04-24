import { useState } from "react";

import { Token } from "../../utils";
import { Input } from "..";

export default function VaultInput({ token, account, vault, library }: { token: Token[]; account: string; vault: string; library: any }) {
    const [tokenAmount, setTokenAmount] = useState<{ [key: string]: number }>(() => {
        const tmp: { [key: string]: number } = {};
        token.forEach((tkn) => (tmp[tkn.address] = 0));
        return tmp;
    });

    // **** I need to set up some sort of registry with this where we update everytime this happens - we also
    // need a way of making sure that the deposit button doesnt come up until we approve all

    return (
        <>
            {token.map((tkn, index) => (
                <Input key={index} token={tkn} account={account} vault={vault} library={library} />
            ))}
        </>
    );
}

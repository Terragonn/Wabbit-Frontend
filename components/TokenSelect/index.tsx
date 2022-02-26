import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {Contracts} from "../../providers/useContracts";

export default function TokenSelect({
    title,
    setToken,
    allowed,
    contracts,
}: {
    title: string;
    setToken: (token: Approved) => void;
    allowed: ("leveragePool" | "marginLongCollateral" | "marginLongBorrow")[];
    contracts: Contracts;
}) {
    const tokens = contracts.config.tokens.approved.filter(
        (approved) =>
            approved.oracle &&
            ((approved.leveragePool && allowed.includes("leveragePool")) ||
                (approved.marginLongCollateral && allowed.includes("marginLongCollateral")) ||
                (approved.marginLongBorrow && allowed.includes("marginLongBorrow")))
    );
    const [selectedToken, setSelectedToken] = useState<Approved>(tokens[0]);

    useEffect(() => {
        setSelectedToken(tokens[0]);
    }, [contracts]);

    useEffect(() => {
        setToken(selectedToken);
    }, [selectedToken]);

    return (
        <div>
            <h3 className="text-neutral-500 font-bold lg:text-center text-left text-2xl mb-4">{title}</h3>
            <div className="bg-neutral-900 rounded-3xl py-3 px-6 glow flex items-center justify-evenly w-full min-w-max space-x-2">
                <img src={selectedToken.icon} alt={selectedToken.symbol} width={35} className="rounded-xl" />
                <select
                    className="text-white font-bold bg-transparent border-transparent rounded-xl text-xl w-full"
                    onChange={(e) => setSelectedToken(tokens.filter((token) => token.address === e.target.value)[0])}
                >
                    {tokens.map((token, index) => (
                        <option key={index} className="font-bold bg-neutral-900" value={token.address} selected={token.address === selectedToken.address}>
                            {token.symbol}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

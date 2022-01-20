import {useEffect, useState} from "react";
import useChainData, {Approved, Config} from "../../utils/useChainData";

export default function TokenSelect({
    title,
    setToken,
    allowed,
}: {
    title: string;
    setToken: (token: Approved) => void;
    allowed: ("leveragePool" | "marginLongCollateral" | "marginLongBorrow")[];
}) {
    const {config} = useChainData();

    const getTokens = (config: Config) =>
        config.approved.filter(
            (approved) =>
                approved.oracle &&
                ((approved.leveragePool && allowed.includes("leveragePool")) ||
                    (approved.marginLongCollateral && allowed.includes("marginLongCollateral")) ||
                    (approved.marginLongBorrow && allowed.includes("marginLongBorrow")))
        );

    const [tokens, setTokens] = useState<Approved[]>(getTokens(config));
    const [selectedToken, setSelectedToken] = useState<Approved>(tokens[0]);

    useEffect(() => {
        const newTokens = getTokens(config);
        setTokens(newTokens);
        setSelectedToken(newTokens[0]);
    }, [config]);

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
                        <option key={index} className="font-bold bg-neutral-900" value={token.address}>
                            {token.symbol}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

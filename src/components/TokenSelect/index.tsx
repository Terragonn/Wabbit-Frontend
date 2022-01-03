import { useState } from "react";

export default function TokenSelect() {
    const tokens = [
        {
            symbol: "DAI",
            icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
            address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
        },
        {
            symbol: "wFTM",
            icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png",
            address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        },
    ];
    const [selectedToken, setSelectedToken] = useState<{ symbol: string; icon: string; address: string }>(tokens[0]);

    return (
        <div className="bg-neutral-900 rounded-3xl p-3 shadow-lg shadow-fuchsia-500/20 flex items-center justify-evenly">
            <img src={selectedToken.icon} alt={selectedToken.symbol} width={35} />
            <select className="text-white font-bold bg-transparent border-transparent rounded-xl text-xl">
                {tokens.map((token) => (
                    <option className="font-bold bg-neutral-900">{token.symbol}</option>
                ))}
            </select>
        </div>
    );
}

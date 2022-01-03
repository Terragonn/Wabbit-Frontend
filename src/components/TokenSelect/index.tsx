import { useState } from "react";

export default function TokenSelect({ title }: { title: string }) {
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
        <div>
            <h3 className="text-neutral-500 font-bold lg:text-center text-left text-2xl mb-4">{title}</h3>
            <div className="bg-neutral-900 rounded-3xl p-3 glow flex items-center justify-evenly w-full min-w-max space-x-2">
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

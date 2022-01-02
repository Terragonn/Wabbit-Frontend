export default function TableRow({
    name,
    symbol,
    icon,
    tvl,
    borrowed,
    stakeAPY,
    borrowAPY,
}: {
    name: string;
    symbol: string;
    icon: string;
    tvl: string;
    borrowed: string;
    stakeAPY: string;
    borrowAPY: string;
}) {
    return (
        <div className="bg-neutral-900 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white text-xl mb-8 shadow-md shadow-fuchsia-500">
            <span className="flex items-center justify-start w-1/5 space-x-3">
                <img src={icon} width={40} className="rounded-xl" />
                <span>{name}</span>
                <span className="text-neutral-500">({symbol})</span>
            </span>
            <span className="w-1/5">$ {tvl}</span>
            <span className="w-1/5">$ {borrowed}</span>
            <span className="w-1/5">{stakeAPY} %</span>
            <span className="w-1/5">{borrowAPY} %</span>
        </div>
    );
}

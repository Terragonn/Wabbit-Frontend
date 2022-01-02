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
        <div className="bg-neutral-900 rounded-xl flex items-center justify-evenly">
            <span className="flex items-center justify-evenly">
                <img src={icon} width={34} /> {name} {symbol}
            </span>
            <span>$ {tvl}</span>
            <span>$ {borrowed}</span>
            <span>{stakeAPY} %</span>
            <span>{borrowAPY} %</span>
        </div>
    );
}

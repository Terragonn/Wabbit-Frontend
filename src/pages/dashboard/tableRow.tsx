export default function TableRow({
    name,
    symbol,
    icon,
    tvl,
    borrowed,
    stakeAPY,
    yieldAPR,
    borrowAPY,
}: {
    name: string;
    symbol: string;
    icon: string;
    tvl: string;
    borrowed: string;
    stakeAPY: string;
    yieldAPR: string;
    borrowAPY: string;
}) {
    return (
        <div className="bg-neutral-900 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white text-xl mb-8 shadow-lg shadow-fuchsia-500/20">
            <span className="flex items-center justify-start w-1/5 space-x-3 font-medium">
                <img src={icon} width={40} className="rounded-xl" />
                <span>{name}</span>
                <span className="text-neutral-500">({symbol})</span>
            </span>
            <span className="w-1/5">$ {tvl}</span>
            <span className="w-1/5">$ {borrowed}</span>
            <div className="w-1/5">
                <span>{stakeAPY} %</span>
                <span className="flex items-center justify-evenly mt-2 w-3/5 mx-auto text-lg">
                    <img src={require("../../images/TOKEN.png")} width={28} />
                    <span>{yieldAPR} %</span>
                    <span className="text-neutral-400">APR</span>
                </span>
            </div>
            <span className="w-1/5">{borrowAPY} %</span>
        </div>
    );
}

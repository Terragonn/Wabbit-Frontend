export default function TableCard({
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
        <div className="bg-neutral-900 rounded-xl flex flex-col items-center justify-start py-9 px-10 text-center font-bold text-white text-xl mb-10 glow">
            <span className="flex items-center justify-start w-full space-x-3 font-medium">
                <img src={icon} width={40} className="rounded-xl" alt={name} />
                <span>{name}</span>
                <span className=" text-neutral-500">({symbol})</span>
            </span>
        </div>
    );
}

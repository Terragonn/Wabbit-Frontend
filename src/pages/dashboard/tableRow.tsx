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
        <div className="bg-neutral-900 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white lg:text-2xl text-lg mb-10 glow">
            <span className="flex items-center justify-start w-full space-x-5 font-medium text-xl">
                <img src={icon} width={40} className="rounded-xl" alt={name} />
                <div className="flex flex-col items-center justify-evenly">
                    <span>{name}</span>
                    <span className="text-neutral-500">({symbol})</span>
                </div>
            </span>
            <span className="w-full">$ {tvl}</span>
            <span className="w-full">$ {borrowed}</span>
            <div className="w-full">
                <span>{stakeAPY} %</span>
                <span className="flex items-center justify-evenly mt-2 w-3/5 mx-auto text-lg space-x-2">
                    <img src={require("../../images/TOKEN.png")} width={28} alt="Torque TAU" />
                    <span className="whitespace-nowrap">{yieldAPR} %</span>
                    <span className="text-neutral-400">APR</span>
                </span>
            </div>
            <span className="w-full">{borrowAPY} %</span>
        </div>
    );
}

export default function TableRow({
    name,
    symbol,
    icon,
    tvl,
    borrowed,
    available,
    stakeAPY,
    yieldAPR,
    borrowAPY,
}: {
    name: string;
    symbol: string;
    icon: string;
    tvl: string;
    borrowed: string;
    available: string;
    stakeAPY: string;
    yieldAPR: string;
    borrowAPY: string;
}) {
    return (
        <div className="bg-neutral-900 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white lg:text-2xl text-lg mb-10 glow">
            <span className="flex items-center lg:justify-start justify-center w-full space-x-5 font-medium lg:text-xl text-lg">
                <img src={icon} width={40} className="rounded-xl" alt={name} />
                <div className="flex flex-col items-center justify-evenly">
                    <span className="lg:block hidden">{name}</span>
                    <span className="lg:block hidden text-neutral-500">({symbol})</span>
                    <span className="lg:hidden block text-white">{symbol}</span>
                </div>
            </span>
            <span className="w-full lg:block hidden">$ {tvl}</span>
            <span className="w-full lg:block hidden">$ {borrowed}</span>
            <span className="w-full lg:hidden">$ {available}</span>
            <div className="w-full">
                <span>{stakeAPY} %</span>
                <span className="flex items-center justify-evenly lg:mt-2 w-3/5 mx-auto lg:text-lg text-sm space-x-2">
                    <img src={require("../../images/TOKEN.png")} width={28} alt="Torque TAU" />
                    <span className="whitespace-nowrap">{yieldAPR} %</span>
                    <span className="text-neutral-400">APR</span>
                </span>
            </div>
            <span className="w-full">{borrowAPY} %</span>
        </div>
    );
}

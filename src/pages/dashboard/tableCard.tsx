export default function TableCard({
    name,
    symbol,
    icon,
    tvl,
    borrowed,
    stakeAPY,
    borrowAPY,
    yieldAPR,
}: {
    name: string;
    symbol: string;
    icon: string;
    tvl: string;
    borrowed: string;
    stakeAPY: string;
    borrowAPY: string;
    yieldAPR: string;
}) {
    return (
        <div className="bg-neutral-900 rounded-xl flex flex-col items-center justify-start py-9 px-10 text-center text-white mb-10 glow">
            <span className="flex items-center justify-start w-full space-x-3 font-bold text-xl">
                <img src={icon} width={40} className="rounded-xl" alt={name} />
                <span>{name}</span>
                <span className=" text-neutral-500">({symbol})</span>
            </span>
            <div className="my-8 w-full space-y-2 text-lg font-medium">
                <div className="flex items-center justify-between text-neutral-400">
                    <span>TVL:</span>
                    <span className="whitespace-nowrap">$ {tvl}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                    <span>Borrowed:</span>
                    <span className="whitespace-nowrap">$ {borrowed}</span>
                </div>
            </div>
            <div className="w-full text-xl pb-5 border-b-2 border-b-neutral-800 border-opacity-30">
                <div className="flex items-center justify-between text-white font-bold">
                    <span>Stake APY</span>
                    <span>Borrow APY</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400 font-medium mt-2">
                    <span>{stakeAPY} %</span>
                    <span>{borrowAPY} %</span>
                </div>
            </div>
            <div className="w-full text-xl font-medium mt-6 flex items-center justify-between">
                <span>Yield APR:</span>
                <div className="flex items-center justify-center space-x-3">
                    <img src={require("../../images/TOKEN.png")} width={30} alt="Torque TAU" />
                    <span className="whitespace-nowrap">{yieldAPR} %</span>
                </div>
            </div>
        </div>
    );
}

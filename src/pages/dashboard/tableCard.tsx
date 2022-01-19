import {ethers} from "ethers";
import {useEffect, useState} from "react";
import getApproved from "../../utils/getApproved";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import useProtocolData from "../../utils/useProtocolData";

export default function TableCard({address}: {address: string}) {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        tvl: ethers.BigNumber;
        borrowed: ethers.BigNumber;
        stakeAPR: number;
        borrowAPR: number;
        yieldAPR: undefined;
    } | null>();

    const approved = getApproved(address);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const tvl = await protocolData.totalPriceLocked(address);
                const borrowed = await protocolData.totalBorrowed(address);
                const stakeAPR = await protocolData.stakeAPR(address);
                const borrowAPR = await protocolData.borrowAPR(address);
                const yieldAPR = undefined;
                setData({tvl, borrowed, stakeAPR, borrowAPR, yieldAPR});
            })();
        }
    }, [protocolData]);

    return (
        <div className="bg-neutral-900 rounded-xl flex flex-col items-center justify-start py-9 px-10 text-center text-white mb-10 glow">
            <span className="flex items-center justify-start w-full space-x-3 font-bold text-xl">
                <img src={approved?.icon} width={40} className="rounded-xl" alt={approved?.name} />
                <a href={`https://ftmscan.com/token/${approved?.address}`}>{approved?.name}</a>
                <span className=" text-neutral-500">({approved?.symbol})</span>
            </span>
            <div className="my-8 w-full space-y-2 text-lg font-medium">
                <div className="flex items-center justify-between text-neutral-400">
                    <span>TVL:</span>
                    <span className="whitespace-nowrap">$ {parseNumber(data?.tvl)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                    <span>Borrowed:</span>
                    <span className="whitespace-nowrap">$ {parseNumber(data?.borrowed)}</span>
                </div>
            </div>
            <div className="w-full text-xl pb-5 border-b-2 border-b-neutral-800 border-opacity-30">
                <div className="flex items-center justify-between text-white font-bold">
                    <span>Stake APR</span>
                    <span>Borrow APR</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400 font-medium mt-2">
                    <span>{parseNumberFloat(data?.stakeAPR)} %</span>
                    <span>{parseNumberFloat(data?.borrowAPR)} %</span>
                </div>
            </div>
            <div className="w-full text-xl font-medium mt-6 flex items-center justify-between">
                <span>Yield APR:</span>
                <div className="flex items-center justify-center space-x-3">
                    <img src={require("../../images/TOKEN.png")} width={30} alt="Torque TAU" />
                    <span className="whitespace-nowrap">{parseNumberFloat(data?.yieldAPR)} %</span>
                </div>
            </div>
        </div>
    );
}

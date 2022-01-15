import {ethers} from "ethers";
import {useEffect, useState} from "react";
import getApproved from "../../utils/getApproved";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";
import useProtocolData from "../../utils/useProtocolData";

export default function TableRow({address}: {address: string}) {
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
        <div className="bg-neutral-900 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white text-2xl mb-10 glow">
            <span className="flex items-center justify-start w-full space-x-5 font-medium text-xl">
                <img src={approved?.icon} width={40} className="rounded-xl" alt={approved?.name} />
                <div className="flex flex-col items-center justify-evenly">
                    <span>{approved?.name}</span>
                    <span className="text-neutral-500">({approved?.symbol})</span>
                </div>
            </span>
            <span className="w-full">$ {parseNumber(data?.tvl)}</span>
            <span className="w-full">$ {parseNumber(data?.borrowed)}</span>
            <div className="w-full">
                <span>{parseNumberFloat(data?.stakeAPR)} %</span>
                <span className="flex items-center justify-evenly mt-2 w-3/5 mx-auto text-lg space-x-2">
                    <img src={require("../../images/TOKEN.png")} width={28} alt="Torque TAU" />
                    <span className="whitespace-nowrap">{parseNumberFloat(data?.yieldAPR)} %</span>
                    <span className="text-neutral-400">APR</span>
                </span>
            </div>
            <span className="w-full">{parseNumberFloat(data?.borrowAPR)} %</span>
        </div>
    );
}

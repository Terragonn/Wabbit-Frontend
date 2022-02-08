import {ethers} from "ethers";
import {useEffect, useState} from "react";

import useProtocolData from "../../utils/providers/useProtocolData";
import {Approved} from "../../utils/providers/useChainData";

import parseError from "../../utils/parseError";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";

export default function TableRow({blockExplorer, approved}: {blockExplorer: string; approved: Approved}) {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        tvl: ethers.BigNumber | undefined;
        borrowed: ethers.BigNumber | undefined;
        provideLiquidityAPY: number | undefined;
        borrowAPR: number | undefined;
        yieldAPR: undefined | undefined;
    } | null>();

    useEffect(() => {
        if (!protocolData || !approved) setData(null);
        else {
            (async () => {
                const tvl = await parseError(async () => await protocolData.totalTokenPriceLocked(approved));
                const borrowed = await parseError(async () => await protocolData.totalTokenPriceBorrowed(approved));
                const provideLiquidityAPY = await parseError(async () => await protocolData.provideLiquidityAPY(approved));
                const borrowAPR = await parseError(async () => await protocolData.borrowAPR(approved));
                const yieldAPR = undefined;
                setData({tvl, borrowed, provideLiquidityAPY, borrowAPR, yieldAPR});
            })();
        }
    }, [protocolData]);

    return (
        <a href={`${blockExplorer}${approved?.address}`}>
            <div className="bg-neutral-900 bg-opacity-75 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white text-2xl mb-10 glow">
                <span className="flex items-center justify-start w-full space-x-5 font-medium text-xl">
                    <img src={approved?.icon} width={40} className="rounded-xl" alt={approved?.name} />
                    <div className="flex flex-col items-center">
                        <span>{approved?.name}</span>
                        <span className="text-neutral-500">({approved?.symbol})</span>
                    </div>
                </span>
                <span className="w-full">$ {parseNumber(data?.tvl)}</span>
                <span className="w-full">$ {parseNumber(data?.borrowed)}</span>
                <div className="w-full">
                    <span>{parseNumberFloat(data?.provideLiquidityAPY)} %</span>
                    <span className="flex items-center justify-evenly mt-2 w-3/5 mx-auto text-lg space-x-2">
                        <img src="https://i.imgur.com/NiLoSj7.png" width={28} alt="Torque TAU" />
                        <span className="whitespace-nowrap">{parseNumberFloat(data?.yieldAPR)} %</span>
                        <span className="text-neutral-400">APR</span>
                    </span>
                </div>
                <span className="w-full">{parseNumberFloat(data?.borrowAPR)} %</span>
            </div>
        </a>
    );
}

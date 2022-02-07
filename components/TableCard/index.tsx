import {ethers} from "ethers";
import {useEffect, useState} from "react";

import useProtocolData from "../../utils/providers/useProtocolData";
import {Approved, Config} from "../../utils/providers/useChainData";

import parseError from "../../utils/parseError";
import parseNumber, {parseNumberFloat} from "../../utils/parseNumber";

export default function TableCard({blockExplorer, config, approved}: {blockExplorer: string; config: Config; approved: Approved}) {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{
        tvl: ethers.BigNumber | undefined;
        borrowed: ethers.BigNumber | undefined;
        provideLiquidityAPY: number | undefined;
        borrowAPR: number | undefined;
        yieldAPR: undefined | undefined;
    } | null>();

    useEffect(() => {
        if (!protocolData) setData(null);
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
            <div className="bg-neutral-900 rounded-xl flex flex-col items-center py-9 px-10 text-center text-white mb-10 glow">
                <span className="flex items-center justify-start w-full space-x-3 font-bold text-xl">
                    <img src={approved?.icon} width={40} className="rounded-xl" alt={approved?.name} />
                    <span>{approved?.name}</span>
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
                        <span>Provide Liquidity APY</span>
                        <span>Borrow APR</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-400 font-medium mt-2">
                        <span>{parseNumberFloat(data?.provideLiquidityAPY)} %</span>
                        <span>{parseNumberFloat(data?.borrowAPR)} %</span>
                    </div>
                </div>
                <div className="w-full text-xl font-medium mt-6 flex items-center justify-between">
                    <span>Yield APR:</span>
                    <div className="flex items-center justify-center space-x-3">
                        <img src="https://i.imgur.com/NiLoSj7.png" width={30} alt="Torque TAU" />
                        <span className="whitespace-nowrap">{parseNumberFloat(data?.yieldAPR)} %</span>
                    </div>
                </div>
            </div>
        </a>
    );
}

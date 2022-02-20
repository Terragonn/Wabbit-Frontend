import {ethers} from "ethers";
import {useEffect, useState} from "react";

import useProtocolData from "../../providers/useProtocolData";
import {Approved} from "../../providers/useChainData";

import parseError from "../../utils/parseError";
import {parseNumberFloat, parseNumber} from "../../utils/parseNumber";

export default function TableRow({blockExplorer, token}: {blockExplorer: string; token: Approved}) {
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
                const tvl = await parseError(async () => await protocolData.totalTokenPriceLocked(token));
                const borrowed = await parseError(async () => await protocolData.totalTokenPriceBorrowed(token));
                const provideLiquidityAPY = await parseError(async () => await protocolData.provideLiquidityAPY(token));
                const borrowAPR = await parseError(async () => await protocolData.borrowAPR(token));
                const yieldAPR = undefined;
                setData({tvl, borrowed, provideLiquidityAPY, borrowAPR, yieldAPR});
            })();
        }
    }, [protocolData, token]);

    return (
        <a href={`${blockExplorer}token/${token.address}`}>
            <div className="bg-neutral-900 bg-opacity-75 rounded-xl flex items-center justify-evenly py-9 px-10 text-center font-bold text-white text-2xl mb-10 glow">
                <span className="flex items-center justify-start w-full space-x-5 font-medium text-xl">
                    <img src={token.icon} width={40} className="rounded-xl" alt={token.name} />
                    <div className="flex flex-col items-center">
                        <span>{token.name}</span>
                        <span className="text-neutral-500">({token.symbol})</span>
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

import { useEffect, useState } from "react";
import useContracts from "../../../utils/useContracts";
import parseBigNumber from "../../../utils/parseBigNumber";
import parseNumber from "../../../utils/parseNumber";

export interface AssetData {
    name: string;
    symbol: string;
    icon: string;
    address: string;
    whale: string;
    decimals: number;
}

interface Data {
    available: string;
    borrowed: string;
    tvl: string;
    apy: string;
}

function Row(props: { data: AssetData; last: boolean }) {
    const [data, setData] = useState<Data | null>(null);
    const [contracts, setContracts] = useContracts();

    useEffect(() => {
        // Get the contracts
        const pool = contracts?.pool;
        const oracle = contracts?.oracle;
        const margin = contracts?.margin;

        // Get the data
        (async () => {
            const tempData: Data = {} as any;
            tempData.available = parseBigNumber(await margin?.liquidityAvailable(props.data.address, pool?.address), props.data.decimals);
            tempData.borrowed = parseBigNumber(await margin?.totalBorrowed(props.data.address, pool?.address), props.data.decimals);
            tempData.tvl = parseBigNumber(await pool?.getLiquidity(props.data.address), props.data.decimals);
            if (parseInt(tempData.tvl) > 0) {
                tempData.apy = parseBigNumber(await margin?.calculateInterestRate(props.data.address, pool?.address), props.data.decimals);
            } else tempData.apy = parseNumber(0);
            // **** I'm going to have to do some wacky stuff with the period id for this - also I need to use the oracle to get the decimals

            setData(tempData);
        })();
    }, []);

    return (
        <tr className={`text-white font-normal text-lg ${!props.last ? "border-b-2" : ""} border-zinc-800 text-center`}>
            <td className="flex items-center px-4 py-3 my-5 mx-4 justify-start">
                <img className="rounded-md mx-1" src={props.data.icon} alt={props.data.symbol} width="32" />
                <span className="mx-1 sm:table-cell hidden">{props.data.name}</span>
                <span className="mx-1 sm:text-zinc-500 text-white">{props.data.symbol}</span>
            </td>

            {/* The following will need to be calculated and are currently just placeholders - also use the nice "billion" formats */}
            <td className="px-4 py-3 my-5 md:table-cell hidden">{data?.available}</td>
            <td className="px-4 py-3 my-5 md:table-cell hidden">{data?.borrowed}</td>
            <td className="px-4 py-3 my-5 md:table-cell hidden">{data?.tvl}</td>
            <td className="px-4 py-3 my-5">{data?.apy}%</td>
        </tr>
    );
}

export default Row;

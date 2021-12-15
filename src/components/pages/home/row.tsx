import { useEffect, useState } from "react";
import useContracts from "../../../utils/useContracts";
import parseNumber from "../../../utils/parseNumber";
import { ethers } from "ethers";

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
    const [contracts] = useContracts();

    useEffect(() => {
        // Get the contracts
        const pool = contracts?.pool;
        const oracle = contracts?.oracle;
        const margin = contracts?.margin;

        // Get the data
        (async () => {
            const tempData: Data = {} as any;

            const periodId = await pool?.currentPeriodId();

            tempData.available = parseNumber(await margin?.liquidityAvailable(props.data.address, pool?.address), props.data.decimals);
            tempData.borrowed = parseNumber(await margin?.totalBorrowed(props.data.address, pool?.address), props.data.decimals);
            tempData.tvl = parseNumber(await pool?.getLiquidity(props.data.address, periodId), props.data.decimals);

            try {
                const decimals = await oracle?.getDecimals();
                const interestRate = await margin?.calculateInterestRate(props.data.address, pool?.address);
                const apy = interestRate.mul(3.154e7);

                tempData.apy = parseNumber(apy, decimals.div(100).toNumber());
            } catch {
                tempData.apy = parseNumber("0", 0);
            }

            setData(tempData);
        })();
    }, [contracts]);

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

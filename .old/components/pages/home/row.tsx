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
    apr: string;
}

function Row(props: { data: AssetData; last: boolean }) {
    const [data, setData] = useState<Data | null>(null);
    const [contracts] = useContracts();

    useEffect(() => {
        // Get the contracts
        const margin = contracts?.margin;
        const oracle = contracts?.oracle;

        // Get the data
        (async () => {
            const tempData: Data = {} as any;

            const totalAvailable = await margin?.liquidityAvailable(props.data.address);
            tempData.available = parseNumber(totalAvailable, props.data.decimals);
            const totalBorrowed = await margin?.totalBorrowed(props.data.address);
            tempData.borrowed = parseNumber(totalBorrowed, props.data.decimals);

            tempData.tvl = parseNumber(totalAvailable.add(totalBorrowed), props.data.decimals);

            if (totalBorrowed.gt(0)) {
                const decimals = await oracle?.getDecimals();
                const interestRate = await margin?.calculateInterestRate(props.data.address);
                const apy = interestRate.mul(3.154e7);
                tempData.apr = parseNumber(apy, decimals.div(100));
            } else tempData.apr = parseNumber("0", 0);

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

            <td className="px-4 py-3 my-5 md:table-cell hidden">{data?.available}</td>
            <td className="px-4 py-3 my-5 md:table-cell hidden">{data?.borrowed}</td>
            <td className="px-4 py-3 my-5 md:table-cell hidden">{data?.tvl}</td>
            <td className="px-4 py-3 my-5">{data?.apr}%</td>
        </tr>
    );
}

export default Row;

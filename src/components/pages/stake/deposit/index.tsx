import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import useContracts from "../../../../utils/useContracts";
import parseBigNumber from "../../../../utils/parseBigNumber";
import { ethers } from "ethers";
import parseNumber from "../../../../utils/parseNumber";

interface Data {
    available: string;
    borrowed: string;
    tvl: string;
    apy: string;
}

function Deposit(props: {}) {
    const [amount, setAmount] = useState<number>(0);
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const [contracts] = useContracts();

    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        // Get the contracts
        const pool = contracts?.pool;
        const oracle = contracts?.oracle;
        const margin = contracts?.margin;

        // Get the data
        (async () => {
            const tempData: Data = {} as any;

            tempData.available = parseBigNumber(await margin?.liquidityAvailable(asset.address, pool?.address), asset.decimals);
            tempData.borrowed = parseBigNumber(await margin?.totalBorrowed(asset.address, pool?.address), asset.decimals);
            tempData.tvl = parseBigNumber(await pool?.getLiquidity(asset.address), asset.decimals);

            if (parseInt(tempData.tvl) > 0) {
                const decimals = await oracle?.getDecimals();
                const periodLength = await pool?.getPeriodLength();
                const interestRate = await margin?.calculateInterestRate(asset.address, pool?.address);

                const periodsPerYear = ethers.BigNumber.from(3.154e7).div(periodLength);
                const apy = interestRate.mul(periodsPerYear);

                tempData.apy = parseBigNumber(apy, decimals.div(100).toNumber());
            } else tempData.apy = parseNumber(0);

            setData(tempData);
        })();
    }, [contracts, asset]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Stake</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            {/* Update these with the actual values */}
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Liquidity: {data?.available}</h2>
                <h2>Borrowed: {data?.borrowed}</h2>
                <h2>TVL: {data?.tvl}</h2>
                <h2>APY: {data?.apy}%</h2>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Deposit {amount} {asset.symbol}
            </button>
        </div>
    );
}

export default Deposit;

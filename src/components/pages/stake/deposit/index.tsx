import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import useContracts from "../../../../utils/useContracts";
import { ethers } from "ethers";
import parseNumber from "../../../../utils/parseNumber";
import approveERC20 from "../../../../utils/approveERC20";
import loadERC20 from "../../../../utils/loadERC20";
import { useWeb3React } from "@web3-react/core";
import useError from "../../../../utils/useError";

interface Data {
    available: string;
    borrowed: string;
    tvl: string;
    apy: string;
}

function Deposit(props: {}) {
    const { library } = useWeb3React();

    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const [contracts] = useContracts();

    const [, setError] = useError();

    const [data, setData] = useState<Data | null>(null);

    async function deposit() {
        // Require a specified amount before depositing
        if (!amount.gt(0)) return;

        try {
            // Deposit the asset into the pool with the given period id
            const pool = contracts?.pool;
            const periodId = contracts?.periodId;

            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();
            const erc20 = loadERC20(asset.address, signer);
            await approveERC20(erc20, pool?.address as string);

            // Deposit into the current pool period
            await pool?.stake(asset.address, amount, periodId);
        } catch (e: any) {
            setError(e.data?.message || null);
        }
    }

    useEffect(() => {
        // Get the contracts
        const oracle = contracts?.oracle;
        const margin = contracts?.margin;

        // Get the data
        (async () => {
            const tempData: Data = {} as any;

            const totalAvailable = await margin?.liquidityAvailable(asset.address);
            tempData.available = parseNumber(totalAvailable, asset.decimals);
            const totalBorrowed = await margin?.totalBorrowed(asset.address);
            tempData.borrowed = parseNumber(totalBorrowed, asset.decimals);

            tempData.tvl = parseNumber(totalAvailable.add(totalBorrowed), asset.decimals);

            if (totalBorrowed.gt(0)) {
                const decimals = await oracle?.getDecimals();
                const interestRate = await margin?.calculateInterestRate(asset.address);
                const apy = interestRate.mul(3.154e7);

                tempData.apy = parseNumber(apy, decimals.div(100));
            } else tempData.apy = parseNumber("0", 0);

            setData(tempData);
        })();
    }, [contracts, asset]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Stake</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>
                    Liquidity: {data?.available} {asset.symbol}
                </h2>
                <h2>
                    Borrowed: {data?.borrowed} {asset.symbol}
                </h2>
                <h2>
                    TVL: {data?.tvl} {asset.symbol}
                </h2>
                <h2>APY: {data?.apy}%</h2>
            </div>
            <button
                className={`${amount.gt(0) ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-500 cursor-default"} p-3 rounded-md text-white font-medium`}
                onClick={deposit}
            >
                Deposit {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
        </div>
    );
}

export default Deposit;

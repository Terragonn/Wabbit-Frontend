import { useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import approvedAssets from "../../../../approved.json";

function Deposit(props: {}) {
    const [amount, setAmount] = useState<number>(0);
    const [asset, setAsset] = useState<AssetData>(approvedAssets[0]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Stake</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            {/* Update these with the actual values */}
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Liquidity: 2.6B</h2>
                <h2>Borrowed: 1.4B</h2>
                <h2>TVL: 4.0B</h2>
                <h2>APY: 23.05%</h2>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Deposit {amount} {asset.symbol}
            </button>
        </div>
    );
}

export default Deposit;

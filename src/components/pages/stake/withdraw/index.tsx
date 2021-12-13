import { useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import approvedAssets from "../../../../approved.json";

function Withdraw(props: {}) {
    const [amount, setAmount] = useState<number>(0);
    const [asset, setAsset] = useState<AssetData>(approvedAssets[0]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Withdraw</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            {/* Update these with the actual values */}
            <div className="grid grid-cols-1 gap-6 mx-5 text-base text-white mb-4">
                <h2>Initial stake: 3.0</h2>
                <h2>Current stake value: 4.0</h2>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Withdraw {amount} {asset.symbol}
            </button>
        </div>
    );
}

export default Withdraw;

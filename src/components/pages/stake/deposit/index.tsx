import { useState } from "react";
import AssetPanel from "../../assetPanel";
import { AssetData } from "../../home/row";
import approvedAssets from "../../../../approved.json";

function Deposit(props: {}) {
    const [amount, setAmount] = useState<number>(0);
    const [asset, setAsset] = useState<AssetData>(approvedAssets[0]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Deposit</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Deposit {amount} {asset?.symbol}
            </button>
        </div>
    );
}

export default Deposit;

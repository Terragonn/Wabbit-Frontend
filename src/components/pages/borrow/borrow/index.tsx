import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import { ethers } from "ethers";

function Borrow(props: { setBorrowed: (asset: AssetData) => void }) {
    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    useEffect(() => {
        props.setBorrowed(asset);
    }, [asset]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Borrow Against Collateral</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            {/* Update these with the actual values */}
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Debt: 3.6K</h2>
                <h2>Interest: 23.05%</h2>
                <h2>Margin level: 999.0</h2>
                <h2>Min borrow period: 1d</h2>
                <h2>Available: 2.6B</h2>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Borrow {amount} {asset.symbol}
            </button>
        </div>
    );
}

export default Borrow;

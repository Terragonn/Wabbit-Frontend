import { useState } from "react";
import approvedAssets from "../../../approved.json";
import { AssetData } from "../home/row";

function AssetPanel(props: { onChangeAsset: (asset: AssetData) => void; onChangeAmount: (amount: number) => void }) {
    const [asset, setCurrentAsset] = useState<AssetData>(approvedAssets[0]);

    return (
        <div className="flex items-center justify-evenly text-gray-500 text-lg font-medium">
            <img src={asset.icon} alt={asset.symbol} width={32} className="mr-4 rounded-md" />
            <select
                className="py-1 pl-2 pr-7 border-transparent bg-transparent rounded-md w-5/12"
                onChange={(e) => {
                    const asset = approvedAssets.filter((_asset) => _asset.address === e.target.value)[0];
                    props.onChangeAsset(asset);
                    setCurrentAsset(asset);
                }}
            >
                {approvedAssets.map((asset) => {
                    return <option value={asset.address}>{asset.symbol}</option>;
                })}
            </select>
            <input
                type="number"
                min={0}
                placeholder="0.00"
                step="0.01"
                className="w-full text-center bg-transparent border-transparent rounded-md"
                onChange={(e) => props.onChangeAmount(e.target.valueAsNumber)}
            />
        </div>
    );
}

export default AssetPanel;

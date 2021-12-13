import { useEffect, useState } from "react";
import config from "../../config/config.json";
import { AssetData } from "../pages/home/row";

function AssetPanel(props: { onChangeAsset: (asset: AssetData) => void; onChangeAmount: (amount: number) => void }) {
    const [asset, setCurrentAsset] = useState<AssetData>(config.approved[0]);
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        props.onChangeAsset(asset);
    }, [asset]);

    useEffect(() => {
        props.onChangeAmount(amount);
    }, [amount]);

    return (
        <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col text-gray-500 text-lg font-medium p-5">
            <div className="w-auto flex items-center justify-between sm:mb-0 mb-3 mr-8">
                <img src={asset.icon} alt={asset.symbol} width={32} className="mr-4 rounded-md" />
                <select
                    className="py-1 pl-2 pr-7 border-transparent bg-transparent rounded-md"
                    onChange={(e) => {
                        const asset = config.approved.filter((_asset) => _asset.address === e.target.value)[0];
                        setCurrentAsset(asset);
                    }}
                >
                    {config.approved.map((asset, index) => {
                        return (
                            <option key={index} value={asset.address}>
                                {asset.symbol}
                            </option>
                        );
                    })}
                </select>
            </div>
            <input
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="w-full text-center bg-zinc-700 bg-opacity-10 border-transparent rounded-md"
                onChange={(e) => setAmount(e.target.valueAsNumber || 0)}
            />
        </div>
    );
}

export default AssetPanel;

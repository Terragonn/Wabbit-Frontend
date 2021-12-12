import approvedAssets from "../../../approved.json";

function AssetPanel(props: { onChangeAsset: (asset: string) => void; onChangeAmount: (amount: number) => void }) {
    return (
        <div>
            <select>
                {approvedAssets.map((asset) => {
                    return (
                        <option className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                            {asset.symbol}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default AssetPanel;

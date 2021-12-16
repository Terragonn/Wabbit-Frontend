import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import { ethers } from "ethers";
import parseNumber from "../../../../utils/parseNumber";
import useContracts from "../../../../utils/useContracts";

interface Data {}

function Deposit(props: { setCollateral: (asset: AssetData) => void }) {
    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const [contracts] = useContracts();

    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        props.setCollateral(asset);
    }, [asset]);

    useEffect(() => {}, [contracts]);

    // **** Todo I need to add the data back to the thing and possibly add some more getters for example to get the remaining period time left and the margin balance and the collateral

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Collateral</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Collateral: 200.0</h2>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium mb-2">
                Deposit {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
            <button className="bg-zinc-500 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Withdraw {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
        </div>
    );
}

export default Deposit;

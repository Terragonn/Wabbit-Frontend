import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import { ethers } from "ethers";
import parseNumber from "../../../../utils/parseNumber";
import useContracts from "../../../../utils/useContracts";
import { useWeb3React } from "@web3-react/core";

interface Data {
    collateral: string;
}

function Deposit(props: { borrowed: AssetData; setCollateral: (asset: AssetData) => void }) {
    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const { library } = useWeb3React();

    const [contracts] = useContracts();

    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        props.setCollateral(asset);
    }, [asset]);

    useEffect(() => {
        const margin = contracts?.margin;
        const periodId = contracts?.periodId;

        (async () => {
            const tempData: Data = {} as any;

            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();

            const collateral = await margin?.collateralOf(signerAddress, asset.address, props.borrowed.address, periodId);
            tempData.collateral = parseNumber(collateral, asset.decimals);

            setData(tempData);
        })();
    }, [contracts]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Collateral</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Collateral: {data?.collateral}</h2>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-md text-white font-medium mb-3">
                Deposit {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
            <button className="bg-zinc-500 hover:bg-indigo-700 p-3 rounded-md text-white font-medium">
                Withdraw {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
        </div>
    );
}

export default Deposit;

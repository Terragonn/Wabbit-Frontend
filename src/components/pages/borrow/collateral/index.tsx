import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import { ethers } from "ethers";
import parseNumber from "../../../../utils/parseNumber";
import useContracts from "../../../../utils/useContracts";
import { useWeb3React } from "@web3-react/core";
import loadERC20 from "../../../../utils/loadERC20";
import approveERC20 from "../../../../utils/approveERC20";
import useError from "../../../../utils/useError";

interface Data {
    collateral: string;
}

function Deposit(props: { borrowed: AssetData; setCollateral: (asset: AssetData) => void }) {
    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const { library } = useWeb3React();

    const [contracts] = useContracts();

    const [, setError] = useError();

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

            tempData.collateral = parseNumber(await margin?.collateralOf(signerAddress, asset.address, props.borrowed.address, periodId), asset.decimals);

            setData(tempData);
        })();
    }, [contracts]);

    async function deposit() {
        // Require a specific amount before depositing
        if (!amount.gt(0)) return;

        try {
            // Deposit the asset into the pool with the given period id
            const margin = contracts?.margin;

            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();
            const erc20 = loadERC20(asset.address, signer);
            await approveERC20(erc20, margin?.address as string);

            // Deposit into the current pool period
            await margin?.deposit(asset.address, props.borrowed.address, amount);
        } catch (e: any) {
            setError(e.data?.message || null);
        }
    }

    async function withdraw() {
        // Require a specific amount before withdrawing
        if (!amount.gt(0)) return;

        try {
            // Deposit the asset into the pool with the given period id
            const margin = contracts?.margin;
            const periodId = contracts?.periodId;

            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();
            const erc20 = loadERC20(asset.address, signer);
            await approveERC20(erc20, margin?.address as string);

            // Deposit into the current pool period
            await margin?.withdraw(asset.address, props.borrowed.address, amount, periodId);
        } catch (e: any) {
            setError(e.data?.message || null);
        }
    }

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Collateral</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                <h2>Collateral: {data?.collateral}</h2>
            </div>
            <button
                className={`${amount.gt(0) ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-500 cursor-default"} p-3 rounded-md text-white font-medium mb-3`}
                onClick={deposit}
            >
                Deposit {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
            <button
                className={`${amount.gt(0) ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-500 cursor-default"} p-3 rounded-md text-white font-medium`}
                onClick={withdraw}
            >
                Withdraw {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
        </div>
    );
}

export default Deposit;

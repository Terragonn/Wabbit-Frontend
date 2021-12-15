import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import config from "../../config/config.json";
import loadERC20 from "../../utils/loadERC20";
import { AssetData } from "../pages/home/row";

function AssetPanel(props: { onChangeAsset: (asset: AssetData) => void; onChangeAmount: (amount: ethers.BigNumber) => void }) {
    const { library } = useWeb3React();

    const [asset, setCurrentAsset] = useState<AssetData>(config.approved[0]);
    const [amount, setAmount] = useState<number>(0);

    const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

    const ROUND_CONSTANT = 1e3;

    useEffect(() => {
        props.onChangeAsset(asset);
    }, [asset]);

    useEffect(() => {
        const asBigNumber = ethers.BigNumber.from(Math.floor(amount * ROUND_CONSTANT))
            .mul(ethers.BigNumber.from(10).pow(asset.decimals))
            .div(ROUND_CONSTANT);
        props.onChangeAmount(asBigNumber);
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
            <div className="w-full flex items-center justify-between sm:mb-0 mb-3 mr-8">
                <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    value={maxAmount?.toString()}
                    className="w-full text-center bg-zinc-700 bg-opacity-10 border-transparent rounded-md"
                    onChange={(e) => {
                        setAmount(e.target.valueAsNumber || 0);
                        setMaxAmount(undefined);
                    }}
                />
                <button
                    className="ml-4"
                    onClick={async () => {
                        // Get the max amount of the asset
                        const provider = new ethers.providers.Web3Provider(library.provider);
                        const signer = provider.getSigner();
                        const signerAddress = await signer.getAddress();

                        const erc20 = loadERC20(asset.address, signer);
                        const balance =
                            (await erc20.balanceOf(signerAddress)).mul(ROUND_CONSTANT).div(ethers.BigNumber.from(10).pow(asset.decimals)).toNumber() / ROUND_CONSTANT;
                        // **** I want to fix this to just use the decimals thing, and then fix the decimals thing to include an extra decimal point (all standardized)
                        // **** Then im going to use the period id for everything so that it is adjustable

                        setAmount(balance);
                        setMaxAmount(balance);
                    }}
                >
                    Max
                </button>
            </div>
        </div>
    );
}

export default AssetPanel;

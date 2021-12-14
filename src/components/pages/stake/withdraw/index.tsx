import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import { ethers } from "ethers";
import useContracts from "../../../../utils/useContracts";
import { useWeb3React } from "@web3-react/core";
import parseNumber from "../../../../utils/parseNumber";

interface Data {
    initialStake: string;
    currentStakeValue: string;
}

function Withdraw(props: {}) {
    const { library } = useWeb3React();

    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const [contracts] = useContracts();

    const [data, setData] = useState<Data | null>(null);

    async function withdraw() {}

    useEffect(() => {
        const pool = contracts?.pool;

        (async () => {
            const tempData: Data = {} as any;

            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();

            const periodId = await pool?.currentPeriodId();

            // Calculate initial stake
            const balCurrent = await pool?.balanceOf(signerAddress, asset.address, periodId);
            const balNext = await pool?.balanceOf(signerAddress, asset.address, periodId.add(1));
            tempData.initialStake = parseNumber(balCurrent.add(balNext).toString(), asset.decimals);

            // Calculate initial stake value
            try {
                const valueCurrent = await pool?.redeemValue(asset.address, periodId, balCurrent);
                const valueNext = await pool?.redeemValue(asset.address, periodId.add(1), balNext);
                tempData.currentStakeValue = parseNumber(valueCurrent.add(valueNext), asset.decimals);
            } catch {
                tempData.currentStakeValue = parseNumber("0", 0);
            }

            setData(tempData);
        })();
    }, [contracts, asset]);

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Withdraw</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            {/* Update these with the actual values */}
            <div className="grid grid-cols-1 gap-6 mx-5 text-base text-white mb-4">
                <h2>Initial stake: {data?.initialStake}</h2>
                <h2>Current stake value: {data?.currentStakeValue}</h2>
            </div>
            <button className={`${amount.gt(0) ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-500"} p-3 rounded-md text-white font-medium`} onClick={withdraw}>
                Withdraw {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
        </div>
    );
}

export default Withdraw;

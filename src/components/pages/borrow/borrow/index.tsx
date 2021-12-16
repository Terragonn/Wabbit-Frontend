import { useEffect, useState } from "react";
import AssetPanel from "../../../assetPanel";
import { AssetData } from "../../home/row";
import config from "../../../../config/config.json";
import { ethers } from "ethers";
import parseNumber from "../../../../utils/parseNumber";
import useContracts from "../../../../utils/useContracts";
import useError from "../../../../utils/useError";
import { useWeb3React } from "@web3-react/core";
import parseTime from "../../../../utils/parseTime";

interface Data {
    debt: string;
    interest: string;
    marginLevel: string;
    minBorrowPeriod: string;
    available: string;
    marginBalance: string;
}

function Borrow(props: { collateral: AssetData; setBorrowed: (asset: AssetData) => void }) {
    const { library } = useWeb3React();

    const [amount, setAmount] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));
    const [asset, setAsset] = useState<AssetData>(config.approved[0]);

    const [contracts] = useContracts();

    const [, setError] = useError();

    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        props.setBorrowed(asset);
    }, [asset]);

    useEffect(() => {
        const margin = contracts?.margin;
        const oracle = contracts?.oracle;
        const periodId = contracts?.periodId;

        (async () => {
            const tempData: Data = {} as any;

            const oracleDecimals = await oracle?.getDecimals();

            const provider = new ethers.providers.Web3Provider(library.provider);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();

            tempData.debt = parseNumber(await margin?.debtOf(signerAddress, props.collateral.address, asset.address, periodId), asset.decimals);

            const totalBorrowed = await margin?.totalBorrowed(asset.address);
            if (totalBorrowed.gt(0)) {
                const decimals = await oracle?.getDecimals();
                const interestRate = await margin?.calculateInterestRate(asset.address);
                const apy = interestRate.mul(3.154e7); // **** Perhaps dont make it APY and instead make it over the period length ?

                tempData.interest = parseNumber(apy, decimals.div(100).toNumber());
            } else tempData.interest = parseNumber("0", 0);

            tempData.marginLevel = parseNumber(await margin?.getMarginLevel(signerAddress, props.collateral.address, asset.address), oracleDecimals);

            const lastBorrowTime = await margin?.borrowTime(signerAddress, props.collateral.address, asset.address, periodId);
            const minBorrowLength = await margin?.getMinBorrowLength();
            tempData.minBorrowPeriod = parseTime(lastBorrowTime.add(minBorrowLength));

            tempData.available = parseNumber(await margin?.liquidityAvailable(asset.address), asset.decimals);
            if (totalBorrowed.gt(0))
                tempData.marginBalance = parseNumber(
                    await margin?.balanceOf(signerAddress, props.collateral.address, asset.address, periodId),
                    props.collateral.decimals
                );
            else
                tempData.marginBalance = parseNumber(
                    await margin?.collateralOf(signerAddress, props.collateral.address, asset.address, periodId),
                    props.collateral.decimals
                );

            setData(tempData);
        })();
    }, [contracts]);

    async function borrow() {}

    async function repay() {}

    return (
        <div className="flex flex-col justify-center items-stretch">
            <h1 className="text-white text-lg font-medium mx-5">Borrow</h1>
            <AssetPanel onChangeAsset={setAsset} onChangeAmount={setAmount} />
            <div className="grid grid-cols-2 gap-6 mx-5 text-base text-white mb-4">
                {/* **** Perhaps in here and in the other parts add in the symbol of the token being referenced ? */}
                <h2>Debt: {data?.debt}</h2>
                <h2>Interest: {data?.interest}%</h2>
                <h2>Margin level: {data?.marginLevel}</h2>
                <h2>Min borrow period: {data?.minBorrowPeriod}</h2>
                <h2>Available: {data?.available}</h2>
                <h2>Margin balance: {data?.marginBalance}</h2>
            </div>
            <button
                className={`${amount.gt(0) ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-500 cursor-default"} p-3 rounded-md text-white font-medium mb-3`}
                onClick={borrow}
            >
                Borrow {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
            <button
                className={`${amount.gt(0) ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-500 cursor-default"} p-3 rounded-md text-white font-medium`}
                onClick={repay}
            >
                Repay {parseNumber(amount, asset.decimals)} {asset.symbol}
            </button>
        </div>
    );
}

export default Borrow;

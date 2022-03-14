import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {ProtocolData} from "../../providers/useProtocolData";

import Banner from "../../components/Banner";
import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function HeaderBanner({token, protocolData}: {token: Approved; protocolData: ProtocolData}) {
    const [data, setData] = useState<{
        totalCollateralAmount: ethers.BigNumber | undefined;
        totalCollateralValue: ethers.BigNumber | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const totalCollateralAmount = await parseError(async () => await protocolData.totalTokenAmountCollateral(token));
            const totalCollateralValue = await parseError(async () => await protocolData.totalCollateralPrice());

            setData({totalCollateralAmount, totalCollateralValue});
        })();
    }, [token, protocolData]);

    return (
        <Banner
            placeholders={[
                {
                    title: "Total Collateral Value",
                    body: "$ " + parseNumber(data?.totalCollateralValue),
                },
                {
                    title: "Total Collateral Amount",
                    body: parseNumber(data?.totalCollateralAmount) + " " + token.symbol,
                },
            ]}
        />
    );
}

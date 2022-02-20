import {ethers} from "ethers";
import {useEffect, useState} from "react";

import {Approved} from "../../providers/useChainData";
import {ProtocolData} from "../../providers/useProtocolData";

import Banner from "../../components/Banner";
import displayString from "../../utils/displayString";
import parseError from "../../utils/parseError";
import {parseNumber, parseNumberFloat} from "../../utils/parseNumber";

export default function HeaderBanner({token, protocolData}: {token: Approved; protocolData: ProtocolData}) {
    const [data, setData] = useState<{
        borrowAPR: number | undefined;
        liquidity: ethers.BigNumber | undefined;
        totalCollateralValue: ethers.BigNumber | undefined;
    } | null>(null);

    useEffect(() => {
        (async () => {
            const borrowAPR = await parseError(async () => await protocolData.borrowAPR(token));
            const liquidity = await parseError(async () => await protocolData.totalTokenAmountLiquidity(token));
            const totalCollateralValue = await parseError(async () => await protocolData.totalCollateralPrice());

            setData({borrowAPR, liquidity, totalCollateralValue});
        })();
    }, [token, protocolData]);

    return (
        <div className="lg:block hidden">
            <Banner
                placeholders={[
                    {title: "Borrow APR", body: parseNumberFloat(data?.borrowAPR) + " %"},
                    {title: "Liquidity Available", body: parseNumber(data?.liquidity) + " " + displayString(token?.symbol)},
                    {title: "Total Collateral Value", body: "$ " + parseNumber(data?.totalCollateralValue)},
                ]}
            />
        </div>
    );
}

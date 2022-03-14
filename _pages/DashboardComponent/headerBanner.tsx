import {ethers} from "ethers";
import {useEffect, useState} from "react";

import useProtocolData from "../../providers/useProtocolData";

import Banner from "../../components/Banner";
import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function HeaderBanner() {
    const protocolData = useProtocolData();

    const [data, setData] = useState<{tvl: ethers.BigNumber | undefined; borrowed: ethers.BigNumber | undefined} | null>(null);

    useEffect(() => {
        if (!protocolData) setData(null);
        else {
            (async () => {
                const tvl = await parseError(async () => await protocolData.totalPoolPrice());
                const borrowed = await parseError(async () => await protocolData.totalBorrowedPrice());
                setData({tvl, borrowed});
            })();
        }
    }, [protocolData]);

    return (
        <Banner
            placeholders={[
                {title: "Total Value Locked", body: "$ " + parseNumber(data?.tvl)},
                {title: "Total Value Borrowed", body: "$ " + parseNumber(data?.borrowed)},
            ]}
        />
    );
}

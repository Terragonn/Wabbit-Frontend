import {useEffect, useState} from "react";
import {Approved} from "../../providers/useChainData";
import useContracts from "../../providers/useContracts";
import Information from "./information";

export default function WrapComponent() {
    const contracts = useContracts();

    const [tokenData, setTokenData] = useState<{nativeCoin: Approved; wrappedCoin: Approved} | null>(null);

    useEffect(() => {
        if (!contracts) setTokenData(null);
        else {
            const nativeCoin = contracts.config.nativeCoin;
            const wrappedCoin = contracts.config.wrappedCoin;

            setTokenData({nativeCoin, wrappedCoin});
        }
    }, [contracts]);

    return <>{tokenData ? <Information nativeSymbol={tokenData.nativeCoin.symbol} wrappedSymbol={tokenData.wrappedCoin.symbol} /> : null}</>;
}

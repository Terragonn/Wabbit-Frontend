import {useEffect, useState} from "react";
import {ethers} from "ethers";

import {ProtocolData} from "../../providers/useProtocolData";

import parseError from "../../utils/parseError";
import {parseNumberFloat} from "../../utils/parseNumber";

export default function Information({protocolData}: {protocolData: ProtocolData}) {
    const [maxLeverage, setMaxLeverage] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const _maxLeverage = await parseError(async () => await protocolData.maxLeverage());

            setMaxLeverage(_maxLeverage);
        })();
    }, [protocolData]);

    return (
        <div className="mb-16">
            <h3 className="text-neutral-300 font-bold text-left text-2xl mb-4">Why Leverage?</h3>
            <p className="text-neutral-400 font-medium text-lg mb-4">
                Using our liquidity, you can <span className="font-bold text-neutral-300">trade or invest</span> up to{" "}
                <span className="font-bold text-neutral-300">{parseNumberFloat(maxLeverage)}x</span> against your collateral and have the of the profits distributed back
                to you.
            </p>
            <p className="text-neutral-400 font-medium text-lg mb-4">
                If the <span className="font-bold text-neutral-300">losses incurred</span> from your leveraged position{" "}
                <span className="font-bold text-neutral-300">near the price of your collateral</span>, your account will be{" "}
                <span className="font-bold text-neutral-300">liquidated</span>. Prevent this from happening!
            </p>
        </div>
    );
}

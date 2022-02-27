import {BigNumber, ethers} from "ethers";
import {useEffect, useState} from "react";

import {ProtocolData} from "../../providers/useProtocolData";

import parseError from "../../utils/parseError";
import {parseNumber} from "../../utils/parseNumber";

export default function Information({protocolData}: {protocolData: ProtocolData}) {
    const [minCollateralPrice, setMinCollateralPrice] = useState<BigNumber | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const _minCollateralPrice = await parseError(async () => await protocolData.minCollateralPrice());

            setMinCollateralPrice(_minCollateralPrice);
        })();
    }, [protocolData]);

    return (
        <div className="mb-16">
            <h3 className="text-neutral-300 font-bold text-left text-2xl mb-4">Why Collateral?</h3>
            <p className="text-neutral-400 font-medium text-lg mb-4">
                Collateral is needed in order to <span className="font-bold text-neutral-300">open a leveraged position</span>. In the event that your leveraged position
                decreases, your collateral will be used to repay your losses.
            </p>
            <p className="text-neutral-400 font-medium text-lg mb-4">
                A minimum of <span className="font-bold text-neutral-300">$ {parseNumber(minCollateralPrice)}</span> is required to open and maintain a leveraged
                position, however we recommend you deposit more to avoid your account being reset prematurely.
            </p>
        </div>
    );
}

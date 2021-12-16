import Borrow from "./borrow";
import Deposit from "./collateral";

import { AssetData } from "../home/row";
import config from "../../../config/config.json";
import { useState } from "react";

function BorrowPage(props: {}) {
    const [collateral, setCollateral] = useState<AssetData>(config.approved[0]);
    const [borrowed, setBorrowed] = useState<AssetData>(config.approved[0]);

    return (
        <div className="flex lg:items-start items-center justify-between lg:flex-row flex-col text-base text-white mb-4">
            <div className="w-full lg:mx-5 lg:my-0 mb-10">
                <Deposit setCollateral={setCollateral} />
            </div>
            <div className="w-full lg:mx-5 lg:my-0 mb-10">
                <Borrow setBorrowed={setBorrowed} />
            </div>
        </div>
    );
}

export default BorrowPage;

import Borrow from "./borrow";
import Deposit from "./deposit";
import Repay from "./repay";
import Withdraw from "./withdraw";

import { AssetData } from "../home/row";
import config from "../../../config/config.json";
import { useState } from "react";

function BorrowPage(props: {}) {
    const [collateral, setCollateral] = useState<AssetData>(config.approved[0]);
    const [borrowed, setBorrowed] = useState<AssetData>(config.approved[0]);

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mx-5 text-base text-white mb-4">
            <Deposit setCollateral={setCollateral} />
            <Repay />
            <Borrow setBorrowed={setBorrowed} />
            <Withdraw />
        </div>
    );
}

export default BorrowPage;

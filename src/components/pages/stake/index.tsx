import Deposit from "./deposit";
import Withdraw from "./withdraw";

function Stake() {
    return (
        <div className="flex items-stretch justify-between">
            {/* **** Also add in whether or not the period epilogue is present */}
            <div className="w-full mx-5">
                <Deposit />
            </div>
            <div className="w-full mx-5">
                <Withdraw />
            </div>
        </div>
    );
}

export default Stake;

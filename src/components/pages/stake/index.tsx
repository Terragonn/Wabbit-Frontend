import Deposit from "./deposit";
import Withdraw from "./withdraw";

function Stake() {
    return (
        <div>
            {/* **** Also add in whether or not the period epilogue is present */}
            <Deposit />
            <div className="my-16" />
            <Withdraw />
        </div>
    );
}

export default Stake;

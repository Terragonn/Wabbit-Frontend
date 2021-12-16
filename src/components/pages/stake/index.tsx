import Deposit from "./deposit";
import Withdraw from "./withdraw";

function Stake() {
    return (
        <div className="flex lg:items-start items-center justify-between lg:flex-row flex-col">
            <div className="w-full lg:mx-5 lg:my-0 mb-10">
                <Deposit />
            </div>
            <div className="w-full lg:mx-5">
                <Withdraw />
            </div>
        </div>
    );
}

export default Stake;

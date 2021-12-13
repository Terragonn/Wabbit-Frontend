import Deposit from "./deposit";
import Withdraw from "./withdraw";

function Stake() {
    return (
        <div className="flex items-stretch justify-between lg:flex-row flex-col">
            {/* **** Also add in whether or not the period epilogue is present */}
            <div className="w-full lg:mx-5 lg:my-0 mb-10">
                <Deposit />
            </div>
            <div className="p-0.25 border-2 border-zinc-800 lg:visible invisible" />
            <div className="w-full lg:mx-5">
                <Withdraw />
            </div>
        </div>
    );
}

export default Stake;

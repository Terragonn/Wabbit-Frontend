import Borrow from "./borrow";
import Deposit from "./deposit";
import Repay from "./repay";

function BorrowPage(props: {}) {
    return (
        <div className="flex items-stretch justify-between lg:flex-row flex-col">
            {/* **** Do some sort of grid layout with aside */}
            <div className="w-full lg:mx-5 lg:my-0 mb-10">
                <Borrow />
            </div>
            <div className="w-full lg:mx-5">
                <Deposit />
            </div>
            <div className="w-full lg:mx-5">
                <Repay />
            </div>
        </div>
    );
}

export default BorrowPage;

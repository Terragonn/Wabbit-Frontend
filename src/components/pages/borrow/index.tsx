import Borrow from "./borrow";
import Deposit from "./deposit";
import Repay from "./repay";

function BorrowPage(props: {}) {
    return (
        <div className="flex items-start justify-between lg:flex-row flex-col">
            <div className="flex items-center justify-between flex-col">
                <div className="w-full lg:mx-5 lg:my-0 pb-12">
                    <Deposit />
                </div>
                <div className="w-full lg:mx-5 lg:my-0">
                    <Borrow />
                </div>
            </div>
            <div className="w-2/5 lg:mx-5">
                <Repay />
            </div>
        </div>
    );
}

export default BorrowPage;

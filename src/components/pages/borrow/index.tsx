import Borrow from "./borrow";
import Deposit from "./deposit";
import Repay from "./repay";
import Withdraw from "./withdraw";

function BorrowPage(props: {}) {
    // **** Dont forget the props for the actual implementation

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mx-5 text-base text-white mb-4">
            <Deposit />
            <Repay />
            <Borrow />
            <Withdraw />
        </div>
    );
}

export default BorrowPage;

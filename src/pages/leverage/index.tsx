import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";

export default function Leverage() {
    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        { title: "Borrow APY", body: "25.36 %" },
                        { title: "Total Available", body: "2,361,132 DAI" },
                        { title: "Utilization Rate", body: "67.34 %" },
                    ]}
                />
            </div>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex flex-col items-start justify-evenly pb-10 lg:my-0 my-20">
                <div className="w-full mb-10 lg:mb-0 mb-20">
                    <TokenSelect title="Token" />
                </div>
                <div className="flex lg:items-start items-stretch justify-between lg:space-y-0 space-y-20 lg:flex-row flex-col w-full">
                    <div className="w-full">
                        <TokenSegment title="Deposit" keys={{ "Staked amount": "25.36 DAI", "Staked value": "$ 25.36" }} cta="Deposit" />
                    </div>
                    <div className="w-full lg:mx-5">
                        <TokenSegment title="Withdraw" keys={{ "Redeem amount": "25.36 tlDAI", "Redeem value": "$ 25.36" }} cta="Withdraw" />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <TokenSegment title="Leverage" keys={{ "Redeem amount": "25.36 tlDAI", "Redeem value": "$ 25.36" }} cta="Leverage" />
                        <button className="bg-fuchsia-700 glow text-white font-bold text-3xl px-5 py-2.5 rounded-xl mt-5 hover:bg-fuchsia-600 lg:w-4/5 w-full">
                            Repay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

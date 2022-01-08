import Banner from "../../components/Banner";
import TokenSegment from "../../components/TokenSegment";
import TokenSelect from "../../components/TokenSelect";

export default function Reserve() {
    return (
        <div>
            <div className="lg:block hidden">
                <Banner
                    placeholders={[
                        {title: "Yield APR", body: "16.42 %"},
                        {title: "Total Staked", body: "1,429,813 DAI"},
                    ]}
                />
            </div>
            <h2 className="font-bold text-white text-3xl lg:hidden block mt-20 ml-12">Yield</h2>
            <div className="p-12 bg-neutral-900 rounded-xl glow flex items-start justify-evenly lg:space-y-0 space-y-20 pb-10 lg:flex-row flex-col my-10">
                <div className="lg:w-1/5 w-full">
                    <TokenSelect title="Token" />
                </div>
                <div className="lg:w-2/5 w-full lg:mx-10">
                    <TokenSegment
                        title="Stake"
                        keys={{
                            Available: "42.46 DAI",
                            "Staked amount": "25.36 DAI",
                            "Staked value": "$ 25.36",
                        }}
                        cta="Deposit"
                    />
                </div>
                <div className="lg:w-2/5 w-full flex flex-col lg:items-center items-stretch justify-center">
                    <TokenSegment title="Withdraw" keys={{Available: "25.36 tlDAI", "Total yield": "25.36 TAU"}} cta="Withdraw" />
                    <button className="bg-fuchsia-700 glow text-white font-bold text-3xl px-5 py-2.5 rounded-xl mt-5 hover:bg-fuchsia-600 lg:w-4/5 w-full">Claim</button>
                </div>
            </div>
        </div>
    );
}

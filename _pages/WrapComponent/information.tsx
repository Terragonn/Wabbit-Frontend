export default function Information({nativeSymbol, wrappedSymbol}: {nativeSymbol: string; wrappedSymbol: string}) {
    return (
        <>
            <h3 className="text-neutral-300 font-bold lg:text-center text-left text-2xl mb-4">Why Wrap?</h3>
            <p className="text-neutral-400 font-medium text-lg mb-4">
                To use your <span className="font-bold text-neutral-300">({nativeSymbol})</span> with Torque, you must first wrap it into its ERC20 wrapped equivalent{" "}
                <span className="font-bold text-neutral-300">({wrappedSymbol})</span> When you are done, simply unwrap.
            </p>
            <p className="text-neutral-400 font-medium text-lg">
                Make sure to keep enough <span className="font-bold text-neutral-300">({nativeSymbol})</span> to pay for transaction fees.
            </p>
        </>
    );
}

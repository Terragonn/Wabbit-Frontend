export default function TokenSegment({ title, keys, cta }: { title: string; keys: { [key: string]: string }; cta: string }) {
    return (
        <>
            <h3 className="text-neutral-500 font-bold text-center text-2xl mb-4">{title}</h3>
            <div className="bg-neutral-900 rounded-3xl p-3 glow w-full text-center">
                <input className="bg-transparent border-none rounded-xl text-center text-white text-xl font-bold w-full" type="number" value="0.00" min={0} step={0.01} />
            </div>
            <div className="mt-16 lg:w-4/5 w-full mx-auto flex flex-col items-stretch justify-evenly">
                <div>
                    {Object.entries(keys).map(([key, value], index) => (
                        <div className="flex items-center justify-between text-white font-bold text-lg mb-6">
                            <span>{key}:</span>
                            <span className="whitespace-nowrap">{value}</span>
                        </div>
                    ))}
                </div>
                <button className="bg-fuchsia-700 glow text-white font-bold text-3xl px-5 py-2.5 rounded-xl mt-5 hover:bg-fuchsia-600">{cta}</button>
            </div>
        </>
    );
}

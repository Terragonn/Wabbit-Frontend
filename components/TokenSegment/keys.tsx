export default function Keys({keys}: {keys: [string, string][]}) {
    return (
        <div>
            {keys.map(([key, value], index) => (
                <div key={index} className="flex items-center justify-between text-neutral-400 font-medium text-lg mb-6">
                    {key.length === 0 && key.length === 0 ? null : (
                        <>
                            <span>{key}:</span>
                            <span className="whitespace-nowrap text-white font-bold">{value}</span>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

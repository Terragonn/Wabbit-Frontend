export default function TableHeader() {
    const headers = ["Name", "TVL", "Borrowed", "Stake APY", "Borrow APY"];

    return (
        <div className="flex items-center justify-evenly py-3 px-10 mb-2">
            <h3 className="text-left w-full text-neutral-500 font-bold">{headers[0]}</h3>
            {headers.slice(1).map((header, index) => (
                <h3 key={index} className="text-center w-full text-neutral-500 font-bold">
                    {header}
                </h3>
            ))}
        </div>
    );
}

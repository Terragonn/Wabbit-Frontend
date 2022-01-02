export default function TableHeader() {
    const headers = ["Name", "TVL", "Borrowed", "Stake APY", "Borrow APY"];

    return (
        <div className="flex items-center justify-evenly py-3 px-10 mb-2">
            <h3 className="text-left w-1/5 text-neutral-500 font-bold">{headers[0]}</h3>
            {headers.slice(1).map((header) => (
                <h3 className="text-center w-1/5 text-neutral-500 font-bold">{header}</h3>
            ))}
        </div>
    );
}

export default function TableHeader() {
    const headers = ["Name", "TVL", "Borrowed", "Stake APY", "Borrow APY"];

    return (
        <div className="flex items-center justify-evenly py-3 px-10 mb-2">
            {headers.map((header) => (
                <h3 className="text-center w-1/5 text-neutral-500 font-bold">{header}</h3>
            ))}
        </div>
    );
}

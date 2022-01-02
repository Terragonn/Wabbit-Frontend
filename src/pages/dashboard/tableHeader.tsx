export default function TableHeader() {
    const headers = ["Name", "TVL", "Borrowed", "Stake APY", "Borrow APY"];

    return (
        <div className="flex items-center justify-evenly py-3">
            {headers.map((header) => (
                <h3 className="text-left text-neutral-500 font-bold">{header}</h3>
            ))}
        </div>
    );
}

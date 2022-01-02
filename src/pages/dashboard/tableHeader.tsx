export default function TableHeader({ headers }: { headers: string[] }) {
    return (
        <div className="flex items-center justify-evenly py-3">
            {headers.map((header) => (
                <h3 className="text-left text-neutral-500 font-bold">{header}</h3>
            ))}
        </div>
    );
}

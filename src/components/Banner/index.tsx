interface Placeholder {
    title: string;
    body: string;
}

export default function Banner({ placeholders }: { placeholders: Placeholder[] }) {
    return (
        <div>
            {placeholders.map((placeholder) => (
                <div>
                    <h2>{placeholders}</h2>
                </div>
            ))}
        </div>
    );
}

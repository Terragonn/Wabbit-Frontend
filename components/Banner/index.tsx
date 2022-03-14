interface Placeholder {
    title: string;
    body: string;
}

export default function Banner({placeholders}: {placeholders: Placeholder[]}) {
    return (
        <div className="lg:flex grid grid-cols-2 bg-neutral-900 bg-opacity-75 px-16 py-10 items-center justify-evenly rounded-xl glow my-16">
            {placeholders.map((placeholder, index) => (
                <div className="text-center" key={index}>
                    <h2 className="text-neutral-500 font-bold lg:text-2xl text-xl pb-3">{placeholder.title}</h2>
                    <p className="text-white font-bold lg:text-4xl text-3xl">{placeholder.body}</p>
                </div>
            ))}
        </div>
    );
}

export default function Button({children, onClick}: {children: any; onClick?: (...args: any[]) => any}) {
    return (
        <button className="bg-fuchsia-700 glow text-white font-bold text-3xl px-5 py-2.5 rounded-xl mt-5 hover:bg-fuchsia-600 w-full" onClick={onClick}>
            {children}
        </button>
    );
}

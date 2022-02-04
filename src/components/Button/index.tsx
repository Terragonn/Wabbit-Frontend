export default function Button({children, onClick, disabled, loading}: {children: any; onClick?: (...args: any[]) => any; disabled?: boolean; loading?: boolean}) {
    return (
        <button
            className={`${
                disabled === true ? "bg-fuchsia-700 hover:bg-fuchsia-600 glow" : "bg-fuchsia-900"
            } text-white font-bold text-3xl px-5 py-3.5 rounded-xl mt-5 w-full`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

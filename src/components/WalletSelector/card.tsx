export default function Card({name, icon, fn}: {name: string; icon: string; fn: () => any}) {
    return (
        <div className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-xl px-8 py-4 shadow-md" onClick={() => fn()}>
            <p className="text-3xl font-bold text-white">{name}</p>
            <img src={icon} alt={name} width={50} className="rounded-xl" />
        </div>
    );
}

export default function TokenSegment() {
    return (
        <div className="bg-neutral-900 rounded-3xl p-3 glow w-full text-center">
            <input className="bg-transparent border-none rounded-xl text-center text-white text-xl font-bold" type="number" value="0.00" min={0} step={0.01} />
        </div>
    );
}

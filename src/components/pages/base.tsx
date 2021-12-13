function Base(props: { children: any }) {
    // **** Have something here which renders a message if there is no wallet connected

    // **** Obviously get the real times here
    const prologueTimes = [Date.now(), Date.now()];
    const epilogueTimes = [Date.now(), Date.now() + 10000];

    const prologueActive = Date.now() >= prologueTimes[0] && Date.now() < prologueTimes[1];
    const epilogueActive = Date.now() >= epilogueTimes[0] && Date.now() < epilogueTimes[1];

    function activeClass(active: boolean) {
        return `${active ? "bg-emerald-300 text-green-600" : "bg-red-400 text-rose-700"} px-2 py-1 rounded-md ml-2`;
    }

    function timeTo(time: number) {
        const now = new Date().getTime();
        const seconds = new Date(time).getTime();
        let delta = seconds - now;

        const days = (delta / 86400).toFixed(0);
        delta %= 86400;

        const hours = (delta / 3600).toFixed(0);
        delta %= 3600;

        const mins = (delta / 60).toFixed(0);

        return `${days}d ${hours}h ${mins}m`;
    }

    return (
        <>
            <div className="mx-auto w-4/5 bg-zinc-900 my-10 p-8 rounded-md drop-shadow-sm text-center">
                <h1 className="font-medium text-white text-lg flex items-center justify-evenly">
                    <span>
                        Prologue: <span className={activeClass(prologueActive)}>{prologueActive ? "active" : "inactive"}</span>
                    </span>
                    <span>
                        Epilogue: <span className={activeClass(epilogueActive)}>{epilogueActive ? "active" : "inactive"}</span>
                    </span>
                    <span>Period end: {timeTo(epilogueTimes[1])}</span>
                </h1>
            </div>
            <div className="mx-auto w-4/5 bg-zinc-900 my-5 p-8 rounded-md drop-shadow-sm">{props.children}</div>
        </>
    );
}

export default Base;

import { useState } from "react";

function Tooltip(props: { children: any; tooltip?: string }) {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <span>
            <p className="text-base text-white" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {props.children}
            </p>
            {hovered && props.tooltip ? (
                <div className="inline-block absolute mt-3 z-10 py-2 px-3 text-sm font-medium text-white bg-slate-700 rounded-lg shadow-sm opacity-1 transition-opacity duration-300">
                    {props.tooltip}
                </div>
            ) : null}
        </span>
    );
}

export default Tooltip;

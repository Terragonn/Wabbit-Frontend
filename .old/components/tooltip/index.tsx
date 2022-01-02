import { useState } from "react";

function Tooltip(props: { children: any; tooltip?: string }) {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <span>
            <p className="text-base text-white" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {props.children}
            </p>
            {hovered && props.tooltip ? (
                <div className="absolute mt-3 z-10 py-2 px-3 mr-5 text-sm font-medium text-white bg-slate-600 rounded-lg shadow-sm">{props.tooltip}</div>
            ) : null}
        </span>
    );
}

export default Tooltip;

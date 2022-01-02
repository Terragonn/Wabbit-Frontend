import { Link, useLocation } from "react-router-dom";

export default function NavLink({ base, directories, children }: { base: string; directories: string[]; children: any }) {
    const location = useLocation();
    const sections = location.pathname.split("/").slice(1);

    const isDirectory = base === sections[0];

    return (
        <div className="text-left mx-auto w-4/6">
            <Link to={`${base}/${directories.length > 0 ? directories[0] : ""}`} className={`text-white font-bold text-3xl ${isDirectory ? "text-fuchsia-500" : ""}`}>
                {children}
            </Link>
            {isDirectory ? (
                <ul className="ml-10">
                    {directories.map((directory) => (
                        <li>
                            <Link to={`${base}/${directory}`} className={`text-zinc-400 font-bold text-2xl ${sections[1] === directory ? "text-zinc-500" : ""}`}>
                                {directory.charAt(0).toUpperCase() + directory.slice(1)}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

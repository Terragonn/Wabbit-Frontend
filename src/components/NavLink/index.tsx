import {Link, useLocation} from "react-router-dom";

export default function NavLink({base, directories, children}: {base: string; directories: [string, string][]; children: any}) {
    const location = useLocation();
    const sections = location.pathname.split("/").slice(1);

    const isDirectory = base === sections[0];

    // **** Add in better support for different links and allow for parsing slashes
    // **** Check that wallet connect works with NextJS first (or different versions) before migrating the entire app over to it
    // **** Just release a working version before switching over anyway ????
    // **** Clean up the file imports

    return (
        <div className="text-left mx-auto w-4/6">
            <Link
                to={`${base}${directories.length > 0 ? directories[0][0] : ""}`}
                className={`text-white font-bold text-3xl ${isDirectory ? "text-fuchsia-500" : "hover:text-fuchsia-400"}`}
            >
                {children}
            </Link>
            <ul className={`ml-10 ${isDirectory ? (directories.length > 0 ? "block mt-3 space-y-3" : "block") : "hidden"}`}>
                {directories.map(([directoryUrl, directoryName], index) => (
                    <li key={index}>
                        <Link
                            to={`${base}${directoryUrl}`}
                            className={`text-neutral-400 font-bold text-2xl ${sections[1] === directoryUrl ? "text-neutral-500" : "hover:text-neutral-500"}`}
                        >
                            {directoryName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

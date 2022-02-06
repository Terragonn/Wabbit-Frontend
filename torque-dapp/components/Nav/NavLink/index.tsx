import {useRouter} from "next/router";
import Link from "next/link";

export default function NavLink({base, directories, children}: {base: string; directories: [string, string][]; children: any}) {
    const router = useRouter();

    const split = router.pathname.split("/");
    const trueBase = split.slice(0, 2).join("/");
    const trueDirectory = "/" + split.slice(2).join("/");

    const isDirectory = base === trueBase;

    return (
        <div className="text-left mx-auto w-4/6">
            <Link href={`${base}${directories.length > 0 ? directories[0][0] : ""}`}>
                <a className={`text-white font-bold text-3xl ${isDirectory ? "text-fuchsia-500" : "hover:text-fuchsia-400"}`}>{children}</a>
            </Link>
            <ul className={`ml-10 ${isDirectory ? (directories.length > 0 ? "block mt-3 space-y-3" : "block") : "hidden"}`}>
                {directories.map(([directoryUrl, directoryName], index) => (
                    <li key={index}>
                        <Link href={`${base}${directoryUrl}`}>
                            <a className={`text-neutral-400 font-bold text-2xl ${trueDirectory === directoryUrl ? "text-neutral-500" : "hover:text-neutral-500"}`}>
                                {directoryName}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

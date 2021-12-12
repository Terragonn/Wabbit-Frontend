export interface Link {
    name: string;
    id: number;
}

function NavLink(props: { current: boolean; link: Link; setPageId: (pageId: number) => void }) {
    return (
        <a
            className={`cursor-pointer ${props.current ? "bg-zinc-700" : ""} py-3 px-6 mx-12 rounded-md text-white font-medium`}
            onClick={() => props.setPageId(props.link.id)}
        >
            {props.link.name}
        </a>
    );
}

export default NavLink;

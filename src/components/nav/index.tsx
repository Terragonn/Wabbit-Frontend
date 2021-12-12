import Wallet from "../wallet";

function Nav(page: any, setPage: any) {
    return (
        <nav className="bg-zinc-900 p-6 flex items-center justify-evenly">
            <a>Home</a>
            <a>Stake</a>
            <a>Borrow</a>
            <Wallet />
        </nav>
    );
}

export default Nav;

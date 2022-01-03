import Wallet from "../wallet";

export default function Nav() {
    return (
        <nav className="py-8 flex items-center xl:justify-end justify-between">
            <div className="xl:hidden block">
                <div className="px-5 py-1 my-1 bg-white rounded-md" />
                <div className="px-5 py-1 my-1 bg-white rounded-md" />
                <div className="px-5 py-1 my-1 bg-white rounded-md" />
            </div>
            <Wallet />
        </nav>
    );
}

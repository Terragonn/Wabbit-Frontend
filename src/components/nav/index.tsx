import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div className="fixed top-0 left-0 h-screen w-16">
            <h1>Torque</h1>
            <ul>
                <li>
                    <Link to="dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="stake">Stake</Link>
                </li>
                <li>
                    <Link to="leverage">Leverage</Link>
                </li>
                <li>
                    <Link to="yield">Yield</Link>
                </li>
            </ul>
        </div>
    );
}

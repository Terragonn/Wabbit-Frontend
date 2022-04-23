import { Code, Social } from "tabler-icons-react";

import NavLink from "../NavLink";

export default function SocialLinks() {
    return (
        <>
            <NavLink icon={<Social size={16} />} color={"gray"} label="Links" href="https://linktr.ee/torque_money" mt="sm" />
            <NavLink icon={<Code size={16} />} color={"gray"} label="Documentation" href="https://docs.torque.money" mt="sm" />
        </>
    );
}

import {useState} from "react";
import {Approved} from "../../providers/useChainData";
import useContracts from "../../providers/useContracts";
import useProtocolData from "../../providers/useProtocolData";
import useProtocolMax from "../../providers/useProtocolMax";
import useProtocolMethods from "../../providers/useProtocolMethods";

export default function LeverageComponent() {
    const contracts = useContracts();

    const protocolData = useProtocolData();
    const protocolMethods = useProtocolMethods();
    const protocolMax = useProtocolMax();

    const [token, setToken] = useState<Approved | null>(null);

    return <></>;
}

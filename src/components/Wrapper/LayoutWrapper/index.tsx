import AgreementModal from "../../AgreementModal";
import Error from "../../Error";
import Nav from "../../Nav/Nav";
import SideNav from "../../Nav/SideNav";
import WalletSelector from "../../Wallet/WalletSelector";
import AlignWrapper from "../AlignWrapper";

export default function LayoutWrapper({children}: {children: any}) {
    return (
        <>
            <AgreementModal />
            <WalletSelector />
            <AlignWrapper>
                <Nav />
            </AlignWrapper>
            <AlignWrapper>
                <Error />
            </AlignWrapper>
            <SideNav />
            {children}
        </>
    );
}

import AgreementModal from "../../AgreementModal";
import Error from "../../Error";
import Nav from "../../Nav/Nav";
import SideNav from "../../Nav/SideNav";
import NotificationBanner from "../../NotificationBanner";
import WalletSelector from "../../Wallet/WalletSelector";
import AlignWrapper from "../AlignWrapper";
import PageWrapper from "../PageWrapper";

export default function LayoutWrapper({children}: {children: any}) {
    return (
        <>
            <AgreementModal />
            <WalletSelector />
            <AlignWrapper>
                <NotificationBanner />
                <Nav />
                <Error />
            </AlignWrapper>
            <SideNav />
            <PageWrapper>{children}</PageWrapper>
        </>
    );
}

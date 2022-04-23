import { useError } from "../../providers";
import WalletCard from "../WalletCard";

type Connector = () => Promise<void>;

export default function WalletSelector({
    closeModal,
    connectors,
}: {
    closeModal: () => void;
    connectors: { metamask: Connector; walletConnect: Connector; walletLink: Connector };
}) {
    const setError = useError();

    function connectWrapper(connect: () => Promise<void>) {
        return async () => {
            try {
                await connect();
                closeModal();
            } catch (e: any) {
                setError(e.message);
            }
        };
    }

    return (
        <>
            <WalletCard
                name="Metamask"
                imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                onClick={connectWrapper(async () => await connectors.metamask())}
            />
            <WalletCard
                name="WalletConnect"
                imgURL="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bftsslxvhe2yaih6nyl9"
                onClick={connectWrapper(async () => await connectors.walletConnect())}
            />
            <WalletCard
                name="WalletLink"
                imgURL="https://play-lh.googleusercontent.com/wrgUujbq5kbn4Wd4tzyhQnxOXkjiGqq39N4zBvCHmxpIiKcZw_Pb065KTWWlnoejsg"
                onClick={connectWrapper(async () => await connectors.walletLink())}
            />
        </>
    );
}

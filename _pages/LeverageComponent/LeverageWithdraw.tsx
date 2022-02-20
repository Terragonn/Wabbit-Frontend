export default function LeverageWithdraw() {
    const [mainData, setMainData] = useState<{
        available: ethers.BigNumber | undefined;
        availableValue: ethers.BigNumber | undefined;
        minCollateral: ethers.BigNumber | undefined;

        collateralAmount: ethers.BigNumber | undefined;
        collateralValue: ethers.BigNumber | undefined;

        borrowedAmount: ethers.BigNumber | undefined;
        currentBorrowedValue: ethers.BigNumber | undefined;
        initialBorrowedValue: ethers.BigNumber | undefined;
        minMarginLevel: number | undefined;
        maxLeverage: number | undefined;

        totalAccountValue: ethers.BigNumber | undefined;
        totalAccountCollateralValue: ethers.BigNumber | undefined;
        totalAccountInterest: ethers.BigNumber | undefined;
        totalAccountInitialBorrowedValue: ethers.BigNumber | undefined;
        totalAccountBorrowedValue: ethers.BigNumber | undefined;
        marginLevel: number | undefined;
        currentLeverage: number | undefined;
        liquidatableBorrowPrice: ethers.BigNumber;
    } | null>(null);
    const [maxData, setMaxData] = useState<{
        maxAvailableToken: [ethers.BigNumber, number] | undefined;
        maxAvailableCollateral: [ethers.BigNumber, number] | undefined;
        maxAvailableLeverage: [ethers.BigNumber, number] | undefined;
    } | null>(null);

    useEffect(() => {
        if (!protocolData || !token) setBannerData(null);
        else {
            (async () => {
                const borrowAPR = await parseError(async () => await protocolData.borrowAPR(token));
                const liquidity = await parseError(async () => await protocolData.totalTokenAmountLiquidity(token));
                const totalCollateralValue = await parseError(async () => await protocolData.totalCollateralPrice());

                setBannerData({borrowAPR, liquidity, totalCollateralValue});
            })();
        }
    }, [protocolData, token]);

    useEffect(() => {
        if (!protocolData || !token) setMainData(null);
        else {
            (async () => {
                const available = await parseError(async () => await protocolData.availableTokenAmount(token));
                const availableValue = await parseError(async () => await protocolData.availableTokenPrice(token));
                const minCollateral = await parseError(async () => await protocolData.minCollateralPrice());

                const collateralAmount = await parseError(async () => await protocolData.accountCollateralAmount(token));
                const collateralValue = await parseError(async () => await protocolData.accountCollateralPrice(token));

                const borrowedAmount = await parseError(async () => await protocolData.accountBorrowedAmount(token));
                const currentBorrowedValue = await parseError(async () => await protocolData.accountBorrowedPrice(token));
                const initialBorrowedValue = await parseError(async () => await protocolData.initialBorrowedPrice(token));
                const minMarginLevel = await parseError(async () => await protocolData.minMarginLevel());
                const maxLeverage = await parseError(async () => await protocolData.maxLeverage());

                const totalAccountValue = await parseError(async () => await protocolData.accountTotalPrice());
                const totalAccountCollateralValue = await parseError(async () => await protocolData.accountCollateralTotalPrice());
                const totalAccountInterest = await parseError(async () => await protocolData.totalInterest());
                const totalAccountInitialBorrowedValue = await parseError(async () => await protocolData.totalInitialBorrowedPrice());
                const totalAccountBorrowedValue = await parseError(async () => await protocolData.accountBorrowedTotalPrice());
                const marginLevel = await parseError(async () => await protocolData.marginLevel());
                const currentLeverage = await parseError(async () => await protocolData.currentLeverage());
                const liquidatableBorrowPrice = await parseError(async () => await protocolData.liquidatablePrice());

                setMainData({
                    available,
                    availableValue,
                    minCollateral,
                    collateralAmount,
                    collateralValue,
                    borrowedAmount,
                    currentBorrowedValue,
                    initialBorrowedValue,
                    minMarginLevel,
                    maxLeverage,
                    totalAccountValue,
                    totalAccountCollateralValue,
                    totalAccountInterest,
                    totalAccountInitialBorrowedValue,
                    totalAccountBorrowedValue,
                    marginLevel,
                    currentLeverage,
                    liquidatableBorrowPrice,
                });
            })();
        }
    }, [protocolData, token]);

    useEffect(() => {
        if (!protocolMax || !token) setMaxData(null);
        else {
            (async () => {
                const maxAvailableToken = await parseError(async () => await protocolMax.availableToken(token));
                const maxAvailableCollateral = await parseError(async () => await protocolMax.availableCollateral(token));
                const maxAvailableLeverage = await parseError(async () => protocolMax.availableLeverage(token));

                setMaxData({
                    maxAvailableToken,
                    maxAvailableCollateral,
                    maxAvailableLeverage,
                });
            })();
        }
    }, [protocolMax, token]);

    return <></>;
}

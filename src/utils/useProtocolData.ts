import { createContext, useContext } from 'react'

export default function useProtocolData() {
    return useContext(protocolDataCtx)
}

interface ProtocolData {
    totalPriceLocked: number
    minimumMarginLevel: number
    minimumCollateralPrice: number
}

// ======== Pre calculate the general protocol data ========

// ======== Total functions ========

function totalPriceLocked(address: string) {}

function totalAmountLocked(address: string) {}

function totalBorrowed(address: string) {}

function totalBorrowedLong(address: string) {}

function liquidityAvailable(address: string) {}

function stakeAPY(address: string) {}

function borrowAPY(address: string) {}

function utilizationRate(address: string) {}

// ======== Account level functions ========

function totalAvailable(address: string) {}

function collateralTotalPrice(address: string) {}

function collateralPrice(address: string) {}

function collateralAmount(address: string) {}

function borrowedTotalPrice(address: string) {}

function borrowedPrice(address: string) {}

function borrowedAmount(address: string) {}

function marginLevel(address: string) {}

function stakeLPTokenAmount(address: string) {}

function stakeRedeemValue(address: string) {}

function stakeRedeemPrice(address: string) {}

// ======== Reserve functions ========

function reserveYieldAPR(address: string) {}

function totalStaked(address: string) {}

function totalTAUSupply(address: string) {}

function backingPerTAU(address: string) {}

function TAUTotalLocked(address: string) {}

// **** Return all of the functions

const protocolDataCtx = createContext<[ProtocolData | null, (contracts: ProtocolData | null) => void]>(undefined as any)

export function ProtocolDataProvider({ children }: { children: any }) {
    // **** Now in here we need to declare the functions AND return the data
    // **** ACTUALLY, what if I update the data everytime the address of the token changed and we just tracked the tokens address globally ?
    // **** ^^^^ This could affect the performance of the app though, might just use the functions because its easier and turn EVERYTHING into a function to avoid such problems
}

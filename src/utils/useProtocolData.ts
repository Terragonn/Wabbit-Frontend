import { createContext } from 'react'

interface ProtocolData {
    totalPriceLocked: number
    minimumMarginLevel: number
    minimumCollateralPrice: number
}

function totalPriceLocked(address: string) {}

function totalAmountLocked(address: string) {}

function totalBorrowed(address: string) {}

function totalBorrowedLong(address: string) {}

function liquidityAvailable(address: string) {}

function stakeAPY(address: string) {}

function borrowAPY(address: string) {}

function utilizationRate(address: string) {}

const protocolCtx = createContext<[ProtocolData | null, (contracts: ProtocolData | null) => void]>(undefined as any)

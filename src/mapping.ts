import { BigInt } from "@graphprotocol/graph-ts"
import {
  Cauldron,
  LogAccrue,
  LogAddCollateral,
  LogBorrow,
  LogExchangeRate,
  LogFeeTo,
  LogRemoveCollateral,
  LogRepay,
  LogWithdrawFees,
  OwnershipTransferred
} from "../generated/Cauldron/Cauldron"
import { ExampleEntity } from "../generated/schema"

export function handleLogAccrue(event: LogAccrue): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.accruedAmount = event.params.accruedAmount

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BORROW_OPENING_FEE(...)
  // - contract.COLLATERIZATION_RATE(...)
  // - contract.LIQUIDATION_MULTIPLIER(...)
  // - contract.accrueInfo(...)
  // - contract.bentoBox(...)
  // - contract.borrow(...)
  // - contract.collateral(...)
  // - contract.exchangeRate(...)
  // - contract.feeTo(...)
  // - contract.magicInternetMoney(...)
  // - contract.masterContract(...)
  // - contract.oracle(...)
  // - contract.oracleData(...)
  // - contract.owner(...)
  // - contract.pendingOwner(...)
  // - contract.repay(...)
  // - contract.totalBorrow(...)
  // - contract.totalCollateralShare(...)
  // - contract.updateExchangeRate(...)
  // - contract.userBorrowPart(...)
  // - contract.userCollateralShare(...)
}

export function handleLogAddCollateral(event: LogAddCollateral): void {}

export function handleLogBorrow(event: LogBorrow): void {}

export function handleLogExchangeRate(event: LogExchangeRate): void {}

export function handleLogFeeTo(event: LogFeeTo): void {}

export function handleLogRemoveCollateral(event: LogRemoveCollateral): void {}

export function handleLogRepay(event: LogRepay): void {}

export function handleLogWithdrawFees(event: LogWithdrawFees): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

import { BigInt } from "@graphprotocol/graph-ts"
import { LogAccrue } from "../generated/Cauldron/Cauldron"
import { Fee } from "../generated/schema"

let EIGHTEEN_DECIMALS = BigInt.fromI32(10).pow(18).toBigDecimal()

export function handleLogAccrue(event: LogAccrue): void {
  let entity = Fee.load('1')
  if (!entity) {
    entity = new Fee('1')
    entity.accruedAmount = BigInt.fromI32(0).toBigDecimal()
  }

  entity.accruedAmount = entity.accruedAmount + event.params.accruedAmount.divDecimal(EIGHTEEN_DECIMALS)

  entity.save()
}

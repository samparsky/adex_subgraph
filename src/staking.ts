
import {
  LogBond,
  LogSlash,
  LogUnbondRequested,
  LogUnbonded,
} from "../generated/Staking/Staking"

import { Bond, Slash, UnbondRequest, Unbonded} from "../generated/schema"

export function handleLogBond(event: LogBond): void {
  let entity = new Bond(event.transaction.from.toHex())
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.poolId = event.params.poolId
  entity.nonce = event.params.nonce
  entity.slashedAtStart = event.params.slashedAtStart
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}

export function handleLogSlash(event: LogSlash): void {
  let slash = new Slash(event.transaction.hash.toHex())
  slash.poolId = event.params.poolId
  slash.newSlashPts = event.params.newSlashPts
  slash.timestamp = event.block.timestamp.toI32()
  slash.save()
}

export function handleLogUnbondRequested(event: LogUnbondRequested): void {
  let unbond = new UnbondRequest(event.transaction.hash.toHex())
  unbond.owner = event.params.owner
  unbond.bondId = event.params.bondId
  unbond.willUnlock = event.params.willUnlock
  unbond.timestamp = event.block.timestamp.toI32()
  unbond.save()
}

export function handleLogUnbonded(event: LogUnbonded): void {
  let unbond = new Unbonded(event.transaction.hash.toHex())
  unbond.owner = event.params.owner
  unbond.bondId = event.params.bondId
  unbond.timestamp = event.block.timestamp.toI32()
  unbond.save()
}
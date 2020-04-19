declare const Buffer

import { BigInt } from "@graphprotocol/graph-ts"
import {
  LogBond,
  LogSlash,
  LogUnbondRequested,
  LogUnbonded,
} from "../generated/Staking/Staking"
import {
  AdExCore,
  LogChannelOpen,
  LogChannelWithdraw,
  LogChannelWithdrawExpired,
  ChannelOpenCall,
} from "../generated/AdExCore/AdExCore"
import { Bond, Slash, UnbondRequests, Unbonded, ChannelOpen, ChannelWithdraw, ChannelWithdrawExpired, Channels } from "../generated/schema"
import {
  crypto,
  EthereumValue
} from '@graphprotocol/graph-ts'

import * as abi from 'ethereumjs-abi/index.js'

export function handleLogBond(event: LogBond): void {
  let entity = new Bond(event.transaction.from.toHex())
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.poolId = event.params.poolId
  entity.nonce = event.params.nonce
  entity.slashedAtStart = event.params.slashedAtStart
  entity.save()

    // Entity fields can be set using simple assignments
  //   entity. = BigInt.fromI32(0)
  // }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters


  // Entities can be written to the store with `.save()`

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
  // - contract.bonds(...)
  // - contract.getWithdrawAmount(...)
  // - contract.slashPoints(...)
  // - contract.slasherAddr(...)
  // - contract.tokenAddr(...)
}

export function handleLogSlash(event: LogSlash): void {
  let slash = new Slash(event.transaction.from.toHex())
  slash.poolId = event.params.poolId
  slash.newSlashPts = event.params.newSlashPts
  slash.save()
}

export function handleLogUnbondRequested(event: LogUnbondRequested): void {
  let unbond = new UnbondRequests(event.transaction.from.toHex())
  unbond.owner = event.params.owner
  unbond.bondId = event.params.bondId
  unbond.willUnlock = event.params.willUnlock
  unbond.save()
}

export function handleLogUnbonded(event: LogUnbonded): void {
  let unbond = new Unbonded(event.transaction.from.toHex())
  unbond.owner = event.params.owner
  unbond.bondId = event.params.bondId
  unbond.save()
}


export function handleLogChannelOpen (event: LogChannelOpen): void {
  let channel = new ChannelOpen(event.params.channelId.toHexString())
  channel.save()
}

export function handleLogChannelWithdrawExpired(event: LogChannelWithdrawExpired): void {
  let channel = new ChannelWithdrawExpired(event.params.channelId.toHexString())
  channel.amount = event.params.amount
  channel.save()
}

export function handleLogChannelWithdraw(event: LogChannelWithdraw): void {
  let channel = new ChannelWithdraw(event.params.channelId.toHexString())
  channel.amount = event.params.amount
  channel.save()
}

export function handleChanelOpen(call: ChannelOpenCall): void {
  let creator = call.inputs.channel.creator
  let tokenAddr = call.inputs.channel.tokenAddr
  let tokenAmount = call.inputs.channel.tokenAmount
  let validUntil = call.inputs.channel.validUntil
  let validators = call.inputs.channel.validators
  let spec = call.inputValues[5].value.toBytes()

  let id =  Buffer.from(
		crypto.keccak256(
      EthereumValue.([[creator,tokenAddr]]).toString()
		)
  ).toString('hex');
  
  let channels = new Channels(`0x${id}`)
  channels.tokenAddr = tokenAddr
  channels.creator = creator
  channels.tokenAmount = tokenAmount
  channels.validators = validators
  channels.validUntil = validUntil
  channels.spec = spec
  channels.save()
}
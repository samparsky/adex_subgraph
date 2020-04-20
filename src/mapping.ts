
import { log } from "@graphprotocol/graph-ts"
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
import { Bond, Slash, UnbondRequest, Unbonded, ChannelOpen, ChannelWithdraw, ChannelWithdrawExpired, Channel } from "../generated/schema"
import {
  crypto,
  EthereumValue
} from '@graphprotocol/graph-ts'

export function handleLogBond(event: LogBond): void {
  let entity = new Bond(event.transaction.from.toHex())
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.poolId = event.params.poolId
  entity.nonce = event.params.nonce
  entity.slashedAtStart = event.params.slashedAtStart
  entity.save()
}

export function handleLogSlash(event: LogSlash): void {
  let slash = new Slash(event.transaction.hash.toHex())
  slash.poolId = event.params.poolId
  slash.newSlashPts = event.params.newSlashPts
  slash.save()
}

export function handleLogUnbondRequested(event: LogUnbondRequested): void {
  let unbond = new UnbondRequest(event.transaction.hash.toHex())
  unbond.owner = event.params.owner
  unbond.bondId = event.params.bondId
  unbond.willUnlock = event.params.willUnlock
  unbond.save()
}

export function handleLogUnbonded(event: LogUnbonded): void {
  let unbond = new Unbonded(event.transaction.hash.toHex())
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

  let id = crypto.keccak256(
      call.transaction.input
    ).toHex();
    
    log.info("in channel open", [])
    log.info("transaction input = {}", [call.transaction.input.toHexString()])
    log.info("id = {}", [id])

  if (!id) {
    id = call.transaction.hash.toHex()
  }
  let channels = new Channel(id)
  channels.tokenAddr = tokenAddr
  channels.creator = creator
  channels.tokenAmount = tokenAmount
  channels.validators = call.inputValues[4].value.toBytesArray()
  channels.validUntil = validUntil
  channels.spec = spec
  channels.save()
}
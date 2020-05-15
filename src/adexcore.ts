
import { log, ByteArray, Address, Bytes } from "@graphprotocol/graph-ts"
import {
    LogChannelOpen,
    LogChannelWithdraw,
    LogChannelWithdrawExpired,
    ChannelOpenCall,
} from "../generated/AdExCore/AdExCore"
import { ChannelWithdraw, ChannelWithdrawExpired, Channel, ChannelOpen } from "../generated/schema"
import {
    crypto,
} from '@graphprotocol/graph-ts'

export function handleLogChannelOpen (event: LogChannelOpen): void {
    let channel = new ChannelOpen(event.params.channelId.toHexString())
    channel.save()
}

export function handleLogChannelWithdrawExpired(event: LogChannelWithdrawExpired): void {
    let channel = new ChannelWithdrawExpired(event.transaction.hash.toHexString())
    channel.amount = event.params.amount
    channel.channel = event.params.channelId.toHexString()
    channel.timestamp = event.block.timestamp.toI32()
    channel.save()
}

export function handleLogChannelWithdraw(event: LogChannelWithdraw): void {
    let channel = new ChannelWithdraw(event.transaction.hash.toHexString())
    channel.amount = event.params.amount
    channel.channel = event.params.channelId.toHexString()
    channel.timestamp = event.block.timestamp.toI32()
    channel.save()
}

export function handleChannel(call: ChannelOpenCall): void {
    let channels = new Channel(call.transaction.hash.toHex())
    channels.tokenAddr = call.inputs.channel.tokenAddr
    channels.creator = call.inputs.channel.creator
    channels.tokenAmount = call.inputs.channel.tokenAmount
    channels.created = call.block.timestamp.toI32()
    channels.validators = call.inputs.channel.validators as Bytes[]
    channels.validUntil = call.inputs.channel.validUntil
    channels.spec = call.inputs.channel.spec.toHexString()
    channels.save()
}

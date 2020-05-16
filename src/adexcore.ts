
import { log, ByteArray, Address, Bytes, store } from "@graphprotocol/graph-ts"
import {
    LogChannelOpen,
    LogChannelWithdraw,
    LogChannelWithdrawExpired,
    ChannelOpenCall,
    AdExCore
} from "../generated/AdExCore/AdExCore"
import { ChannelWithdraw, ChannelWithdrawExpired } from "../generated/schema"
import {
    crypto,
} from '@graphprotocol/graph-ts'
import { getOrInitChannel } from "./initializers"

export function handleLogChannelOpen (event: LogChannelOpen): void {
    let channel = getOrInitChannel(event.transaction.hash.toHexString())
    channel.channelId = event.params.channelId
    channel.save()
}

export function handleLogChannelWithdrawExpired(event: LogChannelWithdrawExpired): void {
    let channel = new ChannelWithdrawExpired(event.transaction.hash.toHexString())
    channel.amount = event.params.amount
    channel.channelId = event.params.channelId
    channel.timestamp = event.block.timestamp.toI32()
    channel.save()
}

export function handleLogChannelWithdraw(event: LogChannelWithdraw): void {
    let channel = new ChannelWithdraw(event.transaction.hash.toHexString())
    channel.amount = event.params.amount
    channel.channelId = event.params.channelId
    channel.timestamp = event.block.timestamp.toI32()
    channel.save()
} 

export function handleChannel(call: ChannelOpenCall): void {
    let channels = getOrInitChannel(call.transaction.hash.toHexString())
    channels.tokenAddr = call.inputs.channel.tokenAddr
    channels.creator = call.inputs.channel.creator
    channels.tokenAmount = call.inputs.channel.tokenAmount
    channels.created = call.block.timestamp.toI32()
    channels.validators = call.inputs.channel.validators as Bytes[]
    channels.validUntil = call.inputs.channel.validUntil
    channels.spec = call.inputs.channel.spec.toHexString()
    channels.save()
}

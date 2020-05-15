
import { log } from "@graphprotocol/graph-ts"
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
    let channel = new ChannelWithdrawExpired(event.transaction.hash)
    channel.amount = event.params.amount
    channel.channel = event.params.channelId.toHexString()
    channel.save()
}

export function handleLogChannelWithdraw(event: LogChannelWithdraw): void {
    let channel = new ChannelWithdraw(event.transaction.hash)
    channel.amount = event.params.amount
    channel.channel = event.params.channelId.toHexString()
    channel.save()
}

export function handleChannel(call: ChannelOpenCall): void {
    log.debug("invoking handle channel", []);
    let creator = call.inputs.channel.creator
    let tokenAddr = call.inputs.channel.tokenAddr
    let tokenAmount = call.inputs.channel.tokenAmount
    let validUntil = call.inputs.channel.validUntil
    let spec = call.inputs[5].value.toBytes()

    let id = crypto.keccak256(
        call.transaction.input
    ).toHex();

    if (!id) {
        id = call.transaction.hash.toHex()
    }

    let channels = new Channel(id)
    channels.tokenAddr = tokenAddr
    channels.creator = creator
    channels.tokenAmount = tokenAmount
    channels.validators = call.inputs[4].value.toBytesArray()
    channels.validUntil = validUntil
    channels.spec = spec
    channels.save()
}

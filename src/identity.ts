import { LogDeployed } from "../generated/IdentityFactory/IdentityFactory";
import { Identity } from "../generated/templates";
import { Identity as IdentityFactory } from "../generated/schema";
import { ChannelOpenCall } from "../generated/templates/Identity/Identity";
import { Channel } from "../generated/schema";

export function handleChannelOpen(call: ChannelOpenCall): void {
    let channels = new Channel(call.to.toHexString())
    channels.tokenAddr = call.inputs.channel.tokenAddr
    channels.creator = call.inputs.channel.creator
    channels.tokenAmount = call.inputs.channel.tokenAmount
    channels.validators = call.inputValues[4].value.toBytesArray()
    channels.validUntil = call.inputs.channel.validUntil
    channels.spec = call.inputs.channel.spec
    channels.save()
}

export function handleLogDeployed(event: LogDeployed): void {
    let id = new IdentityFactory(event.params.addr.toHexString())
    id.save()

    Identity.create(event.params.addr)
}
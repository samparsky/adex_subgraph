import { LogPrivilegeChanged, LogRoutineAuth } from "../generated/templates/Identity/Identity"
import { IdentityPrivilege, IdentityRoutine } from '../generated/schema'

export function handleLogPrivilegeChanged(event: LogPrivilegeChanged): void {
  let id = event.address.toHexString() + event.params.addr.toHexString()
  let identity = IdentityPrivilege.load(id) || new IdentityPrivilege(id)
  identity.identity = event.address.toHexString()
  identity.address = event.params.addr
  identity.level = event.params.privLevel
  identity.timestamp = event.block.timestamp.toI32()
  identity.save()
}

export function handleLogRoutineAuth(event: LogRoutineAuth): void {
    let id = event.address.toHexString() + event.params.hash.toHexString();
    let identity = IdentityRoutine.load(id) || new IdentityRoutine(id)
    identity.identity = event.address.toHexString()
    identity.hash = event.params.hash
    identity.authorized = event.params.authorized
    identity.timestamp = event.block.timestamp.toI32()
    identity.save()
}
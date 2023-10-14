import { User } from '@/domain/entities/user'

import { DomainEvent } from './mediator'

export class ErrorOnCreateUserEvent implements DomainEvent {
  constructor(readonly message: string, readonly user: User) {}
}

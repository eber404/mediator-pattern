import { User } from '@/domain/entities/user'

import { DomainEvent } from './mediator'

export class CreatedUserEvent implements DomainEvent {
  constructor(readonly user: User) {}
}

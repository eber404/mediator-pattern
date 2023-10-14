import { CreatedUserEvent } from '@/domain/events/created-user-event'
import { DomainEvent, EventHandler } from '@/domain/events/mediator'
import { PublisherService } from '@/domain/services/publisher-service'

export class CreatedUserHandler implements EventHandler {
  readonly event: DomainEvent = CreatedUserEvent

  constructor(private readonly publisherService: PublisherService) {}

  async handle(event: CreatedUserEvent): Promise<void> {
    const message = JSON.stringify(event.user)
    await this.publisherService.publish(message)
  }
}

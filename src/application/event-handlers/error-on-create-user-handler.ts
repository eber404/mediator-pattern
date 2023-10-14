import { ErrorOnCreateUserEvent } from '@/domain/events/error-on-create-user-event'
import { DomainEvent, EventHandler } from '@/domain/events/mediator'
import { PublisherService } from '@/domain/services/publisher-service'

export class ErrorOnCreateUserHandler implements EventHandler {
  event: DomainEvent = ErrorOnCreateUserEvent

  constructor(private readonly publisherService: PublisherService) {}

  async handle(event: ErrorOnCreateUserEvent): Promise<void> {
    const message = JSON.stringify(event)
    await this.publisherService.publish(message)
  }
}

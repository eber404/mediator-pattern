import { DomainEvent, EventHandler, Mediator } from '@/domain/events/mediator'

export class FakeMediator implements Mediator {
  private handlers: EventHandler[] = []

  subscribe(eventHandler: EventHandler): void {
    this.handlers.push(eventHandler)
  }

  notify(event: DomainEvent): void {
    this.handlers.forEach(
      // @ts-ignore
      (handler) => event instanceof handler.event && handler.handle(event)
    )
  }
}

export interface DomainEvent {}

export interface EventHandler {
  readonly event: DomainEvent
  handle(event: DomainEvent): Promise<void>
}

export interface Mediator {
  subscribe(eventHandler: EventHandler): void
  notify(event: DomainEvent): void
}

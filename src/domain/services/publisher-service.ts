export interface PublisherService {
  publish(message: string): Promise<void>
}

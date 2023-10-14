import { delay } from '@/infra/utils/delay'
import { PublisherService } from '@/domain/services/publisher-service'

export class FakePublisherService implements PublisherService {
  async publish(message: string): Promise<void> {
    await delay()
    console.log(`Message has been published on PubSub topic:`, message)
  }
}

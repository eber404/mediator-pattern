import { CreateUserUseCase } from '@/application/usecases/create-user'
import { CreateUserController } from '@/infra/controllers/create-user-controller'
import { FakePublisherService } from '@/infra/services/fake-publisher-service'
import { FakeUserRepository } from '@/infra/repositories/fake-user-repository'
import { FakeMediator } from '@/infra/mediator/fake-mediator'
import { CreatedUserHandler } from '@/application/event-handlers/created-user-handler'
import { ErrorOnCreateUserHandler } from '@/application/event-handlers/error-on-create-user-handler'

export function createUserIoC() {
  const publisher = new FakePublisherService()
  const createdUserHandler = new CreatedUserHandler(publisher)
  const errorOnCreateUserHandler = new ErrorOnCreateUserHandler(publisher)
  const mediator = new FakeMediator()
  mediator.subscribe(createdUserHandler)
  mediator.subscribe(errorOnCreateUserHandler)
  const userRepository = new FakeUserRepository()
  const createUserCommand = new CreateUserUseCase(userRepository, mediator)
  const createUserController = new CreateUserController(createUserCommand)
  return { createUserController }
}

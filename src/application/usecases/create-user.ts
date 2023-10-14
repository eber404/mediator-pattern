import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { Mediator } from '@/domain/events/mediator'
import { CreatedUserEvent } from '@/domain/events/created-user-event'
import { ErrorOnCreateUserEvent } from '@/domain/events/error-on-create-user-event'

interface CommandInput {
  name: string
  email: string
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mediator: Mediator
  ) {}

  async execute(input: CommandInput) {
    const user = User.create(input)

    const existentUserOption = await this.userRepository.getByEmail(user.email)

    if (existentUserOption.isSome()) {
      const errorOnCreateUserEvent = new ErrorOnCreateUserEvent(
        "Can't register user, email address already in use",
        user
      )
      this.mediator.notify(errorOnCreateUserEvent)
      throw new Error(`Please, use another email address`)
    }

    await this.userRepository.create(user)

    const createdUserEvent = new CreatedUserEvent(user)
    this.mediator.notify(createdUserEvent)
  }
}

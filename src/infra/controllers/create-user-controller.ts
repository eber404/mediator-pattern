import { CreateUserUseCase } from '@/application/usecases/create-user'
import { Controller } from './controller'

export interface CreateUserControllerInput {
  name: string
  email: string
}

export class CreateUserController extends Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super()
  }

  async handle(input: CreateUserControllerInput) {
    await this.createUserUseCase.execute({
      email: input.email,
      name: input.name,
    })

    return {
      status: 201,
    }
  }
}

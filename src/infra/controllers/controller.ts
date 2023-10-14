export interface ControllerOutput {
  status: number
  data?: any
  message?: string
}

export class Controller {
  protected response!: ControllerOutput

  public handle(input?: unknown): Promise<ControllerOutput> {
    throw new Error('handle method not implemented.')
  }
}

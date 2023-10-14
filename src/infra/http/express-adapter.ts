import { Request, Response } from 'express'
import { Controller } from '@/infra/controllers/controller'

export class ExpressAdapter {
  public static adapt(controller: Controller) {
    return async function (req: Request, res: Response) {
      try {
        const input = {
          ...(req.body || {}),
          ...(req.query || {}),
          ...(req.params || {}),
          ...(req.headers || {}),
        }

        const { status, ...body } = await controller.handle(input)

        if (body.data || body.message) {
          return res.status(status).json(body)
        }

        return res.status(status).send()
      } catch (error: any) {
        return res.status(500).json({ message: error.message })
      }
    }
  }
}

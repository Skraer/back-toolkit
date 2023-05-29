import { Request, Response } from 'express'

export default interface IController {
  create: (req: Request, res: Response) => Promise<any>
  getAll: (req: Request, res: Response) => Promise<any>
  getOnce: (req: Request, res: Response) => Promise<any>
  delete: (req: Request, res: Response) => Promise<any>
  update: (req: Request, res: Response) => Promise<any>
}
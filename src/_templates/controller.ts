import { Request, Response } from 'express'
import IController from './interface'

class /* TEMPLATE|P */Controller implements IController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      
    } catch (e: any) {
      console.error('Cannot create: ', e)
      res.status(500).json(e.message)
    }
  }

  async getAll(req: Request, res: Response) {
    try {

    } catch (e: any) {
      console.error('Cannot get all: ', e)
      res.status(500).json(e.message)
    }
  }

  async getOnce(req: Request, res: Response) {
    try {

    } catch (e: any) {
      console.error('Cannot get once: ', e)
      res.status(500).json(e.message)
    }
  }

  async update(req: Request, res: Response) {
    try {

    } catch (e: any) {
      console.error('Cannot update: ', e)
      res.status(500).json(e.message)
    }
  }

  async delete(req: Request, res: Response) {
    try {

    } catch (e: any) {
      console.error('Cannot delete: ', e)
      res.status(500).json(e.message)
    }
  }
}

const /* TEMPLATE|C */Controller = new /* TEMPLATE|P */Controller()

export default /* TEMPLATE|C */Controller
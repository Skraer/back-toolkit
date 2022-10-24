import { NextFunction, Request, Response } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    
    next()
  } catch (e: any) {
    console.error(e)
    return res.status(403).json({ message: e.message })
  }
}
import { NextFunction, Request, Response } from 'express';

export function errors(err: Error, req: Request, res: Response, next: NextFunction){
  if(err instanceof Error){
    return res.status(404).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server Error'
  })
}
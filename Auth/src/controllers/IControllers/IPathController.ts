import { Request, Response, NextFunction } from 'express';

export default interface IPathController  {
  getAllPaths(req: Request, res: Response, next: NextFunction)
  createPath(req:Request,res:Response,next:NextFunction)
  createPathProlog(req:Request,res:Response,next:NextFunction)
}
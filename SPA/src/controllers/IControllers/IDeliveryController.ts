import { Request, Response, NextFunction } from 'express';

export default interface IDeliveryController  {
  getAllDeliveries(req: Request, res: Response, next: NextFunction);
  getDelivery(req: Request, res: Response, next: NextFunction);
  createDelivery(req: Request, res: Response, next: NextFunction);
  updateDelivery(req: Request, res: Response, next: NextFunction);
}
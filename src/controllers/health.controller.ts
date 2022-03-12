import { NextFunction, Request, Response } from 'express';

class HealthController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(200);
    } catch (error) {
      next(error);
    }
  };
}

export default HealthController;

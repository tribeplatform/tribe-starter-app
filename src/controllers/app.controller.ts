import { NextFunction, Request, Response } from 'express';
import ClientService from '@services/app.service';

class AppController {
  private clientService = new ClientService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body?.data?.challenge) {
        res.json({
          type: 'TEST',
          status: 'SUCCEEDED',
          data: {
            challenge: req.body?.data?.challenge,
          },
        });
      } else {
        const memberInfo = await this.clientService.getMemberByID(req.body.data.object.ownerId);
        res.json(memberInfo);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AppController;

import { NextFunction, Request, Response } from 'express';
import ClientService from '@services/client.service';

class IndexController {
  private clientService = new ClientService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const memberInfo = await this.clientService.getMemberByID(req.params.id);
      res.json(memberInfo);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;

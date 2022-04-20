import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import signatureMiddleware from '@middlewares/signature.middleware';
import WebhookController from '@controllers/webhook.controller';

class IndexRoute implements Routes {
  public path = '/api/webhook';
  public router = Router();
  public webhookController = new WebhookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, signatureMiddleware, this.webhookController.index);
  }
}

export default IndexRoute;

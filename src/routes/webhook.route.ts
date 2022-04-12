import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import WebhookController from '@/controllers/webhook.controller';

class IndexRoute implements Routes {
  public path = '/webhook';
  public router = Router();
  public webhookController = new WebhookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.webhookController.index);
  }
}

export default IndexRoute;

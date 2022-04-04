import { Router } from 'express';
import AppController from '@controllers/app.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/app';
  public router = Router();
  public appController = new AppController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.appController.index);
  }
}

export default IndexRoute;

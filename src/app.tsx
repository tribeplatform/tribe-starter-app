import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { connect, set } from 'mongoose';
import { logger, stream } from '@utils/logger';

import ClientApp from '@client/App';
import React from 'react';
import { Routes } from '@interfaces/routes.interface';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import bodyParser from 'body-parser'
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from '@databases';
import errorMiddleware from '@middlewares/error.middleware';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { renderToString } from 'react-dom/server';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private cssAssets = ['style.css'];

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    if (dbConnection) {
      connect(dbConnection.url, dbConnection.options);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.static('public'));
    this.app.use(
      bodyParser.json({
        verify: (req, res, buf) => {
          if (req.url.includes('/api/webhook')) req['rawBody'] = buf;
        },
      }),
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  cssLinksFromAssets() {
    return this.cssAssets.map(asset => `<link rel="stylesheet" href="/css/${asset}">`).join('');
  }

  private renderApp(req: express.Request, res: express.Response) {
    const context: StaticRouterContext = {};

    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <ClientApp />
      </StaticRouter>,
    );

    const html =
      // prettier-ignore
      `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Tribe Starter App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${this.cssLinksFromAssets()}
      </head>
      <body>
          <div id="root">${markup}</div>
      </body>
    </html>`;

    return html;
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(route.router);
    });

    this.app.use((req, res, next) => {
      // const html = this.renderApp(req, res);
      // res.send(html);
      res.sendFile('/Users/ermiaqasemi/Projects/Tribe/campfire-starter-app/my-app/public/index.html');
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

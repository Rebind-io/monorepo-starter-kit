import { config } from '@config';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security HTTP headers
    this.app.use(helmet());

    // CORS
    this.app.use(
      cors({
        origin: config.CORS_ORIGIN,
        credentials: true,
      })
    );

    // Body parser
    this.app.use(express.json({ limit: '100kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '100kb' }));

    // Request compression
    this.app.use(compression());

    // Development logging
    if (config.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private initializeRoutes(): void {
    // this.app.use('/api/v1', routes); // Uncomment and update the path to your routes
  }

  private initializeErrorHandling(): void {
    // this.app.use(errorMiddleware);
  }
}

export default new App().app;

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import api from './api';
import errorHandlerMiddleware from './shared/middlewares/error-handler.middleware';

class Server {
  express: Application;

  constructor() {
    this.express = express();
    this.initialize();
  }

  private initialize(): void {
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(
      morgan('[:date[iso]] - [:method] :url (:status) in :response-time ms'),
    );
    this.express.use(api);
    this.express.use(errorHandlerMiddleware);
  }

  start(name: string, port: number, environment: string): void {
    this.express.get('/', (_req, res) => {
      res.send(`${name} is up and running on ${environment} environment.`);
    });

    this.express.listen(port, () => {
      console.log(`${name} is running on port ${port}`);
    });
  }
}

export default Server;

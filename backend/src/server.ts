import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import api from './api';

class Server {
  express: Application;

  constructor() {
    this.express = express();
    this.initialize();
  }

  private initialize(): void {
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(cors());
    this.express.use(
      morgan('[:date[iso]] - [:method] :url (:status) in :response-time ms'),
    );
    this.express.use(api);
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

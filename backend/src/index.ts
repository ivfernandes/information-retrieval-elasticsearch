import config from 'config';
import { name } from '../package.json';
import Server from './server';

class Application {
  private readonly server: Server;

  private readonly port: number;

  private readonly env: string;

  constructor() {
    this.server = new Server();
    this.port = config.get('port');
    this.env = config.get('env');
  }

  initialize(): void {
    this.server.start(name, this.port, this.env);
  }
}

new Application().initialize();

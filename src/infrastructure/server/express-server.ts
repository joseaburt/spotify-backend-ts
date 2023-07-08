import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import compress from 'compression';
import express, { Application } from 'express';

export default class ExpressServer {
  private readonly port: number;
  private readonly host: string;
  private readonly app: Application;
  private readonly server: http.Server;

  constructor(port: number = 8080, host?: string) {
    this.port = port;
    this.app = express();
    this.host = host ?? 'localhost';

    // Registering base middlewares
    this.app.use(cors());
    this.app.use(morgan('common'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(compress());

    this.server = http.createServer(this.app);
  }

  public getApp(): Application {
    return this.app;
  }

  public registerRouter(path: string, router: express.Router) {
    this.app.use(path, router);
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log(`server at http://${this.host}:${this.port}`);
        resolve();
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
}

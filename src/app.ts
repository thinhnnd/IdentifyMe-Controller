import * as express from 'express';
import { Application } from 'express';
import { AppOptions } from './interface';
import { createConnection } from 'typeorm';
export class App {
  private app: Application
  private port: number | string
  constructor(appOptions: AppOptions) {
    this.app = express();
    this.port = appOptions.port;
    this.applyMiddlewares(appOptions.middlewares);
    this.applyControllers(appOptions.controllers);
  }
  private applyMiddlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach((middleware) => {
      this.app.use(middleware);
    })
  }
  private applyControllers(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }
  static async connectDatabase() {
    try {
      const connection = await createConnection();
      if (connection.isConnected) {
        console.log("Database connection established");
      }
    } catch (error) {
      console.log("Connect database failed:", error);
    }
  }
  public listen(host: string) {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://${host}:${this.port}`)
    })
  }
}
import * as express from 'express';
import { Application } from 'express';
import { AppOptions } from './interface';
export class App {
    private app: Application
    private port: number | string
    constructor(appOptions: AppOptions) {
        this.app = express();
        this.port = appOptions.port
        this.applyMiddlewares(appOptions.middlewares);
        this.applyRoutes(appOptions.controllers);
    }
    private applyMiddlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach((middleware) => {
            this.app.use(middleware);
        })
    }
    private applyRoutes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}
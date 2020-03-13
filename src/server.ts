import * as express from 'express';
import { App } from './app';
import { UITController } from './controllers/uit.controller';
import * as morgan from 'morgan';
const uit_agent = new App({
    port: 3000,
    controllers: [
        new UITController()
    ],
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true }),
        morgan("dev")
    ],
})
uit_agent.listen();
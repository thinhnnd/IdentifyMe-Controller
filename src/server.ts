import * as express from 'express';
import { App } from './app';
import { UITController } from './controllers/uit.controller';

console.log('1');

const uitController = new UITController();
const uit_agent = new App({
    port: 3010,
    controllers: [
        uitController
    ],
    middlewares: [
        express.json(),
        express.urlencoded({ extended: true })
    ],
})
uit_agent.listen();
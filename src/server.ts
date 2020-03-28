import * as express from 'express';
import { App } from './app';
import { UITController } from './controllers/uit.controller';
import { DEFAULT_INTERNAL_HOST, WEB_UI_PORT, AGENT_MODULE, AGENT_PORT } from './constant';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { ABCCorpController } from './controllers/abc-corp.controller';
const agentsModule = ['UIT-University', 'ABC-Corporation', 'VCB-Bank'];

if (!agentsModule.includes(AGENT_MODULE)) throw new Error(`This agent module is not supported`);
let agentController = null;
if (AGENT_MODULE === agentsModule[0]) agentController = new UITController();
else if (AGENT_MODULE === agentsModule[1]) agentController = new ABCCorpController();
else console.log("This agent controller is not supported");
const agent = new App({
    port: AGENT_PORT + 3,
    controllers: [
        agentController
    ],
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        morgan("dev")
    ],
});
// Register webhook server
agent.listen(DEFAULT_INTERNAL_HOST);
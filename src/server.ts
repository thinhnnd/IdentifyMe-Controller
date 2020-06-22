import * as express from 'express';
import { App } from './app';
import { UITController } from './controllers/uit.controller';
import { DEFAULT_INTERNAL_HOST, WEB_UI_PORT, AGENT_MODULE, AGENT_PORT } from './constant';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ABCCorpController } from './controllers/abc-corp.controller';
import { AuthController } from './controllers/auth.controller';
const agentsModule = ['UIT-University', 'ABC-Corporation', 'VCB-Bank', 'Neeboobox_Corp'];

if (!agentsModule.includes(AGENT_MODULE)) throw new Error(`This agent module is not supported`);
let agentController = null;
App.connectDatabase().then(() => {
  const authController = new AuthController();
  if (AGENT_MODULE === agentsModule[0]) agentController = new UITController();
  else if (AGENT_MODULE === agentsModule[1]) agentController = new ABCCorpController();
  else if (AGENT_MODULE === agentsModule[3]) agentController = new ABCCorpController();
  else console.log("This agent controller is not supported");
  const agent = new App({
    port: AGENT_PORT + 3,
    controllers: [
      authController,
      agentController
    ],
    middlewares: [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      morgan("dev"),
      cors({ origin: "*" }),
    ],
  });
  // Register webhook server
  agent.listen(DEFAULT_INTERNAL_HOST);
})

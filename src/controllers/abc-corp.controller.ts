import { Request, Response, Router } from 'express';
import { IBaseController } from '../interface';
import { ABCCorpAgentService } from '../services/ABC-corp.service';
import { AGENT_PORT, ADMIN_PORT } from '../constant';
export class ABCCorpController implements IBaseController {
    public path = '/';
    public router = Router();
    private agentService: ABCCorpAgentService = new ABCCorpAgentService(AGENT_PORT, ADMIN_PORT, false);
    constructor() {
        this.initRoutes();
        this.agentService.bootstrap();
    }
    public initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> This agent is ${this.agentService.agentName}</h1>`);
        });
    }
}
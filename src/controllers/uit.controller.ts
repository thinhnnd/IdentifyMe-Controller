import { Request, Response, Router } from 'express';
import { IBaseController } from '../interface';
import { UITAgentService } from '../services/uit.service';
import { AGENT_PORT, ADMIN_PORT } from '../constant';
export class UITController implements IBaseController {
    public path = '/';
    public router = Router();
    private agentService: UITAgentService = new UITAgentService(AGENT_PORT, AGENT_PORT + 1, false);
    constructor() {
        this.initRoutes();
        this.agentService.bootstrap();
    }
    private initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> This agent is ${this.agentService.agentName}</h1>`);
        });
    }
}
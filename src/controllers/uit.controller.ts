import { Request, Response, Router } from 'express';
import { IBaseController } from '../interface';
import { UITAgentService } from '../services/uit.service';
export class UITController implements IBaseController {
    public path = '/';
    public router = Router();
    private agentService: UITAgentService = new UITAgentService(3010, 5000, false);
    constructor() {
        this.initRoutes();
        this.agentService.bootstrap();
    }
    public initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Hello from UIT Agent');
        });
        this.registerSchema();
    }
    private registerSchema() {
        this.router.post('/', (req: Request, res: Response) => this.agentService.agentRegisterSchema(req, res));
    }
    private async getAllSchemas() {
        return await this.agentService.getAllSchemas();
    }
}
import { Request, Response, Router } from 'express';
import { IBaseController } from '../interface';
import { UITAgentService } from '../services/UIT.service';
import { AGENT_PORT, ADMIN_PORT } from '../constant';
export class UITController implements IBaseController {
    public path = '/';
    public router = Router();
    private agentService: UITAgentService = new UITAgentService(AGENT_PORT, ADMIN_PORT, false);
    constructor() {
        this.initRoutes();
        this.agentService.bootstrap();
    }
    public initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> This agent is ${this.agentService.agentName}</h1>`);
        });
        // this.registerSchema();
        // this.createCredentialsDefinition();
        // this.getCredDef();
    }
    // private registerSchema() {
    //     this.router.post('/schemas', (req: Request, res: Response) => this.agentService.agentRegisterSchema(req, res));
    // }
    // private createCredentialsDefinition() {
    //     this.router.post('/create-cred-def', async (req: Request, res: Response) => {
    //         const result = await this.agentService.createCredentialsDefinition(req.body);
    //         res.json(result.data.credential_definition_id);
    //     });
    // }
    // private getCredDef() {
    //     this.router.get('cred-def', async (req: Request, res: Response) => {
    //         const result = await this.agentService.getCredDef(req.params["credential_definition_id"]);
    //         res.json(result.data.credential_definition);
    //     });
    // }
    // private getAllSchemas() {
    //     this.router.get('/schemas', async (req: Request, res: Response) => {
    //         const result = await this.agentService.getAllSchemas(req.body)
    //     })
    // }
}
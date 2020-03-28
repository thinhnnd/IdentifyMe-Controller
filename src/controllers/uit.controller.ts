import { Request, Response, Router } from 'express';
import { IBaseController, ConnectionInvitationQuery } from '../interface';
import { UITAgentService } from '../services/uit.service';
import { AGENT_PORT, ADMIN_PORT } from '../constant';
import { SchemaSendRequest } from 'src/interface/api';
export class UITController implements IBaseController {
    public path = '/';
    public router = Router();
    private agentService: UITAgentService = new UITAgentService(AGENT_PORT, AGENT_PORT + 1, false);
    constructor() {
        this.initRoutes();
        this.agentService.bootstrap();
    }
    public initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> This agent is ${this.agentService.agentName}</h1>`);
        });
        this.createConnInvitationRoute();
        this.createSchemasRoute();
    }
    /**
     * @description Create a new connection invitation and set it into current connection via connectionId.
     */
    private async createConnInvitationRoute() {
        this.router.post('/connections', async (req: Request, res: Response) => {
            try {
                const query: ConnectionInvitationQuery = {
                    alias: req.body.alias,
                    accept: req.body.accept,
                    multi_use: req.body.multi_use,
                    public: req.body.public,
                }
                const result = await this.agentService.createConnectionInvitation(query);
                console.log(`result: ${result.data}`);
                this.agentService.connectionId = result.data.connection_id;
                res.json(result.data);
            } catch (error) {
                res.json(error);
            }
        })
    }
    private async issueCredentialRoute() {
        this.router.post('/issue-credential', async (req, res) => {
            // const result = await this.agentService
        })
    }
    private async createSchemasRoute() {
        this.router.post('/schemas', async (req, res) => {
            try {
                const body: SchemaSendRequest = {
                    attributes: req.body.attributes,
                    schema_name: req.body.schema_name,
                    schema_version: req.body.schema_version,
                }
                const result = await this.agentService.registerSchema(body);
                console.log("UITController -> createSchemas -> result", result);
                res.json(result);

            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })
    }
}
import { Request, Response } from 'express';
import { BaseAgentService } from '../services/agent';
import { RegisterSchemasDTO } from 'dtos';
import { getGenesisTxns } from '../utils';
import { SEED } from '../constant';
export class UITAgentService extends BaseAgentService {
    public credAttrs: string[]
    constructor(httpPort: number | string, adminPort: number | string, noAuto: Boolean) {
        /**
         * @description used for arguments in aca-py cli, read more by typing: aca-py start -h
         */
        const extractArgs = !noAuto ? [] : ["--auto-accept-invites", "--auto-accept-requests"];
        super({
            agentName: 'UIT Agent',
            httpPort: httpPort,
            adminPort: adminPort,
            args: extractArgs,
            seed: SEED
        });
        console.log("UITAgentService -> constructor -> SEED", SEED)
        this.connectionId = '';
        this.credAttrs = [];
    }
    async bootstrap() {
        console.log('bootstraping');
        try {
            const genesis = await getGenesisTxns();
            console.log("UITAgentService -> bootstrap -> genesis", genesis)
            this.genesisData = genesis;
            await this.registerDID();
            console.log('Register DID:', this.did);
        } catch (error) {
            console.error(error);
        }
    }
    async agentRegisterSchema(req: Request, res: Response) {
        try {
            const body: RegisterSchemasDTO = req.body;
            const result = await this.registerSchema(body.schemaName, body.schemaVersion, body.schemaAttrs);
            console.log('result', result.data);
            if (result.data) {
                res.json(result.data);
            }
        } catch (error) {
            res.json(error)
        }

    }
}
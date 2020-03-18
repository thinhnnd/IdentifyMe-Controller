import { Request, Response } from 'express';
import { BaseAgentService } from '../services/agent';
import { RegisterSchemasDTO } from '../dtos';
import { getGenesisTxns } from '../utils';
import { SEED } from '../constant';
import { SchemaSendRequest } from 'src/interface/api';
export class UITAgentService extends BaseAgentService {
    public credAttrs: string[]
    constructor(httpPort: number | string, adminPort: number | string, noAuto: Boolean) {
        /**
         * @description used for arguments in aca-py cli, read more by typing: aca-py start -h
         */
        const extractArgs = !noAuto ? [] : ["--auto-accept-invites", "--auto-accept-requests"];
        super({
            agentName: 'UIT_Agent',
            httpPort: httpPort,
            adminPort: adminPort,
            args: extractArgs,
            seed: SEED
        });
        // console.log(this)
        this.connectionId = '';
        this.credAttrs = [];
    }
    async bootstrap() {
        console.log('bootstraping');
        try {
            const genesis = await getGenesisTxns();
            this.genesisData = genesis;
            await this.registerDID();
            console.log('Register DID:', this.did);
            console.log('Starting process...');
            await this.startProcess();
            console.log('Detecting connection from: ' + this.agentName);
            await this.detectAgentConnected();
            console.log('Admin URL at:', this.adminURL);
            console.log('Endpoint at:', this.endpoint);
        } catch (error) {
            console.error(error);
        }
    }
    async agentRegisterSchema(req: Request, res: Response) {
        try {
            const body: SchemaSendRequest = req.body;
            const result = await this.registerSchema(body);
            console.log('result', result);
            if (result) {
                res.json(result);
            }
            else throw { error: 'Server response with empty body' };
        } catch (error) {
            res.json(error)
        }

    }
}
import { Request, Response } from 'express';
import { BaseAgentService } from './agent';
import { RegisterSchemasDTO } from '../dtos';
import { getGenesisTxns } from '../utils';
import { SEED, AGENT_MODULE } from '../constant';
import { SchemaSendRequest } from 'src/interface/api';
import { generate } from 'randomstring';
export class UITAgentService extends BaseAgentService {
    public credAttrs: string[]
    constructor(httpPort: number | string, adminPort: number | string, noAuto: Boolean) {
        /**
         * @description used for arguments in aca-py cli, read more by typing: aca-py start -h
         */
        const extractArgs = !noAuto ? [] : ["--auto-accept-invites", "--auto-accept-requests"];
        const seed = generate({ length: 32, charset: "alphabetic" });
        super({
            agentName: AGENT_MODULE,
            httpPort: httpPort,
            adminPort: adminPort,
            args: extractArgs,
            seed: seed
        });
        // console.log(this)
        this.connectionId = '';
        this.credAttrs = [];
    }
    async bootstrap() {
        console.log('Bootstraping agent ', this.agentName);
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
}
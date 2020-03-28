import { Request, Response } from 'express';
import { BaseAgentService } from './agent';
import { RegisterSchemasDTO } from '../dtos';
import { getGenesisTxns } from '../utils';
import { SEED, AGENT_MODULE, WEB_HOOK_URL } from '../constant';
import { IssueCredentialPayload, PresentProofPayload, ConnectionsPayload, BasicMessagesPayload } from '../interface';
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
        this.connectionId = '';
        this.credAttrs = [];
    }
    async bootstrap() {
        console.log('Bootstraping agent ', this.agentName);
        try {
            const genesis = await getGenesisTxns();
            this.genesisData = genesis;
            if (!WEB_HOOK_URL)
                this.webhookListeners(Number(this.httpPort) + 2);
            else console.log('Webhook listening at ', WEB_HOOK_URL);
            await this.registerDID();
            console.log('Register DID:', this.did);
            console.log('Starting process...');
            await this.startProcess();
            console.log(`Detecting agent ${this.agentName} subprocess`);
            await this.detectProcess();
            console.log('Admin URL at:', this.adminURL);
            console.log('Endpoint at:', this.endpoint);
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 
     * @param message payload from agent
     * @description handle connection webhook
     */
    public async handle_connections(message: ConnectionsPayload) {
        if (message["connection_id"] === this.connectionId) {
            console.log("connection_id:", this.connectionId);
            if (message["state"] === "active") {
                console.log(`Connected to ${message["their_label"]}`);
            }
        }
    }

    public async handle_issue_credential(payload: IssueCredentialPayload) {
        console.log("UITAgentService -> handle_issue_credential -> payload", payload)
        //TODO
    }
    public async handle_present_proof(payload: PresentProofPayload) {
        console.log("UITAgentService -> handle_present_proof -> payload", payload)
        //TODO
    }
    public async handle_basicmessages(payload: BasicMessagesPayload) {
        console.log("UITAgentService -> handle_basicmessages -> payload", payload)
        //TODO
    }
}
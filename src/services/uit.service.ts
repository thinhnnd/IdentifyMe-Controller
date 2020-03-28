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
        super({
            agentName: AGENT_MODULE,
            httpPort: httpPort,
            adminPort: adminPort,
            args: !noAuto ? [] : ["--auto-accept-invites", "--auto-accept-requests"],
            seed: generate({ length: 32, charset: "alphabetic" })
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
            //default connection invitation should be create after agent started
            await this.createConnectionInvitation({ alias: this.agentName });
            console.log('Admin URL at:', this.adminURL);
            console.log('Endpoint at:', this.endpoint);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param message payload of agent
     * @description webhook handler for connections
     */
    handle_connections = async (message: ConnectionsPayload) => {
        console.log(this);
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
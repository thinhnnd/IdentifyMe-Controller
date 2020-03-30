import { Request, Response } from 'express';
import { BaseAgentService } from './agent';
import { RegisterSchemasDTO } from '../dtos';
import { getGenesisTxns } from '../utils';
import { SEED, AGENT_MODULE, WEB_HOOK_URL } from '../constant';
import { IssueCredentialPayload, PresentProofPayload, ConnectionsPayload, BasicMessagesPayload } from '../interface';
import { generate } from 'randomstring';
import { V10CredentialExchange } from 'src/interface/api';
export class UITAgentService extends BaseAgentService {
    public credAttrs: string[];
    public credState: {};
    private CRED_PREVIEW_TYPE = "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview";
    constructor(httpPort: number | string, adminPort: number | string, noAuto: Boolean) {
        super({
            agentName: AGENT_MODULE,
            httpPort: httpPort,
            adminPort: adminPort,
            args: noAuto ? [] : ["--auto-accept-invites", "--auto-accept-requests"],
            seed: SEED || generate({ length: 32, charset: "alphabetic" })
        });
        this.connectionId = '';
        this.credAttrs = [];
        this.credState = {};
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
            // await this.createConnectionInvitation({ alias: this.agentName });
            console.log('Admin URL at:', this.adminURL);
            console.log('Endpoint at:', this.endpoint);
        } catch (error) {
            console.error(error);
        }
    }
    private async issueCredential(credential_exchange_id: string, data: any) {
        const response: V10CredentialExchange = await this.adminRequest(`/issue-credential/records/${credential_exchange_id}/issue`, { method: 'POST', data: data })
        return response
    }
    /**
     * @param message payload of agent
     * @description webhook handler for connections
     */
    handle_connections = async (message: ConnectionsPayload) => {
        const state = message.state;
        if (message["connection_id"] === this.connectionId) {
            console.log("connection_id:", this.connectionId);
            switch (state) {
                case "invitation":
                    console.log("invitation created");
                case "request":
                    console.log("request created");
                case "response":
                    console.log("response received");
                case "active":
                    console.log("connection active");
                    console.log(`Connected to ${message["their_label"]}`);
                case "inactive":
                    console.log("connection inactive");
                case "error":
                    console.log("connection error");
                default:
                    break;
            }
            // if (message["state"] === "active") {
            //     console.log(`Connected to ${message["their_label"]}`);
            // }
        }
    }

    handle_issue_credential = async (payload: IssueCredentialPayload) => {
        // console.log("UITAgentService -> handle_issue_credential -> payload", payload)
        const state = payload["state"];
        const credential_exchange_id = payload["credential_exchange_id"]
        const prev_state = this.credState[credential_exchange_id];
        if (prev_state == state)
            return
        this.credState[credential_exchange_id] = state
        console.log(
            `Credential: state = ${state},
             Credential_exchange_id = ${credential_exchange_id}`
        )
        /**
         * @description Case 1: Issuer send credential
         */
        switch (state) {
            case "offer_sent":
                //B1: Issuer send credential offer to Holder
                console.log("offer_sent");
                console.log(`#1: ${this.agentName} send credential offer to Holder`);
                break;
            case "request_received":
                //B4: Issuer received credential request from Holder
                console.log(`#4: ${this.agentName} received credential request from Holder`);
                const data = {
                    credential_preview: payload.credential_proposal_dict.credential_proposal,
                    comment: payload.credential_proposal_dict.comment
                }
                console.log("UITAgentService -> handle_issue_credential -> data", data);
                const response = await this.issueCredential(credential_exchange_id, data);
                console.log("UITAgentService -> handle_issue_credential -> response", response.state)
                break;

            case "proposal_received":
                console.log("credential_received:");
                break;
            case "offer_received":
                //B2: The holder received the offer
                //B3: The holder send credential request
                console.log("offer_received");
                break;
            case "credential_received":
                console.log("credential_received");

                //TODO 3
                break;
            case "issued":
                console.log("issued:");
                break;
            default:
                break;
        }
    }
    handle_present_proof = async (payload: PresentProofPayload) => {
        console.log("UITAgentService -> handle_present_proof -> payload", payload)
        //TODO
    }
    handle_basicmessages = async (payload: BasicMessagesPayload) => {
        console.log("UITAgentService -> handle_basicmessages -> payload", payload)
        //TODO
    }
}
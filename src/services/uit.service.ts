import { Request, Response } from 'express';
import { BaseAgentService } from './agent';
import { RegisterSchemasDTO } from '../dtos';
import { getGenesisTxns } from '../utils';
import { SEED, AGENT_MODULE, WEB_HOOK_URL } from '../constant';
import { IssueCredentialPayload, PresentProofPayload, ConnectionsPayload, BasicMessagesPayload, SendProofRequestPayload } from '../interface';
import { generate } from 'randomstring';
import { V10CredentialExchange, IndyProofReqAttrSpec, IndyProofReqPredSpec, IndyProofRequest, V10PresentationRequestRequest, V10PresentationExchange, ConnectionRecord, V10CredentialProblemReportRequest } from 'src/interface/api';
import { v4 } from 'uuid';
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
  public async buildAndSendProofRequest(connection_id: string, payload: SendProofRequestPayload) {
    const reqAttrs: IndyProofReqAttrSpec[] = payload.requested_attributes
    const reqPreds: IndyProofReqPredSpec[] = payload.requested_predicates
    let requested_attributes = {}
    let requested_predicates = {}
    reqAttrs.forEach(attr => {
      const key = `0_${attr.name}_uuid`;
      requested_attributes[key] = attr;
    });
    if (reqPreds.length > 0)
      reqPreds.forEach(predicate => {
        const key = `0_${predicate.name}_GE_uuid`;
        requested_predicates[key] = predicate;
      });
    const indy_proof_request: IndyProofRequest = {
      "name": payload.proof_request_name,
      "version": "1.0",
      "nonce": (Math.random() * 1e20).toString() + Math.floor(Math.random() * 1e20).toString(),
      "requested_attributes": requested_attributes,
      "requested_predicates": requested_predicates
    }
    const proofRequest: V10PresentationRequestRequest = {
      "connection_id": connection_id,
      "proof_request": indy_proof_request,
    }
    const response = await this.sendProofRequest(proofRequest);
    return response;
  }
  /**
   * @param message payload of agent
   * @description webhook handler for connections
   */
  handle_connections = async (message: ConnectionRecord) => {
    const state = message.state;
    if (message["connection_id"] === this.connectionId) {
      console.log("connection_id:", this.connectionId);
      switch (state) {
        case "invitation":
          console.log("invitation created");
          break;
        case "request":
          console.log("request created");
          break;
        case "response":
          // const resp = await this.sendTrustPing(this.connectionId, { comment: "Ping connection" });
          console.log("response received");
          break;
        case "active":
          console.log("connection active");
          console.log(`Connected to ${message["their_label"]}`);
          break;
        case "inactive":
          console.log("connection inactive");
          break;
        case "error":
          console.log("connection error");
          break;
        default:
          break;
      }
    }
  }

  handle_issue_credential = async (payload: V10CredentialExchange) => {
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
          credential_preview: payload.credential_proposal_dict["credential_proposal"],
          comment: payload.credential_proposal_dict["comment"]
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
  handle_present_proof = async (payload: V10PresentationExchange) => {
    console.log("UITAgentService -> handle_present_proof -> payload", payload)
    switch (payload.state) {
      case "presentation_received":
        console.log(`Verifying proof provided by X`);
        const proof = await this.verifyPresentation(payload.presentation_exchange_id);
        console.log(JSON.stringify(proof));
        break;
      case "presentation_sent":
        console.log("presentation_sent");
        break;
      case "request_received":
        console.log("request_received");
        break;
      case "request_sent":
        console.log("request_sent");
        break;
      case "verified":
        console.log("proof is verified");
        break;
      case "proposal_sent":
        console.log("proposal_sent");
        break;
      case "proposal_received":
        console.log("proposal_received");
        break;
      default: break;
    }
  }
  handle_basicmessages = async (payload: BasicMessagesPayload) => {
    console.log("UITAgentService -> handle_basicmessages -> payload", payload)
    //TODO
  }
  handle_problem_report = async (payload: V10CredentialProblemReportRequest) => {
    console.log("UITAgentService -> handle_problem_report -> payload", payload)
  }
}
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { IndyProofReqAttrSpec, IndyProofReqPredSpec } from './api';
export * from './webhook-payload';
export interface AppOptions {
    port: number | string;
    middlewares: any
    controllers: any
}
export interface IBaseController {
}
export interface IBaseAgent {
    agentName: string
    internalHost: string
    externalHost: string
    adminURL: string
    requestPath: string
    genesisData: string
    seed: string
    adminRequest: (requestPath: string, config: AxiosRequestConfig) => Promise<any>
}
export interface AgentOptions {
    agentName: string
    httpPort: string | number
    adminPort: string | number
    args?: Array<any>
    internalHost?: string
    externalHost?: string
    genesisData?: string
    seed?: string
    timing?: string
    timingLog?: string
    usePostgres?: Boolean
}
export interface CreatedSchema {
    schema_id: string
}
export interface FilterSchema {
    schema_id?: string
    schema_issuer_did?: string
    schema_name?: string
    schema_version?: string
}
export interface ConnectionInvitationQuery {
    alias?: string
    accept?: string
    public?: string
    multi_use?: string
}

export interface InvitationQuery {
    alias: string,
    accept: "manual" | "auto"
}
export interface CredentialDefinitionsCreatedParams {
    schema_id?: string
    schema_issuer_did?: string
    schema_name?: string
    schema_version?: string
    issuer_did?: string
    cred_def_id?: string
}
export interface SendProofRequestPayload {
    requested_attributes: IndyProofReqAttrSpec[],
    requested_predicates: IndyProofReqPredSpec[],
    proof_request_name: string
    comment: string
}
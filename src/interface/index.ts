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
    alias: string | any,
    accept: "manual" | "auto" | any
}
export interface CredentialDefinitionsCreatedParams {
    schema_id?: string | any
    schema_issuer_did?: string | any
    schema_name?: string | any
    schema_version?: string | any
    issuer_did?: string | any
    cred_def_id?: string | any
}
export interface SendProofRequestPayload {
    requested_attributes: IndyProofReqAttrSpec[],
    requested_predicates: IndyProofReqPredSpec[],
    proof_request_name: string
    comment: string
}

export interface ApplicantRequestPayload {
    name: string | any
    date_of_birth: Date | any
    email: string | any
    address: string | any
    is_ssi_support: boolean | any
    position: string | any 
    phone_number: string | any
    school: string | any
}
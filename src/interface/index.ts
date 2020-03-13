import { AxiosResponse, AxiosRequestConfig } from 'axios';
export interface AppOptions {
    port: number | string;
    middlewares: any
    controllers: any
}
export interface IBaseController {
    initRoutes(): any
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
    registerDID: (ledgerURL: string, alias: string) => Promise<void>
    registerSchema: (schemaName: string, schemaVersion: string | number, schemaAttrs: string[]) => Promise<CreatedSchema>
    createCredentialsDefinition: (schemaId: string) => Promise<AxiosResponse>
    getAllSchemas: () => Promise<AxiosResponse>
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
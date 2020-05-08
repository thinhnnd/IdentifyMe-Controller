import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { flatMapDeep } from 'lodash';
import { spawn } from 'child_process';
import { performance } from 'perf_hooks';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { DEFAULT_INTERNAL_HOST, DEFAULT_EXTERNAL_HOST, LEDGER_URL, DEFAULT_POSTGRES, START_TIMEOUT, RUNMODE, WEB_HOOK_URL } from '../constant';
import { IBaseAgent, AgentOptions, ConnectionInvitationQuery, FilterSchema, InvitationQuery, CredentialDefinitionsCreatedParams, IssueCredentialPayload, BasicMessagesPayload, PresentProofPayload, ConnectionsPayload } from '../interface/index';
import { InvitationResult, ConnectionRecord, ConnectionInvitation, CredentialDefinitionSendRequest, CredentialDefinitionGetResults, CredentialDefinitionSendResults, SchemaSendRequest, SchemaSendResults, SchemasCreatedResults, V10CredentialOfferRequest, V10CredentialExchange, ConnectionList, CredentialDefinitionsCreatedResults, SchemaGetResults, V10PresentationExchange, V10PresentationRequestRequest, PingRequest, V10PresentationExchangeList } from '../interface/api';
import * as cors from 'cors';
import * as socketIO from 'socket.io';
import { createServer } from 'http';
export class BaseAgentService implements IBaseAgent {
    /*Agent name */
    agentName: string;

    /*Host*/
    internalHost: string;
    externalHost: string;
    adminURL: string;
    endpoint: string;
    webhookURL: string;

    /*Port*/
    httpPort: number | string;
    webhookPort: number | string;
    adminPort: number | string;

    /*Data */
    genesisData: string;
    seed: string;
    connectionId: string;
    requestPath: string;

    /* Ledger */
    storageType: string;
    walletType: string;
    walletName: string;
    walletKey: string;
    did: string;
    /*Stats */
    timing: string
    timingLog: string

    usePostgres: Boolean
    extractArgs: Array<string>
    postgresConfig = {}
    constructor(agentOpts: AgentOptions) {
        this.agentName = agentOpts.agentName;
        this.internalHost = agentOpts.internalHost || DEFAULT_INTERNAL_HOST;
        this.externalHost = agentOpts.externalHost || DEFAULT_EXTERNAL_HOST;
        this.adminURL = `http://${this.internalHost}:${agentOpts.adminPort}`;
        this.endpoint = RUNMODE === 'docker' ?
            `http://${this.externalHost}:${agentOpts.httpPort}` :
            `http://${this.externalHost.replace('{PORT}', agentOpts.httpPort.toString())}`;
        this.genesisData = agentOpts.genesisData;
        this.webhookURL = WEB_HOOK_URL || '';
        this.webhookPort = '';
        this.httpPort = agentOpts.httpPort;
        this.adminPort = agentOpts.adminPort;
        this.seed = agentOpts.seed ? agentOpts.seed : 'my_seed_000000000000000000000010';
        this.timing = agentOpts.timing;
        this.timingLog = agentOpts.timingLog;
        this.did = '';
        this.usePostgres = !agentOpts.usePostgres ? DEFAULT_POSTGRES : agentOpts.usePostgres;
        this.storageType = agentOpts.args['storageType'];
        this.walletType = agentOpts.args.hasOwnProperty('walletType') ? agentOpts.args['walletType'] : 'indy';
        this.walletName = agentOpts.args.hasOwnProperty('walletName') ? agentOpts.args['walletName'] : this.agentName.toLowerCase() + '-wallet';
        this.walletKey = agentOpts.args.hasOwnProperty('walletKey') ? agentOpts.args['walletKey'] : this.agentName.toLowerCase() + '-wallet-key';
        this.extractArgs = agentOpts.args;
        this.postgresConfig = {
            'url': `${this.internalHost}:5432`,
            'tls': 'None',
            'max_connections': 5,
            'min_idle_time': 0,
            'connection_timeout': 10,
        }
    }


    postgreCreds = {
        'account': process.env.POSTGRES_ACCOUNT,
        'password': process.env.POSTGRES_PASSWORD,
        'admin_account': process.env.POSTGRES_ADMIN_ACCOUNT,
        'admin_password': process.env.POSTGRES_ADMIN_PASSWORD,
    }
    //#region Admin request
    async adminRequest(requestPath: string, config: AxiosRequestConfig) {
        try {
            config.baseURL = this.adminURL;
            config.url = requestPath;
            const response = await Axios.request(config);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
    //#endregion

    //#region DID 
    async registerDID(ledgerURL: string = '', alias: string = ''): Promise<void> {
        console.log(`Registering agent ${this.agentName} with seed ${this.seed}`);
        ledgerURL = LEDGER_URL || `http://${this.externalHost}:9000`;
        const data = {
            alias: alias || this.agentName,
            seed: this.seed,
            role: 'TRUST_ANCHOR'
        }
        try {
            const response = await Axios.post(`${ledgerURL}/register`, data);
            if (response.data) {
                this.did = response.data['did']
            }
        } catch (error) {
            console.log(error.message);
            throw new Error('Error while registering did for agent: ' + this.agentName);
        }
    }
    //#endregion

    //#region Credentials Definition 
    private async createCredentialsDefinition(body: CredentialDefinitionSendRequest)
        : Promise<CredentialDefinitionSendResults> {
        const crefDef: CredentialDefinitionSendResults = await this.adminRequest('/credential-definitions', { method: 'POST', data: body });
        return crefDef;
    }
    async getCredDef(crefDefId: string): Promise<CredentialDefinitionGetResults> {
        try {
            const response = await this.adminRequest('/credential-definitions/' + crefDefId, { method: 'GET' });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getAllCredentialDefinitions() {
        try {
            const response: CredentialDefinitionsCreatedResults = await this.adminRequest('/credential-definitions/created', { method: 'GET' });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getSpecialCredDef(params: CredentialDefinitionsCreatedParams) {
        try {
            const response: CredentialDefinitionsCreatedResults = await
                this.adminRequest('/credential-definitions/created', {
                    method: 'GET',
                    params: { ...params }
                });
            return response;
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    //#region Schemas
    async registerSchemaAndCredDef(schemaBody: SchemaSendRequest) {
        try {
            const data: SchemaSendResults = await this.adminRequest('/schemas', { method: 'POST', data: schemaBody });
            //create credential definition
            const credDefforSchema = await this.createCredentialsDefinition({ schema_id: data.schema_id, tag: `${this.agentName}_default` });
            return { data, credDefforSchema };
        } catch (error) {
            throw error;
        }
    }
    async getAllSchemas(filter: FilterSchema) {
        try {
            const schemas: SchemasCreatedResults = await this.adminRequest('/schemas/created', { method: 'GET', params: filter });
            return schemas;
        } catch (error) {
            throw error;
        }
    }
    async getAllSchemasOfIssuer(issuerDid: string) {
        try {
            const schemas: SchemasCreatedResults = await this.adminRequest('/schemas/created', { method: 'GET', params: { schema_issuer_did: issuerDid } });
            return schemas;
        } catch (error) {
            throw error;
        }
    }
    async getSchema(schemaId: string) {
        try {
            const schemas: SchemaGetResults = await this.adminRequest('/schemas/' + schemaId, { method: 'GET' });
            return schemas;
        } catch (error) {

        }
    }
    //#endregion

    //#region Connections
    async createConnectionInvitation(query: ConnectionInvitationQuery): Promise<InvitationResult> {
        const result: InvitationResult = await this.adminRequest('/connections/create-invitation', { method: 'POST', params: query });
        this.connectionId = result.connection_id;
        console.log("Invitation:", result);
        return result;
    }
    async receiveConnectionInvitation(
        body: ConnectionInvitation,
        query?: InvitationQuery
    ): Promise<ConnectionRecord> {
        const response: ConnectionRecord = await this.adminRequest('/connections/receive-invitation', {
            method: 'POST',
            data: body,
            params: {
                alias: query.alias,
                accept: query.accept
            }
        });
        return response;
    }
    async acceptInvitation(connectionId: string): Promise<AxiosResponse<ConnectionRecord>> {
        return await this.adminRequest(`/connections/${connectionId}/accept-invitation`, { method: 'POST' });
    }
    async removeConnection(connectionId: string) {
        return await this.adminRequest(`/connections/${connectionId}/remove`, { method: 'POST' });
    }
    async fetchConnectionRecord(connectionId: string): Promise<AxiosResponse<ConnectionRecord>> {
        return await this.adminRequest(`/connections/${connectionId}`, { method: 'GET' });
    }
    async getConnections() {
        const result: ConnectionList = await this.adminRequest(`/connections`, { method: 'get' });
        return result;
    }
    async sendTrustPing(connectionId: string, body: PingRequest) {
        try {
            const response = await this.adminRequest(`/connections/${connectionId}/send-ping`, {
                method: "POST",
                data: body
            });
            console.log("BaseAgentService -> sendTrustPing -> response", response)
            return response
        } catch (error) {
            console.log("BaseAgentService -> sendTrustPing -> error", error)
        }

    }
    //#endregion

    //#region cloud agent process
    private async getAgentArgs(): Promise<string[]> {
        const options = [
            ['--endpoint', this.endpoint],
            ['--label', this.agentName],
            '--auto-ping-connection',
            '--auto-respond-messages',
            ['--inbound-transport', 'http', '0.0.0.0', this.httpPort.toString()],
            ['--outbound-transport', 'http'],
            ['--admin', '0.0.0.0', this.adminPort.toString()],
            '--admin-insecure-mode',
            ['--wallet-type', this.walletType],
            ['--wallet-name', this.walletName],
            ['--wallet-key', this.walletKey],
            ['--preserve-exchange-records']
        ];
        if (this.genesisData) options.push(['--genesis-transactions', this.genesisData])
        if (this.seed) options.push(['--seed', this.seed])
        if (this.storageType) options.push(['--storage-type', this.storageType])
        if (this.timing) options.push(['--timing'])
        if (this.timingLog) options.push(['--timing-log', this.timingLog]);
        if (this.usePostgres) {
            options.push([
                '--wallet-storage-type', 'postgres_storage',
                '--wallet-storage-config', JSON.stringify(this.postgresConfig),
                '--wallet-storage-creds', JSON.stringify(this.postgreCreds)
            ])
        }
        if (this.webhookURL) options.push(['--webhook-url', this.webhookURL]);
        if (this.extractArgs) options.push(this.extractArgs);
        return flatMapDeep(options);
    }
    async startProcess() {
        console.log('Starting agent ' + this.agentName);
        const options = await this.getAgentArgs();
        const spawnOptions = {
            stdio: 'inherit' //use for checking error in parent stdio 
        }
        const childProcess = spawn('aca-py', ['start', ...options]);
        childProcess.stdout.on('data', data => {
            console.log(`Agent ${this.agentName} started` + data.toString());
        });
        childProcess.stderr.on('data', data => {
            console.log(`Stderr: ${data.toString()}`);
        });
        childProcess.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
            process.exit(code);
        });
        childProcess.on("error", (err) => {
            console.log("Child Process error:", err);
        });
    }
    async detectProcess(): Promise<void> {
        function sleep(milliseconds: number) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }
        let statusText: any;
        const statusURL = this.adminURL + '/status';
        const start = performance.now() / 1000;
        //health check
        while (performance.now() / 1000 - start < START_TIMEOUT) {
            try {
                const resp = await Axios.get(statusURL, { timeout: 3 });
                if (resp.status === 200) {
                    statusText = resp.data;
                    break;
                }
            } catch (error) {
                if (error.isAxiosError) continue;
                console.log(error);
            }
            sleep(500);
        }
        try {
            if (!statusText) throw new Error(`Timed out waiting for agent process to start.Admin URL: ${statusURL}`);
            if (!statusText.version) throw new Error(`Unexpected response from agent process. Admin URL: ${statusURL}`);
            console.log(`${this.agentName} has been started`);
        } catch (error) {
            console.log(error);
        }
    }
    //#endregion

    //#region webhook handler
    async webhookListeners(webhookPort: number) {
        this.webhookPort = webhookPort;
        if (RUNMODE === 'pwd') this.webhookURL = `http://localhost:${webhookPort}/webhooks`;
        else `http://${this.externalHost}:${webhookPort}/webhooks`;
        const app = express();
        const webhookServer = createServer(app);
        const io = socketIO.listen(webhookServer, { origins: '*:*' })
        app.set('io', io);
        const path = [
            '/webhooks/topic/connections',
            '/webhooks/topic/issue_credential',
            '/webhooks/topic/basicmessages',
            '/webhooks/topic/present_proof',
            '/webhooks/topic/problem_report'
        ]
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        console.log("io instance origins", io.origins());
        io.on("connection", socket => {
            console.log("Connected in webhook socket");
            socket.emit("connected", "message from webhook server");
        });
        app.get("/", (req, res) => {
            res.send("Webhook is running");
        });
        const connNotifiedArray = [];
        const stateNotified = ["active", "response"];
        app.post(path, async (req: express.Request, res: express.Response) => {
            const topic = req.path.split('/')[3];
            //message in DIDComm
            let payload: V10PresentationExchange | V10CredentialExchange | BasicMessagesPayload | ConnectionRecord;
            payload = req.body;
            const socketIo: socketIO.Server = req.app.get('io');
            //shared web hook handler
            if (topic === "connections") {
                if (stateNotified.includes(payload.state) && !connNotifiedArray.includes(payload.connection_id)) {
                    console.log("SSI Client accepting invitation, notify for UI client with id " + payload.connection_id);
                    connNotifiedArray.push(payload.connection_id);
                    socketIo.sockets.emit(payload.connection_id, payload);
                }
                if (payload.state === "inactive") {
                    //TODO remove in connNotifiedArray if connection is inactive
                }
            }
            else if (topic === "proof_request" && payload.state === "verified") {
                const presentationExchange = payload as V10PresentationExchange
                if (presentationExchange.verified) {
                    const id = presentationExchange.presentation_exchange_id;
                    console.log('Presentation Exchange verified');
                    socketIo.sockets.emit(`proof_verified_${id}`, presentationExchange);
                }
            }
            try {
                await this.processHandler(topic, payload);
                return res.sendStatus(200);
            } catch (error) {
                console.log(error);
            }
        });
        webhookServer.listen(webhookPort, '0.0.0.0', () => console.log('Webhook listening on port:', webhookPort));
    }
    /**
     * 
     * @param topic Name of the handler function, start with `handle_*`
     * @example 'handle_connections'
     */
    async processHandler(topic: string, payload: any) {
        if (topic !== 'webhook') {
            const handler = `handle_${topic}`;
            const methodHandler: Function = this[handler];
            if (methodHandler) {
                await methodHandler(payload);
            }
            else console.log(`${new Date().toUTCString()} Agent ${this.agentName} has no method ${handler} to handle webhook on topic ${topic}`)
        }
    }
    //#endregion

    //#region  Issue Credential

    public async issuerSendOffer(offerRequest: V10CredentialOfferRequest) {
        const response: V10CredentialExchange = await this.adminRequest('/issue-credential/send-offer', {
            method: "post",
            data: offerRequest
        });
        return response;
    }
    //#endregion

    //#region Present Proof

    public async sendProofRequest(proofRequest: V10PresentationRequestRequest) {
        const response: V10PresentationExchange = await this.adminRequest(`/present-proof/send-request`, {
            method: 'POST',
            data: proofRequest
        })
        return response;
    }
    public async verifyPresentation(presentation_exchange_id: string) {
        const response: V10PresentationExchange = await this.adminRequest(`/present-proof/records/${presentation_exchange_id}/verify-presentation`,
            {
                method: 'POST'
            });
        return response;
    }
    public async getProofRequests() {
        const response: V10PresentationExchangeList = await this.adminRequest(`/present-proof/records`,
            {
                method: 'GET'
            });
        return response;
    }
    //#endregion
    //#region health check
    async fetchTiming() {
        const resp = await this.adminRequest('/timing', { method: 'GET' });
        return resp.data['timing'];
    }
    async resetTiming() {
        await this.adminRequest("/status/reset", { method: 'POST' })
    }
    //#endregion


    //#region 

    //#endregion
}
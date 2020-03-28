import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { flatMapDeep } from 'lodash';
import { spawn } from 'child_process';
import { performance } from 'perf_hooks';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { DEFAULT_INTERNAL_HOST, DEFAULT_EXTERNAL_HOST, LEDGER_URL, DEFAULT_POSTGRES, START_TIMEOUT, RUNMODE, WEB_HOOK_URL } from '../constant';
import { IBaseAgent, AgentOptions, ConnectionInvitationQuery, FilterSchema, InvitationQuery } from '../interface/index';
import { InvitationResult, ConnectionRecord, ConnectionInvitation, CredentialDefinitionSendRequest, CredentialDefinitionGetResults, CredentialDefinitionSendResults, SchemaSendRequest, SchemaSendResults, SchemasCreatedResults } from '../interface/api';

const web = express();

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
    async adminRequest(requestPath: string, config: AxiosRequestConfig) {
        try {
            config.baseURL = this.adminURL;
            config.url = requestPath;
            console.log("BaseAgentService -> adminRequest -> config", config)

            const response = await Axios.request(config);
            return response.data;
        } catch (error) {
            throw error;
        }

    }
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
                console.log("BaseAgentService -> response.data:", response.data);
                this.did = response.data['did']
            }
        } catch (error) {
            console.log(error.message);
            throw new Error('Error while registering did for agent: ' + this.agentName);
        }
    }

    /* Credentials Definition */
    async createCredentialsDefinition(body: CredentialDefinitionSendRequest)
        : Promise<AxiosResponse<CredentialDefinitionSendResults>> {
        return await this.adminRequest('/credential-definitions', { method: 'POST', data: body });
    }
    async getCredDef(crefDefId: string)
        : Promise<AxiosResponse<CredentialDefinitionGetResults>> {
        return await this.adminRequest('/credential-definitions/' + crefDefId, { method: 'GET' });
    }

    /* SCHEMA */
    async registerSchema(schemaBody: SchemaSendRequest) {
        console.log("BaseAgentService -> registerSchema -> schemaBody", schemaBody)
        try {
            const data: SchemaSendResults = await this.adminRequest('/schemas', { method: 'POST', data: schemaBody });
            return data;
        } catch (error) {
            console.error('RegisterSchema Agent Error' + error.message);
        }
    }
    async getAllSchemas(filter: FilterSchema) {
        const schemas: SchemaSendResults[] = await this.adminRequest('/schemas/created/', { method: 'GET', params: { ...filter } });
        return schemas;
    }
    async getAllSchemasOfIssuer(issuerDid: string) {
        return await this.adminRequest('/schemas/created/', { method: 'GET', params: { schema_issuer_did: issuerDid } });
    }

    /* Connection */
    async createConnectionInvitation(query: ConnectionInvitationQuery): Promise<InvitationResult> {
        const result: InvitationResult = await this.adminRequest('/connections/create-invitation', { method: 'POST', params: query });
        this.connectionId = result.connection_id;
        console.log("Invitation:", result);
        return result;
    }
    async reciveConnectionInvitation(
        query: InvitationQuery,
        body: ConnectionInvitation
    ): Promise<AxiosResponse<ConnectionRecord>> {
        return await this.adminRequest('/connections/recive-invitation', {
            method: 'POST',
            data: body,
            params: {
                alias: query.alias,
                accept: query.accept
            }
        });
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
    async webhookListeners(webhookPort: number) {
        this.webhookPort = webhookPort;
        if (RUNMODE === 'pwd') this.webhookURL = `http://localhost:${webhookPort}/webhooks`;
        else `http://${this.externalHost}:${webhookPort}/webhooks`;
        const app = express();
        const path = ['/webhooks/topic/connections', '/webhooks/topic/issue_credential', '/webhooks/topic/basicmessages', '/webhooks/topic/present_proof']
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.post(path, async (req: express.Request, res: express.Response) => {
            const topic = req.path.split('/')[3];
            console.log(`[${new Date().toUTCString()}] WebhookListeners -> topic`, topic);
            const payload = req.body;
            console.log(`[${new Date().toUTCString()}] WebhookListeners -> payload`, payload);
            try {
                await this.processHandler(topic, payload);
                return res.status(200);
            } catch (error) {
                console.log(error);
            }
        });
        app.listen(webhookPort, '0.0.0.0', () => console.log('Webhook listening on port ', webhookPort));
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
                console.log(`${new Date().toUTCString()} Agent called controller webhook: ${handler} with payload ${JSON.stringify(payload)}`);
                await methodHandler(payload);
            }
            else console.log(`${new Date().toUTCString()} Agent ${this.agentName} has no method ${handler} to handle webhook on topic ${topic}`)
        }
    }
    async fetchTiming() {
        const resp = await this.adminRequest('/timing', { method: 'GET' });
        return resp.data['timing'];
    }
    async resetTiming() {
        await this.adminRequest("/status/reset", { method: 'POST' })
    }
}
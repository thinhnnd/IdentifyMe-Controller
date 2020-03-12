import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DEFAULT_INTERNAL_HOST, DEFAULT_EXTERNAL_HOST, LEDGER_URL, DEFAULT_POSTGRES } from '../constant';
import { IBaseAgent, AgentOptions } from '../interface/index';
import { flatMapDeep } from 'lodash';
import { spawn } from 'child_process';
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
    constructor(
        // agentName: string,
        // httpPort: string | number,
        // adminPort: string | number,
        // args: Array<any> = [],
        // internalHost: string = '',
        // externalHost: string = '',
        // genesisData: string = '',
        // seed: string = '',
        // timing: string = '',
        // timingLog: string = '',
        // usePostgres: Boolean = null
        agentOpts: AgentOptions
    ) {
        this.agentName = agentOpts.agentName;
        this.internalHost = agentOpts.internalHost || DEFAULT_INTERNAL_HOST;
        this.externalHost = agentOpts.externalHost || DEFAULT_EXTERNAL_HOST;
        this.adminURL = `http://${this.internalHost}:${agentOpts.adminPort}`;
        this.endpoint = `${this.externalHost}:${agentOpts.httpPort}`;
        this.genesisData = agentOpts.genesisData;
        this.webhookURL = '';
        this.webhookPort = '';
        this.seed = agentOpts.seed ? agentOpts.seed : 'my_seed_000000000000000000000010';
        this.timing = agentOpts.timing;
        this.timingLog = agentOpts.timingLog;
        this.did = '';
        this.usePostgres = !agentOpts.usePostgres ? DEFAULT_POSTGRES : agentOpts.usePostgres;
        this.storageType = agentOpts.args['storageType'];
        this.walletType = agentOpts.args.hasOwnProperty('walletType') ? agentOpts.args['walletType'] : 'indy';
        this.walletName = agentOpts.args.hasOwnProperty('walletName') ? agentOpts.args['walletName'] : this.agentName + '-wallet';
        this.walletKey = agentOpts.args.hasOwnProperty('walletKey') ? agentOpts.args['walletKey'] : this.agentName + '-wallet-key';
        this.extractArgs = agentOpts.args;
    }
    postgresConfig = {
        'url': `${this.internalHost}:5432`,
        'tls': 'None',
        'max_connections': 5,
        'min_idle_time': 0,
        'connection_timeout': 10,
    }

    postgreCreds = {
        'account': process.env.POSTGRES_ACCOUNT,
        'password': process.env.POSTGRES_PASSWORD,
        'admin_account': process.env.POSTGRES_ADMIN_ACCOUNT,
        'admin_password': process.env.POSTGRES_ADMIN_PASSWORD,
    }
    async adminRequest(requestPath: string, config: AxiosRequestConfig) {
        config.baseURL = this.adminURL;
        config.url = requestPath;
        return await Axios.request(config);
    }
    async registerDID(ledgerURL: string = '', alias: string = ''): Promise<void> {
        console.log(`Registering agent ${this.agentName} with seed ${this.seed}`);
        console.log(this);

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
    async registerSchema(schemaName: string, schemaVersion: string | number, schemaAttrs: string[]) {
        const schemaBody = {
            'schema_name': schemaName,
            'schema_version': schemaVersion,
            'attributes': schemaAttrs,
        }
        try {
            return await this.adminRequest('/schemas', { method: 'POST', data: schemaBody });
        } catch (error) {
            console.error(error.message + 'RegisterSchema Agent Error');
        }
    }
    async createCredentialsDefinition(schemaId: string) {
        const credDefBody = {
            'schema_id': schemaId
        };
        return await this.adminRequest('/credential-definitions', { method: 'POST', data: credDefBody });
    }
    async getAllSchemas() {
        // TODO: get all schemas on Ledger
        return Axios.get('')
    }
    async getAllSchemasOfAgent(did: string) {
        // TODO: get all schemas on Ledger of agent 
        return Axios.get('');
    }
    async getAgentArgs(): Promise<string[]> {
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
        if (this.genesisData) options.push(['--genesis-data', this.genesisData])
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
        const childProcess = spawn('aca-py', ['start', ...options]);
        childProcess.stdout.on('data', data => {
            console.log(data.toString(), 'ACA-Py');
        });
        childProcess.stderr.on('close', () => {
            console.error('Error while starting process', 'ACA-Py');
        })
    }
    async fetchStatus() {
        const statusURL = this.adminURL + '/status';
        const resp = await Axios.get(statusURL, { timeout: 30 });
        const statusText = resp.data;
        if (!statusText) throw new Error(`Timed out waiting for agent process to start.
        Admin URL: ${statusURL}`);
        try {
            const statusJSON = JSON.parse(statusText);
            if (!statusJSON['version']) throw new Error(`Unexpected response from agent process. Admin URL: ${statusURL}`)
            return statusJSON;
        } catch (error) {
            console.log(error);
            throw error;
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
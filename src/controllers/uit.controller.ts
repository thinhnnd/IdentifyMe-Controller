import { Request, Response, Router } from 'express';
import { IBaseController, ConnectionInvitationQuery, CredentialDefinitionsCreatedParams, FilterSchema } from '../interface';
import { UITAgentService } from '../services/uit.service';
import { AGENT_PORT, ADMIN_PORT } from '../constant';
import { SchemaSendRequest, V10CredentialOfferRequest, CredentialPreview, CredentialDefinitionGetResults, CredentialDefinitionsCreatedResults, SchemasCreatedResults, SchemaGetResults } from 'src/interface/api';
export class UITController implements IBaseController {
    public path = '/';
    public router = Router();
    private agentService: UITAgentService = new UITAgentService(AGENT_PORT, AGENT_PORT + 1, false);
    constructor() {
        this.initRoutes();
        this.agentService.bootstrap();
    }
    public initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> This agent is ${this.agentService.agentName}</h1>`);
        });
        this.createConnInvitationRoute();
        this.createSchemasRoute();
        this.issueCredentialRoute();
        this.getConnections();
        this.getSchemaById();
        this.getAllSchemas();
        this.findSchemas();

        this.getAllCredentialDefinitions();
        this.getCredentialDefinitionsByFilter();
        this.getCredentialDefinitionsById();
    }
    /**
     * @description Create a new connection invitation and set it into current connection via connectionId.
     */
    private async createConnInvitationRoute() {
        this.router.post('/connections', async (req: Request, res: Response) => {
            try {
                const query: ConnectionInvitationQuery = {
                    alias: req.body.alias,
                    accept: req.body.accept,
                    multi_use: req.body.multi_use,
                    public: req.body.public,
                }
                const result = await this.agentService.createConnectionInvitation(query);
                console.log(`result: ${result}`);
                res.json(result);
            } catch (error) {
                res.json(error);
            }
        })
    }
    private async issueCredentialRoute() {
        this.router.post('/issue-credential/send-offer', async (req, res) => {
            try {
                const credentialPreview: CredentialPreview = {
                    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
                    attributes: req.body.attributes
                }
                const offer: V10CredentialOfferRequest = {
                    connection_id: req.body.connection_id,
                    credential_preview: credentialPreview,
                    auto_issue: req.body.auto_issue,
                    cred_def_id: req.body.cred_def_id,
                    comment: req.body.comment,
                    auto_remove: req.body.auto_remove,
                    revoc_reg_id: req.body.revoc_reg_id,
                }
                const result = await this.agentService.issuerSendOffer(offer);
                console.log(result);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })
    }
    private async getConnections() {
        this.router.get('/connections', async (req, res) => {
            const connections = await this.agentService.getConnections();
            res.json(connections);
        })
    }
    private async createSchemasRoute() {
        this.router.post('/schemas', async (req, res) => {
            try {
                const body: SchemaSendRequest = {
                    attributes: req.body.attributes,
                    schema_name: req.body.schema_name,
                    schema_version: req.body.schema_version,
                }
                const result = await this.agentService.registerSchemaAndCredDef(body);
                console.log("UITController -> createSchemas -> result", { ...result });
                res.json({ ...result.data, ...result.credDefforSchema });
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })
    }
    private async getSchemaById() {
        this.router.get("/schema/:schema_id", async (req, res) => {
            const schemaId = req.params.schema_id;
            try {
                const schema = await this.agentService.getSchema(schemaId);
                const crefDef = await this.agentService.getSpecialCredDef({ schema_id: schemaId });
                const result = {
                    schema_json: { ...schema.schema_json, credential_definition_id: crefDef.credential_definition_ids[0] }
                }
                res.json(result);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        });
    }
    private async getAllSchemas() {
        this.router.get("/schemas", async (req, res) => {
            try {
                const schema = await this.agentService.getAllSchemas({ schema_issuer_did: this.agentService.did });
                //Get the credential_definition_id for each schema
                // const result = await Promise.all(schema.schema_ids.map(async schemaId => {
                //     const credDef = await this.agentService.getSpecialCredDef({ schema_id: schemaId });
                //     return {
                //         schema_id: schemaId,
                //         credential_definition_ids: credDef.credential_definition_ids[0]
                //     }
                // }));
                res.json(schema);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        });
    }
    private async findSchemas() {
        this.router.get("/schemas", async (req, res) => {
            try {
                const filter: FilterSchema = {
                    schema_id: req.body.schema_id,
                    schema_issuer_did: req.body.schema_issuer_did,
                    schema_name: req.body.schema_name,
                    schema_version: req.body.schema_version,
                }
                const schema = await this.agentService.getAllSchemas(filter);
                res.json(schema);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        });
    }
    private async getAllCredentialDefinitions() {
        this.router.get('/credential-definitions', async (req, res) => {
            try {
                const result = await this.agentService.getAllCredentialDefinitions();
                res.json(result);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })
    }
    private async getCredentialDefinitionsByFilter() {
        this.router.get('/credential-definitions-filter', async (req, res) => {
            const params: CredentialDefinitionsCreatedParams = {
                schema_id: req.query.schema_id,
                schema_issuer_did: req.query.schema_issuer_did,
                schema_name: req.query.schema_name,
                schema_version: req.query.schema_version,
                issuer_did: req.query.issuer_did,
                cred_def_id: req.query.cred_def_id,
            };
            try {
                const result = await this.agentService.getSpecialCredDef(params);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })
    }
    private async getCredentialDefinitionsById() {
        this.router.get('/credential-definition/:credential_definition_id', async (req, res) => {
            const credential_definition_id = req.params.credential_definition_id;
            try {
                const result = await this.agentService.getCredDef(credential_definition_id)
                res.json(result);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })
    }
}
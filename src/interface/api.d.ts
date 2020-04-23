export interface AMLRecord {
    amlContext?: string;
    version?: string;
    aml?: {
        [name: string]: string;
    };
}
export interface AdminModules {
    /**
     * List of admin modules
     */
    result?: string[];
}
export interface AdminStatus {
}
export interface ConnectionInvitation {
    /**
     * List of recipient keys
     */
    recipientKeys?: string /* ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$ */ [];
    /**
     * DID for connection invitation
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Optional image URL for connection invitation
     * example:
     * http://192.168.56.101/img/logo.jpg
     */
    imageUrl?: string; // url
    /**
     * Message identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    "@id"?: string;
    /**
     * Service endpoint at which to reach this agent
     * example:
     * http://192.168.56.101:8020
     */
    serviceEndpoint?: string;
    /**
     * List of routing keys
     */
    routingKeys?: string /* ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$ */ [];
    /**
     * Optional label for connection
     * example:
     * Bob
     */
    label?: string;
    /**
     * Message type
     * example:
     * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/my-family/1.0/my-message-type
     */
    readonly "@type"?: string;
}
export interface ConnectionList {
    /**
     * List of connection records
     */
    results?: ConnectionRecord[];
}
export interface ConnectionRecord {
    /**
     * Invitation mode: once, multi, or static
     * example:
     * once
     */
    invitation_mode?: "once" | "multi" | "static";
    /**
     * Connection initiator: self, external, or multiuse
     * example:
     * self
     */
    initiator?: "self" | "external" | "multiuse";
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    /**
     * Inbound routing connection id to use
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    inbound_connection_id?: string;
    /**
     * Optional alias to apply to connection for later use
     * example:
     * Bob, providing quotes
     */
    alias?: string;
    /**
     * Time of record creation
     * example:
     * 2020-03-16 01:28:09Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Their DID for connection
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    their_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Current record state
     * example:
     * active
     */
    state?: string;
    /**
     * Routing state of connection
     * example:
     * active
     */
    routing_state?: string;
    /**
     * Their assigned role for connection
     * example:
     * Point of contact
     */
    their_role?: string;
    /**
     * Public key for connection
     * example:
     * H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV
     */
    invitation_key?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$
    /**
     * Connection request identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    request_id?: string;
    /**
     * Their label for connection
     * example:
     * Bob
     */
    their_label?: string;
    /**
     * Error message
     * example:
     * No DIDDoc provided; cannot connect to public DID
     */
    error_msg?: string;
    /**
     * Our DID for connection
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    my_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Connection acceptance: manual or auto
     * example:
     * auto
     */
    accept?: "manual" | "auto";
    /**
     * Time of last record update
     * example:
     * 2020-03-16 01:28:09Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
}
export interface ConnectionStaticRequest {
    /**
     * Remote verification key
     */
    their_verkey?: string;
    /**
     * Alias to assign to this connection
     */
    alias?: string;
    /**
     * Remote DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    their_did?: string;
    /**
     * URL endpoint for the other party
     * example:
     * http://192.168.56.101:5000
     */
    their_endpoint?: string;
    /**
     * Role to assign to this connection
     */
    their_role?: string;
    /**
     * Seed to use for the local DID
     */
    my_seed?: string;
    /**
     * Label to assign to this connection
     */
    their_label?: string;
    /**
     * Local DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    my_did?: string;
    /**
     * Seed to use for the remote DID
     */
    their_seed?: string;
}
export interface ConnectionStaticResult {
    /**
     * Remote verification key
     */
    their_verkey: string;
    /**
     * Remote DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    their_did: string;
    /**
     * My verification key
     */
    mv_verkey: string;
    /**
     * Local DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    my_did: string;
    /**
     * My endpoint
     */
    my_endpoint: string;
    record: ConnectionRecord;
}
export interface CredAttrSpec {
    /**
     * Attribute name
     * example:
     * favourite_drink
     */
    name: string;
    /**
     * MIME type: omit for (null) default
     * example:
     * image/jpeg
     */
    "mime-type"?: string;
    /**
     * Attribute value: base64-encode if MIME type is present
     * example:
     * martini
     */
    value: string;
}
export interface Credential {
    rev_reg?: RevReg;
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Revocation registry identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0
     */
    rev_reg_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):4:([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+))(:.+)?:CL_ACCUM:(.+$)
    /**
     * Signature correctness proof
     */
    signature_correctness_proof?: {
    };
    /**
     * Attribute names mapped to their raw and encoded values
     */
    values?: {
        [name: string]: RawEncCredAttr;
    };
    witness?: Witness;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Digital signature
     */
    signature?: {
    };
}
export interface CredentialDefinition {
    /**
     * Schema identifier within credential definition identifier
     * example:
     * 20
     */
    schemaId?: string;
    /**
     * Credential definition primary and revocation values
     */
    value?: {
    };
    /**
     * Signature type: CL for Camenisch-Lysyanskaya
     * example:
     * CL
     */
    type?: string;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Node protocol version
     * example:
     * 1.0
     */
    ver?: string; // ^[0-9.]+$
    /**
     * Tag within credential definition identifier
     * example:
     * tag
     */
    tag?: string;
}
export interface CredentialDefinitionGetResults {
    credential_definition?: CredentialDefinition;
}
export interface CredentialDefinitionSendRequest {
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Revocation supported flag
     */
    support_revocation?: boolean;
    /**
     * Credential definition identifier tag
     * example:
     * default
     */
    tag?: string;
}
export interface CredentialDefinitionSendResults {
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
}
export interface CredentialDefinitionsCreatedResults {
    credential_definition_ids?: string /* ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$ */ [];
}
export interface CredentialExchange {
    credential_definition_id?: string;
    initiator?: string;
    connection_id?: string;
    schema_id?: string;
    credential_offer?: {
    };
    /**
     * Time of record creation
     * example:
     * 2020-03-16 01:28:09Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    credential_id?: string;
    error_msg?: string;
    credential?: {
    };
    state?: string;
    credential_exchange_id?: string;
    parent_thread_id?: string;
    credential_request_metadata?: {
    };
    raw_credential?: {
    };
    auto_issue?: boolean;
    credential_request?: {
    };
    credential_values?: {
    };
    thread_id?: string;
    /**
     * Time of last record update
     * example:
     * 2020-03-16 01:28:09Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
}
export interface CredentialExchangeList {
    results?: CredentialExchange[];
}
export interface CredentialIssueRequest {
    credential_values: {
    };
}
export interface CredentialIssueResult {
    credential_id?: string;
}
export interface CredentialList {
    results?: Credential[];
}
export interface CredentialOfferRequest {
    credential_definition_id: string;
    connection_id: string;
}
export interface CredentialOfferResult {
    credential_id?: string;
}
export interface CredentialPreview {
    /**
     * Message type identifier
     * example:
     * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview
     */
    "@type"?: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview";
    attributes: CredAttrSpec[];
}
export interface CredentialProblemReportRequest {
    explain_ltxt: string;
}
export interface CredentialRequestResult {
    credential_id?: string;
}
export interface CredentialSendRequest {
    credential_definition_id: string;
    credential_values?: {
    };
    connection_id: string;
}
export interface CredentialSendResult {
    credential_id?: string;
}
export interface CredentialStoreRequest {
    credential_id?: string;
}
export interface DID {
    /**
     * Public verification key
     * example:
     * H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV
     */
    verkey?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$
    /**
     * Whether DID is public
     * example:
     * false
     */
    public?: boolean;
    /**
     * DID of interest
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
}
export interface DIDList {
    /**
     * DID list
     */
    results?: DID[];
}
export interface DIDResult {
    result?: DID;
}
export interface GetTagPolicyResult {
    /**
     * List of attributes taggable for credential search under current policy
     */
    taggables?: string[];
}
export interface IndyProofReqAttrSpec {
    non_revoked?: IndyProofReqNonRevoked;
    /**
     * Attribute name
     * example:
     * favouriteDrink
     */
    name: string;
    /**
     * If present, credential must satisfy one of given restrictions
     */
    restrictions?: IndyProofReqSpecRestrictions[];
}
export interface IndyProofReqNonRevoked {
    /**
     * Earliest epoch of interest for non-revocation proof
     * example:
     * 1584322089
     */
    from_epoch: number; // int32
    /**
     * Latest epoch of interest for non-revocation proof
     * example:
     * 1584322089
     */
    to_epoch: number; // int32
}
export interface IndyProofReqPredSpec {
    /**
     * Predicate type (indy currently supports only '>=')
     * example:
     * >=
     */
    p_type: "<" | "<=" | ">=" | ">";
    /**
     * Attribute name
     * example:
     * index
     */
    name: string;
    /**
     * Threshold value
     */
    p_value: number; // int32
    non_revoked?: IndyProofReqNonRevoked;
    /**
     * If present, credential must satisfy one of given restrictions
     */
    restrictions?: IndyProofReqSpecRestrictions[];
}
export interface IndyProofReqSpecRestrictions {
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Schema name
     * example:
     * transcript
     */
    schema_name?: string;
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version?: string; // ^[0-9.]+$
    /**
     * Schema issuer (origin) DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    schema_issuer_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Credential issuer DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    issuer_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
}
export interface IndyProofRequest {
    /**
     * Requested attribute specifications of proof request
     */
    requested_attributes: {
        [name: string]: IndyProofReqAttrSpec;
    };
    /**
     * Requested predicate specifications of proof request
     */
    requested_predicates: {
        [name: string]: IndyProofReqPredSpec;
    };
    /**
     * Proof request version
     * example:
     * 1.0
     */
    version?: string; // ^[0-9.]+$
    /**
     * Proof request name
     * example:
     * Proof request
     */
    name?: string;
    /**
     * Nonce
     * example:
     * 1234567890
     */
    nonce?: string;
}
export interface IndyRequestedCredsRequestedAttr {
    /**
     * Whether to reveal attribute in proof
     */
    revealed?: boolean;
    /**
     * Wallet credential identifier (typically but not necessarily a UUID)
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    cred_id?: string;
}
export interface IndyRequestedCredsRequestedPred {
    /**
     * Wallet credential identifier (typically but not necessarily a UUID)
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    cred_id?: string;
}
export interface InvitationResult {
    /**
     * Invitation URL
     * example:
     * http://192.168.56.101:8020/invite?c_i=eyJAdHlwZSI6Li4ufQ==
     */
    invitation_url?: string;
    invitation?: ConnectionInvitation;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
}
export interface MenuForm {
    /**
     * Menu form title
     * example:
     * Preferences
     */
    title?: string;
    /**
     * Additional descriptive text for menu form
     * example:
     * Window preference settings
     */
    description?: string;
    /**
     * List of form parameters
     * example:
     * [alpha, x_offset, y_offset, height, width, bgcolor, fgcolor]
     */
    params?: MenuFormParam[];
    /**
     * Alternative label for form submit button
     * example:
     * Send
     */
    "submit-label"?: string;
}
export interface MenuFormParam {
    /**
     * Menu parameter name
     * example:
     * delay
     */
    name: string;
    /**
     * Menu parameter title
     * example:
     * Delay in seconds
     */
    title: string;
    /**
     * Default parameter value
     * example:
     * 0
     */
    default?: string;
    /**
     * Additional descriptive text for menu form parameter
     * example:
     * Delay in seconds before starting
     */
    description?: string;
    /**
     * Menu form parameter input type
     * example:
     * int
     */
    type?: string;
    /**
     * Whether parameter is required
     * example:
     * False
     */
    required?: boolean;
}
export interface MenuJson {
    /**
     * List of menu options
     */
    options: MenuOption[];
    /**
     * Introductory text for the menu
     * example:
     * User preferences for window settings
     */
    description?: string;
    /**
     * Optional error message to display in menu header
     * example:
     * Error: item not present
     */
    errormsg?: string;
    /**
     * Menu title
     * example:
     * My Menu
     */
    title?: string;
}
export interface MenuOption {
    /**
     * Menu option name (unique identifier)
     * example:
     * window_prefs
     */
    name: string;
    /**
     * Menu option title
     * example:
     * Window Preferences
     */
    title: string;
    /**
     * Additional descriptive text for menu option
     * example:
     * Window display preferences
     */
    description?: string;
    /**
     * Whether to show option as disabled
     * example:
     * False
     */
    disabled?: boolean;
    form?: MenuForm;
}
export interface PerformRequest {
    /**
     * Input parameter values
     */
    params?: {
        [name: string]: string;
    };
    /**
     * Menu option name
     * example:
     * Query
     */
    name?: string;
}
export interface PingRequest {
    /**
     * Comment for the ping message
     */
    comment?: string;
}
export interface PingRequestResponse {
    /**
     * Thread ID of the ping message
     */
    thread_id?: string;
}
export interface PresAttrSpec {
    /**
     * Attribute name
     * example:
     * favourite_drink
     */
    name: string;
    /**
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * MIME type (default null)
     * example:
     * image/jpeg
     */
    "mime-type"?: string;
    /**
     * Attribute value
     * example:
     * martini
     */
    value?: string;
    /**
     * Credential referent
     * example:
     * 0
     */
    referent?: string;
}
export interface PresPredSpec {
    /**
     * Attribute name
     * example:
     * high_score
     */
    name: string;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Predicate (currently, indy supports >=)
     * example:
     * >=
     */
    predicate: "<" | "<=" | ">=" | ">";
    /**
     * Threshold value
     */
    threshold: number; // int32
}
export interface PresentationExchange {
    initiator?: string;
    connection_id?: string;
    /**
     * Time of record creation
     * example:
     * 2020-03-16 01:28:09Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    presentation_exchange_id?: string;
    state?: string;
    presentation_request?: {
    };
    verified?: string;
    error_msg?: string;
    presentation?: {
    };
    thread_id?: string;
    /**
     * Time of last record update
     * example:
     * 2020-03-16 01:28:09Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
}
export interface PresentationExchangeList {
    results?: PresentationExchange[];
}
export interface PresentationPreview {
    /**
     * Message type identifier
     * example:
     * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/presentation-preview
     */
    "@type"?: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/presentation-preview";
    attributes: PresAttrSpec[];
    predicates: PresPredSpec[];
}
export interface PresentationRequestRequest {
    requested_attributes?: RequestedAttribute[];
    requested_predicates?: RequestedPredicate[];
    version: string;
    name: string;
    connection_id: string;
}
export interface QueryResult {
    /**
     * Query results keyed by protocol
     */
    results?: {
        [name: string]: {
        };
    };
}
export interface RawEncCredAttr {
    /**
     * (Numeric string) encoded value
     * example:
     * 412821674062189604125602903860586582569826459817431467861859655321
     */
    encoded?: string;
    /**
     * Raw value
     * example:
     * Alex
     */
    raw?: string;
}
export interface RequestedAttribute {
    name: string;
    restrictions?: {
    }[];
}
export interface RequestedPredicate {
    p_type: string;
    name: string;
    p_value: string;
    restrictions?: {
    }[];
}
export interface RevReg {
    /**
     * Revocation registry accumulator state
     * example:
     * 21 136D54EA439FC26F03DB4b812 21 123DE9F624B86823A00D ...
     */
    accum?: string;
}
export interface RevRegCreateRequest {
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Maximum credential numbers
     */
    max_cred_num?: number; // int32
}
export interface RevRegCreateResult {
}
export interface RevRegUpdateTailsFileUri {
    /**
     * Public URI to the tails file
     */
    tails_public_uri: string; // url
}
export interface Schema {
    /**
     * Schema version
     * example:
     * 1.0
     */
    version?: string; // ^[0-9.]+$
    /**
     * Schema sequence number
     * example:
     * 999
     */
    seqNo?: number; // int32
    /**
     * Schema name
     * example:
     * schema_name
     */
    name?: string;
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Node protocol version
     * example:
     * 1.0
     */
    ver?: string; // ^[0-9.]+$
    /**
     * Schema attribute names
     */
    attrNames?: string[];
}
export interface SchemaGetResults {
    schema?: Schema;
}
export interface SchemaSendRequest {
    /**
     * List of schema attributes
     */
    attributes: string[];
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version: string; // ^[0-9.]+$
    /**
     * Schema name
     * example:
     * prefs
     */
    schema_name: string;
}
export interface SchemaSendResults {
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Schema result
     */
    schema?: {
    };
}
export interface SchemasCreatedResults {
    schema_ids?: string /* ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$ */ [];
}
export interface SendMenu {
    /**
     * Menu to send to connection
     */
    menu: {
        /**
         * List of menu options
         */
        options: MenuOption[];
        /**
         * Introductory text for the menu
         * example:
         * User preferences for window settings
         */
        description?: string;
        /**
         * Optional error message to display in menu header
         * example:
         * Error: item not present
         */
        errormsg?: string;
        /**
         * Menu title
         * example:
         * My Menu
         */
        title?: string;
    };
}
export interface SendMessage {
    /**
     * Message content
     * example:
     * Hello
     */
    content?: string;
}
export interface SendPresentationRequest {
    requested_attributes: {
    };
    requested_predicates: {
    };
    self_attested_attributes: {
    };
}
export interface SetTagPolicyRequest {
    /**
     * List of attributes to set taggable for credential search
     */
    taggables?: string[];
}
export interface TAAAccept {
    version?: string;
    mechanism?: string;
    text?: string;
}
export interface TAAAcceptance {
    time?: number; // int32
    mechanism?: string;
}
export interface TAAInfo {
    taa_record?: TAARecord;
    taa_required?: boolean;
    taa_accepted?: TAAAcceptance;
    aml_record?: AMLRecord;
}
export interface TAARecord {
    digest?: string;
    version?: string;
    text?: string;
}
export interface TAAResult {
    result?: TAAInfo;
}
export interface V10AttributeMimeTypesResult {
}
export interface V10CredentialExchange {
    /**
     * Revocation registry identifier
     */
    revoc_reg_id?: string;
    /**
     * Issue-credential exchange initiator: self or external
     * example:
     * self
     */
    initiator?: "self" | "external";
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Time of record creation
     * example:
     * 2020-03-16 01:28:09Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Credential identifier within revocation registry
     */
    revocation_id?: string;
    /**
     * (Indy) credential request metadata
     */
    credential_request_metadata?: {
    };
    /**
     * Serialized credential proposal message
     */
    credential_proposal_dict?: {
    };
    /**
     * Holder choice to accept offer in this credential exchange
     * example:
     * false
     */
    auto_offer?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    /**
     * Parent thread identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    parent_thread_id?: string;
    /**
     * Credential as received, prior to storage in holder wallet
     */
    raw_credential?: {
    };
    /**
     * Issuer choice to remove this credential exchange record when complete
     * example:
     * false
     */
    auto_remove?: boolean;
    /**
     * Issuer choice to issue to request in this credential exchange
     * example:
     * false
     */
    auto_issue?: boolean;
    /**
     * Error message
     * example:
     * credential definition identifier is not set in proposal
     */
    error_msg?: string;
    /**
     * Credential as stored
     */
    credential?: {
    };
    /**
     * Time of last record update
     * example:
     * 2020-03-16 01:28:09Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Credential identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    credential_id?: string;
    /**
     * Issue-credential exchange role: holder or issuer
     * example:
     * issuer
     */
    role?: "holder" | "issuer";
    /**
     * Issue-credential exchange state
     * example:
     * credential_acked
     */
    state?: string;
    /**
     * Credential exchange identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    credential_exchange_id?: string;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * (Indy) credential offer
     */
    credential_offer?: {
    };
    /**
     * (Indy) credential request
     */
    credential_request?: {
    };
    /**
     * Thread identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    thread_id?: string;
}
export interface V10CredentialExchangeListResult {
    /**
     * Aries#0036 v1.0 credential exchange records
     */
    results?: V10CredentialExchange[];
}
export interface V10CredentialIssueRequest {
    credential_preview: CredentialPreview;
    /**
     * Human-readable comment
     */
    comment?: string;
}
export interface V10CredentialOfferRequest {
    /**
     * Revocation Registry ID
     * example:
     * WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0
     */
    revoc_reg_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):4:([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+))(:.+)?:CL_ACCUM:(.+$)
    credential_preview: CredentialPreview;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Whether to remove the credential exchange record on completion
     */
    auto_remove?: boolean;
    /**
     * Whether to respond automatically to credential requests, creating and issuing requested credentials
     */
    auto_issue?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
}
export interface V10CredentialProblemReportRequest {
    explain_ltxt: string;
}
export interface V10CredentialProposalRequestMand {
    /**
     * Revocation Registry ID
     * example:
     * WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0
     */
    revoc_reg_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):4:([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+))(:.+)?:CL_ACCUM:(.+$)
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Schema name
     * example:
     * preferences
     */
    schema_name?: string;
    credential_proposal: CredentialPreview;
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version?: string; // ^[0-9.]+$
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Schema issuer DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    schema_issuer_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Credential issuer DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    issuer_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Whether to remove the credential exchange record on completion
     */
    auto_remove?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
}
export interface V10CredentialProposalRequestOpt {
    /**
     * Revocation Registry ID
     * example:
     * WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0
     */
    revoc_reg_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):4:([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+))(:.+)?:CL_ACCUM:(.+$)
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Schema name
     * example:
     * preferences
     */
    schema_name?: string;
    credential_proposal?: CredentialPreview;
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version?: string; // ^[0-9.]+$
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Schema issuer DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    schema_issuer_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Credential issuer DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    issuer_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Whether to remove the credential exchange record on completion
     */
    auto_remove?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
}
export interface V10CredentialStoreRequest {
    credential_id?: string;
}
export interface V10PresentationExchange {
    /**
     * Prover choice to auto-present proof as verifier requests
     * example:
     * false
     */
    auto_present?: boolean;
    /**
     * Present-proof exchange initiator: self or external
     * example:
     * self
     */
    initiator?: "self" | "external";
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    /**
     * Time of record creation
     * example:
     * 2020-03-16 01:28:09Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Presentation exchange identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    presentation_exchange_id?: string;
    /**
     * Present-proof exchange role: prover or verifier
     * example:
     * prover
     */
    role?: "prover" | "verifier";
    /**
     * Present-proof exchange state
     * example:
     * verified
     */
    state?: string;
    /**
     * (Indy) presentation request (also known as proof request)
     */
    presentation_request?: {
    };
    /**
     * Whether presentation is verified: true or false
     * example:
     * true
     */
    verified?: "true" | "false";
    /**
     * Error message
     * example:
     * Invalid structure
     */
    error_msg?: string;
    /**
     * (Indy) presentation (also known as proof)
     */
    presentation?: {
    };
    /**
     * Serialized presentation proposal message
     */
    presentation_proposal_dict?: {
    };
    /**
     * Thread identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    thread_id?: string;
    /**
     * Time of last record update
     * example:
     * 2020-03-16 01:28:09Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
}
export interface V10PresentationExchangeList {
    /**
     * Aries#0037 v1.0 presentation exchange records
     */
    results?: V10PresentationExchange[];
}
export interface V10PresentationProposalRequest {
    /**
     * Whether to respond automatically to presentation requests, building and presenting requested proof
     */
    auto_present?: boolean;
    presentation_proposal: PresentationPreview;
    /**
     * Human-readable comment
     */
    comment?: string;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
}
export interface V10PresentationRequest {
    /**
     * Nested object mapping proof request attribute referents to requested-attribute specifiers
     */
    requested_attributes: {
        [name: string]: IndyRequestedCredsRequestedAttr;
    };
    /**
     * Nested object mapping proof request predicate referents to requested-predicate specifiers
     */
    requested_predicates: {
        [name: string]: IndyRequestedCredsRequestedPred;
    };
    /**
     * Self-attested attributes to build into proof
     */
    self_attested_attributes: {
        [name: string]: string;
    };
}
export interface V10PresentationRequestRequest {
    proof_request: IndyProofRequest;
    comment?: string;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
}
export interface Witness {
    /**
     * Revocation registry witness omega state
     * example:
     * 21 129EA8716C921058BB91826FD 21 8F19B91313862FE916C0 ...
     */
    omega?: string;
}

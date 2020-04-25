export interface AMLRecord {
    version?: string;
    aml?: {
        [name: string]: string;
    };
    amlContext?: string;
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
     * Optional image URL for connection invitation
     * example:
     * http://192.168.56.101/img/logo.jpg
     */
    imageUrl?: string; // url
    /**
     * DID for connection invitation
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
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
     * Inbound routing connection id to use
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    inbound_connection_id?: string;
    /**
     * Their label for connection
     * example:
     * Bob
     */
    their_label?: string;
    /**
     * Our DID for connection
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    my_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Current record state
     * example:
     * active
     */
    state?: string;
    /**
     * Their DID for connection
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    their_did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
    /**
     * Public key for connection
     * example:
     * H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV
     */
    invitation_key?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}$
    /**
     * Connection initiator: self, external, or multiuse
     * example:
     * self
     */
    initiator?: "self" | "external" | "multiuse";
    /**
     * Connection acceptance: manual or auto
     * example:
     * auto
     */
    accept?: "manual" | "auto";
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    /**
     * Error message
     * example:
     * No DIDDoc provided; cannot connect to public DID
     */
    error_msg?: string;
    /**
     * Their assigned role for connection
     * example:
     * Point of contact
     */
    their_role?: string;
    /**
     * Invitation mode: once, multi, or static
     * example:
     * once
     */
    invitation_mode?: "once" | "multi" | "static";
    /**
     * Time of last record update
     * example:
     * 2020-04-23 08:50:50Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Connection request identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    request_id?: string;
    /**
     * Routing state of connection
     * example:
     * active
     */
    routing_state?: string;
    /**
     * Optional alias to apply to connection for later use
     * example:
     * Bob, providing quotes
     */
    alias?: string;
    /**
     * Time of record creation
     * example:
     * 2020-04-23 08:50:50Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
}
export interface ConnectionStaticRequest {
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
     * Remote verification key
     */
    their_verkey?: string;
    /**
     * Remote DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    their_did?: string;
    /**
     * Role to assign to this connection
     */
    their_role?: string;
    /**
     * Alias to assign to this connection
     */
    alias?: string;
    /**
     * Seed to use for the remote DID
     */
    their_seed?: string;
    /**
     * Seed to use for the local DID
     */
    my_seed?: string;
    /**
     * URL endpoint for the other party
     * example:
     * http://192.168.56.101:5000
     */
    their_endpoint?: string;
}
export interface ConnectionStaticResult {
    /**
     * Local DID
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    my_did: string;
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
    record: ConnectionRecord;
    /**
     * My verification key
     */
    mv_verkey: string;
    /**
     * My endpoint
     */
    my_endpoint: string;
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
    /**
     * Signature correctness proof
     */
    signature_correctness_proof?: {
    };
    witness?: Witness;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    rev_reg?: RevReg;
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Attribute names mapped to their raw and encoded values
     */
    values?: {
        [name: string]: RawEncCredAttr;
    };
    /**
     * Revocation registry identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0
     */
    rev_reg_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):4:([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+))(:.+)?:CL_ACCUM:(.+$)
    /**
     * Digital signature
     */
    signature?: {
    };
}
export interface CredentialDefinition {
    /**
     * Credential definition primary and revocation values
     */
    value?: {
    };
    /**
     * Node protocol version
     * example:
     * 1.0
     */
    ver?: string; // ^[0-9.]+$
    /**
     * Signature type: CL for Camenisch-Lysyanskaya
     * example:
     * CL
     */
    type?: string;
    /**
     * Tag within credential definition identifier
     * example:
     * tag
     */
    tag?: string;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Schema identifier within credential definition identifier
     * example:
     * 20
     */
    schemaId?: string;
}
export interface CredentialDefinitionGetResults {
    credential_definition?: CredentialDefinition;
}
export interface CredentialDefinitionSendRequest {
    /**
     * Revocation supported flag
     */
    support_revocation?: boolean;
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
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
export interface CredentialList {
    results?: Credential[];
}
export interface CredentialPreview {
    /**
     * Message type identifier
     * example:
     * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview
     */
    "@type"?: string;
    attributes: CredAttrSpec[];
}
export interface DID {
    /**
     * DID of interest
     * example:
     * WgWxqztrNooG92RXvxSTWv
     */
    did?: string; // ^(did:sov:)?[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}$
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
    non_revoked?: IndyProofReqNonRevoked;
}
export interface IndyProofReqNonRevoked {
    /**
     * Earliest epoch of interest for non-revocation proof
     * example:
     * 1587631850
     */
    from_epoch: number; // int32
    /**
     * Latest epoch of interest for non-revocation proof
     * example:
     * 1587631850
     */
    to_epoch: number; // int32
}
export interface IndyProofReqPredSpec {
    /**
     * Threshold value
     */
    p_value: number; // int32
    /**
     * Attribute name
     * example:
     * index
     */
    name: string;
    /**
     * If present, credential must satisfy one of given restrictions
     */
    restrictions?: IndyProofReqSpecRestrictions[];
    non_revoked?: IndyProofReqNonRevoked;
    /**
     * Predicate type ('<', '<=', '>=', or '>')
     * example:
     * >=
     */
    p_type: "<" | "<=" | ">=" | ">";
}
export interface IndyProofReqSpecRestrictions {
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
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version?: string; // ^[0-9.]+$
    /**
     * Schema name
     * example:
     * transcript
     */
    schema_name?: string;
}
export interface IndyProofRequest {
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
    /**
     * Proof request version
     * example:
     * 1.0
     */
    version?: string; // ^[0-9.]+$
    /**
     * Requested predicate specifications of proof request
     */
    requested_predicates: {
        [name: string]: IndyProofReqPredSpec;
    };
    /**
     * Requested attribute specifications of proof request
     */
    requested_attributes: {
        [name: string]: IndyProofReqAttrSpec;
    };
}
export interface IndyRequestedCredsRequestedAttr {
    /**
     * Wallet credential identifier (typically but not necessarily a UUID)
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    cred_id?: string;
    /**
     * Whether to reveal attribute in proof
     */
    revealed?: boolean;
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
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    invitation?: ConnectionInvitation;
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
     * Optional error message to display in menu header
     * example:
     * Error: item not present
     */
    errormsg?: string;
    /**
     * Introductory text for the menu
     * example:
     * User preferences for window settings
     */
    description?: string;
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
     * Menu option name
     * example:
     * Query
     */
    name?: string;
    /**
     * Input parameter values
     */
    params?: {
        [name: string]: string;
    };
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
     * Predicate type ('<', '<=', '>=', or '>')
     * example:
     * >=
     */
    predicate: "<" | "<=" | ">=" | ">";
    /**
     * Threshold value
     */
    threshold: number; // int32
}
export interface PresentationPreview {
    /**
     * Message type identifier
     * example:
     * did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/present-proof/1.0/presentation-preview
     */
    "@type"?: string;
    attributes: PresAttrSpec[];
    predicates: PresPredSpec[];
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
     * Raw value
     * example:
     * Alex
     */
    raw?: string;
    /**
     * (Numeric string) encoded value
     * example:
     * 412821674062189604125602903860586582569826459817431467861859655321
     */
    encoded?: string;
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
     * Create registry with all indexes issued
     */
    issuance_by_default?: boolean;
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * Maximum credential numbers
     * example:
     * 100
     */
    max_cred_num?: number; // int32
}
export interface RevRegCreateResult {
}
export interface RevRegUpdateTailsFileUri {
    /**
     * Public URI to the tails file
     * example:
     * http://192.168.56.133:5000/revocation/registry/WgWxqztrNooG92RXvxSTWv:4:WgWxqztrNooG92RXvxSTWv:3:CL:20:tag:CL_ACCUM:0/tails-file
     */
    tails_public_uri: string; // url
}
export interface RevRegsCreated {
    rev_reg_ids?: string /* ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):4:([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+))(:.+)?:CL_ACCUM:(.+$) */ [];
}
export interface Schema {
    /**
     * Node protocol version
     * example:
     * 1.0
     */
    ver?: string; // ^[0-9.]+$
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
     * Schema version
     * example:
     * 1.0
     */
    version?: string; // ^[0-9.]+$
    /**
     * Schema attribute names
     */
    attrNames?: string[];
    /**
     * Schema sequence number
     * example:
     * 999
     */
    seqNo?: number; // int32
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
     * Schema name
     * example:
     * prefs
     */
    schema_name: string;
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version: string; // ^[0-9.]+$
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
         * Optional error message to display in menu header
         * example:
         * Error: item not present
         */
        errormsg?: string;
        /**
         * Introductory text for the menu
         * example:
         * User preferences for window settings
         */
        description?: string;
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
    mechanism?: string;
    time?: number; // int32
}
export interface TAAInfo {
    taa_accepted?: TAAAcceptance;
    taa_required?: boolean;
    aml_record?: AMLRecord;
    taa_record?: TAARecord;
}
export interface TAARecord {
    version?: string;
    digest?: string;
    text?: string;
}
export interface TAAResult {
    result?: TAAInfo;
}
export interface V10AttributeMimeTypesResult {
}
export interface V10CredentialExchange {
    /**
     * (Indy) credential request
     */
    credential_request?: {
    };
    /**
     * Holder choice to accept offer in this credential exchange
     * example:
     * false
     */
    auto_offer?: boolean;
    /**
     * Issue-credential exchange initiator: self or external
     * example:
     * self
     */
    initiator?: "self" | "external";
    /**
     * Issuer choice to issue to request in this credential exchange
     * example:
     * false
     */
    auto_issue?: boolean;
    /**
     * Credential identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    credential_id?: string;
    /**
     * Credential exchange identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    credential_exchange_id?: string;
    /**
     * Issue-credential exchange role: holder or issuer
     * example:
     * issuer
     */
    role?: "holder" | "issuer";
    /**
     * Credential as received, prior to storage in holder wallet
     */
    raw_credential?: {
    };
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Serialized credential proposal message
     */
    credential_proposal_dict?: {
    };
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    credential_definition_id?: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    /**
     * (Indy) credential request metadata
     */
    credential_request_metadata?: {
    };
    /**
     * Error message
     * example:
     * credential definition identifier is not set in proposal
     */
    error_msg?: string;
    /**
     * Issuer choice to remove this credential exchange record when complete
     * example:
     * false
     */
    auto_remove?: boolean;
    /**
     * Revocation registry identifier
     */
    revoc_reg_id?: string;
    /**
     * Credential identifier within revocation registry
     */
    revocation_id?: string;
    /**
     * Time of record creation
     * example:
     * 2020-04-23 08:50:50Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * (Indy) credential offer
     */
    credential_offer?: {
    };
    /**
     * Issue-credential exchange state
     * example:
     * credential_acked
     */
    state?: string;
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    /**
     * Thread identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    thread_id?: string;
    /**
     * Parent thread identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    parent_thread_id?: string;
    /**
     * Time of last record update
     * example:
     * 2020-04-23 08:50:50Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Credential as stored
     */
    credential?: {
    };
}
export interface V10CredentialExchangeListResult {
    /**
     * Aries#0036 v1.0 credential exchange records
     */
    results?: V10CredentialExchange[];
}
export interface V10CredentialIssueRequest {
    /**
     * Human-readable comment
     */
    comment?: string;
    credential_preview: CredentialPreview;
}
export interface V10CredentialOfferRequest {
    /**
     * Credential definition identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:3:CL:20:tag
     */
    cred_def_id: string; // ^([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}):3:CL:(([1-9][0-9]*)|([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+)):(.+)?$
    credential_preview: CredentialPreview;
    /**
     * Whether to respond automatically to credential requests, creating and issuing requested credentials
     */
    auto_issue?: boolean;
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
    /**
     * Whether to remove the credential exchange record on completion (overrides --preserve-exchange-records configuration setting)
     */
    auto_remove?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
}
export interface V10CredentialProblemReportRequest {
    explain_ltxt: string;
}
export interface V10CredentialProposalRequestMand {
    /**
     * Schema issuer DID
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
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version?: string; // ^[0-9.]+$
    credential_proposal: CredentialPreview;
    /**
     * Whether to remove the credential exchange record on completion (overrides --preserve-exchange-records configuration setting)
     */
    auto_remove?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
    /**
     * Schema name
     * example:
     * preferences
     */
    schema_name?: string;
}
export interface V10CredentialProposalRequestOpt {
    /**
     * Schema issuer DID
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
    /**
     * Schema identifier
     * example:
     * WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0
     */
    schema_id?: string; // ^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{21,22}:2:.+:[0-9.]+$
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
    /**
     * Schema version
     * example:
     * 1.0
     */
    schema_version?: string; // ^[0-9.]+$
    credential_proposal?: CredentialPreview;
    /**
     * Whether to remove the credential exchange record on completion (overrides --preserve-exchange-records configuration setting)
     */
    auto_remove?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
    /**
     * Schema name
     * example:
     * preferences
     */
    schema_name?: string;
}
export interface V10CredentialStoreRequest {
    credential_id?: string;
}
export interface V10PresentationExchange {
    /**
     * Present-proof exchange state
     * example:
     * verified
     */
    state?: string;
    /**
     * Present-proof exchange initiator: self or external
     * example:
     * self
     */
    initiator?: "self" | "external";
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id?: string;
    /**
     * Thread identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    thread_id?: string;
    /**
     * Presentation exchange identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    presentation_exchange_id?: string;
    /**
     * (Indy) presentation request (also known as proof request)
     */
    presentation_request?: {
    };
    /**
     * Error message
     * example:
     * Invalid structure
     */
    error_msg?: string;
    /**
     * Time of last record update
     * example:
     * 2020-04-23 08:50:50Z
     */
    updated_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
    /**
     * Serialized presentation proposal message
     */
    presentation_proposal_dict?: {
    };
    /**
     * (Indy) presentation (also known as proof)
     */
    presentation?: {
    };
    /**
     * Whether presentation is verified: true or false
     * example:
     * true
     */
    verified?: "true" | "false";
    /**
     * Prover choice to auto-present proof as verifier requests
     * example:
     * false
     */
    auto_present?: boolean;
    /**
     * Present-proof exchange role: prover or verifier
     * example:
     * prover
     */
    role?: "prover" | "verifier";
    /**
     * Time of record creation
     * example:
     * 2020-04-23 08:50:50Z
     */
    created_at?: string; // ^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?:\:(?:\d\d(?:\.\d{1,6})?))?(?:[+-]\d\d:?\d\d|Z|)$
}
export interface V10PresentationExchangeList {
    /**
     * Aries#0037 v1.0 presentation exchange records
     */
    results?: V10PresentationExchange[];
}
export interface V10PresentationProposalRequest {
    presentation_proposal: PresentationPreview;
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
    /**
     * Whether to respond automatically to presentation requests, building and presenting requested proof
     */
    auto_present?: boolean;
    /**
     * Human-readable comment
     */
    comment?: string;
}
export interface V10PresentationRequest {
    /**
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Nested object mapping proof request predicate referents to requested-predicate specifiers
     */
    requested_predicates: {
        [name: string]: IndyRequestedCredsRequestedPred;
    };
    /**
     * Nested object mapping proof request attribute referents to requested-attribute specifiers
     */
    requested_attributes: {
        [name: string]: IndyRequestedCredsRequestedAttr;
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
     * Record trace information, based on agent configuration
     */
    trace?: boolean;
    /**
     * Connection identifier
     * example:
     * 3fa85f64-5717-4562-b3fc-2c963f66afa6
     */
    connection_id: string; // uuid
}
export interface V10PublishRevocationsResult {
    /**
     * Credential revocation ids published by revocation registry id
     */
    results?: {
        [name: string]: string[];
    };
}
export interface Witness {
    /**
     * Revocation registry witness omega state
     * example:
     * 21 129EA8716C921058BB91826FD 21 8F19B91313862FE916C0 ...
     */
    omega?: string;
}

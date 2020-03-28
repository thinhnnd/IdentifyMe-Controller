export interface IssueCredentialPayload {
    credential_exchange_id?: string
    connection_id?: string
    thread_id?: string
    parent_thread_id?: string
    initiator?: "self" | "external"
    state?: "proposal_sent" | "proposal_received" | "offer_sent" | "offer_received" | "request_sent" | "request_received" | "issued" | "credential_received" | "stored"
    credential_definition_id?: string
    schema_id?: string
    credential_proposal_dict?: any
    credential_offer?: any
    credential_request?: any
    credential_request_metadata?: any
    credential_id?: string
    raw_credential?: any
    credential?: any
    auto_offer?: boolean
    auto_issue?: boolean
    error_msg?: string
}
export interface PresentProofPayload {
    presentation_exchange_id?: string
    connection_id?: string
    thread_id?: string
    initiator?: "self" | "external"
    state?: "proposal_sent" | "proposal_received" | "request_sent" | "request_received" | "presentation_sent" | "presentation_received" | "verified"
    presentation_proposal_dict?: any
    presentation_request?: any
    presentation?: any
    verified?: string
    auto_present?: boolean
    error_msg?: string
}
export interface ConnectionsPayload {
    connection_id?: string
    state?: "init" | "invitation" | "request" | "response" | "active" | "error" | "inactive"
    my_did?: string
    their_did?: string
    their_label?: string
    their_role?: string
    inbound_connection_id?: string
    initiator?: "self" | "external" | "multiuse"
    invitation_key?: string
    request_id?: string
    routing_state?: "none" | "request" | "active" | "error"
    accept?: "manual" | "auto"
    error_msg?: string
    invitation_mode?: "once" | "multi"
    alias?: string
}
export interface BasicMessagesPayload {
    connection_id: string
    message_id: string
    content: string
    state: "received"
}
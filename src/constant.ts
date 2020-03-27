import { config } from 'dotenv';
config();
export const GENESIS_URL = process.env.GENESIS_URL
export const LEDGER_URL = process.env.LEDGER_URL
export const GENESIS_FILE = process.env.GENESIS_FILE
export const SEED = process.env.SEED
export const START_TIMEOUT = 150;
export const DEFAULT_POSTGRES = Boolean(process.env.POSTGRES)

export const AGENT_MODULE = process.env.AGENT_MODULE
export const ADMIN_PORT = process.env.ADMIN_PORT
export const AGENT_PORT: number = Number(process.env.AGENT_PORT)
export const WEB_UI_PORT: number = Number(process.env.WEB_UI_PORT)
const RUNMODE = process.env.RUNMODE;

// export const DEFAULT_INTERNAL_HOST = RUNMODE === 'docker' ? process.env.DOCKERHOST || "host.docker.internal" : "127.0.0.1"
// export const DEFAULT_EXTERNAL_HOST = RUNMODE === 'docker' ? 'localhost' : process.env.DOCKERHOST || "host.docker.internal"
let DEFAULT_INTERNAL_HOST = "127.0.0.1"
let DEFAULT_EXTERNAL_HOST = "localhost"
if (RUNMODE === 'docker') {
    DEFAULT_INTERNAL_HOST = process.env.DOCKERHOST || "host.docker.internal";
    DEFAULT_EXTERNAL_HOST = DEFAULT_INTERNAL_HOST

}
else if (RUNMODE === 'pwd') {
    DEFAULT_EXTERNAL_HOST = process.env.DOCKERHOST || "host.docker.internal";
}

export {
    RUNMODE,
    DEFAULT_INTERNAL_HOST,
    DEFAULT_EXTERNAL_HOST
}

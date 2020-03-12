import { config } from 'dotenv';
config();
export const GENESIS_URL = process.env.GENESIS_URL
export const LEDGER_URL = process.env.LEDGER_URL
export const GENESIS_FILE = process.env.GENESIS_FILE
export const SEED = process.env.SEED
export const DEFAULT_POSTGRES = Boolean(process.env.POSTGRES)
const ENV = process.env.ENV;
console.log("ENV", ENV)

export const DEFAULT_INTERNAL_HOST = ENV === 'docker' ? process.env.DOCKERHOST || "host.docker.internal" : "127.0.0.1"
export const DEFAULT_EXTERNAL_HOST = ENV === 'docker' ? DEFAULT_INTERNAL_HOST : process.env.DOCKERHOST || "host.docker.internal"

import { GENESIS_URL, GENESIS_FILE, DEFAULT_EXTERNAL_HOST } from "../constant";
import Axios from "axios";
import { readFileSync } from "fs";

export async function getGenesisTxns(): Promise<string> {
    let genesisTxn: string;
    try {
        if (GENESIS_URL && !['localhost', '127.0.0.1'].includes(GENESIS_URL)) {
            const resp = await Axios.get(GENESIS_URL);
            genesisTxn = resp.data;
        }
        else if (!GENESIS_URL || ['localhost', '127.0.0.1'].includes(GENESIS_URL)) {
            const resp = await Axios.get(`http://${DEFAULT_EXTERNAL_HOST}:9000/genesis`);
            genesisTxn = resp.data;
        }
        else if (GENESIS_FILE) {
            genesisTxn = readFileSync(GENESIS_FILE, 'utf8');
            console.log("Agent -> genesisTxn:", genesisTxn)
        }
        else {
            genesisTxn = readFileSync('local-genesis.txt', 'utf8');
            console.log("Agent -> genesisTxn", genesisTxn)
        }
        return genesisTxn;
    } catch (error) {
        throw error;
    }
}
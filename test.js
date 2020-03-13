const _ = require('lodash');
const spawn = require('child_process').spawn;
const child_process = require('child_process');
const shell = `while true; do printf 'HTTP/1.1 200 OK\n\n%s' '<h1> Hello </h1>' | netcat -l 4444; done`;
const shell2 = 'netcat -l 4444';
async function startProcess() {
    console.log('Starting agent ' + this.agentName);
    const options = await getAgentArgs();
    const childProcess = spawn('aca-py', ['start', ...options]);
    childProcess.stdout.on('data', data => {
        console.log('ACA-Py:' + data.toString());
    });
    childProcess.stderr.on('data', data => {
        console.log(`Stderr: ${data.toString()}`);
    });
    childProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
    childProcess.on("error", (err) => {
        console.log("Child Process error:", err);
    })

}
async function test_startProcess() {
    const options = await getAgentArgs();
    // child_process.execFile('aca-py start', options, (err, stdout, stderr) => {
    //     console.log("testStart -> stderr", stderr)
    //     console.log("testStart -> stdout", stdout)
    //     if (err) console.log("testStart -> err", err)

    // })
    child_process.exec(shell, (err, stdout, stderr) => {
        console.log("testStart -> stderr", stderr)
        console.log("testStart -> stdout", stdout)
        if (err) console.log("testStart -> err", err)
    })
}
async function getAgentArgs() {
    const options = [
        ['--endpoint', 'localhost'],
        ['--label', 'Test Agent'],
        '--auto-ping-connection',
        '--auto-respond-messages',
        ['--inbound-transport', 'http', '0.0.0.0', '3000'],
        ['--outbound-transport', 'http'],
        ['--admin', '0.0.0.0', '5000'],
        '--admin-insecure-mode',
        ['--wallet-type', 'indy'],
        ['--wallet-name', 'test-wallet'],
        ['--wallet-key', 'test-key'],
    ];
    return _.flatMapDeep(options);
}
startProcess();
# IdentifyMe-Controller
This repo is custom, powered by Express using Typescript.
Controller for IdentifyMeApp - available at https://github.com/thinhnnd/IdentifyMeApp
## Installation
### Dependency
To start successfully in local environment, you must use python 3.6.9 and install aca-py by command:
```bash
$ pip3 install aries-cloudagent
```
And install indy-sdk wrapper for python:
```bash
$ pip3 install python3-indy
```
After that, clone this repo: 
```bash
$ git clone https://github.com/xuanthu01/IdentifyMe-Controller.git
```
Run command to install:
```bash
$ npm install
```
### Starting
#### Development
This repo using von-network, to start dev successfully, please clone von-network and start in docker, management tool will be appeared at http://localhost:9000
```bash
$ npm run dev
```
#### Docker
If you prefer global network than, please use environment variables.
Available variables: LEDGER_URL, SEED, GENESIS_URL, GENESIS_FILE
Easy run with script example:
```bash
$ LEDGER_URL=http://dev.greenlight.bcovrin.vonx.io ./start.sh
```
Please note the url (include LEDGER_URL) is not contains "/", (http://dev.greenlight.bcovrin.vonx.io)
#### Build
```bash
$ npm run build
```

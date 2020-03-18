#!/bin/bash

shopt -s nocasematch

cd $(dirname $0)

AGENT="$1"
shift

AGENT_MODULE="uit"
AGENT_PORT=5000
AGENT_PORT_RANGE=8020-8027



if [ -z "${PWD_HOST_FQDN}" ]; then
	DOCKERHOST=`docker run --rm --net=host eclipse/che-ip`
    export RUNMODE="docker"
else
	PWD_HOST="${PWD_HOST_FQDN}"
    if [ "$PWD_HOST_FQDN" = "labs.play-with-docker.com" ]
      then
        export ETH_CONFIG="eth1"
      elif [ "$PWD_HOST_FQDN" = "play-with-docker.vonx.io" ]
      then
        export ETH_CONFIG="eth0"
      else
        export ETH_CONFIG="eth0"
      fi
    MY_HOST=`ifconfig ${ETH_CONFIG} | grep inet | cut -d':' -f2 | cut -d' ' -f1 | sed 's/\./\-/g'`
    export DOCKERHOST="ip${MY_HOST}-${SESSION_ID}-{PORT}.direct.${PWD_HOST_FQDN}"
    export RUNMODE="pwd"
fi

echo $DOCKERHOST
IMAGE="identifyme/uit-controller:1.0.0"
echo "Preparing agent image for $IMAGE..."
docker build -t $IMAGE -f Dockerfile . || exit 1


DOCKER_ENV="--env RUNMODE=${RUNMODE} --env DOCKERHOST=${DOCKERHOST}"
if ! [ -z "$POSTGRES" ]; then
	DOCKER_ENV="${DOCKER_ENV} --env POSTGRES=1 --env RUST_BACKTRACE=1"
fi
if ! [ -z "$LEDGER_URL" ]; then
	GENESIS_URL="${LEDGER_URL}/genesis"
	DOCKER_ENV="${DOCKER_ENV} --env LEDGER_URL=${LEDGER_URL}"
fi
if ! [ -z "$GENESIS_URL" ]; then
	DOCKER_ENV="${DOCKER_ENV} --env GENESIS_URL=${GENESIS_URL}"
fi
if ! [ -z "$EVENTS" ]; then
	DOCKER_ENV="${DOCKER_ENV} --env EVENTS=1"
fi

echo $DOCKER_ENV
DOCKER=${DOCKER:-docker}
TMP="$(cut -d'/' -f2 <<<"$IMAGE")"
NAME="$(cut -d':' -f1 <<<"$TMP")"
echo "Starting $NAME..."
$DOCKER run $DOCKER_ENV --name $NAME --rm -it -p 3000:3000 $IMAGE #--port $AGENT_PORT 

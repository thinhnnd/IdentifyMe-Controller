#!/bin/bash

shopt -s nocasematch

cd $(dirname $0)

AGENT="$1"
shift

if [ "$AGENT" = "uit" ]; then
	AGENT_MODULE="UIT-University"
	AGENT_PORT=8020
  AGENT_PORT_RANGE=8020-8027
  # ADMIN_PORT=5020
  WEB_UI_PORT=3020
	# AGENT_PORT_RANGE=8020-8027
elif [ "$AGENT" = "abc-corp" ]; then
	AGENT_MODULE="ABC-Corporation"
	AGENT_PORT=8030
  AGENT_PORT_RANGE=8030-8037
  # ADMIN_PORT=5030
  WEB_UI_PORT=3030
	# AGENT_PORT_RANGE=8030-8037
elif [ "$AGENT" = "vcb-bank" ]; then
	AGENT_MODULE="VCB-Bank"
	AGENT_PORT=8040
  AGENT_PORT_RANGE=8040-8047
  # ADMIN_PORT=5040
  WEB_UI_PORT=3040
	# AGENT_PORT_RANGE=8040-8047
else
	echo "Please specify which agent you want to run. Choose from 'uit', 'abc-corp' or 'vcb-bank'."
	exit 1
fi
export AGENT_MODULE
export AGENT_PORT
# export ADMIN_PORT
export WEB_UI_PORT

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
nextip(){
    IP=$1
    IP_HEX=$(printf '%.2X%.2X%.2X%.2X\n' `echo $IP | sed -e 's/\./ /g'`)
    NEXT_IP_HEX=$(printf %.8X `echo $(( 0x$IP_HEX + 1 ))`)
    NEXT_IP=$(printf '%d.%d.%d.%d\n' `echo $NEXT_IP_HEX | sed -r 's/(..)/0x\1 /g'`)
    echo "$NEXT_IP"
}
SEED=`docker run --rm sofianinho/pwgen-alpine -s 32 1`
echo $SEED
# DOCKERHOST=$(nextip $DOCKERHOST)
echo $DOCKERHOST
IMAGE="identifyme/${AGENT}-agent:1.0.0"
echo "Preparing agent image for $IMAGE..."
docker build -t $IMAGE -f Dockerfile . || exit 1


DOCKER_ENV="-e RUNMODE=${RUNMODE} -e DOCKERHOST=${DOCKERHOST} -e SEED=${SEED} -e AGENT_MODULE=${AGENT_MODULE} -e AGENT_PORT=${AGENT_PORT} -e ADMIN_PORT=${ADMIN_PORT} -e WEB_UI_PORT=${WEB_UI_PORT}"
if ! [ -z "$POSTGRES" ]; then
	DOCKER_ENV="${DOCKER_ENV} -e POSTGRES=1 -e RUST_BACKTRACE=1"
fi
if ! [ -z "$LEDGER_URL" ]; then
	GENESIS_URL="${LEDGER_URL}/genesis"
	DOCKER_ENV="${DOCKER_ENV} -e LEDGER_URL=${LEDGER_URL}"
fi
if ! [ -z "$GENESIS_URL" ]; then
	DOCKER_ENV="${DOCKER_ENV} -e GENESIS_URL=${GENESIS_URL}"
fi


echo $DOCKER_ENV
DOCKER=${DOCKER:-docker}
TMP="$(cut -d'/' -f2 <<<"$IMAGE")"
NAME="$(cut -d':' -f1 <<<"$TMP")"
echo "Starting $NAME..."
$DOCKER run $DOCKER_ENV --name $NAME --rm -it \
  -p 0.0.0.0:$AGENT_PORT_RANGE:$AGENT_PORT_RANGE \
  $IMAGE
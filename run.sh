#!/bin/bash

shopt -s nocasematch

cd $(dirname $0)

AGENT="$1"
shift
ARGS=""

for i in "$@"
do
	case $i in
	--events)
		EVENTS=1
		continue
	;;
	--timing)
		if [ ! -d "../logs" ]; then
			mkdir ../logs && chmod -R uga+rws ../logs
		fi
		if [ "$(ls -ld ../logs | grep dr..r..rwx)" == "" ]; then
			echo "Error: To use the --timing parameter, the directory '../logs' must exist and all users must be able to write to it."
			echo "For example, to create the directory and then set the permissions use: 'mkdir ../logs; chmod uga+rws ../logs'"
			exit 1
		fi
	;;
	esac
	ARGS="${ARGS:+$ARGS }$i"
done

# if [ "$AGENT" = "faber" ]; then
# 	AGENT_MODULE="faber"
# 	AGENT_PORT=8020
# 	AGENT_PORT_RANGE=8020-8027
# elif [ "$AGENT" = "alice" ]; then
# 	AGENT_MODULE="alice"
# 	AGENT_PORT=8030
# 	AGENT_PORT_RANGE=8030-8037
# elif [ "$AGENT" = "acme" ]; then
# 	AGENT_MODULE="acme"
# 	AGENT_PORT=8040
# 	AGENT_PORT_RANGE=8040-8047
# elif [ "$AGENT" = "performance" ]; then
# 	AGENT_MODULE="performance"
# 	AGENT_PORT=8030
# 	AGENT_PORT_RANGE=8030-8038
# else
# 	echo "Please specify which agent you want to run. Choose from 'faber', 'alice', 'acme', or 'performance'."
# 	exit 1
# fi
AGENT_MODULE="uit"
AGENT_PORT=8020
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
export DOCKERHOST=${DOCKERHOST}

echo "Preparing agent image..."
# docker build -q -t uit-controller-demo -f ./Dockerfile.service .. || exit 1
docker-compose build
# DOCKER_ENV=" -e RUNMODE=${RUNMODE} -e DOCKERHOST=${DOCKERHOST}"
# DOCKER_ENV=" RUNMODE=${RUNMODE} DOCKERHOST=${DOCKERHOST}"

# if ! [ -z "$POSTGRES" ]; then
# 	DOCKER_ENV="${DOCKER_ENV} POSTGRES=1 RUST_BACKTRACE=1"
# fi
if ! [ -z "$LEDGER_URL" ]; then
	export GENESIS_URL="${LEDGER_URL}/genesis"
	export LEDGER_URL=${LEDGER_URL}
fi
if ! [ -z "$GENESIS_URL" ]; then
	export GENESIS_URL=${GENESIS_URL}
fi
# if ! [ -z "$EVENTS" ]; then
# 	DOCKER_ENV="${DOCKER_ENV} EVENTS=1"
# fi

# on Windows, docker run needs to be prefixed by winpty
if [ "$OSTYPE" = "msys" ]; then
	DOCKER="winpty docker"
fi
# echo $DOCKER_ENV
DOCKER=${DOCKER:-docker-compose}

echo "Starting $AGENT..."
# $DOCKER run --name $AGENT --rm -it \
# 	# -p 0.0.0.0:$AGENT_PORT_RANGE:$AGENT_PORT_RANGE \
# 	# -v "/$(pwd)/../logs:/home/indy/logs" \
# 	$DOCKER_ENV \
# 	uit-controller-demo $AGENT_MODULE #--port $AGENT_PORT $ARGS
$DOCKER up
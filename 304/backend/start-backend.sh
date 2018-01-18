#!/bin/bash

source /etc/environment

waitForUser=true

while getopts b opt; do
    if [ $opt = "b" ]; then
        waitForUser=false
    fi
done

if [[ -z ${WILDFLY_HOME+x} ]]; then
    printf "Please set the WILDFLY_HOME environment variable\n"
    exit 1
else
    BIN_DIR="$WILDFLY_HOME/bin"
fi

function killServer {
    printf "Killing server\n"
    kill -- -$(ps -o pgid= $WILDFLY_PID | grep -o '[0-9]*')
}

"$BIN_DIR/standalone.sh" "-b" "0.0.0.0" > wildfly.log &
export WILDFLY_PID=$!

if [[ $? -eq 0 ]]; then
    tput setaf 2
    printf "Started app server with PID %d\n" $WILDFLY_PID
    tput setaf 7
else
    tput setaf 1
    printf "Starting server failed\n"
    tput setaf 7
    exit 1
fi

tput setaf 2
printf "Deploying backend\n"
tput setaf 7
mvn wildfly:deploy > maven.log

if [[ $? -eq 0 ]]
then
    tput setaf 2
    printf "Deployed backend\n"
    tput setaf 7

    if [ "$waitForUser" = true ]; then
        printf "Press [CTRL+C] to stop..\n"
        trap killServer INT
        while true
        do
        sleep 1
        done
    fi
else
    tput setaf 1
    printf "Deploying backend failed\n"
    # killServer
    tput setaf 7
    exit 1
fi

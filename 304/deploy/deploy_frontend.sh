#!/usr/bin/env bash

if [[ -z ${T304_AWS_PEM_PATH+x} ]]; then
    printf "Please set the T304_AWS_PEM_PATH environment variable\n"
    exit 1
fi

set -x
git submodule init
git submodule update
tar -cf frontend.tar ../frontend-dev && \
scp -o StrictHostKeyChecking=no -i "$T304_AWS_PEM_PATH" frontend.tar ec2-user@ec2-34-205-144-131.compute-1.amazonaws.com:~/frontend.tar && \
ssh -o StrictHostKeyChecking=no -i "$T304_AWS_PEM_PATH" ec2-user@ec2-34-205-144-131.compute-1.amazonaws.com 'pkill node; rm -rf frontend-dev; tar -xf frontend.tar; cd frontend-dev; npm run bgstart'
set +x

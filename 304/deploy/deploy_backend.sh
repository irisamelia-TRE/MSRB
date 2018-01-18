#!/usr/bin/env bash

if [[ -z ${T304_AWS_PEM_PATH+x} ]]; then
    printf "Please set the T304_AWS_PEM_PATH environment variable\n"
    exit 1
fi

set -x
tar -cf backend.tar ../backend && \
scp -o StrictHostKeyChecking=no -i "$T304_AWS_PEM_PATH" backend.tar ec2-user@ec2-34-205-144-131.compute-1.amazonaws.com:~/backend.tar && \
ssh -o StrictHostKeyChecking=no -i "$T304_AWS_PEM_PATH" ec2-user@ec2-34-205-144-131.compute-1.amazonaws.com 'pkill standalone; pkill java; rm -rf backend; tar -xf backend.tar; cd backend; ./start-backend.sh -b'
set +x

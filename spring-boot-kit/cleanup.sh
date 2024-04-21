#!/bin/bash

docker compose -f ./compose-dev.yaml down

current_dir="${PWD##*/}"
docker image rm "$current_dir"-server

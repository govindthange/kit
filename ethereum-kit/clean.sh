#!/bin/bash
docker-compose -f docker-compose-web-app.yml -f docker-compose-dapp.yml -f docker-compose.yml down

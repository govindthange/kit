#!/bin/bash
docker-compose -f docker-compose-client.yml -f docker-compose-app.yml -f docker-compose-dapp.yml -f docker-compose.yml down

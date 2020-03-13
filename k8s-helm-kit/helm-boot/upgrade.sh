#!/usr/bin/env bash

# Configure application information
APP_NAME=helm-boot
RELEASE_NAME=alpha

#helm upgrade --debug --dry-run --set version=0.1.1 $RELEASE_NAME ./$APP_NAME
helm upgrade --set version=0.1.1 $RELEASE_NAME ./$APP_NAME

helm ls --all

read -p "Press [Enter] key to exit..."

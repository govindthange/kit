#!/bin/bash

jq -r '.recommendations[]' ./.vscode/extensions.json | xargs -L 1 code --install-extension

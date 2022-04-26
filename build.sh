#!/bin/bash
set -e

# Delete dist
rm -fR dist

# node dependencies
yarn ci

# Check lint
yarn lint

# Build project
yarn build

# Prepare Npm package
# cp ./package.json ./dist/
# cp ./README.md ./dist/
# cp ./LICENSE ./dist/

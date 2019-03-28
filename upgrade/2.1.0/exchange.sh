#!/usr/bin/env bash

cd ~/core
pm2 delete core
pm2 delete core-relay
git reset --hard
git pull
git checkout master
yarn run bootstrap
yarn run upgrade

pm2 --name 'core-relay' start ~/core/packages/core/dist/index.js -- relay --network mainnet

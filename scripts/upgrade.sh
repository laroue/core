#!/usr/bin/env bash

pm2 delete core > /dev/null 2>&1
pm2 delete core-relay > /dev/null 2>&1
pm2 delete core-forger > /dev/null 2>&1

pm2 delete core > /dev/null 2>&1
pm2 delete core-relay > /dev/null 2>&1
pm2 delete core-forger > /dev/null 2>&1

node ./scripts/upgrade/upgrade.js

# Sometimes the upgrade script doesn't properly replace ARK_ with CORE_
# https://github.com/laroue/core/blob/develop/scripts/upgrade/upgrade.js#L206
cd ~

if [ -f .config/core/devnet/.env ]; then
    sed -i 's/ARK_/CORE_/g' .config/core/devnet/.env
fi

if [ -f .config/core/devnet/plugins.js ]; then
    sed -i 's/ARK_/CORE_/g' .config/core/devnet/plugins.js
fi

if [ -f .config/core/mainnet/.env ]; then
    sed -i 's/ARK_/CORE_/g' .config/core/mainnet/.env
fi

if [ -f .config/core/mainnet/plugins.js ]; then
    sed -i 's/ARK_/CORE_/g' .config/core/mainnet/plugins.js
fi

cd ~/core
yarn setup

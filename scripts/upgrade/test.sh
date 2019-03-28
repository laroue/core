#!/usr/bin/env bash

rm -rf /home/laroue/core
git clone https://github.com/laroue/core -b upgrade /home/laroue/core

mkdir /home/laroue/.mlc
touch /home/laroue/.mlc/.env

mkdir /home/laroue/.mlc/config

mkdir /home/laroue/.mlc/database
touch /home/laroue/.mlc/database/json-rpc.sqlite
touch /home/laroue/.mlc/database/transaction-pool.sqlite
touch /home/laroue/.mlc/database/webhooks.sqlite

mkdir /home/laroue/.mlc/logs
mkdir /home/laroue/.mlc/logs/mainnet
touch /home/laroue/.mlc/logs/mainnet/test.log

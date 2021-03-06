# Core

<p align="center">
    <img src="./banner.png" />
</p>

[![Build Status](https://badgen.now.sh/circleci/github/laroue/core)](https://circleci.com/gh/laroue/core)
[![Codecov](https://badgen.now.sh/codecov/c/github/laroue/core)](https://codecov.io/gh/laroue/core)
[![License: MIT](https://badgen.now.sh/badge/license/MIT/green)](https://opensource.org/licenses/MIT)

## Introduction

This repository contains all plugins that make up the Core.

## Documentation

-   Development : https://docs.laroue.org/guidebook/core/development.html
-   Docker : https://docs.laroue.org/guidebook/core/docker.html

## API Documentation

-   API v1 : https://docs.laroue.org/api/public/v1/
-   API v2 : https://docs.laroue.org/api/public/v2/

## GitHub Development Bounty

-   Get involved with the development team and start earning MLC : https://bounty.laroue.org
## Core Packages

| Package                                                            | Version                                                                                                                                                | Description                          |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| **[core](/packages/core)**                                         | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core)](https://www.npmjs.com/package/@arkecosystem/core)                                             | **Includes all packages**            |
| [core-api](/packages/core-api)                                     | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-api)](https://www.npmjs.com/package/@arkecosystem/core-api)                                     | Public REST API                      |
| [core-blockchain](/packages/core-blockchain)                       | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-blockchain)](https://www.npmjs.com/package/@arkecosystem/core-blockchain)                       | Blockchain Managment                 |
| [core-container](/packages/core-container)                         | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-container)](https://www.npmjs.com/package/@arkecosystem/core-container)                         | Container Managment                  |
| [core-database](/packages/core-database)                           | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-database)](https://www.npmjs.com/package/@arkecosystem/core-database)                           | Database Interface                   |
| [core-database-postgres](/packages/core-database-postgres)         | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-database-postgres)](https://www.npmjs.com/package/@arkecosystem/core-database-postgres)         | Database Implementation - PostgreSQL |
| [core-debugger-cli](/packages/core-debugger-cli)                   | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-debugger-cli)](https://www.npmjs.com/package/@arkecosystem/core-debugger-cli)                   | Debugger CLI _(development only)_    |
| [core-deployer](/packages/core-deployer)                           | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-deployer)](https://www.npmjs.com/package/@arkecosystem/core-deployer)                           | Deployer CLI                         |
| [core-elasticsearch](/packages/core-elasticsearch)                 | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-elasticsearch)](https://www.npmjs.com/package/@arkecosystem/core-elasticsearch)                 | Elasticsearch Server                 |
| [core-error-tracker-bugsnag](/packages/core-error-tracker-bugsnag) | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-error-tracker-bugsnag)](https://www.npmjs.com/package/@arkecosystem/core-error-tracker-bugsnag) | Error Tracking - Bugsnag             |
| [core-error-tracker-sentry](/packages/core-error-tracker-sentry)   | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-error-tracker-sentry)](https://www.npmjs.com/package/@arkecosystem/core-error-tracker-sentry)   | Error Tracking - Sentry              |
| [core-event-emitter](/packages/core-event-emitter)                 | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-event-emitter)](https://www.npmjs.com/package/@arkecosystem/core-event-emitter)                 | Event Emitter                        |
| [core-forger](/packages/core-forger)                               | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-forger)](https://www.npmjs.com/package/@arkecosystem/core-forger)                               | Forger Manager                       |
| [core-graphql](/packages/core-graphql)                             | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-graphql)](https://www.npmjs.com/package/@arkecosystem/core-graphql)                             | GraphQL Server                       |
| [core-http-utils](/packages/core-http-utils)                       | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-http-utils)](https://www.npmjs.com/package/@arkecosystem/core-http-utils)                       | HTTP Utilities                       |
| [core-json-rpc](/packages/core-json-rpc)                           | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-json-rpc)](https://www.npmjs.com/package/@arkecosystem/core-json-rpc)                           | JSON-RPC Server                      |
| [core-logger](/packages/core-logger)                               | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-logger)](https://www.npmjs.com/package/@arkecosystem/core-logger)                               | Logger Interface                     |
| [core-logger-winston](/packages/core-logger-winston)               | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-logger-winston)](https://www.npmjs.com/package/@arkecosystem/core-logger-winston)               | Logger Implementation - Winston      |
| [core-p2p](/packages/core-p2p)                                     | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-p2p)](https://www.npmjs.com/package/@arkecosystem/core-p2p)                                     | P2P Communication                    |
| [core-snapshots](/packages/core-snapshots)                         | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-snapshots)](https://www.npmjs.com/package/@arkecosystem/core-snapshots)                         | Snapshot Manager                     |
| [core-snapshots-cli](/packages/core-snapshots-cli)                 | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-snapshots-cli)](https://www.npmjs.com/package/@arkecosystem/core-snapshots-cli)                 | Snapshot CLI                         |
| [core-test-utils](/packages/core-test-utils)                       | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-test-utils)](https://www.npmjs.com/package/@arkecosystem/core-test-utils)                       | Test Utilities _(development only)_  |
| [core-tester-cli](/packages/core-tester-cli)                       | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-tester-cli)](https://www.npmjs.com/package/@arkecosystem/core-tester-cli)                       | Tester CLi _(development only)_      |
| [core-transaction-pool](/packages/core-transaction-pool)           | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-transaction-pool)](https://www.npmjs.com/package/@arkecosystem/core-transaction-pool)           | Transaction Pool                     |
| [core-utils](/packages/core-utils)                                 | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-utils)](https://www.npmjs.com/package/@arkecosystem/core-utils)                                 | Utilities                            |
| [core-vote-report](/packages/core-vote-report)                     | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-vote-report)](https://www.npmjs.com/package/@arkecosystem/core-vote-report)                     | Vote Report                          |
| [core-webhooks](/packages/core-webhooks)                           | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/core-webhooks)](https://www.npmjs.com/package/@arkecosystem/core-webhooks)                           | Webhook Server                       |
| [crypto](/packages/crypto)                                         | [![npm](https://badgen.now.sh/npm/v/@arkecosystem/crypto)](https://www.npmjs.com/package/@arkecosystem/crypto)                                         | Cryptography                         |

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@laroue.org. All security vulnerabilities will be promptly addressed.

## Credits

-   [Luc Talarico](https://github.com/laroue)
-   [All Contributors](../../contributors)

## License

[MIT](LICENSE) © [LaRoue](https://laroue.org)

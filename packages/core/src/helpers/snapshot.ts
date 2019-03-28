import { app } from "@laroue/core-container";

// tslint:disable-next-line:no-var-requires
const { version } = require("../../package.json");

export async function setUpLite(options) {
    process.env.CORE_SKIP_BLOCKCHAIN = "true";

    await app.setUp(version, options, {
        include: [
            "@laroue/core-logger",
            "@laroue/core-logger-winston",
            "@laroue/core-event-emitter",
            "@laroue/core-snapshots",
        ],
    });

    return app;
}

export async function tearDown() {
    return app.tearDown();
}

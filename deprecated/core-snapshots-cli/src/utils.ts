import { app } from "@laroue/core-container";

export const setUpLite = async options => {
    process.env.CORE_SKIP_BLOCKCHAIN = "true";

    await app.setUp("2.0.0", options, {
        include: [
            "@laroue/core-logger",
            "@laroue/core-logger-winston",
            "@laroue/core-event-emitter",
            "@laroue/core-snapshots",
        ],
    });

    return app;
};

export const tearDown = async () => app.tearDown();

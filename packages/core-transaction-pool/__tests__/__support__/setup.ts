import { app } from "@laroue/core-container";
import { registerWithContainer, setUpContainer } from "../../../core-test-utils/src/helpers/container";

jest.setTimeout(60000);

const options = {
    enabled: true,
    maxTransactionsPerSender: 300,
    allowedSenders: [],
    dynamicFees: {
        enabled: true,
        minFeePool: 1000,
        minFeeBroadcast: 1000,
        addonBytes: {
            transfer: 100,
            secondSignature: 250,
            delegateRegistration: 400000,
            vote: 100,
            multiSignature: 500,
            ipfs: 250,
            timelockTransfer: 500,
            multiPayment: 500,
            delegateResignation: 400000,
        },
    },
};

export const setUp = async () => {
    return await setUpContainer({
        exit: "@laroue/core-blockchain",
        exclude: ["@laroue/core-transaction-pool"],
        network: "unitnet",
    });
};

export const setUpFull = async () => {
    await setUpContainer({
        exit: "@laroue/core-transaction-pool",
        exclude: ["@laroue/core-transaction-pool"],
        network: "unitnet",
    });

    await registerWithContainer(require("../../src/plugin").plugin, options);

    // now registering the plugins that need to be registered after transaction pool
    // register p2p
    await registerWithContainer(require("@laroue/core-p2p").plugin, {
        host: "0.0.0.0",
        port: 4000,
        minimumNetworkReach: 5,
        coldStart: 5,
    });
    await registerWithContainer(require("@laroue/core-blockchain").plugin, {});
    return app;
};

export const tearDown = async () => {
    await app.tearDown();
};

export const tearDownFull = async () => {
    await require("../../src/plugin").plugin.deregister(app, options);
    await require("@laroue/core-p2p").plugin.deregister(app, {});
    await require("@laroue/core-blockchain").plugin.deregister(app, {});

    await app.tearDown();
};

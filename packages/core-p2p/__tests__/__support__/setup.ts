import { app } from "@laroue/core-container";
import { registerWithContainer, setUpContainer } from "../../../core-test-utils/src/helpers/container";

jest.setTimeout(60000);

const options = {
    host: "0.0.0.0",
    port: 4000,
    minimumNetworkReach: 5,
    coldStart: 5,
};

export const setUp = async () => {
    await setUpContainer({
        exit: "@laroue/core-p2p",
        exclude: ["@laroue/core-p2p"],
    });

    // register p2p plugin
    await registerWithContainer(require("../../src/plugin").plugin, options);
    await registerWithContainer(require("@laroue/core-blockchain").plugin, {});
};

export const tearDown = async () => {
    await require("@laroue/core-blockchain").plugin.deregister(app, {});
    await require("../../src/plugin").plugin.deregister(app, options);

    await app.tearDown();
};

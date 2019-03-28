import { app } from "@laroue/core-container";
import { registerWithContainer, setUpContainer } from "../../../core-test-utils/src/helpers/container";

jest.setTimeout(60000);

const options = {
    connection: {
        host: "localhost",
        port: 5432,
        database: "core_unitnet",
        user: "core",
        password: "password",
    },
};

export const setUp = async () => {
    await setUpContainer({
        exit: "@laroue/core-database-postgres",
        exclude: ["@laroue/core-database-postgres"],
    });

    // register first core-database because core-database-postgres extends it
    // (we might improve registerWithContainer to take care of extends)
    const { plugin: pluginDatabase } = require("@laroue/core-database");
    await registerWithContainer(pluginDatabase, options);

    const { plugin } = require("../../src/plugin");
    await registerWithContainer(plugin, options);
};

export const tearDown = async () => {
    await app.tearDown();

    const { plugin } = require("../../src/plugin");
    await plugin.deregister(app, options);
};

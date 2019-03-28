import { app } from "@laroue/core-container";
import { setUpContainer } from "@laroue/core-test-utils/src/helpers/container";
import { defaults } from "../../src/defaults";
import { startServer } from "../../src/server";

jest.setTimeout(60000);

let server;
async function setUp() {
    await setUpContainer({
        exit: "@laroue/core-blockchain",
    });

    server = await startServer(defaults);
}

async function tearDown() {
    await server.stop();
    await app.tearDown();
}

export { setUp, tearDown };

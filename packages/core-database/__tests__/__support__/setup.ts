import { app } from "@laroue/core-container";
import "@laroue/core-test-utils";
import { setUpContainer } from "@laroue/core-test-utils/src/helpers/container";

export const setUp = async () => {
    jest.setTimeout(60000);

    process.env.CORE_SKIP_BLOCKCHAIN = "true";

    return await setUpContainer({
        exit: "@laroue/core-blockchain",
        exclude: [
            "@laroue/core-p2p",
            "@laroue/core-transaction-pool",
            "@laroue/core-database-postgres",
        ],
    });
};

export const tearDown = async () => {
    await app.tearDown();
};

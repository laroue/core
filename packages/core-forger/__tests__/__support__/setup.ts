import { app } from "@laroue/core-container";
import { setUpContainer } from "@laroue/core-test-utils/src/helpers/container";

export const setUp = async () => {
    return setUpContainer({
        exit: "@laroue/core-p2p",
    });
};

export const tearDown = async () => {
    return app.tearDown();
};

import { constants } from "@laroue/crypto";
const { DelegateResignation } = constants.TransactionTypes;

export {};

declare global {
    namespace jest {
        // tslint:disable-next-line:interface-name
        interface Matchers<R> {
            toBeDelegateResignationType(): R;
        }
    }
}

expect.extend({
    toBeDelegateResignationType: received => {
        return {
            message: () => "Expected value to be a valid DelegateResignation transaction.",
            pass: received.type === DelegateResignation,
        };
    },
});

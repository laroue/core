import { Joi } from "@laroue/crypto";

/**
 * @type {Object}
 */
export const store = {
    payload: {
        block: Joi.block().options({ stripUnknown: true }),
    },
};

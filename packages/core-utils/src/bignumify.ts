import { Bignum } from "@laroue/crypto";

export function bignumify(value) {
    return new Bignum(value);
}

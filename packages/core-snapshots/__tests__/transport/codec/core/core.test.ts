/* tslint:disable:no-console */

import pick from "lodash/pick";
import msgpack from "msgpack-lite";

import { blocks } from "../../../fixtures/blocks";
import { transactions } from "../../../fixtures/transactions";

import { CoreCodec } from "../../../../dist/transport/codecs/core-codec";

const codec = new CoreCodec();

beforeAll(async () => {
    transactions.forEach((transaction: any) => {
        transaction.serialized = transaction.serializedHex;
    });
});

describe("Codec testing", () => {
    test("Encode/Decode single block", () => {
        console.time("singleblock");
        const encoded = msgpack.encode(blocks[1], { codec: codec.blocks });
        const decoded = msgpack.decode(encoded, { codec: codec.blocks });

        // removing helper property
        delete decoded.previous_block_hex;
        delete decoded.id_hex;

        expect(decoded).toEqual(blocks[1]);
        console.timeEnd("singleblock");
    });

    test("Encode/Decode blocks", () => {
        console.time("blocks");
        for (const [index, block] of blocks.entries()) {
            // TODO: skipping genesis for now - wrong id calculation
            if (index === 0) {
                continue;
            }

            const encoded = msgpack.encode(block, { codec: codec.blocks });
            const decoded = msgpack.decode(encoded, { codec: codec.blocks });

            // removing helper property
            delete decoded.previous_block_hex;
            delete decoded.id_hex;

            expect(block).toEqual(decoded);
        }
        console.timeEnd("blocks");
    });

    test("Encode/Decode transfer transactions", () => {
        console.time("transactions mlc transfer");
        const properties = [
            "id",
            "version",
            "block_id",
            "sequence",
            "sender_public_key",
            "recipient_id",
            "type",
            "vendor_field_hex",
            "amount",
            "fee",
            "serialized",
        ];
        const transferTransactions = transactions.filter(trx => trx.type === 0);
        for (let i = 0; i < 100; i++) {
            for (const transaction of transferTransactions) {
                const encoded = msgpack.encode(transaction, {
                    codec: codec.transactions,
                });
                const decoded = msgpack.decode(encoded, { codec: codec.transactions });

                const source = pick(transaction, properties);
                const dest = pick(decoded, properties);
                expect(dest).toEqual(source);
            }
        }
        console.timeEnd("transactions mlc transfer");
    });

    test("Encode/Decode transactions other than transfer", () => {
        console.time("transactions");
        const properties = [
            "id",
            "version",
            "block_id",
            "sequence",
            "sender_public_key",
            "type",
            "vendor_field_hex",
            "amount",
            "fee",
            "serialized",
        ];

        const otherTransactions = transactions.filter(trx => trx.type > 0);
        for (const transaction of otherTransactions) {
            const encoded = msgpack.encode(transaction, { codec: codec.transactions });
            const decoded = msgpack.decode(encoded, { codec: codec.transactions });

            const source = pick(transaction, properties);
            const dest = pick(decoded, properties);
            expect(dest).toEqual(source);
        }
        console.timeEnd("transactions");
    });
});

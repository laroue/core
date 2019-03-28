import { bignumify } from "@laroue/core-utils";
import { Model } from "./model";

export class Transaction extends Model {
    /**
     * The table associated with the model.
     * @return {String}
     */
    public getTable() {
        return "transactions";
    }

    /**
     * The read-only structure with query-formatting columns.
     * @return {Object}
     */
    public getColumnSet() {
        return this.createColumnSet([
            {
                name: "id",
            },
            {
                name: "version",
            },
            {
                name: "block_id",
                prop: "blockId",
            },
            {
                name: "sequence",
            },
            {
                name: "timestamp",
            },
            {
                name: "sender_public_key",
                prop: "senderPublicKey",
            },
            {
                name: "recipient_id",
                prop: "recipientId",
            },
            {
                name: "type",
            },
            {
                name: "vendor_field_hex",
                prop: "vendorFieldHex",
            },
            {
                name: "amount",
                init: col => bignumify(col.value).toFixed(),
            },
            {
                name: "fee",
                init: col => bignumify(col.value).toFixed(),
            },
            {
                name: "serialized",
                init: col => Buffer.from(col.value, "hex"),
            },
        ]);
    }
}

import { app } from "@laroue/core-container";
import { Blockchain } from "@laroue/core-interfaces";
import { bignumify } from "@laroue/core-utils";

export function transformBlockLegacy(model) {
    const lastBlock = app.resolvePlugin<Blockchain.IBlockchain>("blockchain").getLastBlock();

    return {
        id: model.id,
        version: model.version,
        timestamp: model.timestamp,
        previousBlock: model.previousBlock,
        height: model.height,
        numberOfTransactions: model.numberOfTransactions,
        totalAmount: +bignumify(model.totalAmount).toFixed(),
        totalForged: +bignumify(model.reward)
            .plus(model.totalFee)
            .toString(),
        totalFee: +bignumify(model.totalFee).toFixed(),
        reward: +bignumify(model.reward).toFixed(),
        payloadLength: model.payloadLength,
        payloadHash: model.payloadHash,
        generatorPublicKey: model.generatorPublicKey,
        blockSignature: model.blockSignature,
        confirmations: lastBlock ? lastBlock.data.height - model.height : 0,
    };
}

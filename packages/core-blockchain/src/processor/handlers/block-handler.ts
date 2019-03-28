import { app } from "@laroue/core-container";
import { Logger } from "@laroue/core-interfaces";
import { models } from "@laroue/crypto";
import { Blockchain } from "../../blockchain";
import { BlockProcessorResult } from "../block-processor";

export abstract class BlockHandler {
    protected logger: Logger.ILogger;

    public constructor(protected blockchain: Blockchain, protected block: models.Block) {
        this.logger = app.resolvePlugin<Logger.ILogger>("logger");
    }

    public async execute(): Promise<BlockProcessorResult> {
        this.blockchain.resetLastDownloadedBlock();
        return BlockProcessorResult.Rejected;
    }
}

import { app } from "@laroue/core-container";
import { Database } from "@laroue/core-interfaces";

/**
 * Get a single block from the database
 * @return {Block}
 */
export async function block(_, { id }) {
    return app.resolvePlugin<Database.IDatabaseService>("database").connection.blocksRepository.findById(id);
}

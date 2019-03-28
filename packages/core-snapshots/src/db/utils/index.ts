import { Logger } from "@laroue/core-interfaces";
import path from "path";
import { QueryFile } from "pg-promise";

import { app } from "@laroue/core-container";

const logger = app.resolvePlugin<Logger.ILogger>("logger");

export const loadQueryFile = (directory, file) => {
    const fullPath = path.join(directory, file);

    const options = {
        minify: true,
        params: {
            schema: "public",
        },
    };

    const query = new QueryFile(fullPath, options);

    if (query.error) {
        logger.error(query.error.toString());
    }

    return query;
};

export const rawQuery = (pgp, queryFile, parameters) => pgp.as.format(queryFile, parameters);

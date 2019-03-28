import { Container, Logger } from "@laroue/core-interfaces";
import { DatabaseManager } from "./manager";

export const plugin: Container.PluginDescriptor = {
    pkg: require("../package.json"),
    alias: "databaseManager",
    async register(container: Container.IContainer, options) {
        container.resolvePlugin<Logger.ILogger>("logger").info("Starting Database Manager");

        return new DatabaseManager();
    },
};

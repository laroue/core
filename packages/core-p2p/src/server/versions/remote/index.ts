import * as blockchain from "./handlers/blockchain";

/**
 * Register remote routes.
 * @param  {Hapi.Server} server
 * @param  {Object} options
 * @return {void}
 */
const register = async (server, options) => {
    server.route([{ method: "GET", path: "/blockchain/{event}", ...blockchain.emitEvent }]);
};

/**
 * The struct used by hapi.js.
 * @type {Object}
 */
export const plugin = {
    name: "P2P - Remote API",
    version: "0.1.0",
    register,
};

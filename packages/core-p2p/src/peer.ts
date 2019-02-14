import { app } from "@arkecosystem/core-container";
import { Logger, P2P } from "@arkecosystem/core-interfaces";
import axios from "axios";
import dayjs from "dayjs-ext";
import delay from "delay";
import socketCluster from "socketcluster-client";
import util from "util";
import { config as localConfig } from "./config";
import { PeerVerifier } from "./peer-verifier";

export class Peer implements P2P.IPeer {
    public downloadSize: any;
    public hashid: string;
    public nethash: any;
    public milestoneHash: string;
    public version: any;
    public os: any;
    public status: any;
    public delay: any;
    public ban: number;
    public offences: any[];

    public headers: {
        version: string;
        port: number;
        nethash: number;
        milestoneHash: string;
        height: number | null;
        "Content-Type": "application/json";
        hashid?: string;
        status?: any;
    };

    public socket;

    public state: any;
    public url: string;
    public lastPinged: dayjs.Dayjs | null;

    private config: any;
    private logger: Logger.ILogger;

    /**
     * @constructor
     * @param  {String} ip
     * @param  {Number} port
     */
    constructor(public readonly ip, public readonly port) {
        this.logger = app.resolvePlugin<Logger.ILogger>("logger");
        this.config = app.getConfig();

        this.ban = new Date().getTime();
        this.url = `${port % 443 === 0 ? "https://" : "http://"}${ip}:${port}`;
        this.state = {};
        this.offences = [];
        this.lastPinged = null;

        this.headers = {
            version: app.getVersion(),
            port: localConfig.get("port"),
            nethash: this.config.get("network.nethash"),
            milestoneHash: this.config.get("milestoneHash"),
            height: null,
            "Content-Type": "application/json",
        };

        if (this.config.get("network.name") !== "mainnet") {
            this.headers.hashid = app.getHashid();
        }

        this.socket = socketCluster.create({
            port,
            hostname: ip,
        });
        this.socket.on("error", err => {
            this.logger.debug(`Error catched: "${err}"`);
            // TODO handle error : if socket closed, ban peer ?
        });
    }

    /**
     * Set the given headers for the peer.
     * @param  {Object} headers
     * @return {void}
     */
    public setHeaders(headers) {
        ["nethash", "milestoneHash", "os", "version"].forEach(key => {
            this[key] = headers[key];
        });
    }

    /**
     * Set the given status for the peer.
     * @param  {String} value
     * @return {void}
     */
    public setStatus(value) {
        this.headers.status = value;
    }

    /**
     * Get information to broadcast.
     * @return {Object}
     */
    public toBroadcastInfo() {
        const data = {
            ip: this.ip,
            port: +this.port,
            nethash: this.nethash,
            milestoneHash: this.milestoneHash,
            version: this.version,
            os: this.os,
            status: this.status,
            height: this.state.height,
            delay: this.delay,
        };

        if (this.config.get("network.name") !== "mainnet") {
            (data as any).hashid = this.hashid || "unknown";
        }

        return data;
    }

    /**
     * Perform POST request for a block.
     * @param  {Block}              block
     * @return {(Object|undefined)}
     */
    public async postBlock(block) {
        return this.emit("p2p.peer.postBlock", { block });
        /*return this.__post(
            "/peer/blocks",
            { block },
            {
                headers: this.headers,
                timeout: 5000,
            },
        );*/
    }

    /**
     * Perform POST request for a transactions.
     * @param  {Transaction[]}      transactions
     * @return {(Object|undefined)}
     */
    public async postTransactions(transactions) {
        try {
            const response = await this.emit("p2p.peer.postTransactions", { transactions });

            /*
            const response = await this.__post(
                "/peer/transactions",
                {
                    transactions,
                },
                {
                    headers: this.headers,
                    timeout: 8000,
                },
            );
            */
            return response;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Download blocks from peer.
     * @param  {Number} fromBlockHeight
     * @return {(Object[]|undefined)}
     */
    public async downloadBlocks(fromBlockHeight) {
        try {
            const response = await this.getPeerBlocks(fromBlockHeight);

            this.__parseHeaders(response);

            const { blocks } = response;
            const size = blocks.length;

            if (size === 100 || size === 400) {
                this.downloadSize = size;
            }

            return blocks;
        } catch (error) {
            this.logger.debug(
                `Cannot download blocks from peer ${this.url} - ${util.inspect(error, {
                    depth: 1,
                })}`,
            );

            this.ban = new Date().getTime() + (Math.floor(Math.random() * 40) + 20) * 60000;

            throw error;
        }
    }

    /**
     * Perform ping request on this peer if it has not been
     * recently pinged.
     * @param  {Number} timeoutMsec operation timeout, in milliseconds
     * @param  {Boolean} force
     * @return {Object}
     * @throws {Error} If fail to get peer status.
     */
    public async ping(timeoutMsec, force = false) {
        const deadline = new Date().getTime() + timeoutMsec;
        if (this.recentlyPinged() && !force) {
            return;
        }

        // TODO use parameter timeoutMsec
        const body: any = await this.emit("p2p.peer.getStatus", null);
        /*
        const body = await this.__get("/peer/status", delay);
        */

        if (!body) {
            throw new Error(`Peer ${this.ip} is unresponsive`);
        }

        if (!body.success) {
            throw new Error(
                `Erroneous response from peer ${this.ip} when trying to retrieve its status: ` + JSON.stringify(body),
            );
        }

        if (process.env.CORE_SKIP_PEER_STATE_VERIFICATION !== "true") {
            const peerVerifier = new PeerVerifier(this);

            if (deadline <= new Date().getTime()) {
                throw new Error(
                    `When pinging peer ${this.ip}: ping timeout (${delay} ms) elapsed ` +
                        `even before starting peer verification`,
                );
            }

            if (!(await peerVerifier.checkState(body, deadline))) {
                throw new Error(
                    `Peer state verification failed for peer ${this.ip}, claimed state: ` + JSON.stringify(body),
                );
            }
        }

        this.lastPinged = dayjs();
        this.state = body;
        return body;
    }

    /**
     * Returns true if this peer was pinged the past 2 minutes.
     * @return {Boolean}
     */
    public recentlyPinged() {
        return !!this.lastPinged && dayjs().diff(this.lastPinged, "minute") < 2;
    }

    /**
     * Refresh peer list. It removes blacklisted peers from the fetch
     * @return {Object[]}
     */
    public async getPeers() {
        this.logger.info(`Fetching a fresh peer list from ${this.url}`);

        await this.ping(2000);

        const body: any = await this.emit("p2p.peer.getPeers", null);
        /*
        const body = await this.__get("/peer/list");
        */

        const blacklisted = {};
        localConfig.get("blacklist", []).forEach(ipaddr => (blacklisted[ipaddr] = true));
        return body.peers.filter(peer => !blacklisted[peer.ip]);
    }

    /**
     * Check if peer has common blocks.
     * @param  {[]String} ids
     * @param {Number} timeoutMsec timeout for the operation, in milliseconds
     * @return {Boolean}
     */
    public async hasCommonBlocks(ids, timeoutMsec?: number) {
        try {
            /*let url = `/peer/blocks/common?ids=${ids.join(",")}`;
            if (ids.length === 1) {
                url += ",";
            }*/

            const body: any = await this.emit("p2p.peer.getCommonBlocks", { ids });
            // TODO handle timeout see below old implementation
            /*
            const body = await this.__get(url, timeoutMsec);
            */

            return body && body.success && !!body.common;
        } catch (error) {
            const sfx = timeoutMsec !== undefined ? ` within ${timeoutMsec} ms` : "";
            this.logger.error(`Could not determine common blocks with ${this.ip}${sfx}: ${error}`);
        }

        return false;
    }

    /**
     * Perform GET request.
     * @param  {String} endpoint
     * @param  {Number} [timeout=10000]
     * @return {(Object|undefined)}
     */
    public async __get(endpoint, timeout?) {
        const temp = new Date().getTime();

        try {
            const response = await axios.get(`${this.url}${endpoint}`, {
                headers: this.headers,
                timeout: timeout || this.config.get("peers.globalTimeout"),
            });

            this.delay = new Date().getTime() - temp;

            this.__parseHeaders(response);

            return response.data;
        } catch (error) {
            this.delay = -1;

            this.logger.debug(`Request to ${this.url}${endpoint} failed because of "${error.message}"`);

            if (error.response) {
                this.__parseHeaders(error.response);
            }
        }
    }

    /**
     * Perform POST request.
     * @param  {String} endpoint
     * @param  {Object} body
     * @param  {Object} headers
     * @return {(Object|undefined)}
     */
    public async __post(endpoint, body, headers) {
        try {
            const response = await axios.post(`${this.url}${endpoint}`, body, headers);

            this.__parseHeaders(response);

            return response.data;
        } catch (error) {
            this.logger.debug(`Request to ${this.url}${endpoint} failed because of "${error.message}"`);

            if (error.response) {
                this.__parseHeaders(error.response);
            }
        }
    }

    /**
     * Parse headers from response.
     * @param  {Object} response
     * @return {Object}
     */
    public __parseHeaders(response) {
        ["nethash", "os", "version", "hashid"].forEach(key => {
            this[key] = response.headers[key] || this[key];
        });

        if (response.headers.milestonehash) {
            this.milestoneHash = response.headers.milestonehash;
        }

        if (response.headers.height) {
            this.state.height = +response.headers.height;
        }

        this.status = response.status;

        return response;
    }

    /**
     * GET /peer/blocks and return the raw response.
     * The API is such that the response is supposed to contain blocks at height
     * afterBlockHeight + 1, afterBlockHeight + 2, and so on up to some limit determined by the peer.
     * @param  {Number} afterBlockHeight
     * @return {(Object[]|undefined)}
     */
    public async getPeerBlocks(afterBlockHeight: number): Promise<any> {
        return this.emit("p2p.peer.getBlocks", {
            params: { lastBlockHeight: afterBlockHeight },
            headers: this.headers,
            timeout: 10000,
        });
    }

    private async emit(event, data) {
        if (!data) {
            data = {};
        }
        data.headers = this.headers;

        this.logger.debug(`Sending socket message "${event}" to ${this.ip} : ${JSON.stringify(data, null, 2)}`);

        // if socket is not connected, we give it 1 second
        for (let i = 0; i < 10 && this.socket.getState() !== this.socket.OPEN; i++) {
            await delay(100);
        }
        if (this.socket.getState() !== this.socket.OPEN) {
            throw new Error(`Peer socket is not connected. State: ${this.socket.getState()}`);
        }

        return new Promise((resolve, reject) => {
            try {
                this.socket.emit(event, data, (err, val) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(val);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

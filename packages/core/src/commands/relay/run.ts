import { app } from "@laroue/core-container";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class RunCommand extends BaseCommand {
    public static description: string = "Run the relay (without pm2)";

    public static examples: string[] = [
        `Run a relay
$ mlc relay:run
`,
        `Run a genesis relay
$ mlc relay:run --networkStart
`,
        `Disable any discovery by other peers
$ mlc relay:run --disableDiscovery
`,
        `Skip the initial discovery
$ mlc relay:run --skipDiscovery
`,
        `Ignore the minimum network reach
$ mlc relay:run --ignoreMinimumNetworkReach
`,
        `Start a seed
$ mlc relay:run --launchMode=seed
`,
    ];

    public static flags: CommandFlags = {
        ...BaseCommand.flagsNetwork,
        ...BaseCommand.flagsBehaviour,
    };

    public async run(): Promise<void> {
        const { flags } = await this.parseWithNetwork(RunCommand);

        await this.buildApplication(app, flags, {
            exclude: ["@laroue/core-forger"],
            options: {
                "@laroue/core-p2p": this.buildPeerOptions(flags),
                "@laroue/core-blockchain": {
                    networkStart: flags.networkStart,
                },
            },
        });
    }
}

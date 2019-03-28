import { app } from "@laroue/core-container";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class RunCommand extends BaseCommand {
    public static description: string = "Run the core (without pm2)";

    public static examples: string[] = [
        `Run core
$ mlc core:run
`,
        `Run core as genesis
$ mlc core:run --networkStart
`,
        `Disable any discovery by other peers
$ mlc core:run --disableDiscovery
`,
        `Skip the initial discovery
$ mlc core:run --skipDiscovery
`,
        `Ignore the minimum network reach
$ mlc core:run --ignoreMinimumNetworkReach
`,
        `Start a seed
$ mlc core:run --launchMode=seed
`,
    ];

    public static flags: CommandFlags = {
        ...BaseCommand.flagsNetwork,
        ...BaseCommand.flagsBehaviour,
        ...BaseCommand.flagsForger,
    };

    public async run(): Promise<void> {
        const { flags } = await this.parseWithNetwork(RunCommand);

        await this.buildApplication(app, flags, {
            options: {
                "@laroue/core-p2p": this.buildPeerOptions(flags),
                "@laroue/core-blockchain": {
                    networkStart: flags.networkStart,
                },
                "@laroue/core-forger": await this.buildBIP38(flags),
            },
        });
    }
}

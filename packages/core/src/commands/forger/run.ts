import { app } from "@laroue/core-container";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class RunCommand extends BaseCommand {
    public static description: string = "Run the forger (without pm2)";

    public static examples: string[] = [
        `Run a forger with a bip39 passphrase
$ mlc forger:run --bip39="..."
`,
        `Run a forger with an encrypted bip38
$ mlc forger:run --bip38="..." --password="..."
`,
    ];

    public static flags: CommandFlags = {
        ...BaseCommand.flagsNetwork,
        ...BaseCommand.flagsForger,
    };

    public async run(): Promise<void> {
        const { flags } = await this.parseWithNetwork(RunCommand);

        await this.buildApplication(app, flags, {
            include: [
                "@laroue/core-event-emitter",
                "@laroue/core-config",
                "@laroue/core-logger",
                "@laroue/core-logger-winston",
                "@laroue/core-forger",
            ],
            options: {
                "@laroue/core-forger": await this.buildBIP38(flags),
            },
        });
    }
}

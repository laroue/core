import { flags } from "@oclif/command";
import cli from "cli-ux";
import { configManager } from "../../helpers/config";
import { installFromChannel } from "../../helpers/update";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class CommandLineInterfaceCommand extends BaseCommand {
    public static description: string = "Update the CLI configuration";

    public static examples: string[] = [
        `Set the token that should be used for configuration
$ mlc config:cli --token=mine
`,
        `Switch the npm registry channel
$ mlc config:cli --channel=mine
`,
    ];

    public static flags: CommandFlags = {
        token: flags.string({
            description: "the name of the token that should be used",
        }),
        channel: flags.string({
            description: "the name of the channel that should be used",
            options: ["alpha", "beta", "rc", "latest"],
        }),
    };

    public async run(): Promise<void> {
        const { flags } = this.parse(CommandLineInterfaceCommand);

        if (flags.token) {
            configManager.update({ token: flags.token });
        }

        if (flags.channel) {
            this.changeChannel(flags.channel);
        }
    }

    private async changeChannel(newChannel): Promise<void> {
        const oldChannel = configManager.get("channel");

        if (oldChannel === newChannel) {
            this.warn(`You are already on the "${newChannel}" channel.`);
            return;
        }

        configManager.update({ channel: newChannel });

        const pkg = `${this.config.name}@${newChannel}`;

        try {
            cli.action.start(`Installing ${pkg}`);

            await installFromChannel(this.config.name, newChannel);

            this.warn(`${pkg} has been installed.`);

            cli.action.stop();

            const { flags } = await this.parseWithNetwork(CommandLineInterfaceCommand);

            await this.restartProcess(`${flags.token}-core`);
            await this.restartProcess(`${flags.token}-relay`);
            await this.restartProcess(`${flags.token}-forger`);
        } catch (err) {
            this.error(err.message);
        } finally {
            cli.action.stop();
        }
    }
}

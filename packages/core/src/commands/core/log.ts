import { flags } from "@oclif/command";
import { AbstractLogCommand } from "../../shared/log";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class LogCommand extends AbstractLogCommand {
    public static description: string = "Show the core log";

    public static examples: string[] = [`$ mlc core:log`];

    public static flags: CommandFlags = {
        ...BaseCommand.flagsNetwork,
        error: flags.boolean({
            description: "only show error output",
        }),
    };

    public getClass() {
        return LogCommand;
    }

    public getSuffix(): string {
        return "core";
    }
}

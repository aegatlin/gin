import { Option } from 'commander';
import { message } from './utils.js';
export function commanderJsAdapter(command, data) {
    const { name, description, subCommands } = data;
    if (subCommands) {
        subCommands.forEach((subCommand) => {
            const subC = command.command(subCommand.name);
            commanderJsAdapter(subC, subCommand);
        });
    }
    let desc = '';
    if (description)
        desc += `${description}\n`;
    if (data.actions)
        data.actions.forEach((a) => (desc += `${a.description}\n`));
    command.description(desc);
    if (data.options) {
        data.options.forEach((o) => {
            const option = new Option(o.flags, o.description);
            if (o.default) {
                option.default(o.default);
            }
            command.addOption(option);
        });
    }
    if (data.actions) {
        command.action((options) => {
            data.actions.forEach((a) => {
                message(`action: ${a.description}`);
                a.action(options);
            });
        });
    }
}

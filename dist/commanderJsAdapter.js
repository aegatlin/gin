import { Option } from 'commander';
import { message } from './utils.js';
export function commanderJsAdapter(program, ginCommands) {
    program.name('gin').description('Code Generators.');
    ginCommands.forEach((gc) => prepareCommand(program, gc));
    program.parse();
}
function prepareCommand(parent, ginCommand) {
    var _a;
    const { name, description, subCommands, actions } = ginCommand;
    const c = parent.command(name);
    const desc = (_a = actions === null || actions === void 0 ? void 0 : actions.map((a) => a.description)) !== null && _a !== void 0 ? _a : [];
    if (description)
        desc.unshift(description);
    c.description(desc.join('\n'));
    if (subCommands) {
        subCommands.forEach((subC) => prepareCommand(c, subC));
    }
    if (actions) {
        const options = ginCommand.actions.reduce((acc, { inputs }) => {
            if (!inputs)
                return acc;
            acc.push(...inputs);
            return acc;
        }, []);
        options.forEach((o) => {
            const opt = new Option(o.flags, o.description);
            if (o.default)
                opt.default(o.default);
            c.addOption(opt);
        });
        c.action((options) => {
            actions.forEach((a) => {
                message(`action: ${a.description}`);
                a.action(options);
            });
        });
    }
}

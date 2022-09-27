import { Action } from './action.js';
export const up = {
    name: 'up',
    actions: [Action.installDeps(['@aegatlin/gin@latest'], { global: true })],
};

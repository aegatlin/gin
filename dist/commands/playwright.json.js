import { Action } from '../action.js';
import { refPath } from '../utils.js';
export const playwright = {
    name: 'playwright',
    actions: [
        Action.installDeps(['@playwright/test'], { dev: true }),
        Action.writeFile('./tests/index.spec.ts', refPath('playwright/index.spec.ts')),
        Action.writeFile('./playwright.config.ts', refPath('playwright/playwright.config.ts')),
        Action.setScript('test', 'playwright test'),
    ],
};

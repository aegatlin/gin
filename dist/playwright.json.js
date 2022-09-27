import { Action } from './action.js';
import { refPath } from './utils.js';
export const playwright = {
    name: 'playwright',
    description: 'playwright generator',
    actions: [
        Action.installDeps(['@playwright/test'], { dev: true }),
        Action.writeFile('./tests/index.spec.ts', {
            referenceFilePath: refPath('playwright/index.spec.ts'),
        }),
        Action.writeFile('./playwright.config.ts', {
            referenceFilePath: refPath('playwright/playwright.config.ts'),
        }),
        Action.setScript('test', { defaultScript: 'playwright test' }),
    ],
};

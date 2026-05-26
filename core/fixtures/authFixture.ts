// The Bridge - Seeds data via API, drops state into UI
import { test as base } from '@playwright/test'
import { ConduitClient } from '../api/ConduitClient.js';

type workerFixtures = {
    authenticatedMobileEngine: { page: any, slug: string };
};

export const test = base.extend<workerFixtures>({
    authenticatedMobileEngine: async ({ request, browser }, use) => {
        // 1. Execute backend data seeding
        const apiClient = new ConduitClient(request);
        const { token, slug } = await apiClient.seedMobileTestData();

        // 2. Spawn a clean mobile viewport browser instance
        const context = await browser.newContext();

        // Inject the JWT token directly into the browsers local storage setup
        await context.addInitScript((jwt) => {
            window.localStorage.setItem('jwtToken', jwt);
        }, token);

        const page = await context.newPage();

        // Pass the configured page and the target article slug to the test execution block
        await use({ page, slug });

        // 3. Clean up the worker context after the test concludes
        await page.close();
        await context.close();
    }
});
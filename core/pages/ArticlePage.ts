// Page Object Model (POM) - Pure Mobile UI interactions
import { type Locator, type Page, expect } from "@playwright/test";
import { UI_LOCATORS } from "../constants/AppConstants.js";

export class ArticlePage {
    // Define explicit visibility modifiers and Playwright Locator types
    private readonly page: Page;
    private readonly articleBody: Locator;
    private readonly commentForm: Locator;

    constructor(page: Page) {
        this.page = page;
        // Extract read-only locator configurations dynamically from constants object
        this.articleBody = page.locator(UI_LOCATORS.ARTICLE_PAGE.BODY);
        this.commentForm = page.locator(UI_LOCATORS.ARTICLE_PAGE.COMMENT_FORM);
    }

    // Navigating Method
    async navigateToArticle(slug: string): Promise<void> {
        // Utilizing the global baseURL defined in playwright.config.ts configuration
        await this.page.goto(`/article/${slug}`, { waitUntil: 'networkidle' });
    }

    // Assertive Methods
    async verifyArticleContent(expectedText: string): Promise<void> {
        await expect(this.articleBody).toBeVisible();
        await expect(this.articleBody).toContainText(expectedText);
    }

    async verifyCommentSectionIsVisible(): Promise<void> {
        await expect(this.commentForm).toBeVisible();
    }
}
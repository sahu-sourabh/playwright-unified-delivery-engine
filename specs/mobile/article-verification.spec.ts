import { test } from '../../core/fixtures/authFixture.js';
import { ArticlePage } from '../../core/pages/ArticlePage.js';
import { DEFAULT_MOCK_DATA } from '../../core/constants/AppConstants.js';

test('Verify created article layout metrics on mobile devices', async ({ authenticatedMobileEngine }) => {
    // Arrange
    const { page, slug } = authenticatedMobileEngine;

    // Initialize the Page Object by passing the pre-authenticated mobile browser context
    const articlePage = new ArticlePage(page);

    // Act
    // Navigate straight to the unique article's URL page using its unique backend slug ID
    await articlePage.navigateToArticle(slug);

    // Assert
    // UI Verification: Check that key layout components stack correctly on mobile viewports
    await articlePage.verifyArticleContent(DEFAULT_MOCK_DATA.ARTICLE.BODY);
    // Verify mobile specific elements like nav bars or comment forms are properly displayed
    await articlePage.verifyCommentSectionIsVisible();
});
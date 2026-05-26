export const SYSTEM_DEFAULTS = {
  FALLBACK_PASSWORD: 'FallbackSecurePass123!'
} as const;

export const UI_LOCATORS = {
    ARTICLE_PAGE: {
        BODY: '.article-content',
        COMMENT_FORM: 'form.comment-form'
    }
} as const; // 'as const' makes this a deeply immutable, read-only type-safe structure

export const API_ENDPOINTS = {
    USERS: '/users',
    ARTICLES: '/articles'
} as const;

export const DEFAULT_MOCK_DATA = {
    ARTICLE: {
        DESCRIPTION: 'Testing MVP framework patterns',
        BODY: 'This article was generated instantly via a backend API request.',
        TAGS: ['typescript', 'playwright', 'mvp']
    }
} as const;

// Centralized schema data extraction paths 
export const API_DATA_MAPS = {
  USER: {
    TOKEN_PATH: (body: any): string => body?.user?.token,
  },
  ARTICLE: {
    SLUG_PATH: (body: any): string => body?.article?.slug,
  }
} as const;
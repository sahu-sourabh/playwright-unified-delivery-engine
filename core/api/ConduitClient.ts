// Service Object Model (SOM) - Pure HTTP requests
import { type APIRequestContext } from "@playwright/test";
import { API_ENDPOINTS, DEFAULT_MOCK_DATA, SYSTEM_DEFAULTS, API_DATA_MAPS } from "../constants/AppConstants.js";

export class ConduitClient {
    private readonly baseUrl: string;

    constructor(private request: APIRequestContext) {
        // Read base API URL safely from environment, throwing an error if missing
        const envApiUrl = process.env.CONDUIT_API_URL;
        if (!envApiUrl) throw new Error('CRITICAL: CONDUIT_API_URL is missing from environment file.');
        this.baseUrl = envApiUrl;
    }

    // Generates a completely unique user and creates an article entirely via API.
    // Returns the JWT token and the created article's slug for direct UI navigation.
    async seedMobileTestData() {
        const uniqueId = Date.now();
        const email = `sourabh_${uniqueId}@sdet.io`;
        const username = `sourabh_${uniqueId}`;
        // Reads default baseline password safely from environment or fallback constants
        const password = process.env.DEFAULT_TEST_PASSWORD || SYSTEM_DEFAULTS.FALLBACK_PASSWORD;

        // 1. Create a dynamic user account via API using structured environment variables
        const userResponse = await this.request.post(`${this.baseUrl}${API_ENDPOINTS.USERS}`, {
            data: { user: { username, email, password } }
        });
        if (!userResponse.ok()) throw new Error(`API User Registration Failed: ${userResponse.statusText()}`);
        const userBody = await userResponse.json();

        // Using the type-safe extraction mapping function rather than raw dot-notation paths
        const token = API_DATA_MAPS.USER.TOKEN_PATH(userBody);
        if (!token) throw new Error('CRITICAL: Token path extraction failed from user registration response.');

        // 2. Create an article via API using the new user's token
        const articleResponse = await this.request.post(`${this.baseUrl}${API_ENDPOINTS.ARTICLES}`, {
            headers: { 'Authorization': `Token ${token}` },
            data: {
                article: {
                    title: `MVP Architecture ${uniqueId}`,
                    description: DEFAULT_MOCK_DATA.ARTICLE.DESCRIPTION,
                    body: DEFAULT_MOCK_DATA.ARTICLE.BODY,
                    tagList: DEFAULT_MOCK_DATA.ARTICLE.TAGS
                }
            }
        });
        if (!articleResponse.ok()) throw new Error(`API Article Seeding Failed: ${articleResponse.statusText()}`);
        const articleBody = await articleResponse.json();

        // Using the extraction mapping function for clean decoupling
        const slug = API_DATA_MAPS.ARTICLE.SLUG_PATH(articleBody);
        if (!slug) throw new Error('CRITICAL: Slug path extraction failed from article seeding response.');

        return { token, slug }; // slug: used for direct URL access
    }
}
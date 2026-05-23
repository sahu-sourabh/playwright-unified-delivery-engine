# 🎭 Playwright-TypeScript-Lab      
An enterprise-grade automation sandbox focused on modular, type-safe, and clean-code design patterns. This repository demonstrates how to build scalable E2E test suites using custom fixtures and strict TypeScript models.  

### ✨ Key Highlights
- **Modular Architecture**: Built on SOLID design principles to ensure tests are declarative and maintainable.  
- **Custom Fixtures**: Implements dependency injection via Playwright fixtures to eliminate flaky setup hooks.  
- **Type Safety**: Utilizes strict TypeScript models for Page Objects and API payloads to catch errors at compile-time.  
- **CI/CD Ready**: Optimized for parallel headless execution in GitHub Actions pipelines.  

### 🛠️ Tech Stack
- **Engine**: Playwright Test  
- **Language**: TypeScript (Strict Mode)  
- **CI/CD**: GitHub Actions  
- **Style**: Prettier + ESLint  

### 🚀 Quick Start
1. **Clone & Install**:
- git clone 
- npm install
2. **Setup Browsers**:
- npx playwright install --with-deps
3. **Run Tests**:
- npm run test # Headless execution
- npm run test:ui # Interactive mode

### 🧬 Design Philosophy
Tests should be as clean as the production code they verify.
* **AAA Pattern**: Every test follows the **Arrange-Act-Assert** structure for maximum readability.
* **Zero Sleep Policy**: No hardcoded timeouts; the suite relies on Playwright’s auto-waiting and web-first assertions.
* **Scalability**: Page Objects are isolated from locator implementation, allowing for rapid UI changes without breaking the suite.

### 📊 Reporting
The project automatically generates **HTML reports** and captures **trace files** on failure, providing full observability into test execution.
- npm run report
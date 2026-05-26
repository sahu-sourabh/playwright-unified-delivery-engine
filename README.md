# 🎭 Playwright Unified Omnichannel Engine (`playwright-unified-omnichannel-engine`)

[![Playwright Tests](https://github.com/sahu-sourabh/Playwright-TypeScript-Lab/actions/workflows/playwright.yml/badge.svg)](https://github.com/sahu-sourabh/Playwright-TypeScript-Lab/actions/workflows/playwright.yml)

A production-grade, type-safe automated quality platform engineered in **TypeScript** using **Playwright**. This framework targets the exact technical friction points of modern multi-tiered web applications by tightly coupling an independent asynchronous **API Service Object Model (SOM)** layer with a decoupled **Mobile Web UI Page Object Model (POM)** layer.

---

## 🏗️ Core Architectural Design
Rather than executing slow, brittle UI workflows (like filling out forms, handling CAPTCHAs, or clicking through login pages) to set up test prerequisites, this engine shifts test data management entirely to the network layer. 

The framework intercepts the execution lifecycle, leverages background HTTP requests to seed dynamic data profiles directly via the backend API, extracts authorization states, and drops them cleanly into isolated, emulated mobile browser contexts before the page even loads.

---

## ⚡ MVP Implementation Highlights

This platform focuses strictly on architectural foundation, clean code abstractions, and maintainability, eliminating over-engineered technical debt:

* **Environment-Agnostic Isolation (`.env`)**: Zero hardcoded infrastructure elements. Target execution endpoints and default credential fallbacks are injected cleanly into runtime variables, ensuring the suite can switch from Staging to Production instantly without changing a line of source code.
* **Deeply Immutable Constants (`AppConstants.ts`)**: Implements a centralized, single source of truth using TypeScript read-only configurations (`as const`). All UI locators, backend endpoints, mock templates, and response data extraction maps are strictly isolated here to minimize future application maintenance debt.
* **Dynamic Data Isolation (`ConduitClient.ts`)**: Leverages microsecond tracking timestamps (`Date.now()`) to generate unique synthetic user data profiles on every execution thread, eliminating test collisions and state leakage in shared environments.
* **State Injections via Fixtures (`authFixture.ts`)**: Uses custom Playwright worker extensions to manage the lifecycle of isolated browser tokens, injecting active JSON Web Tokens (JWT) straight into the browser's `localStorage` to achieve instant access to deep application routes.

---

## 📂 Project Directory Structure

```text
├── core/
│   ├── api/
│   │   └── ConduitClient.ts       # Service Object Model (SOM) - Pure network requests
│   ├── constants/
│   │   └── AppConstants.ts        # Immutable, read-only locators, endpoints, and data maps
│   ├── fixtures/
│   │   └── authFixture.ts         # The Core Bridge - Seeds data via API, injects state into UI
│   └── pages/
│       └── ArticlePage.ts         # Page Object Model (POM) - Pure Mobile UI actions & auto-waits
├── specs/
│   └── mobile/
│       └── article-verification.spec.ts  # Clean, declarative executable test layer
├── .env.example                   # Secure environment tracking template
├── .gitignore                     # Enforces security hygiene by blocking local .env files
├── package.json                   # Project scripts and type-safe dependencies
├── playwright.config.ts           # Global device emulation contexts 
└── tsconfig.json
```
---

## 🛠️ Local Environment Initialization
1. **Prerequisites**
- Node.js (v18.x or higher)
- NPM

2. **Configuration Setup**
- Clone this repository to your local machine. Before running tests, create a localized environment file at the root of the project using our provided blueprint: **.env.example**.
- Open your new **.env** file and verify your target infrastructure coordinates are mapped correctly.

3. **Installation & Execution**
Install the framework binaries and execute the mobile responsive verification suite headlessly across configured browser engines:
- npm install
- npx playwright test
- npx playwright show-report

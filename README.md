# Playwright UI & API Test Framework — Document Automation Demo

Demo project based on real-world QA automation experience testing a document-generation
and template-management platform (web + API). Business logic and real endpoints are not
disclosed — this repository demonstrates approach, architecture and code style only.

## Table of Contents
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Directory Overview](#directory-overview)
- [Allure Reports](#allure-reports)
- [Core Libraries](#core-libraries)

---

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install
```

### 2. Environment setup

Create `.env` in the project root:

```env
# API tests
API_BASE_URL=https://api.example.com
API_KEY=your_api_key
APP_USERID=your_user_id
APP_USERNAME=your_user_name
APP_ROLES=your_user_roles

# UI tests
BASE_URL=https://demo.example.com
USER_BUYER_LOGIN=your_login
USER_BUYER_PASSWORD=your_password
USER_SELLER_LOGIN=your_login
USER_SELLER_PASSWORD=your_password
```

**Note:** `.env` is gitignored and never committed. Fill it in before running tests locally.

---

## Running Tests

**All API tests:**
```bash
npx playwright test --config=playwright.api.config.ts
```

**Specific API test file:**
```bash
npx playwright test tests/api/post-templates.creation.api.spec.ts
```

**All UI tests** (runs `global-setup.ts` first to authenticate all test users and save `storageState`):
```bash
npx playwright test --config=playwright.config.ts
```

### CI/CD

| Event | Build check |
|---|---|
| Push to any branch | runs automatically (install + type-check) |

---

## Project Structure

```
playwright-docflow-api-tests/
├── config/
│   └── api.config.ts                   # API endpoints & timeouts configuration
│
├── helpers/
│   ├── login.ts                        # Generic login flow helper
│   ├── locators.ts                      # Locators for the login form
│   └── safe-response.ts                # Safe JSON parsing — separates infra failures from real bugs
│
├── ui/
│   ├── elements/
│   │   └── Autocomplete.ts             # Reusable autocomplete UI component
│   └── pages/
│       └── base/
│           └── BasePage.ts             # Base class for all Page Objects
│
├── tests/
│   ├── api/
│   │   └── post-templates.creation.api.spec.ts   # Contract API test — template creation
│   └── fixtures/
│       └── apiClient.ts                          # APIRequestContext-based HTTP client fixture
│
├── utils/
│   └── constants.ts                    # Timeouts and retry constants
│
├── .github/
│   └── workflows/
│       └── build.yml                   # CI build validation
│
├── .gitignore
├── global-setup.ts                     # Multi-user authentication before UI test runs
├── package.json
├── playwright.config.ts                # Playwright config for UI tests
└── playwright.api.config.ts            # Playwright config for API tests
```

---

## Directory Overview

**`config/`**
Centralized API configuration — base URL, endpoints, timeouts.

**`helpers/`**
Reusable authentication and response-handling logic, decoupled from any specific identity provider.

**`ui/pages/`**
Page Objects — one class per screen/page, built on a shared `BasePage`.

**`ui/elements/`**
Reusable UI components (e.g. autocomplete) shared across multiple Page Objects.

**`tests/api/`**
Contract-level API tests validating request/response mapping for document template operations (create, list, delete).

**`tests/fixtures/`**
API client fixture built on Playwright's `APIRequestContext` — handles auth headers and request context lifecycle.

**`global-setup.ts`**
Authenticates multiple test user roles once before the UI suite runs and persists `storageState` per role — avoids repeated logins across test files.

---

## Allure Reports

Generate locally:
```bash
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

---

## Core Libraries

| Library | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | UI automation, API client, test runner, assertions |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Allure](https://allurereport.org) | Reporting |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |

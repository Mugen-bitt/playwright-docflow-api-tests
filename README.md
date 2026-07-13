# Playwright API Test Framework — Document Automation Demo

## Table of Contents
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
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
API_BASE_URL=https://api.example.com
API_KEY=your_api_key
APP_USERID=your_user_id
APP_USERNAME=your_user_name
APP_ROLES=your_user_roles
```

**Note:** `.env` is gitignored and never committed. Fill it in before running tests locally.

---

## Running Tests

**All API tests:**
```bash
npx playwright test --config=playwright.api.config.ts
```

**Specific file:**
```bash
npx playwright test tests/api/post-templates.creation.api.spec.ts
```

### CI/CD

| Event | Build check |
|---|---|
| Push to any branch | runs automatically (install + type-check) |

---

## Project Structure

```
playwright-docflow-api-tests/
├── tests/
│   ├── api/
│   │   └── post-templates.creation.api.spec.ts   # Contract API test — template creation
│   └── fixtures/
│       └── apiClient.ts                          # APIRequestContext-based HTTP client fixture
│
├── .github/
│   └── workflows/
│       └── build.yml                             # CI build validation
│
├── .gitignore
├── package.json
└── playwright.api.config.ts                      # Playwright config for API tests
```

### Directory overview

**`tests/fixtures/`**
API client fixture built on Playwright's `APIRequestContext` — handles auth headers and request context lifecycle.

**`tests/api/`**
Contract-level API tests validating request/response mapping for document template operations (create, list, delete).

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
| [Playwright](https://playwright.dev) | API client, test runner, assertions |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Allure](https://allurereport.org) | Reporting |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |

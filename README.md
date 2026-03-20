# Saucedemo Pet Project – Playwright Test Automation

This project contains automated tests for the [https://www.saucedemo.com](https://www.saucedemo.com) website using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern.

The purpose of this project is to demonstrate modern **QA automation practices**, including structured test architecture, reusable fixtures, tagged tests, UI and API performance checks, reporting, and CI integration.

---

# Tech Stack

- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**
- **Allure Reporter**
- **GitHub Actions**
- **Node.js**

---

# Project Structure

```
Saucedemo-petproject
│
├── src
│   ├── pages/            # Page Object Model classes
│   ├── components/       # Reusable UI components
│   ├── fixtures/         # Custom Playwright fixtures and test setup
│   └── utils/            # Helper functions and utilities
│
├── tests/                # UI functional tests
├── api-tests/            # API performance tests
│
├── .github/workflows/    # GitHub Actions CI configuration
│
├── .gitignore
├── .nvmrc
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

---

# Test Coverage

## UI Tests

### Positive Scenarios
Examples include:

- Log in, add few random products to the cart and do successful checkout,
- Log in, add few random products to the cart and verify, that checkout correctly summarized its prices,
- Log in and verify all four sort options are correctly sorting items.

### Negative Scenarios
Examples include:

- Trying to log in with incorrect password
- Log in, forward to checkout and try to continue without providing first name,

---

## API performance Checks
Examples include:

- _to be filled_

---

# Test Users

The project uses multiple predefined users available in Saucedemo:

| User | Description |
|-----|-------------|
| `standard_user` | Standard user with full functionality |
| `locked_out_user` | User that cannot log in |
| `problem_user` | User with known UI issues |

---

# Tags

Used tags:

### Test type:
```
@functional
@non-functional
```
### Test suite
```
@smoke
@regression
```
### Test nature:
```
@negative
@positive
```
### Area:
```
@e2e
@login
@products
@checkout
```
### Layer tested:
```
@ui
@api
```

Example usage:

```bash
npx playwright test --grep @functional
```

---

# Reporting

The project integrates **Allure Reporter** for detailed test reports.

Generate and open the report:

```bash
npx playwright test
npx allure generate ./allure-results --clean
npx allure open
```

The report includes:

_to be filled_

---

# CI/CD – GitHub Actions

Automated tests run using **GitHub Actions** on each push or pull request.

The CI pipeline includes:

_to be filled_

Workflow configuration is located in:

```
.github/workflows/
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/Saucedemo-petproject.git
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests using UI mode:

```bash
npx playwright test --ui
```

Run tests by tag:

```bash
npx playwright test --grep @functional
```

---

# Project Purpose

This project was created as a **QA Automation practice project** to demonstrate:

- Playwright test automation
- TypeScript usage in testing
- Clean project architecture
- CI/CD integration
- Reporting and debugging tools

---

# Author

Jakub Rzempała

_QA Automation Engineer_
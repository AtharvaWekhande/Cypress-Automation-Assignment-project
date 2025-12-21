# Cypress E2E Testing Project

This project contains end-to-end (E2E) tests for the Gatehouse QA application using Cypress testing framework.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Files](#test-files)
- [Configuration](#configuration)
- [Test Scenarios](#test-scenarios)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, or Electron)

## Installation

1. Clone or navigate to the project directory:
   ```bash
   cd "c:\project\cypress project\cyp 1"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

This will install Cypress and all required dependencies.

## Project Structure

```
cyp-1/
├── cypress/
│   ├── e2e/              # Test specifications
│   │   ├── test1.cy.js   # Main test file
│   │   └── login.cy.js   # Login test file
│   ├── fixtures/         # Test data files
│   │   └── example.json
│   └── support/          # Custom commands and configurations
│       ├── commands.js   # Custom Cypress commands
│       └── e2e.js        # E2E support file
├── cypress.config.js     # Cypress configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npx cypress open
```

This opens the Cypress Test Runner GUI where you can:
- Select and run individual tests
- Watch tests execute in real-time
- Debug tests interactively

### Run Tests in Headless Mode

```bash
npx cypress run
```

This runs all tests in headless mode (no browser window).

### Run a Specific Test File

```bash
npx cypress run --spec "cypress/e2e/test1.cy.js"
```

### Run Tests in a Specific Browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Test Files

### `test1.cy.js`

Main test file containing comprehensive E2E tests for the Gatehouse QA application. This test suite includes:

- **Login Flow**: Authenticates with test credentials
- **Application Filtering**: Filters applications by App ID (00181439)
- **Form Filling**: Comprehensive form submission with:
  - Personal information (name, email, date of birth)
  - Dropdown selections (title, nationality, country, etc.)
  - Radio button selections
  - Address information (multiple addresses)
  - Date picker inputs
  - Text inputs and number fields

**Test Credentials:**
- Email: `Atharva.uw@dynamatix.com`
- Password: `Pass@123Pass@123`

**Test Application ID:** `00181439`

### `login.cy.js`

Dedicated login test file (if present).

## Configuration

### Viewport Settings

The tests are configured to run with a viewport resolution of **1600x700** pixels:

```javascript
cy.viewport(1600, 700)
```

### Timeout Settings

Default command timeout is configured in `cypress.config.js`. Individual commands may use custom timeouts:

- Standard timeout: 15-20 seconds
- Extended timeout: 25-35 seconds (for conditionally rendered elements)

### Base URL

The application under test is:
```
https://gatehouse-qa.dynamatix.com
```

## Test Scenarios

### 1. Login and Navigation
- Navigate to the application
- Enter credentials and log in
- Verify successful login
- Navigate through application sections

### 2. Application Filtering
- Filter applications by App ID
- Verify filter persistence
- Interact with filtered results

### 3. Form Submission
- Fill personal information fields
- Select dropdown values
- Choose radio button options
- Enter address details (multiple addresses)
- Input dates using date pickers
- Submit forms

## Troubleshooting

### Common Issues

#### 1. Element Not Found / Timeout Errors

**Problem:** Tests fail with "Expected to find element: [selector], but never found it"

**Solutions:**
- Increase timeout values for slow-loading elements
- Add `cy.wait()` commands after actions that trigger DOM changes
- Use more flexible selectors with fallback options
- Check if elements are conditionally rendered and wait for parent containers

#### 2. Filter Getting Unfiltered

**Problem:** Filter value disappears after being set

**Solutions:**
- Use `.blur()` or `{enter}` instead of `.click()` after typing
- Add assertions to verify filter persistence
- Add appropriate wait times after filter actions

#### 3. Dropdown Not Opening

**Problem:** Dropdown doesn't open when clicked

**Solutions:**
- Add `cy.wait()` after clicking dropdown labels
- Ensure element is visible before clicking
- Use `.scrollIntoView()` if element is off-screen
- Check for parent container existence before interacting

#### 4. Form Fields Not Clearing

**Problem:** Previous values remain in form fields

**Solutions:**
- Use `.clear()` before `.type()` commands
- Ensure proper command chaining: `cy.get(...).clear().type(...)`

### Debugging Tips

1. **Use Cypress Test Runner**: Open Cypress in interactive mode to see tests run step-by-step
2. **Add Console Logs**: Use `cy.log()` to track test execution
3. **Take Screenshots**: Use `cy.screenshot()` at critical points
4. **Pause Execution**: Use `cy.pause()` to inspect the DOM at specific points
5. **Check Element State**: Use `.should('be.visible')` and `.should('exist')` assertions

## Best Practices

1. **Use Descriptive Selectors**: Prefer stable selectors (IDs, data attributes) over CSS classes
2. **Add Appropriate Waits**: Use `cy.wait()` judiciously, prefer waiting for elements to appear
3. **Chain Commands Properly**: Ensure commands are properly chained
4. **Verify State**: Add assertions to verify expected state before proceeding
5. **Handle Dynamic Content**: Use conditional logic for dynamically rendered elements

## Dependencies

- **Cypress**: ^15.8.1

## Version

- **Project Version**: 1.0.0
- **Cypress Version**: 15.8.1

## License

ISC

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Cypress documentation: https://docs.cypress.io
3. Check test logs and error messages for specific details

---

**Note:** This project is configured for testing the Gatehouse QA environment. Ensure you have proper access credentials before running tests.

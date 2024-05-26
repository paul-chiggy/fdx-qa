# Assessment Solution

This is a test QA assignment solution for Fedex performed with the Cypress IO test framework and TypeScript.

## Preparation

### SUT stabilisation

To make testing seamless and stable, I have stabilised system under test by doing the following:

- upgraded all packages and dependencies to the latest versions, including Angular and TypeScript
- used the latest version of NodeJS (20)
- removed all deprecated dependencies/packages
- fixed all npm vulnerabilies
- added all needed `data-testid` tags for easier selector management
- hosted the app at https://fdx.qa.coach to be able to always access the live SUT with tests

## Execution

### Test framework

Key points of the test automation solution implementation:

- used Cypress IO of the latest version (`13.10.X`)
- went for mocha + TypeScript approach (`describe` & `it` blocks)
- introduced Page Object Model for easier management of pages and web-elements, and division of responsibilities
- introduced the `cypress testing` library for seamless testing commands experience
- introduced `mochawesome` reporter to be able to provide test reports to stakeholders
  - reports are generated in the `cypress/reports` folder
  - open `test-report.html` in browser to view a nice human-readable report

### Test-scenarios covered

I have covered the following test-scenarios:

- person lookup with a single search result
- person lookup with multiple search results
- planet lookup with a single search result
- planel lookup with multiple search result
- person lookup with an invalid query (a.k.a Not found)
- planet lookup with an invalid query (a.k.a Not found)
- entity lookup with varied cases (cAsEs, cases, CASES)
- search submission with Enter and with the Submit button
- search submision by visiting a URL directly
- clearing search results
- search form page verification

_Note! I have combined several scenarios in single tests, e.g. lookup and cases-sensitivity checks, etc._

_Note! Due to time constraints, I did not cover all edge-case scenarios_

### SUT anomalies spotted

During testing and TA implementation, I've spotted the following anomalies:

1. Clearing the search results (by clearing the query input and submitting request again) does not work, meaning users do not get empty search results
2. Users can search by space, which is weird. In such a case, users get such characters as R2-D2 as well.
3. API returns entities w/o spaces when querying with `" "`, but FE mutates the value by adding spaces
4. No pagination implemented: when API returns a total of 58 results, with first 10 objects and a URL for the next 10, FE does not pick it up, providing users with no pagination

### How-to

To install this project, run `npm install`

To run tests execute the following command: `npm run test`

### Improvements that I'd like to make, if I had more time:

- do more in-depth assertions (web-elements, data, API, etc.)
- revise and add more proper selectors
- make use of fixtures for more data-driven testing
- improve reporting by adding more reporter types
- extend the POM, if needed
- add a more advanced linter and agree on common conventions
- bonus stuff:
  - add a CI/CD yaml to hook it up to a pipeline
  - dockerize this solution to make it platform-agnostic
  - add a visual testing plugin to be able to compare screenshots
  - add component testing for the Angular app

import { SearchPage } from "../page-object/search-page";

describe("Star Wars Search", () => {
  const searchPage = new SearchPage();

  beforeEach(() => {
    // scenario background
    // GIVEN users are on the search page
    searchPage.visit();
    searchPage.verify();
  });

  describe("People search functionality", () => {
    describe("Positive test-cases", () => {
      it("should display a search result upon a valid query", () => {
        // WHEN users search for a person with a valid query
        searchPage.searchFor(searchPage.searchType.PEOPLE, "anakin");
        // THEN users should see a valid search result
        searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, true);
      });

      it("should display multiple search results upon a valid query", () => {
        // WHEN users search for a person with a valid query
        searchPage.searchFor(searchPage.searchType.PEOPLE, "dArTh");
        // THEN users should see valid search results
        searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, false);
      });
    });

    describe("Negative test-cases", () => {
      it("should display Not Found upon an invalid query", () => {
        // WHEN users searches for a person with a valid query
        searchPage.searchFor(searchPage.searchType.PEOPLE, "HOTH");
        // THEN users should see a valid search result
        searchPage.verifyInvalidQuery();
      });
    });
  });

  describe("Planet search functionality", () => {
    describe("Positive test-cases", () => {
      it("should display a search result upon a valid query", () => {
        // WHEN users searches for a planet with a valid query
        searchPage.searchFor(searchPage.searchType.PLANETS, "HOTH");
        // THEN users should see a valid search result
        searchPage.verifyValidQuery(searchPage.searchType.PLANETS, true);
      });

      it("should display multiple search results upon a valid query", () => {
        // WHEN users search for a planet with a valid query
        searchPage.searchFor(searchPage.searchType.PLANETS, "a");
        // THEN users should see valid search results
        searchPage.verifyValidQuery(searchPage.searchType.PLANETS, false);
      });
    });

    describe("Negative test-cases", () => {
      it("should display Not Found upon an invalid query", () => {
        // WHEN users searches for a planet with an invalid query
        searchPage.searchFor(searchPage.searchType.PLANETS, "anakin");
        // THEN users should see Not Found in search results
        searchPage.verifyInvalidQuery();
      });
    });
  });

  describe("Generic flows", () => {
    it("should trigger search by Enter key", () => {
      // WHEN users search for a person and hit Enter
      cy.findByTestId(searchPage.queryInput).clear().type("luke{Enter}");
      // THEN search should be triggered and provide a valid search result
      searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, true);
    });

    it("should clear search results by clearing input and submitting search", () => {
      // WHEN users get search results
      // AND clear previous query
      // AND submit a form
      searchPage.searchFor(searchPage.searchType.PEOPLE, "anakin");
      searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, true);
      cy.findByTestId(searchPage.queryInput).clear();
      cy.findByTestId(searchPage.submitButton).click();
      // THEN search results should be cleared and empty result displayed
      cy.findByTestId(searchPage.personResult).should("not.exist");
    });

    it("should display empty results when requested via URL with empty query", () => {
      // WHEN users open URL with empty query
      cy.visit(Cypress.env("BASE_URL") + "/?searchType=people&query=");
      // THEN search results should be empty
      cy.findByTestId(searchPage.personResult).should("not.exist");
      cy.findByTestId(searchPage.planetResult).should("not.exist");
    });
  });
});

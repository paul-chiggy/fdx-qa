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
        const query = "luke skywalker";
        // WHEN users search for a person with a valid query
        searchPage.searchFor(searchPage.searchType.PEOPLE, query);
        // THEN users should see a valid search result
        searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, true);
      });

      it("should display multiple search results upon a valid query", () => {
        const query = "dArTh";
        // WHEN users search for a person with a valid query
        searchPage.searchFor(searchPage.searchType.PEOPLE, query);
        // THEN users should see valid search results
        searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, false);
      });
    });

    describe("Negative test-cases", () => {
      it("should display Not Found upon an invalid query", () => {
        const query = "HOTH";
        // WHEN users search for a person with a valid query
        searchPage.searchFor(searchPage.searchType.PEOPLE, query);
        // THEN users should see a valid search result
        searchPage.verifyInvalidQuery();
      });
    });
  });

  describe("Planet search functionality", () => {
    describe("Positive test-cases", () => {
      it("should display a search result upon a valid query", () => {
        const query = "HOTH";
        // WHEN users search for a planet with a valid query
        searchPage.searchFor(searchPage.searchType.PLANETS, query);
        // THEN users should see a valid search result
        searchPage.verifyValidQuery(searchPage.searchType.PLANETS, true);
      });

      it("should display multiple search results upon a valid query", () => {
        const query = "a";
        // WHEN users search for a planet with a valid query
        searchPage.searchFor(searchPage.searchType.PLANETS, query);
        // THEN users should see valid search results
        searchPage.verifyValidQuery(searchPage.searchType.PLANETS, false);
      });
    });

    describe("Negative test-cases", () => {
      it("should display Not Found upon an invalid query", () => {
        const query = "anakin";
        // WHEN users search for a planet with an invalid query
        searchPage.searchFor(searchPage.searchType.PLANETS, query);
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
      const query = "anakin";
      // WHEN users clear previous query
      // AND submit a form
      searchPage.searchFor(searchPage.searchType.PEOPLE, query);
      searchPage.verifyValidQuery(searchPage.searchType.PEOPLE, true);
      cy.findByTestId(searchPage.queryInput).clear();
      cy.findByTestId(searchPage.submitButton).click();
      // THEN previous search results should be cleared and "empty" result displayed
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

import { BasePage } from "./base-page";

export class SearchPage implements BasePage {
  // selectors
  peopleLabel = "people-label";
  peopleRadioButton = "people-radio-button";
  planetsLabel = "planets-label";
  planetsRadioButton = "planets-radio-button";
  queryLabel = "query-label";
  queryInput = "query-input";
  submitButton = "submit-button";
  resultNotFound = "result-not-found";
  personResult = "person-result";
  planetResult = "planet-result";
  personName = "character-name";
  planetName = "planet-name";

  searchType = {
    PEOPLE: "people",
    PLANETS: "planets",
  };

  verify(): void {
    cy.findByTestId(this.peopleLabel).should("be.visible");
    cy.findByTestId(this.peopleRadioButton).should("be.visible");
    cy.findByTestId(this.planetsLabel).should("be.visible");
    cy.findByTestId(this.planetsRadioButton).should("be.visible");
    cy.findByTestId(this.queryLabel).should("exist");
    cy.findByTestId(this.queryInput).should("be.visible");
    cy.findByTestId(this.submitButton).should("be.visible");
  }

  visit(): void {
    cy.visit(Cypress.env("BASE_URL"));
    cy.url().should("include", Cypress.env("BASE_URL"));
  }

  searchFor(entity: string, query: string) {
    if (entity === this.searchType.PEOPLE) {
      cy.findByTestId(this.peopleRadioButton).click();
    } else {
      cy.findByTestId(this.planetsRadioButton).click();
    }
    cy.findByTestId(this.queryInput).clear().type(query);
    cy.findByTestId(this.submitButton).click();
  }

  verifyValidQuery(entity: string, isSingle: boolean) {
    if (isSingle) {
      this.verifySingleResult(entity);
    } else {
      this.verifyMultipleResults(entity);
    }
  }

  verifySingleResult(entity: string): void {
    if (entity === this.searchType.PEOPLE) {
      cy.findAllByTestId(this.personResult).should("have.length", 1);
    } else {
      cy.findAllByTestId(this.planetResult).should("have.length", 1);
    }
    // TODO: do more data assertions here based on query
  }

  verifyMultipleResults(entity: string): void {
    if (entity === this.searchType.PEOPLE) {
      cy.findAllByTestId(this.personResult).should(
        "have.length.greaterThan",
        1
      );
    } else {
      cy.findAllByTestId(this.planetResult).should(
        "have.length.greaterThan",
        1
      );
    }
    // TODO: do more data assertions here based on query
  }

  verifyInvalidQuery(): void {
    cy.findByTestId(this.resultNotFound)
      .should("be.visible")
      .should("have.text", " Not found. ");
  }
}

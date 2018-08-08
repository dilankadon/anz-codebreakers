/* global given, when, then */

given('Land on the home page', () => {
    cy.visit(Cypress.env('baseUrl'))
})


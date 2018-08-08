const _ = Cypress._

let pageMap = {
  homePage: {
    name: "home",
    url: "",
    header: "Home"
  },
  easyPage: {
    name: "easy",
    url: "easy",
    header: "Easy"
  },
  mediumPage: {
    name: "medium",
    url: "medium",
    header: "Medium"
  },
  hardPage: {
    name: "hard",
    url: "hard",
    header: "Medium"
  }
}

function checkIsOnPage(pageName, firstName) {
    let matchPage = _.find(pageMap, { name: pageName.toLowerCase() })
    if (matchPage) {
        cy.location('pathname', { timeout: 10000 }).should('include', '/' + matchPage.url)
        let matchHeader = matchPage.header
        if(firstName) {
            matchHeader = matchPage.header.replace('{{firstName}}', firstName)
        }
        cy.wait(1000)
        cy.get('h1').contains(matchHeader).should('contain', matchHeader)
    } else {
        assert.isDefined(matchPage, 'Match found for page: ' + pageName)
    }
}

function checkField(group) {
    cy.get('fieldset').contains(group).parent().within(() => {
        cy.get('label').contains('No').should('have.text', 'No')
    })
}

module.exports = {
  checkIsOnPage,
  checkField
};
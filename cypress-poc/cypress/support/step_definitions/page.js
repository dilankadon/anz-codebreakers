/* global given, when, then */
const _ = require('lodash')
const chai = require('chai')
chai.use(require('chai-shallow-deep-equal'))

const sectionHelper = require('./section')
const pageHelper = require('./pages')
const $ = Cypress.$


given(`Wait for "{int}" seconds`, waitSeconds => {
  cy.wait(waitSeconds * 1000)
})

then(`You should see {string} in the title`, title => {
  cy.title().should('include', title);
});

then(`You should eventually see heading {string} in hero banner`, heading => {
  cy.get('[data-test-id="hero-banner-title"]').contains(heading).should('have.text', heading)
})

then(`You should eventually see sub-heading {string} in hero banner`, heading => {
  cy.get('[data-test-id="hero-banner-subtitle"]').contains(heading).should('have.text', heading)
})

then(`You should eventually see heading {string}`, heading => {
  cy.get('h1').contains(heading).should('contain', heading)
})

then(/^You should be on the "([^"]*)?" page$/, (pageName) => {
  pageHelper.checkIsOnPage(pageName)
});

then(`Fill in {string} input with {string}`, (fieldName, value) => {
  cy.get('label').contains(fieldName).parent('div').within(() => {
    cy.get('input[type="text"]').type(value, {force:true})
  })
})

then(`Click the {string} button`, buttonName => {
  cy.get('button').contains(buttonName).click({ waitForAnimations: false, force:true})
})

then(`You should not see an information note in the {string} section`,
  (sectionName) => {
    let sectionMatch = sectionHelper.getSection(sectionName)
    sectionMatch.within(() => {
      cy.get('[data-test-id="information_box"]').should('not.be.visible')
    })
  })

then(`You should see information note with with heading {string} and body {string} in the {string} section`,
 (heading, body, sectionName) => {
    let sectionMatch = sectionHelper.getSection(sectionName)
    sectionMatch.within(() => {
      cy.get('[data-test-id="information_box_heading"]').should('have.text', heading)
      cy.get('[data-test-id="information_box_contents"]').invoke('text').then((contents) => {
        contents = contents.replace('\n', '')
        expect(contents).to.eq(body)
      })
    })
})

then(`You should see {string} field`, (fieldName) => {
    cy.get('label').contains(fieldName).should('be.visible')
})

then(`You should not see {string} field`, (fieldName) => {
    cy.get('label').contains(fieldName).should('not.be.visible')
})

then(`You should see page level validation text {string}`, (pageLevelValidationText) => {
  cy.get('[data-id="alert"] [data-test-id="message-wrapper"]').should('have.text', pageLevelValidationText)
})

then(`You should not see any page level validation`, () => {
  cy.get('[data-id="alert"] [data-test-id="message-wrapper"]').should('not.be.visible')
})

then(`The fieldset radiobutton group {string} validation will be {string}`, (radioGroupName, validationText) => {
  cy.get('fieldset').contains(radioGroupName).parent().within(() => {
    cy.get('[role="alert"]').should('have.text', validationText)
  })
})

then(`The {string} validation will be {string}`, (fieldName, validationText) => {
  cy.get('label').contains(fieldName).parent().within(() => {
    cy.get('[role="alert"]').should('have.text', validationText)
  })
})

then(`The fieldset radiobutton group {string} validation will be blank`, radioGroupName => {
  cy.get('fieldset').contains(radioGroupName).parent().within(() => {
    cy.get('[role="alert"]').should('not.be.visible')
  })
})

then(`The {string} validation will be blank`, fieldName => {
  cy.get('label').contains(fieldName).parent().within(() => {
    cy.get('[role="alert"]').should('not.be.visible')
  })
})

then(/You should see "(\d+)" challenges? displayed/, numOfChallenges => {
  cy.get('[data-test-id$="-section"]').its('length').should('equal', numOfChallenges)
})

then(`You should see heading {string} for challenge {int}`, (heading, challengeNum) => {
  let challengeIndex = challengeNum - 1
  cy.get('[data-test-id$="-section"]').eq(challengeIndex).within(() => {
    cy.get('h2').should('contain', heading)
  })
})

then(`You should see body text {string} for challenge {int}`, (bodyText, challengeNum) => {
  let challengeIndex = challengeNum - 1
  cy.get('[data-test-id$="-section"]').eq(challengeIndex).within(() => {
    cy.get('p').should('have.text', bodyText)
  })
})

then(`You should see a button link {string} for challenge {int}`, (buttonLink, challengeNum) => {
  let challengeIndex = challengeNum - 1
  cy.log(challengeIndex)
  cy.get('[data-test-id$="-section"]').eq(challengeIndex).within(() => {
    cy.get('button').should('have.text', buttonLink);
  })
})

then(`Click the button link {string} for challenge {int}`, (buttonLink, challengeNum) => {
  let challengeIndex = challengeNum - 1
  cy.get('[data-test-id$="-section"]').eq(challengeIndex).within(() => {
    cy.contains(buttonLink).click()
  })
})

then(`Fill in the following fields with values:`, dataTable => {
  let fields = dataTable.hashes()

  fields.forEach(function (row) {
    cy.get('label').contains(row.fieldName).parent('div').within(() => {
      cy.log(`value: ${row.value}`)
      cy.get('input').type(row.value)
    })
  })
})


then(`You should see the {string} section`, (sectionName) => {
  sectionHelper.getSection(sectionName).should('be.visible')
})

then(`You should see heading {string} in the {string} section`, (headingName, sectionName) => {
  sectionHelper.getSection(sectionName).within(() => {
    cy.get('h2').contains(headingName).should('have.text', headingName)
  })
})

then(`You should see a {string} button`, buttonName => {
  cy.get('button').contains(buttonName).should('be.visible')
})

then(/The "([^"]*)?" button is (enabled|disabled)/, (buttonName, toggle) => {
  if(toggle === 'enabled') {
    cy.get('button').contains(buttonName).should('be.enabled')
  } else {
    cy.get('button').contains(buttonName).should('be.disabled')
  }
})

then(`The score text should display {string}`, (scoreText) => {
  cy.get('[data-test-id="score"]').should('have.text', scoreText)
})

then(`The hint text should display {string}`, hintText => {
  cy.get('[data-test-id="hint"]').should("have.text", hintText)
});

then(`You should see the game area displayed`, () => {
  cy.get('[data-test-id="game-wrapper"]').should('be.visible')
})

then(`You should see {int} group(s) of emojis`, numGroups =>  {
  cy.get('[data-test-id="word-wrapper"]').its('length').should('equal', numGroups)
})


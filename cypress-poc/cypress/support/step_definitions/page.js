/* global given, when, then */
const _ = require('lodash')
const chai = require('chai')
chai.use(require('chai-shallow-deep-equal'))

const common = require('./common')
const sectionHelper = require('./section')
const pageHelper = require('./pages')
const iconHelper = require('./icons')
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

then(`Click {string} radiobutton for fieldset group {string}`, (buttonName, group) => {
  cy.get('fieldset').contains(group).parent().within(() => {
    cy.get('label').contains(buttonName).siblings('input[type="radio"]').click({force:true})
  })
})

then(`Fill in {string} input with {string}`, (fieldName, value) => {
  cy.get('label').contains(fieldName).parent('div').within(() => {
    cy.get('input[type="text"]').type(value, {force:true})
  })
})

then(`Click the {string} autocomplete selection for the {string} field`, (indexText, fieldName) => {
  let index = common.convertIndexTextToIndex(indexText)
  cy.get('label').contains(fieldName).parent('div').siblings('ul[role="listbox"]').within(() => {
    cy.get('li').eq(index).click()
  })
})

then(`You should see the following fieldset radiobuttons for group {string}:`, (group, dataTable) => {
      // expect dataTable with the following format:
      // | radiobuttonName  |
      // | button1          |
  let fields = dataTable.hashes()
  fields.forEach(function (row) {
    cy.get('fieldset').contains(group).parent().within(() => {
      cy.get('label').contains(row.radiobuttonName).should('have.text', row.radiobuttonName)
    })
  })
})

then(`You should see the following fieldset radiobuttons with enabled states for group {string}:`, (group, dataTable) => {
  // expect dataTable with the following format:
  // | radiobuttonName  | enabled    |
  // | button1          | true/false |
  let toggle
  let fields = dataTable.hashes()
  fields.forEach(function (row) {
    toggle = row.enabled === 'true'
      if(toggle) {
        cy.get('fieldset').contains(group).parent().within(() => {
          cy.get('label').contains(row.radiobuttonName).siblings('input[type="radio"]')
          .should('be.enabled')
        })
      } else {
        cy.get('fieldset').contains(group).parent().within(() => {
          cy.get('label').contains(row.radiobuttonName).siblings('input[type="radio"]')
          .should('be.disabled')
        })
      }
  })
})

then(`You should see the following fieldset radiobuttons with selected states for group {string}:`, (group, dataTable) => {
  // expect dataTable with the following format:
  // | radiobuttonName  | selected   |
  // | button1          | true/false |
  let toggle
  let fields = dataTable.hashes()
  fields.forEach(function (row) {
    cy.get('fieldset').contains(group).parent().within(()=> {
      cy.get('label').contains(row.radiobuttonName).siblings('input[type="radio"]').then(($radiobutton) => {
        toggle = row.selected === 'true'
        if (toggle) { 
            cy.wrap($radiobutton).should('be.checked')
          } else { 
            cy.wrap($radiobutton).should('not.be.checked')
          }
        })
      })
  })
})

then(`Click the {string} button`, buttonName => {
  cy.get('button').contains(buttonName).click({ waitForAnimations: false, force:true})
})

then(`Click the Next button and verify call to needsanalysis`, () => {
  cy.server({
    onAnyRequest: function (route, proxy) {
      proxy.xhr.setRequestHeader('content-type', 'application/json;charset=utf8')
    }
  })
  cy.route('POST', '/api/needsanalysis/assessments').as('postAssessments')
  cy.get('button').contains('Next').click({force:true})
  // cy.wait('@postAssessments').then((res) => {
  //   cy.log(JSON.stringify(res.request.body))
  //   cy.log(JSON.stringify(res.response))
  // })
  // cy.wait('@postAssessments')
  // .its('response.body').then((res) => {
  //   cy.log(JSON.stringify(res))
  // })
  cy.wait('@postAssessments')
  cy.get('@postAssessments').should((xhr) => {
    expect(xhr.status).to.equal(201)
    cy.log(JSON.stringify(xhr))
    cy.log(JSON.stringify(xhr.responseBody))
    assessmentId = xhr.responseBody['_id']
    cy.log(assessmentId)
    Cypress.assessmentId = assessmentId
    cy.assessmentId = assessmentId
  })
})

then(/^You should be on the "([^"]*)?" page( for "([^"]*)?")?$/, (pageName, firstName) => {
  pageHelper.checkIsOnPage(pageName, firstName)
});

then(`The assessmentId is saved`, () => {
  cy.log('assessmentId: ' + eval(assessmentId))
  cy.log('Cypress.assessmentId: ' + Cypress.assessmentId)
  cy.log('cy.assessmentId: ' + cy.assessmentId)
  cy.get('@postAssessments').should((xhr) => {
    expect(xhr.status).to.equal(201)
    cy.log(JSON.stringify(xhr))
    cy.log(JSON.stringify(xhr.responseBody))
    assessmentId = xhr.responseBody['_id']
    cy.log(assessmentId)
    Cypress.assessmentId = assessmentId
    cy.assessmentId = assessmentId
  })
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

then(/You should see "(\d+)" challenges? displayed/, numOfNeeds => {
  cy.get('[data-test-id$="-section"]').its('length').should('equal', numOfNeeds)
})

then(`You should see heading {string} for challenge {int}`, (heading, needNum) => {
  let needIndex = needNum - 1
  cy.get('[data-test-id$="-section"]').eq(needIndex).within(() => {
    cy.get('h2').should('contain', heading)
  })
})

then(`You should see body text {string} for challenge {int}`, (bodyText, needNum) => {
  let needIndex = needNum - 1
  cy.get('[data-test-id$="-section"]').eq(needIndex).within(() => {
    cy.get('p').should('have.text', bodyText)
  })
})

then(`You should see a button link {string} for challenge {int}`, (buttonLink, needNum) => {
  let needIndex = needNum - 1
  cy.log(needIndex)
  cy.get('[data-test-id$="-section"]').eq(needIndex).within(() => {
    cy.get('button').should('have.text', buttonLink);
  })
})


then(`Click the button link {string} for challenge {int}`, (buttonLink, needNum) => {
  let needIndex = needNum - 1
  cy.get('[data-test-id$="-section"]').eq(needIndex).within(() => {
    cy.contains(buttonLink).click()
  })
})


then(/You should see "(\d+)" selected products? displayed/, numOfProducts => {
  cy.get('[data-test-id="selected_product_box"]').its('length').should('equal', numOfProducts)
})

then(`You should see {string} as product name for selected product {int}`, (needName, needNum) => {
  let needIndex = needNum - 1
  cy.get('[data-test-id="selected_product_box"]').eq(needIndex).within(() => {
    cy.get('p[class^="styles__Product-"]').should('have.text', needName)
  })
})

then(`You should see {string} as the cost for selected product {int}`, (needCost, needNum) => {
  let needIndex = needNum - 1
  cy.get('[data-test-id="selected_product_box"]').eq(needIndex).within(() => {
    cy.get('[data-test-id="cost"]').should('have.text', needCost)
  })
})

then(`You should see a remove button for selected product {int}`, (needNum) => {
  let needIndex = needNum - 1
  cy.get('[data-test-id="selected_product_box"]').eq(needIndex).within(() => {
    cy.get('button').contains('Remove').should('be.visible')
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


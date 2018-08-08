const { When, Then } = require('cucumber')
const scope = require('../scope')
const find = require('../find')
const field = require('../field')
const iconHelper = require ('../icons')
const common = require ('../common')
const _ = require('lodash')
const expect = require('expect-puppeteer')
const chai = require('chai')
const should = chai.should()
const chaiExpect = chai.expect()
chai.use(require('chai-shallow-deep-equal'))
// const assert = chai.assert()

When(`Wait for {string} seconds`, async (numSeconds) => {
    // add wait
    await scope.page.waitFor(parseInt(numSeconds) * 1000)
})

When(`Click {string} radiobutton for fieldset group {string}`,
    async (radioButton, radioGroup) => {
        const radiobuttonElement = await find.radioButtonWithinGroupWithLabel(scope.page, radioButton, radioGroup)
        await radiobuttonElement.click()
})

When(`Fill in {string} input with {string}`, async (fieldName, value) => {
    await field.fill(scope.page, fieldName, value)
})

Then(`Click the {string} autocomplete selection for the {string} field`, async (indexText, fieldName) => {
    const autocompleteListElement = await find.autocompleteResultsListWithLabel(scope.page, indexText, fieldName)
    await autocompleteListElement.click()
})

Then(`Click the {string} button`, async (buttonName) => {
  await Promise.all([
    expect(scope.page).toClick('button', { text: buttonName }),
    scope.page.waitForNavigation()
  ])
})

Then(`Click the {string} button on the page`, async (buttonName) => {
  await expect(scope.page).toClick('button', { text: buttonName })
})

Then(`Click the {string} button to trigger validation`, async (buttonName) => {
    await expect(scope.page).toClick('button', { text: buttonName })
})

Then (`Wait for page to load`, async () => {
    await scope.page.waitForNavigation()
})

Then(`You should see a {string} button`, async (buttonName) => {
    await expect(scope.page).toMatchElement('button', { text: buttonName})
})

Then(/^The "([^"]*)?" button is (enabled|disabled)$/, async (buttonName, toggle) => {
  const button = await expect(scope.page).toMatchElement("button", {
    text: buttonName
  })
  buttonState = await (await button.getProperty("disabled")).jsonValue()
  console.log(`buttonState = ${buttonState}`)
  if(toggle === 'enabled') {
    buttonState.should.equal(false)
  } else {
    buttonState.should.equal(true)
  }
});

Then(`You should see {string} challenge(s) displayed`, async (numChallenges) => {
    const challenges = await scope.page.$$('[data-test-id$="-section"]')  
    console.log(`num of needs: ${challenges.length}`)
    challenges.length.should.equal(parseInt(numChallenges))
})

Then(`Click the button link {string} for challenge {int}`, async (linkName, needNum) => {
    const needs = await scope.page.$$('[data-test-id$="-section"]')  
    await Promise.all([
      expect(needs[parseInt(needNum) - 1]).toClick('button', { text: linkName }),
      scope.page.waitForNavigation()
    ])
})

Then(`You should see heading {string} for challenge {int}`, async (headingText, needNum) => {
    const needs = await scope.page.$$('[data-test-id$="-section"]')
    const selectedNeed = await needs[parseInt(needNum) - 1]
    await expect(selectedNeed).toMatchElement('h2', { text: headingText })
})

Then(`You should see body text {string} for challenge {int}`, async (bodyText, needNum) => {
    const needs = await scope.page.$$('[data-test-id$="-section"]')
    const selectedNeed = await needs[parseInt(needNum) - 1]
    await expect(selectedNeed).toMatchElement('p', { text: bodyText })
})

Then(`You should see a button link {string} for challenge {int}`, async (buttonLink, needNum) => {
    const needs = await scope.page.$$('[data-test-id$="-section"]')
    const selectedNeed = await needs[parseInt(needNum) - 1]
    await expect(selectedNeed).toMatchElement('button[data-test-id$="_button"]', { text: buttonLink })
})

Then(`The score text should display {string}`, async (scoreText) => {
  await expect(scope.page).toMatchElement('[data-test-id="score"]', {text: scoreText})
})

Then(`The hint text should display {string}`, async (hintText) => {
  await expect(scope.page).toMatchElement('[data-test-id="hint"]', { text: hintText })
})

Then(`You should see the game area displayed`, async () => {
  const gameArea = await scope.page.$('[data-test-id="game-wrapper"]')
  _.isObject(gameArea).should.equal(true)
})

Then(`You should see {int} group(s) of emojis`, async (numGroups) => {
  const groups = await scope.page.$$('[data-test-id="word-wrapper"]')
  groups.length.should.equal(numGroups)
})


Then (`You should see the following fieldset radiobuttons for group {string}:`, async (radioGroup, dataTable) => {
    let fields = dataTable.hashes()
    for (let row of fields) {
        const radioGroupElement = await expect(scope.page).toMatchElement('legend', {text: radioGroup})
        const matchingRadioGroupParent = await radioGroupElement.$x('./parent::fieldset')
        await expect(matchingRadioGroupParent[0]).toMatchElement('label', {text: row.radiobuttonName})
    }
})

Then(`You should see the following fieldset radiobuttons with enabled states for group {string}:`, async (radioGroup, dataTable) => {
    let fields = dataTable.hashes()
    for (let row of fields) {
        const radiobuttonElement = await find.radioButtonWithinGroupWithLabel(scope.page, row.radiobuttonName, radioGroup)
        const radiobuttonElementId = await (await radiobuttonElement.getProperty('id')).jsonValue()
        // const radiobuttonElementEnabled = await (await radiobuttonElement.getProperty('enabled')).jsonValue()
        const radiobuttonElementWithEnabledState = await radiobuttonElement.$x('//input[@id="' + radiobuttonElementId + '"][not(@disabled)]')
        if (row.enabled === 'true') {
            _.isObject(radiobuttonElementWithEnabledState[0]).should.equal(true)
        } else {
            _.isObject(radiobuttonElementWithEnabledState[0]).should.equal(false)
        }
    }
})

Then(`You should see the following fieldset radiobuttons with selected states for group {string}:`, async (radioGroup, dataTable) => {
    let fields = dataTable.hashes()
    for (let row of fields) {
        const radiobuttonElement = await find.radioButtonWithinGroupWithLabel(scope.page, row.radiobuttonName, radioGroup)
        const radiobuttonElementState = await (await radiobuttonElement.getProperty('checked')).jsonValue()
        if(row.selected === 'true') {
            radiobuttonElementState.should.equal(true)
        } else {
            radiobuttonElementState.should.equal(false)
        }
    }
})

Then(/^You should see "([^"]*)?" field$/, async fieldName => {
    await expect(scope.page).toMatchElement('label', { text: fieldName })
})

Then(`You should not see {string} field`, async fieldName => {
    const field = await find.elementContainingText(scope.page, 'label', fieldName, true)
    _.isUndefined(field).should.equal(true)
})

Then(/^You should see "([^"]*)?" field enabled$/, async fieldName => {
    const field = await find.textFieldWithLabel(scope.page, fieldName)
    const fieldId = await (await field.getProperty('id')).jsonValue()
    const fieldWithEnabledState = await field.$x('//input[@id="' + fieldId + '"][not(@disabled)]')
    _.isObject(fieldWithEnabledState[0]).should.equal(true)
})

Then(/^You should see "([^"]*)?" field disabled$/, async fieldName => {
    const field = await find.textFieldWithLabel(scope.page, fieldName)
    const fieldId = await (await field.getProperty('id')).jsonValue()
    const fieldWithEnabledState = await field.$x('//input[@id="' + fieldId + '"][@disabled]')
    _.isObject(fieldWithEnabledState[0]).should.equal(true)
})


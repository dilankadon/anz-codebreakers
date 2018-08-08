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

When(`Fill in {string} input with {string}`, async (fieldName, value) => {
    await field.fill(scope.page, fieldName, value)
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
    console.log(`num of challenges: ${challenges.length}`)
    challenges.length.should.equal(parseInt(numChallenges))
})

Then(`Click the button link {string} for challenge {int}`, async (linkName, challengeNum) => {
    const challenges = await scope.page.$$('[data-test-id$="-section"]')  
    await Promise.all([
      expect(challenges[parseInt(challengeNum) - 1]).toClick('button', { text: linkName }),
      scope.page.waitForNavigation()
    ])
})

Then(`You should see heading {string} for challenge {int}`, async (headingText, challengeNum) => {
    const challenges = await scope.page.$$('[data-test-id$="-section"]')
    const selectedchallenge = await challenges[parseInt(challengeNum) - 1]
    await expect(selectedchallenge).toMatchElement('h2', { text: headingText })
})

Then(`You should see body text {string} for challenge {int}`, async (bodyText, challengeNum) => {
    const challenges = await scope.page.$$('[data-test-id$="-section"]')
    const selectedchallenge = await challenges[parseInt(challengeNum) - 1]
    await expect(selectedchallenge).toMatchElement('p', { text: bodyText })
})

Then(`You should see a button link {string} for challenge {int}`, async (buttonLink, challengeNum) => {
    const challenges = await scope.page.$$('[data-test-id$="-section"]')
    const selectedchallenge = await challenges[parseInt(challengeNum) - 1]
    await expect(selectedchallenge).toMatchElement('button[data-test-id$="_button"]', { text: buttonLink })
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


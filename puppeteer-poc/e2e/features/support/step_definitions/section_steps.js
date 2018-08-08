const { When, Then } = require('cucumber')
const scope = require('../scope')
const sectionHelper = require('../section')
const chai = require('chai')
const should = chai.should()
const expect = require('expect-puppeteer')
const _ = require('lodash')
const find = require('../find')


Then(`You should see the {string} section`, async sectionName => {
    await sectionHelper.checkSectionExists(scope.page, sectionName, true)
})

Then(`You should not see the {string} section`, async sectionName => {
  await sectionHelper.checkSectionExists(scope.page, sectionName, false)
})

Then(`You should see heading {string} in the {string} section`,
  async (heading, sectionName) => {
    const section = await sectionHelper.getSection(scope.page, sectionName)
    await expect(section).toMatchElement('h2', { text: heading })
  })


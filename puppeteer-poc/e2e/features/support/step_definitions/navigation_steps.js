const { When, Then } = require('cucumber')
const scope = require('../scope')
const expect = require('expect-puppeteer')

Then(/^the page heading "([^"]*)" is displayed$/, async expectedHeading => {
  await scope.page.waitForFunction(
    `document.querySelector("[data-test-id="hero-banner-title"]").innerText === "${expectedHeading}"`, {timeout: 2000}
  )
})

Then(`You should eventually see heading {string} in hero banner`, async expectedHeading => {
  await expect(scope.page).toMatchElement('header h1[data-test-id="hero-banner-title"]', { text: expectedHeading })
})

Then(`You should eventually see sub-heading {string} in hero banner`, async expectedSubHeading => {
  await expect(scope.page).toMatchElement('header [data-test-id="hero-banner-subtitle"]', { text: expectedSubHeading })
})

Then(`You should eventually see heading {string}`, async expectedHeading => {
  await expect(scope.page).toMatchElement('h1', { text: expectedHeading})
})

Then(`You should eventually see sub-heading {string}`, async expectedSubHeading => {
  await expect(scope.page).toMatchElement('h3', { text: expectedSubHeading })
})

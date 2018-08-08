const { Given, setDefaultTimeout } = require('cucumber')
const scope = require("../scope");
setDefaultTimeout(5000);
const constants = require('../constants')

Given(`I land on the home page`, async () => {
  const { page } = scope  
  let env = process.env.NODE_ENV
  console.log('ENV: ' + env)

  let url = constants.baseUrl
  await page.goto(url, { waitUntil: 'networkidle0' })

  await page.waitForSelector('[data-test-id=hero-banner-title]', { visible: true })  
  console.log(`url: ${url}`)
})

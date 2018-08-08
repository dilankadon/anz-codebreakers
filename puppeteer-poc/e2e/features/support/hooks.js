const { BeforeAll, AfterAll, Before, After} = require('cucumber')
const scope = require('./scope')
const reporters = require('./reporter')
const constants = require('./constants')

BeforeAll(async () => {
  const puppeteer = require('puppeteer');
  scope.driver = puppeteer;
  // scope.browser = await scope.driver.launch({ headless: true})
  // ignoreHTTPSErrors flag required for SIT testing
  scope.browser = await scope.driver.launch({ 
    headless: constants.headlessMode, 
    ignoreHTTPSErrors: true,
    // executablePath: 'google-chrome-unstable',
    args: [ '--no-sandbox',
            '--disable-setuid-sandbox',
            // debug logging
            '--enable-logging', '--v=1'
        ]
   })
})

Before(async () => {
  // create new page between scenarios
  scope.page = await scope.browser.newPage()
  // add in accept language header - this is required when running in headless mode
  await scope.page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.8,zh-TW;q=0.6'
  })
  // await scope.page.setViewport({ width: 375, height: 812, isMobile: true })
})

After(async() => {
  await scope.page.screenshot({ path: 'screenshots/test.png', fullPage: true })
  // close the current page at end of scenario - to ensure fresh page is loaded each time
  await scope.page.close()
})

AfterAll(async () => {
  if (scope.browser) {
    // close the browser at end of run
    await scope.browser.close()
  }
})

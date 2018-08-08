const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    args: ['--no-sandbox',
      '--disable-setuid-sandbox',
      // debug logging
      '--enable-logging', '--v=1'
    ]
  });

  const page = await browser.newPage()
  // add in accept language header - this is required when running in headless mode
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.8,zh-TW;q=0.6'
  })
  // await page.goto('http://localhost:8080/#/lets-get-started');
  await page.goto('http://www.credentialrecoverysit3.dev.anz/BOX/#/lets-get-started');
  // await page.screenshot({ path: 'screenshots/get-started.png' });

  const anzCustomerEl = await page.$('[data-test-id="existingCustomer_No_button"]');
  await anzCustomerEl.click();

  const soleTraderEl = await page.$('[data-test-id="businessType_SoleTrader_button"]')
  await soleTraderEl.click();

  // add default wait for SIT
  await page.waitFor(10000)

  const industryCodeEl = await page.$('[data-test-id="industry_input"]')
  await industryCodeEl.type('Flower Retailing')
  page.waitForSelector('[data-test-id="autocomplete-industry-result-0-action"]')
  const firstIndustryListEl = await page.$('[data-test-id="autocomplete-industry-result-0-action"]')
  await firstIndustryListEl.click();

  const navigationPromise = page.waitForNavigation();
  const nextButtonEl = await page.$('[data-test-id="next_button"]')
  await nextButtonEl.click();

  page.on('response', response => {

    if (response.url().endsWith("api/needsanalysis/assessments")) {
      console.log("response code: ", response.status());
      console.log("request method: ", response.request().method());
      response.json().then((body) => {
        console.log(`response body:  ${JSON.stringify(body)}`)
      })
    }
    // do something here
  });

  await navigationPromise;

  const chooseProductButton = await page.$('[data-test-id="choose_product_button"]')
  await chooseProductButton.click();
  await navigationPromise;

  // data-test-id="paymentsInStoreOrOnRoad_Instoreandontheroad_button"
  // data-test-id="annualTurnover_Morethan$50,000_button"
  const inStoreOnRoadButton = await page.$('[data-test-id="paymentsInStoreOrOnRoad_Instoreandontheroad_button"]')
  await inStoreOnRoadButton.click();

  const over50K = await page.$('[data-test-id="annualTurnover_Morethan$50,000_button"]')
  await over50K.click();

  const viewRecommendationButton = await page.$('[data-test-id="viewRecommendations_button"]')
  await viewRecommendationButton.click();
  await navigationPromise;

  // (await page.$$eval('button', a => a
  //     .filter(a => a.textContent === 'Add this product')
  // ))[0].click()
  // await navigationPromise;

  await page.screenshot({ path: 'merch-terminal.png' });
  await browser.close();
})();
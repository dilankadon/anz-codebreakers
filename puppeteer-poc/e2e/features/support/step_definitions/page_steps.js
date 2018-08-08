const { When, Then } = require('cucumber')
const scope = require('../scope')
const pageHelper = require('../page')

Then(/^You should be on the "([^"]*)?" page( for "([^"]*)?")?$/, async (pageName, firstName) => {
    await pageHelper.checkIsOnPage(scope.page, pageName, firstName)
})
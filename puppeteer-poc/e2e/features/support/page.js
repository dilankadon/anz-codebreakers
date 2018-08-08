const _ = require('lodash')
const expect = require('expect-puppeteer')
const should = require('chai').should()
const constants = require('./constants')

let pageMap = {
    homePage: {
        name: 'home',
        url: '',
        header: 'Home'
    },
    easyPage: {
        name: 'easy',
        url: 'easy',
        header: 'Easy'
    },
    mediumPage: {
        name: 'medium',
        url: 'medium',
        header: 'Medium'
    },
    hardPage: {
        name: 'hard',
        url: 'hard',
        header: 'Medium'
    }
}

async function checkIsOnPage(page, pageName, firstName) {
    let matchPage = _.find(pageMap, { name: pageName.toLowerCase() })
    if (matchPage) {
        const pageUrl = await page.url()
        if(matchPage.url == '') {
            pageUrl.should.equal(constants.baseUrl)
        } else {
            pageUrl.should.contain(matchPage.url)
        }
        let matchHeader = matchPage.header
        if (firstName) {
            matchHeader = matchPage.header.replace('{{firstName}}', firstName)
        }
        await expect(page).toMatchElement('h1', {text: matchHeader, timeout: 5000})
    } else {
        throw new Error('No matching page found with heading: ' + sectionName)
    }
}

module.exports = {
    checkIsOnPage
};
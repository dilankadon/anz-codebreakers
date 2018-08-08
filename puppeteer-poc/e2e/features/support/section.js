const _ = require('lodash')
const expect = require('expect-puppeteer')
const should = require('chai').should()

let sectionMap = {
  easySection: {
    name: "easy",
    heading: "Easy"
  },
  mediumSection: {
    name: "medium",
    heading: "Medium"
  },
  hardSection: {
    name: "hard",
    heading: "Hard"
  },
  aboutSection: {
    name: "about-info",
    heading: "Go Girl, Go For IT!"
  },
  easyBreakCodeSection: {
    name: "easy-break-code",
    heading: "Break the code to find out the name of the event.",
    selector: "p"
  },
  mediumCoreValuesSection: {
    name: "medium-core-values",
    heading: "This code will let you know ANZ' s core values.",
    selector: "p"
  },
  hardANZMissionSection: {
    name: "hard-anz-mission",
    heading: "Breaking this code will show you ANZ's mission.",
    selector: "p"
  },
  howToPlaySection: {
    name: "how-to-play",
    heading: "How to play"
  }
};

async function getSection(page, sectionName) {
  let findSectionName = sectionName.toLowerCase()
  let matchSection = _.find(sectionMap, { name: findSectionName })
  let selector = 'h2'
  if (matchSection) {
    if(matchSection.hasOwnProperty('selector')) {
      selector = matchSection.selector
    }
    const sectionHeading = await expect(page).toMatchElement(selector, { text: matchSection.heading })
    if (!sectionHeading) {
      throw new Error("No element found for section heading: " + matchSection.heading);
    }

    const parent = await sectionHeading.$x('./parent::div')
    return parent[0]
  } else {
    throw new Error('No section found with heading: ' + sectionName)
  }
}

async function checkSectionExists(page, sectionName, toggle) {
  const matchSection = await getSection(page, sectionName)
  if (toggle === true) {
    _.isUndefined(matchSection).should.equal(false)
  } else {
    _.isUndefined(matchSection).should.equal(true)
  }
}

module.exports = {
  getSection,
  checkSectionExists
}
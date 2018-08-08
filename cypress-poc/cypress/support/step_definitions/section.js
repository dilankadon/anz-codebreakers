// import _ from 'lodash'
const _ = Cypress._

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
}

function getSection(sectionName) {
    let findSectionName = sectionName.toLowerCase()
    let matchSection = _.find(sectionMap, { name: findSectionName })
    if (matchSection) {
      if(matchSection.hasOwnProperty('selector')) {
        return cy.get(matchSection.selector).contains(matchSection.heading).parents('div')
      } else {
        return cy.get('h2').contains(matchSection.heading).parents('div')
      }
        
    } else {
        throw new Error('No section found with heading: ' + sectionName)
    }
}

module.exports = {
  getSection
};

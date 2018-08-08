const _ = require("lodash");

let iconMap = {}

function getIconPath(iconName) {
  let matchIcon = _.find(iconMap, { name: iconName.toLowerCase() });
  if (matchIcon) {
    return matchIcon.path;
  }
  return false;
}

function getIcon(iconName) {
  let matchIcon = _.find(iconMap, { name: iconName.toLowerCase() });
  if (matchIcon) {
    let iconPath = getIconPath(iconName);
      return cy.get('svg path[d="' + iconPath + '"]')
  }
  throw new Error(`Cannot find icon: ${iconName}`) 
}

function isIconVisible(iconName) {
  let matchIcon = _.find(iconMap, { name: iconName.toLowerCase() });
  if (matchIcon) {
    let iconPath = getIconPath(iconName);
      return cy.get('svg path[d="' + iconPath + '"]').should('be.visible')
  }
 throw new Error(`Cannot find icon: ${iconName}`) 
}

module.exports = {
  getIconPath,
  getIcon,
  isIconVisible
};
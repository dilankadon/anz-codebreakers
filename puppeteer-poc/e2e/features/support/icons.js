const _ = require("lodash");

let iconMap = {};

function getIconPath(iconName) {
  let matchIcon = _.find(iconMap, { name: iconName.toLowerCase() });
  if (matchIcon) {
    return matchIcon.path;
  }
  return false;
}

module.exports = {
  getIconPath
};
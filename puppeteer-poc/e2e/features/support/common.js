const fso = require('fs')
const path = require('path')

function convertIndexTextToIndex(indexText) {
  let textToIndex = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    fifth: 4,
    sixth: 5,
    seventh: 6,
    eighth: 7,
    ninth: 8,
    tenth: 9,
    eleventh: 10,
    twelfth: 11,
    thirteenth: 12,
    fourteenth: 13,
    fifteenth: 14
  };

  return textToIndex[indexText];
}

function readFileContents(file) {
  const pathToFile = path.resolve('./features', 'templates', `${file}.json`)

  return fso.readFileSync(pathToFile, 'utf-8')
}

module.exports = {
  convertIndexTextToIndex,
  readFileContents
};
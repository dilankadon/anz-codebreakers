const _ = Cypress._
const path = require('path')
const fso = require('fs')

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
    }

    return textToIndex[indexText]
}

function checkIfTextField(fieldName) {
    return !(_.isUndefined(cy.contains('label', fieldName, {force: true})))
}

function getFieldLabels() {
    let labels = []
    cy.get('label').each((label) => {
        cy.wrap(label).invoke('text').then((text) => {
            labels.push(text)
        })
    })
    return labels
}

function findMatchingLabel(labelName) {
    let labels = getFieldLabels()
    let result = _.filter(labels, (label) => {
        return label == labelName
    })
    return !(_.isUndefined(_.find(labels, labelName)))
}

function readFileContents (file) {
    const pathToFile = path.resolve('./cypress', 'templates', `${file}.txt`)
    return cy.readFile(pathToFile, 'utf-8')
  }

module.exports = {
    convertIndexTextToIndex,
    checkIfTextField,
    findMatchingLabel,
    readFileContents
}
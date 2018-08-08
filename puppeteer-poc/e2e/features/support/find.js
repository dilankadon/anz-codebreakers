const expect = require('expect-puppeteer')
const common = require('./common')

async function elementContainingText (page, cssSelector, text, elementNotExist) {
  
  await page.waitForSelector(cssSelector, {visible: true})

  const matchingElements = await page.$$(cssSelector)
  for (let matchingElement of matchingElements) {
    const matchingElementText = await page.evaluate(el => el.innerText, matchingElement)    
    if (matchingElementText === text) {
      return matchingElement    
    }
  } 
  if (!elementNotExist) {
    throw new Error(`Cannot find element containing: ${text}`) 
  } else {
    return undefined
  }
}


async function textFieldWithLabel(page, label) {
  const matchingElements = await page.$$('label')  
  let matchingLabelElement = null
  for (let matchingElement of matchingElements) {
    const matchingElementText = await page.evaluate(el => el.innerText, matchingElement)    
    if (matchingElementText === label) {
      matchingLabelElement = matchingElement    
    }
  } 
  
  if (!matchingLabelElement) {throw new Error(`Cannot find label with text: ${label}`)}

  const labelForAttribute = await page.evaluate(matchingLabelElement => matchingLabelElement.getAttribute('for'), matchingLabelElement)
  return await page.$(`input[id=${labelForAttribute}]`)
}

async function radioButtonWithinGroupWithLabel(page, radioButton, radioGroup) {
  const matchingRadioGroupElements = await page.$$('legend')
  let matchingRadioGroupLabelElement = null
  let matchingRadioButtonLabelElement = null;
  for (let matchingRadioGroupElement of matchingRadioGroupElements) {
    const matchingRadioGroupElementText = await page.evaluate(el => el.innerText, matchingRadioGroupElement)
    if (matchingRadioGroupElementText === radioGroup) {
      matchingRadioGroupLabelElement = matchingRadioGroupElement
    }
  }
  if (!matchingRadioGroupLabelElement) { throw new Error(`Cannot find radio group with text: ${radioGroup}`) }

  const matchingRadioButtonParentElements = await matchingRadioGroupLabelElement.$x('./parent::fieldset')
  const matchingRadioButtonElements = await matchingRadioButtonParentElements[0].$$('label')
  for (let matchingRadioButtonElement of matchingRadioButtonElements) {
    const matchingRadioButtonElementText = await page.evaluate(el => el.innerText, matchingRadioButtonElement)
    if (matchingRadioButtonElementText === radioButton) {
      matchingRadioButtonLabelElement = matchingRadioButtonElement
    }
  }
  if (!matchingRadioButtonLabelElement) { throw new Error(`Cannot find radio button with text: ${radioButton}`) }

  const labelForAttribute = await page.evaluate(matchingRadioButtonLabelElement => matchingRadioButtonLabelElement
    .getAttribute('for'), matchingRadioButtonLabelElement)
  return await page.$(`input[id=${labelForAttribute}]`)
}

async function autocompleteResultsListWithLabel(page, listIndexValue, label) {
  let listIndex = common.convertIndexTextToIndex(listIndexValue)
  const matchingElements = await page.$$('label')
  let matchingLabelElement = null
  for (let matchingElement of matchingElements) {
    const matchingElementText = await page.evaluate(el => el.innerText, matchingElement)
    if (matchingElementText === label) {
      matchingLabelElement = matchingElement
    }
  }

  if (!matchingLabelElement) { throw new Error(`Cannot find label with text: ${label}`) }

  const matchingAutocompleteParentElements = await matchingLabelElement.$x('./ancestor::div[@data-test-id="autocomplete-industry"]')
  const matchingAutocompleteListItemsElement = await matchingAutocompleteParentElements[0].$$('[data-test-id="autocomplete-industry-results"] li')

  return await matchingAutocompleteListItemsElement[listIndex]
}

module.exports = {
  elementContainingText,
  textFieldWithLabel,
  radioButtonWithinGroupWithLabel,
  autocompleteResultsListWithLabel
};

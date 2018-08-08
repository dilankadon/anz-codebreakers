async function elementToHaveAttributeValue (page, elementHandle, attributeName, attributeValue) {  
  
  const started = Date.now()
  
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      console.log('start setInterval')
      if (Date.now() - started > 15000) {
        clearInterval(interval)
        return reject('Timed out: element did not have attribute value')
      } else {
        console.log('page.evaluate')
        return page.evaluate((elementHandle, attributeName, attributeValue) => {
          return elementHandle.getAttribute(attributeName).indexOf(attributeValue) !== -1
        }, elementHandle, attributeName, attributeValue)
        .then((hasClass) => {        
          if (hasClass) {
            clearInterval(interval)
            return resolve('it worked')
          }
        })    
      }
    }, 100)  
  })
}


module.exports = {
  elementToHaveAttributeValue
}

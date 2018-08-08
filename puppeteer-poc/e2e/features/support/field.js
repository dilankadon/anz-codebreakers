const find = require('./find')

async function fill (page, fieldLabel, value) {  
  const field = await find.textFieldWithLabel(page, fieldLabel)
  await field.focus()
  await field.type(value)
}


module.exports = {
  fill
}

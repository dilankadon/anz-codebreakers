// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fso = require('fs')
const fs = require('fs-extra')
const path = require('path')

const cucumber = require("cypress-cucumber-preprocessor").default

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('./cypress', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("file:preprocessor", cucumber())

  on("before:browser:launch", (browser = {}, args) => {
    // console.log(browser, args); // see what all is in here!

    // browser will look something like this
    // {
    //   name: 'chrome',
    //   displayName: 'Chrome',
    //   version: '63.0.3239.108',
    //   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    //   majorVersion: '63'
    // }

    // args are different based on the browser
    // sometimes an array, sometimes an object

    if (browser.name === "chrome") {
      // args.push("--disable-site-isolation-trials");

      // whatever you return here becomes the new args
      return args;
    }
  })

    // used to handle config parameters for different environments - eg. SIT, CI
    //  config files saved in cypress/config directory
    //  accept a configFile value or default to 'default' file
    const file = config.env.configFile || 'default'
    return getConfigurationByFile(file)
};

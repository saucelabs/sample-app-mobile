# Versioning the App

Versioning the app will be done with [npm-version](https://docs.npmjs.com/cli/v6/commands/npm-version). Please follow the instructions to 
create a proper update and run the command

    yarn version patch | minor | major
    
It will then automatically update Git, see [this](https://github.com/saucelabs/sample-app-mobile/commit/f61d8fec2b17b233d0abd8444fe0f0dc86a1d7db) commit for an example.

Then: 

- build the apps
- create a new release on Git
- upload the apps to Git

# Contributing to the app

> **NOTE<br>**
> Make sure to use yarn instead of NPM. NPM gives a lot of problems currently with React Native[^1]. How to setup yarn can be found [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

[^1] NPM gives a lot of problems currently with React Native, only from what I've seen with the migration.
     
     - React Natve 0.60.x now uses Pods for linking dependencies, from what I've seen with NPM is that is messes up this linking 9 out of 10 times
     - Installing other dependencies are mostly recommended to install with yarn (not only for React Native but also with ReactJS)
     - It costed me around a day to get everything working with NPM, but with yarn I didn't had any problems migrating to RN 0.60
     - yarn is faster
     - and I can go on
     
     This is also the reason that the `pacakge-lock.json` has been removed.

You can add new functionality to the app by following the instructions below.

## Table of contents
1. [Set up iOS environment](#set-up-ios-environment)
1. [Set up Android environment](#set-up-android-environment)
1. [Linting the code](#linting-the-code)
1. [i18n internationalization](#i18n-internationalization)
1. [AccessibilityID's](#accessibilityids)
1. [Running tests on a local machine when you are developing your app](#running-tests-on-a-local-machine-when-you-are-developing-your-app)
1. [Building the app for the Sauce Labs Real Device Cloud (RDC)](#building-the-app-for-the-sauce-labs-real-device-cloud-rdc)x
1. [Versioning the app](#versioning-the-app)



## Set up iOS environment
Most of this comes from https://facebook.github.io/react-native/docs/getting-started.html

- install XCode: https://developer.apple.com/xcode/
- install homebrew: https://brew.sh/
- `brew install node`
- `brew install yarn`
- `brew install watchman`
- `yarn global add react-native-cli`
- clone this repository: `git clone https://github.com/saucelabs/sample-app-mobile`
- navigate to the folder that contains this repository
- `yarn install` => This will install all dependencies
- `ios.pods` => This will install the PODS
- `yarn ios.dev` => This start an iOS simulator, pushes the app, and you can start developing

> **NOTE:**<br/>
> When you build the app you might get warnings or errors like this
> ```log
> error React Native CLI uses autolinking for native dependencies, but the following modules are linked manually: 
>    - react-native-quick-actions (to unlink run: "react-native unlink react-native-quick-actions")
>    - react-native-webview (to unlink run: "react-native unlink react-native-webview")
>  This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward, you can unlink this dependency via "react-native unlink <dependency>" and it will be included in your app automatically. If a library isn't compatible with autolinking, disregard this message and notify the library maintainers.
>  Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
> ```
> Then you have nothing to worry about. This is normal ;-) 

## Set up Android environment

Most of this comes from https://facebook.github.io/react-native/docs/getting-started.html

- install homebrew: https://brew.sh/
- `brew install node`
- `brew install yarn`
- `brew install watchman`
- `yarn global add react-native-cli`
- In a shell, in the project root `./sample-app-mobile` run: `yarn install`
- install JDK8: https://adoptopenjdk.net/
- install Android Studio: https://developer.android.com/studio/#downloads
    - Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:
      - Android SDK
      - Android SDK Platform
      - Performance (Intel ® HAXM)
      - Android Virtual Device
    - Open the SDK Manager (SDK Platforms section) and choose to install "Android 8.1 (Oreo)" - check the box that says "Show package details" and choose:
      - Android SDK platform 27
      - Google APIs Intel x86 Atom System Image
      - DO NOT CLICK 'APPLY' YET!
    - Also go to the SDK Manager's SDK Tools section - check the box that says "Show package details" and choose:
      - "27.0.3" under the Android SDK Build-Tools tree
      - Now click 'Apply' to pull down and install all the new dependencies
    - Add the following lines to your $HOME/.bash_profile config file:
```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
- Open ./sample-app-mobile/android as a project in Android Studio
- Under the 'Tools' menu, choose AVD Manager
- Click the 'Create Virtual Device' button
- Choose a device definition (e.g. Pixel 2) and click 'Next'
- Choose Oreo with API 27 and click 'Next' - you may need to click the 'Download' link beside Oreo 27 to enable the 'Next' button
- Click 'Finish' to create the emulated device
- Launch the virtual device in the Android Emulator by clicking on the green triangle icon. WARNING: if you do not manually launch the emulator, your run-android command will fail with:
```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:installDebug'.
> com.android.builder.testing.api.DeviceException: No connected devices!

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 3m 35s
45 actionable tasks: 24 executed, 21 up-to-date
Could not install the app on the device, read the error above for details.
Make sure you have an Android emulator running or a device connected and have
set up your Android development environment:
https://facebook.github.io/react-native/docs/getting-started.html
```
- In a shell, in the project root `./sample-app-mobile` run: `yarn android.dev`

> **NOTE:**<br/>
> When you build the app you might get warnings or errors like this
> ```log
> error React Native CLI uses autolinking for native dependencies, but the following modules are linked manually: 
>    - react-native-quick-actions (to unlink run: "react-native unlink react-native-quick-actions")
>    - react-native-webview (to unlink run: "react-native unlink react-native-webview")
>  This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward, you can unlink this dependency via "react-native unlink <dependency>" and it will be included in your app automatically. If a library isn't compatible with autolinking, disregard this message and notify the library maintainers.
>  Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
> ```
> Then you have nothing to worry about. This is normal ;-)

## Linting the code
The linting rules were taken from the React Native project itself and can be used by running 

```bash
yarn lint
```

Issues / warning will be shown in the console and most of them can automatically be fixed by running

```bash
yarn lint -- --fix
```

The linting will also be run on each `git push` and fail if there are issues.

## i18n internationalization
This application uses the module [`react-native-languages`](https://github.com/react-native-community/react-native-languages) (click on the link to see how it works) to provide translations in the app for all text components in the users preferred language.

> Currently only English, Spanish and Dutch are enabled, but more languages can be added

When adding text to this app, please add them to the translation-JSON-file that can be found [here](../src/js/config/translations/en.json) and add it to the component like this

```js
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import i18n from './config/i18n';

export default class ExampleComponent extends Component {
  render(){
    return (
      <View>
        <Text>{i18n.t('key')}</Text>
      </View>
    );
  }
}
```

## AccessibilityID's
This application uses accessibilityID's which makes it easier to select elements in a crossplatform way with Appium.

When adding a new component to the code that can be used to interact with or that displays text needs to be provided with a `testProperties` that will automatically add the accessibilityID to the component.
For example, with a button component the following code needs to be added

    <Button title={i18n.t('menu.reset')} {...testProperties(i18n.t('menu.reset'))}/>

Always try to use the text that is already available in the translation-JSON-file that can be found [here](../src/js/config/translations/en.json). The `testProperties`-method will make it unique by adding a prefix to it.

> More information about testing with accessibilitID's can be found [here](APPIUM_AUTOMATION.md#writing-tests)

## Running tests on a local machine when you are developing your app
> Make sure you've set up Appium and all other stuff to be able to run automated tests, see [AUTOMATION](APPIUM_AUTOMATION.md)

> Because local automation will be ran against a build connected with the packager/metro builder, adjusting code during test execution is not wise. It will reflect immediately in the app which may cause breaking the tests.

To run a complete testset use the following commands

- Android: `yarn android.local.dev`
- iOS: `yarn ios.local.dev`

When all tests have been executed the following will be shown in the console

```bash
[iPhone X MAC 11.4 #0-0] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/cart.content.spec.js
[iPhone X MAC 11.4 #0-0] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-0]
[iPhone X MAC 11.4 #0-0] Cart Content Page
[iPhone X MAC 11.4 #0-0]    ✓ should show 2 items in the cart
[iPhone X MAC 11.4 #0-0]    ✓ should show the items page if continue shopping is selected
[iPhone X MAC 11.4 #0-0]    ✓ should update the cart if an item is removed
[iPhone X MAC 11.4 #0-0]    ✓ should open the checkout page one page if checkout is clicked
[iPhone X MAC 11.4 #0-0]
[iPhone X MAC 11.4 #0-0] 4 passing (50.8s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-1] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/checkout.complete.spec.js
[iPhone X MAC 11.4 #0-1] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-1]
[iPhone X MAC 11.4 #0-1] Checkout Complete
[iPhone X MAC 11.4 #0-1]    ✓ should be able to finish the checkout by going back to the inventory list
[iPhone X MAC 11.4 #0-1]
[iPhone X MAC 11.4 #0-1] 1 passing (16.9s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-2] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/checkout.page.one.spec.js
[iPhone X MAC 11.4 #0-2] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-2]
[iPhone X MAC 11.4 #0-2] Checkout: Your info
[iPhone X MAC 11.4 #0-2]    ✓ should be able to submit my personal info and proceed the checkout
[iPhone X MAC 11.4 #0-2]    ✓ should be able to cancel shopping and go to the items overview page
[iPhone X MAC 11.4 #0-2]    ✓ should show an error when the first name has not been entered
[iPhone X MAC 11.4 #0-2]    ✓ should show an error when the last name has not been entered
[iPhone X MAC 11.4 #0-2]    ✓ should show an error when the postal code has not been entered
[iPhone X MAC 11.4 #0-2]
[iPhone X MAC 11.4 #0-2] 5 passing (1m 24.7s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-3] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/checkout.page.two.spec.js
[iPhone X MAC 11.4 #0-3] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-3]
[iPhone X MAC 11.4 #0-3] Checkout: Overview
[iPhone X MAC 11.4 #0-3]    ✓ should show the correct selected item in the overview
[iPhone X MAC 11.4 #0-3]    ✓ should be able to finish the checkout
[iPhone X MAC 11.4 #0-3]
[iPhone X MAC 11.4 #0-3] 2 passing (34.4s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-4] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/inventory.item.spec.js
[iPhone X MAC 11.4 #0-4] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-4]
[iPhone X MAC 11.4 #0-4] Inventory Item Page
[iPhone X MAC 11.4 #0-4]    ✓ should show the details of the selected swag
[iPhone X MAC 11.4 #0-4]    ✓ should be able to add a swag item to the cart from the details page
[iPhone X MAC 11.4 #0-4]    ✓ should be able to remove a swag item from the cart from the details page added in the inventory page
[iPhone X MAC 11.4 #0-4]    ✓ should be able to remove a swag item from the cart from the details page
[iPhone X MAC 11.4 #0-4]    ✓ should be able to get back from the swag details page through the back button
[iPhone X MAC 11.4 #0-4]
[iPhone X MAC 11.4 #0-4] 5 passing (56.9s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-5] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/inventory.list.spec.js
[iPhone X MAC 11.4 #0-5] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-5]
[iPhone X MAC 11.4 #0-5] Inventory List Page
[iPhone X MAC 11.4 #0-5]    ✓ should contain swag
[iPhone X MAC 11.4 #0-5]    ✓ should be able to select a swag item and open the details page
[iPhone X MAC 11.4 #0-5]    ✓ should be able to sort the items
[iPhone X MAC 11.4 #0-5]    ✓ should be able to open and close the selecting modal
[iPhone X MAC 11.4 #0-5]    ✓ should be able to add swag to the cart
[iPhone X MAC 11.4 #0-5]    ✓ should be able to remove swag from the cart
[iPhone X MAC 11.4 #0-5]
[iPhone X MAC 11.4 #0-5] 6 passing (1m 8.2s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-6] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/login.spec.js
[iPhone X MAC 11.4 #0-6] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-6]
[iPhone X MAC 11.4 #0-6] Login
[iPhone X MAC 11.4 #0-6]    ✓ should be able to login with a standard user
[iPhone X MAC 11.4 #0-6]    ✓ should not be able to login with a locked user
[iPhone X MAC 11.4 #0-6]    ✓ should show an error when no username is provided
[iPhone X MAC 11.4 #0-6]    ✓ should show an error when no password is provided
[iPhone X MAC 11.4 #0-6]    ✓ should show an error when no match is found
[iPhone X MAC 11.4 #0-6]
[iPhone X MAC 11.4 #0-6] 5 passing (43s)
------------------------------------------------------------------
[iPhone X MAC 11.4 #0-7] Spec: /Users/wswebcreation/Git/sample-app-ios/tests/e2e/spec/menu.spec.js
[iPhone X MAC 11.4 #0-7] Running: iPhone X on MAC 11.4 executing /Users/wswebcreation/Git/sample-app-ios/SwagLabsMobileApp.app
[iPhone X MAC 11.4 #0-7]
[iPhone X MAC 11.4 #0-7] Menu
[iPhone X MAC 11.4 #0-7]    ✓ should be able to be opened and closed
[iPhone X MAC 11.4 #0-7]    ✓ should be able to bring me to the all items page
[iPhone X MAC 11.4 #0-7]    ✓ should be able reset the app state
[iPhone X MAC 11.4 #0-7]    ✓ should be able to logout
[iPhone X MAC 11.4 #0-7]    ✓ should be able to open the about page and go to a browser
[iPhone X MAC 11.4 #0-7]
[iPhone X MAC 11.4 #0-7] 5 passing (59.9s)

Test Suites:     8 passed, 8 total (100% completed)
Time:            🕙  460.00s
```

## Building the app for the Sauce Labs Real Device Cloud (RDC)
More information about building the app can be found [here](./BUILDING.md)

## Versioning the app
More information about versioning the app can be found [here](./VERSIONING.md)

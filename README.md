[![Build status](https://build.appcenter.ms/v0.1/apps/76f000a0-e661-478a-8fa4-3870d3ee94be/branches/master/badge)](https://appcenter.ms)

# Sauce Labs Native Sample Application

In this repository you will find our Sauce Labs sample-app. You can use it as a sample app for testautomation on your local machine or in our Real Device Cloud.
The latest version of the iOS and Android app can be found [here](https://github.com/saucelabs/sample-app-mobile/releases)

> **NOTE<br>**
> Make sure to use yarn instead of NPM. NPM gives a lot of problems currently with React Native[^1]. How to setup yarn can be found [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

[^1] NPM gives a lot of problems currently with React Native, only from what I've seen with the migration.
     
     - React Natve 0.60.x now uses Pods for linking dependencies, from what I've seen with NPM is that is messes up this linking 9 out of 10 times
     - Installing other dependencies are mostly recommended to install with yarn (not only for React Native but also with ReactJS)
     - It costed me around a day to get everything working with NPM, but with yarn I didn't had any problems migrating to RN 0.60
     - yarn is faster
     - and I can go on
     
     This is also the reason that the `pacakge-lock.json` has been removed.
     
> **NOTE<br>**
> There is currently an issue with React Native and Android which breaks the usage of accessibilityLabels on Android. The issue is that Android currently gets the a `, ` after each label, see [this issue](https://github.com/facebook/react-native/issues/25581)

![saucelabs.ios](./docs/assets/ios-overview.gif) ![saucelabs.android](./docs/assets/android-overview.gif)

## Table of contents
1. [sample-app-ios](#sample-app-ios)
1. [sample-app-android](#sample-app-android)
1. [Linting the code](#linting-the-code)
1. [i18n internationalization](#i18n-internationalization)
1. [AccessibilityID's](#accessibilityids)
1. [Testautomation](#testautomation)
1. [Building the app for the Sauce Labs Real Device Cloud (RDC)](#building-the-app-for-the-sauce-labs-real-device-cloud-rdc)
1. [Versioning the app](#versioning-the-app)


## sample-app-ios
This is the Sauce Labs Sample Application which is designed to be used from iOS devices

- install XCode: https://developer.apple.com/xcode/
- install homebrew: https://brew.sh/
- `brew install node`
- `brew install yarn`
- `brew install watchman`
- `yarn global add react-native-cli`
- clone this repository: `git clone https://github.com/saucelabs/sample-app-mobile`
- navigate to the folder that contains this repository
- `yarn install`

- `react-native run-ios`

## sample-app-android

Most of this comes from https://facebook.github.io/react-native/docs/getting-started.html

- install homebrew: https://brew.sh/
- `brew install node`
- `brew install yarn`
- `brew install watchman`
- `yarn global add react-native-cli`
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
- Open ./sample-app-ios/android as a project in Android Studio
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
- In a shell, run: `react-native run-android`

## Linting the code
The linting rules were taken from the React Native project itself and can be used by running 

    $ yarn lint

Issues / warning will be shown in the console and most of them can automatically be fixed by running

    $ yarn lint -- --fix

The linting will also be run on each `git push` and fail if there are issues.

## i18n internationalization
This application uses the module [`react-native-languages`](https://github.com/react-native-community/react-native-languages) (click on the link to see how it works) to provide translations in the app for all text components in the users preferred language.

> Currently only English is enabled, but more languages can be added

When adding text to this app, please add them to the translation-JSON-file that can be found [here](src/js/config/translations/en.json) and add it to the component like this

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

Always try to use the text that is already available in the translation-JSON-file that can be found [here](src/js/config/translations/en.json). The `testProperties`-method will make it unique by adding a prefix to it.

> More information about testing with accessibilitID's can be found [here](./docs/AUTOMATION.md#writing-tests) 

## Testautomation
More information about:

- how to setup Appium
- how to write tests
- how to run tests on a local machine
- how to run tests in the cloud

can be found [here](./docs/AUTOMATION.md).

## Building the app for the Sauce Labs Real Device Cloud (RDC)
More information about building the app can be found [here](./docs/BUILDING.md)

## Versioning the app
More information about versioning the app can be found [here](./docs/VERSIONING.md)

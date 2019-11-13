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

![saucelabs.ios](./docs/assets/ios-overview.gif) ![saucelabs.android](./docs/assets/android-overview.gif)

## Table of contents
1. [sample-app-ios](#sample-app-ios)
1. [sample-app-android](#sample-app-android)
1. [Linting the code](#linting-the-code)
1. [i18n internationalization](#i18n-internationalization)
1. [AccessibilityID's](#accessibilityids)
1. [Touch / Face ID](#touch--face-id)
    1. [Enabling Touch / Face ID on Android emulators](#enabling-touch--face-id-on-android-emulators)
    1. [Enabling Touch / Face ID on iOS simulators](#enabling-touch--face-id-on-ios-simulators)
1. [Deep linking](#deep-linking)
    1. [Use with Android](#use-with-android)
    1. [Use with iOS](#use-with-ios)
        1. [Terminal](#terminal)
        1. [With Safari](#with-safari)
1. [3D Touch / Force touch](#3d-touch---force-touch)
1. [Different languages](#different-languages)
1. [Testautomation](#testautomation)
1. [Building the app for the Sauce Labs Real Device Cloud (RDC)](#building-the-app-for-the-sauce-labs-real-device-cloud-rdc)x
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

## Touch / Face ID
This app supports TouchID and FaceID for Android and iOS and will only show when the phone supports and has this enabled.

See [AUTOMATION.md](./docs/AUTOMATION.md) for using Touch / Face ID with automation.

### Enabling Touch / Face ID on Android emulators
>**NOTE:**<br>
>The implementation of Touch/FaceID in this application supports the user’s biometrics based on the **insecure** store of the device. It is **not** using the **keystore** which normally should be used when implementing Touch/FaceID and secure login.
> The reason for this is that Sauce Labs is not mocking the keystore on a real device for supporting Touch/FaceID due to **security reasons**.<br/>
> Testing Touch/FaceID which is using the **keystore** on our real devices is therefore **not** supported.

To enable this on Android emulators you need to do the following (when you have an emulator that supports this):

- Open an emulator
- Activate Screenlock from `Settings -> Security`
- Go to `Fingerprint` to add new fingerprint
- When prompt to place your finger on the scanner, emulate the fingerprint using adb command.

    ```bash
    adb -e emu finger touch <finger_id>
    
    #Example
    adb -e emu finger touch 1234
    ```

- You should see fingerprint detected message. That’s it. Done.

> **NOTE:<br>**
> The automation script uses `1234` as the *Fingerprint*, so when you add the fingerprint through ADB, please use `1234` 

> **NOTE:<br>**
> Make sure you remember the fingerprint number you selected, that needs to be used to select a (non)matching finger print!

### Enabling Touch / Face ID on iOS simulators
To enable this on iOS simulators you need to do the following (when you have a simulator that supports this):

- Open a simulator
- For Touch ID go to the Simulator menu and open `Hardware > Touch ID` and select `Enrolled`
- For Face ID go to the Simulator menu and open `Hardware > Face ID` and select `Enrolled`

In the previous mentioned menu you can also select a (non)matching Touch / Face ID when the phone is asking for it.

## Deep linking
This app supports deep linking for iOS and for Android, this means that screens can directly be opened with a deep link.

The prefix deep link is `swaglabs://` and the following screens (with their arguments) can be used:

- **Swag overview screen:** `swag-overview/ids` where `ids` is a string of numbers from 0-5 separated with a `,`. For example `swag-overview/0,2`. The number represents a product. 
- **Swag details screen:** `swag-item/id` where `id` is a number from 0-5. For example `swag-item/0`   
- **Cart screen:** `cart/ids` where `ids` is a string of numbers from 0-5 separated with a `,`. For example `cart/0,2`. The number represents a product.  
- **Personal info screen:** `personal-info/ids` where `ids` is a string of numbers from 0-5 separated with a `,`. For example `cart/0,2`. The number represents a product.   
- **Checkout overview screen:** `checkout-overview/ids` where `ids` is a string of numbers from 0-5 separated with a `,`. For example `cart/0,2`. The number represents a product.   
- **Complete screen:** `complete`   
- **Webview screen:** `webview`

> **NOTE <br>**
> The *Swag overview | Details | Cart | Personal info | Checkout overview*-screens all need id(s). The id(s) are the numbers of the products of the `InventoryData.ITEMS` in [this](src/js/data/inventory-data.js) file.
> The files are in an `array` and an `array` starts counting from `0`. This means that if you need the first product, you  need to provide the id `0` and if you need to the last product you need to provide the  id `5`.

For how to run the deep link automation script see [Deep Linking](./docs/AUTOMATION.md#deep-linking).

### Use with Android
Open a terminal and add the following

```bash
# This will open the Checkout overview screen with 2 products in it
adb shell am start -W -a android.intent.action.VIEW -d "swaglabs://checkout-overview/1,2"
``` 

### Use with iOS
There are 2 ways of using deep links with iOS, through a terminal or through Safari

### Terminal
Open a terminal and add the following

```bash
# This will open the Swag overview screen with 2 products in it
xcrun simctl openurl booted swaglabs://swag-overview/0,1
```

#### With Safari
Open Safari and type the following

```bash
swaglabs://swag-overview/0,1
```

It will prompt a dialog asking you to open the app, select *Yes* and it will open the screen you selected.

## 3D Touch - Force Touch
This app also supports 3D Touch - Force Touch for devices that support that. 

> **NOTE 1:**<br>
>This app works with a dynamic *quick action menu*. This means that the 3D Touch - Force Touch menu will only be enabled when the app has been opened. 
>When that happens the JavaScript engine in React Native will add quick action items to the iOS and Android source code so the next time the app is opened it has
>those items.

> **NOTE 2:**<br>
>Due to a bug in the module we are using for the 3D Touch - Force Touch the quick actions also only work when the app is in the background.
>Then it can listen to the selected quick action event and get data from it so it will open the right screen.<br>
>The scope of this app is not to test **IF** the quick actions work for this app, the scope is to see how to **automate** 3D Touch / Force Touch

When you installed the app manually you first need to open the app and close to be able to press on the icon to see the 2 options popping up.
This will happens automatically during automation because the app will be opened by Appium by default and you need to close it to test the quick action menu. 

![3D Touch - Force Touch](./docs/assets/3D-touch.jpg) 

## Different languages
This app supports 3 different languages and will automatically check the language of the device to set the right language. The supported languages are:

- English
- Spanish
- Dutch

For the automation of the different languages see [here](./docs/AUTOMATION.md#different-languages)

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

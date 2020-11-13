# Espresso Automation

## Table of contents
1. [Intro](#intro)
1. [Build an Espresso test app](#build-an-espresso-test-app)
1. [Running the Espresso tests on Sauce Labs](#running-the-espresso-tests-on-sauce-labs)

## Intro
The [React Native library](https://github.com/facebook/react-native) for Android is currently [not well setup](https://github.com/facebook/react-native/pull/9942) for Espresso testing. 
There are two reasons for this:

1. React Native doesn't provide proper test-id for Android
1. Rendering React Native views is done async; React Native uses a Javascript thread and bridge. Therefore, the tests will have to wait on the views to become visible.

We use Spoon to take screenshots on each test.
This achieved with the help of Spoon ([link](https://github.com/square/spoon)) and the spoon-gradle-plugin ([link](https://github.com/stanfy/spoon-gradle-plugin)).

> **The examples in this repository are not for best practices, or have the purpose to test this app with Espresso, but they are only created to build a simple test set for Espresso.**

## Build an Espresso test app
To build an Espresso debug build and test app you need to execute the following

1. Go to the root of this project
2. Make sure you are using `yarn` version 1
3. Run `yarn android.espresso` 

This will result in the following logs

```log
╭─ …/Git/SwagLabsMobileApp  
╰> yarn android.espresso
yarn run v1.22.4
$ yarn android.debug.build && cd android && ./gradlew assembleDebug && ./gradlew assembleAndroidTest
$ yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ /Users/wimselles/Sauce/Git/SwagLabsMobileApp/node_modules/.bin/react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
Loading dependency graph, done.
Loading dependency graph...info Writing bundle output to:, android/app/src/main/assets/index.android.bundle
info Done writing bundle output
info Copying 45 asset files
info Done copying assets

BUILD SUCCESSFUL in 42s
440 actionable tasks: 28 executed, 412 up-to-date

BUILD SUCCESSFUL in 30s
697 actionable tasks: 26 executed, 671 up-to-date
✨  Done in 80.17s.

```

Then you can find the debug-build in this [`./android/app/build/outputs/apk/debug/`](./android/app/build/outputs/apk/debug/)- 
and the test app in this [`./android/app/build/outputs/apk/androidTest/`](./android/app/build/outputs/apk/androidTest/)-folder.

## Running the Espresso tests on Sauce Labs
Follow the steps on the [Sauce Labs Wiki](https://wiki.saucelabs.com/display/DOCS/Using+Espresso+for+Real+Device+Testing) to start running on Sauce Labs.

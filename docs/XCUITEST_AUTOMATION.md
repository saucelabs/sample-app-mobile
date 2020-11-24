# XCUITest Automation

## Table of contents
1. [Intro](#intro)
1. [Build an XCUITest test app](#build-an-espresso-test-app)
1. [Running the Espresso tests on Sauce Labs](#running-the-espresso-tests-on-sauce-labs)

## Intro
XCUITest is not the preferred automation framework for React Native applications, but it can be used as can be seen [here](ios/SwagLabsMobileAppUITests).
The examples written in this repository are used for this [XCUITest demo repository](https://github.com/saucelabs-training/demo-xcuitest).

> **The purpose of having these tests in this repo is not to show how to write XCUITest tests, but to have an example for running XCUITest tests
    on Sauce Labs based on the same demo app that we use for Appium tests.**

## Build an XCUITest test app
To build an XCUITest debug build and test app you need to execute the following

1. Go to the root of this project
2. Make sure you are using `yarn` version 1
3. Run `yarn ios.xcuitest` 

This will result in the following logs

```log
╭─ …/Git/SwagLabsMobileApp  
╰> yarn ios.xcuitest   
yarn run v1.22.10
$ cd scripts && ./build_xcuitest.sh && cd ..

Command line invocation:
    /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild build-for-testing -configuration Release -workspace SwagLabsMobileApp.xcworkspace -sdk iphoneos -scheme SwagLabsMobileApp -derivedDataPath XCUITestOutput

User defaults from command line:
    IDEDerivedDataPathOverride = /Users/Sauce/Git/SwagLabsMobileApp/ios/XCUITestOutput

// ......


** TEST BUILD SUCCEEDED **

```

Then you can find the app (`SwagLabsMobileApp.app`) and the test app (`SwagLabsMobileAppUITests-Runner.app`) in this 
[`./ios/XCUITestOutput/Build/Products/Release-iphoneos/`](./ios/XCUITestOutput/Build/Products/Release-iphoneos/)-folder.

## Running the XCUITests tests on Sauce Labs
Follow the steps on the [Sauce Labs Wiki](https://wiki.saucelabs.com/display/DOCS/Using+XCUITest+for+Real+Device+Testing) to start running on Sauce Labs
or check our [this](https://github.com/saucelabs-training/demo-xcuitest) repository which holds some configuration examples.

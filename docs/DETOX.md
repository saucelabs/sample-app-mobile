# Detox

## Intro
Detox is a gray box end-to-end testing and automation framework for mobile apps created with React Native.
This doc will describe what you need to do to get this project running with Detox on a:
- iOS simulator
- Android Simulator
- Android Real device (in the Sauce Labs Real device cloud)

> Note: iOS real devices are not supported, see [this](https://github.com/wix/detox/issues/95) ticket. The chance that it will be supported is minimal because the focus of Detox is on simulators/emulators instead of real hardware.

Detox still has some *limitations* in comparison to Appium when you do a 1-on-1 comparison. Some of the *limitations* are:
- getting text of an element is pretty hard to do, for now we use a terrible hack, see [this](../tests/detox/specs/login.spec.js) test file. But to be honest, comparing text is something you don't want to do through te UI, this should be a Unit Test where you want to verify through the UI that the error is shown.
- running on real devices, see [this](https://github.com/wix/detox/issues/95) ticket. Focus of Detox is on simulators/emulators instead of real hardware.
- interaction between apps / browser - app
- Detox uses a specific build, this is not needed for Appium
- ...

> Note: This doesn't mean that Detox isn't a good tool! It has a different purpose in comparison to for example Appium and is more developer focused instead of E2E focused. 
> Last but not least it pretty fast in comparison to Appium!

## Setting up Detox on your local machine
Please follow [Step 1: Install dependencies](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies) to set up Detox on your local machine.
The rest of the steps are already implemented in this project

## Build the app
Detox uses a special build of the app to be able to test it, in order to do this you need to run this command

    detox build

## Running tests
Run tests by using this command

    detox test

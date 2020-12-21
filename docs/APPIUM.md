# Setup Appium on a local machine

## Table of contents
1. [Appium Doctor](#appium-doctor)
1. [Appium](#appium)
1. [Appium Desktop](#appium-desktop)

## Appium Doctor
appium-doctor is used to diagnose and fix common Node, iOS and Android configuration issues before starting Appium. You only run it once to check your local machine. See an example output below.

```bash
appium-doctor

info AppiumDoctor Appium Doctor v.1.4.3
info AppiumDoctor ### Diagnostic starting ###
info AppiumDoctor  ✔ The Node.js binary was found at: /Users/exampleUser/.nvm/versions/node/v8.9.1/bin/node
info AppiumDoctor  ✔ Node version is 8.9.1
info AppiumDoctor  ✔ Xcode is installed at: /Applications/Xcode.app/Contents/Developer
info AppiumDoctor  ✔ Xcode Command Line Tools are installed.
info AppiumDoctor  ✔ DevToolsSecurity is enabled.
info AppiumDoctor  ✔ The Authorization DB is set up properly.
info AppiumDoctor  ✔ Carthage was found at: /usr/local/bin/carthage
info AppiumDoctor  ✔ HOME is set to: /Users/exampleUser
info AppiumDoctor  ✔ ANDROID_HOME is set to: /Users/exampleUser/Library/Android/sdk
info AppiumDoctor  ✔ JAVA_HOME is set to: /Library/Java/JavaVirtualMachines/jdk1.8.0_152.jdk/Contents/Home
info AppiumDoctor  ✔ adb exists at: /Users/exampleUser/Library/Android/sdk/platform-tools/adb
info AppiumDoctor  ✔ android exists at: /Users/exampleUser/Library/Android/sdk/tools/android
info AppiumDoctor  ✔ emulator exists at: /Users/exampleUser/Library/Android/sdk/tools/emulator
info AppiumDoctor  ✔ Bin directory of $JAVA_HOME is set
info AppiumDoctor ### Diagnostic completed, no fix needed. ###
info AppiumDoctor
info AppiumDoctor Everything looks good, bye!
info AppiumDoctor
```

When appium-doctor can, it will fix the problems for you, otherwise fix them manually. If you have some ENV issues make sure you have set them like this

```bash
export ANDROID_HOME=/Users/exampleUser/Library/Android/sdk
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools/adb:$ANDROID_HOME/build-tools:$JAVA_HOME/bin
# This one is used for the `start.android.emulator` script
export emulator=/Users/exampleUser/Library/Android/sdk/emulator
```

## Appium
If the `npm install` was successful you should be able to run this command `appium -v` and see a version like below.

```bash
➜  ~ appium -v
1.10.0
➜  ~
```

> Always make sure to check the Appium site if there is a new version. New Appium version are released mostly when Android/iOS release new versions. Bugfixes can also be released. Just check the [changelog](https://github.com/appium/appium/blob/master/CHANGELOG.md) for a clear overview

## Appium desktop
Appium Desktop is an open source app which gives us the ability of the Appium automation server in a UI. It is a combination of a few Appium-related tools:

- A graphical interface for the Appium Server. You can set options, start/stop the server, see logs, etc...
- An Inspector that you can use to look at your app's elements, get basic information about them, and perform basic interactions with them. This is useful as a way to learn about Appium or as a way to learn about your app so you can write tests for it.

This tool is mainly used to view the UI-hierarchy and locate elements to be sure that all elements can be found.

See the [readme](https://github.com/appium/appium-desktop) about how to use the Appium Desktop.

When Appium Desktop is started make sure the _Automatic Server_-tab is enabled. Use the following settings for Android

```
{
  "deviceName": "Nexus5X_7.1.1",
  "platformVersion": "7.1.1",
  "platformName": "Android",
  // Adjust the path to your folders
  "app": "/Users/exampleUser/Git/sample-app-ios/apps/app-debug.apk",
  // this will not reinstall the app then it is already installed
  "noReset": true,
  // Needed for Android to use the right Android driver
  "automationName": "UiAutomator2"
}
```

And the following settings for iOS

```
{
  "deviceName": "iPhone X",
  "platformVersion": "11.4",
  "platformName": "iOS",
  // Adjust the path to your folders
  "app": "/Users/exampleUser/Git/sample-app-ios/apps/SwagLabsMobileApp.app",
  // this will not reinstall the app then it is already installed
  "noReset": true
}
```

# Building the app

> **NOTE:** The build steps here are only temporary steps untill we have our pipeline in place. 


## Table of contents
1. [Building iOS](#building-ios)
1. [Building Android](#building-android)

## Building iOS
> **NOTE:** This step can only build an iOS-`.app` file that can only be used on a simulator!

Making an iOS build can be done by running the following command `npm run ios.sim.build`. The output can be found in `ios/build/Build/Products/Debug-iphonesimulator/`

## Building Android
Making an Android build can be done by running the following commands

1. `npm run android.clear.build`
2. `react-native run-android`, this will install the app and starts building the js. Wait until all JS has been compiled
3. Kill the metro bundler
4. `npm run android.build.js`, this can take a while, in the end you should be able to see something like this

    ```bash
    ➜  sample-app-ios git:(test/webdriverio-appium-setup) ✗ npm run android.build.js
    
    > SwagLabsMobileApp@0.0.1 android.build.js /Users/wswebcreation/Git/sample-app-ios
    > react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    
    Loading dependency graph, done.
    bundle: Writing bundle output to: android/app/src/main/assets/index.android.bundle
    bundle: Done writing bundle output
    bundle: Copying 19 asset files
    bundle: Done copying assets
    ```

5. `npm run android.debug`

The output can be found in `android/app/build/outputs/apk/app-debug.apk`

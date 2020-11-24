#!/bin/bash

# open the iOS folder
cd ..
cd ios

# build the app
xcrun xcodebuild build-for-testing \
  -configuration Release \
  -workspace SwagLabsMobileApp.xcworkspace \
  -sdk iphoneos \
  -scheme SwagLabsMobileApp \
  -derivedDataPath XCUITestOutput

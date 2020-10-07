#!/bin/bash

VERSION=$(cat ../package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

## US
# Android
curl \
  -F "payload=@../apps/Android.SauceLabs.Mobile.Sample.app.$VERSION.apk" \
  -F name=sample-app-android.apk \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.us-west-1.saucelabs.com/v1/storage/upload'
# iOS
curl \
  -F "payload=@../apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.$VERSION.zip" \
  -F name=sample-app-ios.zip \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.us-west-1.saucelabs.com/v1/storage/upload'
curl \
  -F "payload=@../apps/iOS.RealDevice.SauceLabs.Mobile.Sample.app.$VERSION.ipa" \
  -F name=sample-app-ios.ipa \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.us-west-1.saucelabs.com/v1/storage/upload'

## EU
# Android
curl \
  -F "payload=@../apps/Android.SauceLabs.Mobile.Sample.app.$VERSION.apk" \
  -F name=sample-app-android.apk \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'
# iOS
curl \
  -F "payload=@../apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.$VERSION.zip" \
  -F name=sample-app-ios.zip \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'
curl \
  -F "payload=@../apps/iOS.RealDevice.SauceLabs.Mobile.Sample.app.$VERSION.ipa" \
  -F name=sample-app-ios.ipa \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'

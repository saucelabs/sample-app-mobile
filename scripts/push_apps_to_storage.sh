#!/bin/bash

## US
# Android
curl \
  -F 'payload=@../apps/Android.SauceLabs.Mobile.Sample.app.2.3.0.apk' \
  -F name=sample-app-android.apk \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.us-west-1.saucelabs.com/v1/storage/upload'
# iOS
curl \
  -F 'payload=@../apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.3.0.zip' \
  -F name=sample-app-ios.zip \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.us-west-1.saucelabs.com/v1/storage/upload'

## EU
# Android
curl \
  -F 'payload=@../apps/Android.SauceLabs.Mobile.Sample.app.2.3.0.apk' \
  -F name=sample-app-android.apk \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'
# iOS
curl \
  -F 'payload=@../apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.3.0.zip' \
  -F name=sample-app-ios.zip \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'

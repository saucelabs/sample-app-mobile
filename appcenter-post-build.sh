#!/usr/bin/env bash

APP_NAME=""
# You can find this name in the build logs
BUILD_NAME=""

# Set the correct app name based on the platform
if [[ -z "$APPCENTER_XCODE_PROJECT" ]]; then
    APP_NAME="iOS.SauceLabs.Mobile.Sample.app.ipa"
    BUILD_NAME="SwagLabsMobileApp.ipa"
else
    APP_NAME="Android.SauceLabs.Mobile.Sample.app.apk"
    BUILD_NAME="app-debug.apk"
fi

echo "**************** PUBLISH APP TO SAUCELABS WITH THIS DATA ******************"
echo "APP NAME                => $APP_NAME"
echo "OUTPUT DIRECTORY        => $APPCENTER_OUTPUT_DIRECTORY"

# Push to US
curl \
  -F "payload=@$APPCENTER_OUTPUT_DIRECTORY/$BUILD_NAME" \
  -F name=$APP_NAME \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  'https://api.us-west-1.saucelabs.com/v1/storage/upload'

# Push to EU
curl \
  -F "payload=@$APPCENTER_OUTPUT_DIRECTORY/$BUILD_NAME" \
  -F name=$APP_NAME \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'

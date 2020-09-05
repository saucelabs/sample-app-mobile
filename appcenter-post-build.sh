#!/usr/bin/env bash
####################################################################################################
# This script has been created for a React Native project which can build
# AND Android, AND iOS apps. If you build a single project (OR Android OR iOS
# then you don't need the APP_NAME, BUILD_NAME and APPCENTER_XCODE_PROJECT logic.
#
# In order for this script to work you need to:
# - go to AppCenter
# - go to your project
# - Configure your project
# - Then you should see the post-script, then SAVE it, otherwise it will not work
# See src: https://github.com/MicrosoftDocs/appcenter-docs/issues/53
####################################################################################################

##
# Create an empty variable, this will be set later
#
APP_NAME=""

##
# You can find this name in the build logs of a previous project
# for now we create an empty variable and change it based on the
# project that is using this script
#
BUILD_NAME=""

##
# Set the correct app name based on the platform
#
if [[ "$APPCENTER_XCODE_PROJECT" ]]; then
    APP_NAME="iOS.SauceLabs.Mobile.Sample.app.ipa"
    BUILD_NAME="SwagLabsMobileApp.ipa"
else
    APP_NAME="Android.SauceLabs.Mobile.Sample.app.apk"
    BUILD_NAME="app-release.apk"
fi

##
# Add some extra logs
#
echo "**************** PUBLISH APP TO SAUCELABS WITH THIS DATA ******************"
echo "APP NAME                => $APP_NAME"
echo "BUILD NAME              => $BUILD_NAME"
echo "OUTPUT DIRECTORY        => $APPCENTER_OUTPUT_DIRECTORY"
echo "PAYLOAD                 => $APPCENTER_OUTPUT_DIRECTORY/$BUILD_NAME"

#
# For this project we push to both DCs
#

#
# Push to US
#
curl \
  -F "payload=@$APPCENTER_OUTPUT_DIRECTORY/$BUILD_NAME" \
  -F name=$APP_NAME \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  'https://api.us-west-1.saucelabs.com/v1/storage/upload'

#
# Push to EU
#
curl \
  -F "payload=@$APPCENTER_OUTPUT_DIRECTORY/$BUILD_NAME" \
  -F name=$APP_NAME \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY"  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'

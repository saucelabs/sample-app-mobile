# sample-app-ios
This is the Sauce Labs Sample Application which is designed to be used from iOS devices

- install XCode: https://developer.apple.com/xcode/
- install homebrew: https://brew.sh/
- brew install node
- brew install watchman
- npm install -g react-native-cli
- npm install
- react-native link react-native-vector-icons

- react-native run-ios


## Linting the code
The linting rules were taken from the React Native project itself and can be used by running 

    $ npm run lint

Issues / warning will be shown in the console and most of them can automatically be fixed by running

    $ npm run lint -- --fix

The linting will also be run on each `git push` and fail if there are issues.


/** @format */
// Disable the yellow box, this is only containing warnings and will kill the automation
// The yellow box is also shown during automation on the dev build when the automation goes to fast
// for React Native
console.disableYellowBox = true;

import {AppRegistry} from 'react-native';
import App from './src/js/App';
import {name as appName} from './src/js/app.json';

AppRegistry.registerComponent(appName, () => App);

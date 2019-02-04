import { Platform, Dimensions } from 'react-native';

export const TEST_PREFIX = 'test-';
export const MAKE_ACCESSIBLE_FOR_AUTOMATION = { accessible: false };
export const IS_IOS = Platform.OS === 'ios';
export const {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
} = Dimensions.get('window');
// A basic helper to design your react-native app for the iPhone X, XS, XS Max & XR
export const IS_IPHONEX = IS_IOS &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  // Check if it's an iPhone X(S|R) Max in portrait or landscape mode
  ((WINDOW_WIDTH === 812 || WINDOW_HEIGHT === 812) || (WINDOW_WIDTH === 896 || WINDOW_HEIGHT === 896));
// Naming convention of custom fonts can differ in iOS and Android, this fixes it
// Check https://stackoverflow.com/questions/33088510/react-native-android-fontfamily-does-not-take-effect
export const MUSEO_SANS_NORMAL = IS_IOS ? 'MuseoSans-500' : 'MuseoSans_500';
export const MUSEO_SANS_BOLD = IS_IOS ? 'MuseoSans-700' : 'MuseoSans_700';

import { Platform, Dimensions } from 'react-native';

export const TEST_PREFIX = 'test-';
export const MAKE_ACCESSIBLE_FOR_AUTOMATION = { accessible: false };
export const IS_IOS = Platform.OS === 'ios';
export const {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
} = Dimensions.get('window');
export const IS_IPHONEX = IS_IOS &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  ((WINDOW_WIDTH === 812 || WINDOW_HEIGHT === 812) || (WINDOW_WIDTH === 896 || WINDOW_HEIGHT === 896));
export const MUSEO_SANS_NORMAL = IS_IOS ? 'MuseoSans-500' : 'MuseoSans_500';
export const MUSEO_SANS_BOLD = IS_IOS ? 'MuseoSans-900' : 'MuseoSans_900';

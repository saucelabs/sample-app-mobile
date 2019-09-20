import { DeviceEventEmitter } from 'react-native';

export function handleQuickActionsNavigation(navigation) {
	DeviceEventEmitter.addListener('quickActionShortcut', data => navigation.replace(data.userInfo.url));
}

import React, { Component } from 'react';
import { Alert, Linking, PermissionsAndroid, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import Geolocation from 'react-native-geolocation-service';
import { ThemeProvider } from 'react-native-elements';
import SecondaryHeader from '../components/SecondaryHeader';
import { colors } from '../utils/colors';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';
import { IS_IOS, MUSEO_SANS_BOLD, PLATFORM_VERSION } from '../config/Constants';

class GeoLocation extends Component {
	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
		this.getLocationUpdates();
	}

	watchId = null;

	state = {
		isLoading: false,
		latitude: null,
		longitude: null,
	};

	componentWillUnmount() {
		this.removeLocationUpdates();
	}

	hasLocationPermissionIOS = async () => {
		const openSetting = () => {
			Linking.openSettings().catch(() => {
				Alert.alert(I18n.t('geoLocation.errorSettings'));
			});
		};
		const status = await Geolocation.requestAuthorization('whenInUse');

		if (status === 'granted') {
			return true;
		}

		if (status === 'denied') {
			Alert.alert(I18n.t('geoLocation.locationPermission'));
		}

		if (status === 'disabled') {
			Alert.alert(
				I18n.t('geoLocation.enableLocation'),
				'',
				[
					{ text: I18n.t('geoLocation.toSettings'), onPress: openSetting },
					{ text: I18n.t('geoLocation.dontUse'), onPress: () => {} },
				],
			);
		}

		return false;
	};

	hasLocationPermission = async () => {
		if (IS_IOS) {
			const hasPermission = await this.hasLocationPermissionIOS();
			return hasPermission;
		}

		if (!IS_IOS && PLATFORM_VERSION < 23) {
			return true;
		}

		const hasPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		);

		if (hasPermission) {
			return true;
		}

		const status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		);

		if (status === PermissionsAndroid.RESULTS.GRANTED) {
			return true;
		}

		if (status === PermissionsAndroid.RESULTS.DENIED) {
			ToastAndroid.show(
				I18n.t('geoLocation.deniedByUser'),
				ToastAndroid.LONG,
			);
		} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			ToastAndroid.show(
				I18n.t('geoLocation.deniedByUser'),
				ToastAndroid.LONG,
			);
		}

		return false;
	};

	getLocationUpdates = async () => {
		const hasLocationPermission = await this.hasLocationPermission();

		if (!hasLocationPermission) {
			return;
		}

		this.setState({ isLoading: true }, () => {
			this.watchId = Geolocation.watchPosition(
				(position) => {
					const { latitude, longitude } = position.coords;

					this.setState({
						latitude,
						longitude,
						isLoading: false,
					});
				},
				(error) => {
					this.setState({
						isLoading: false,
					});
					console.log(error);
				},
				{
					enableHighAccuracy: true,
					distanceFilter: 0,
					interval: 2000,
					fastestInterval: 500,
				},
			);
		});
	};

	removeLocationUpdates = () => {
		if (this.watchId !== null) {
			Geolocation.clearWatch(this.watchId);
			Geolocation.stopObserving();
			this.watchId = null;
		}
	};

	render() {
		const { latitude, longitude, isLoading } = this.state;

		return (
			<ThemeProvider>
				<SecondaryHeader header={ I18n.t('geoLocation.header') }/>
				<ScrollView
					style={ styles.container }
					{ ...testProperties(I18n.t('geoLocation.screen')) }
				>
					<View style={ [ styles.text_container, styles.container_padding ] }>
						<NavigationEvents
							onWillFocus={ () => this.getLocationUpdates() }
							onDidBlur={ () => this.removeLocationUpdates() }
						/>
						<Text style={ styles.text }>
							{ I18n.t('geoLocation.text') }
							<Text
								style={ styles.link }
								onPress={ () => Linking.openURL(I18n.t('geoLocation.appiumLink')) }
							>
								{ I18n.t('geoLocation.this') }
							</Text>
							{ I18n.t('geoLocation.link') }
						</Text>
						<Text style={ styles.text }>
							{ I18n.t('geoLocation.determinePosition') }
						</Text>
						<Text style={ [ styles.marginTop, styles.label ] }>Latitude:</Text>
						<Text
							style={ styles.text } { ...testProperties(I18n.t('geoLocation.latitude')) }
						>
							{ isLoading ? I18n.t('geoLocation.position') : latitude }
						</Text>
						<Text style={ [ styles.marginTop, styles.label ] }>Longitude:</Text>
						<Text
							style={ styles.text } { ...testProperties(I18n.t('geoLocation.longitude')) }
						>
							{ isLoading ? I18n.t('geoLocation.position') : longitude }
						</Text>
					</View>
					<Footer/>
				</ScrollView>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	container_padding: {
		paddingRight: 40,
		paddingLeft: 40,
	},
	text_container: {
		alignItems: 'center',
		paddingBottom: 100,
		paddingTop: 120,
	},
	label: {
		color: colors.slRed,
		fontSize: 18,
		fontFamily: MUSEO_SANS_BOLD,
	},
	link: {
		color: colors.slRed,
	},
	marginTop: {
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		color: colors.gray,
		textAlign: 'center',
	},
	italic: {
		fontStyle: 'italic',
	},
});

export default withNavigationFocus(GeoLocation);

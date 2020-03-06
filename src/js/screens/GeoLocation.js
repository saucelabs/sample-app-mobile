import React, { Component } from 'react';
import { PermissionsAndroid, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
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
	watchId = null;

	state = {
		isLoading: false,
		longitude: null,
		latitude: null,
	};

	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
		this.getLocation();
	}

	hasLocationPermission = async () => {
		if (IS_IOS || PLATFORM_VERSION < 23) {
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
			ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
		} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
		}

		return false;
	};

	async getLocation() {
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
					console.log(error);
				},
				{
					enableHighAccuracy: true,
					timeout: 15000,
					maximumAge: 10000,
					distanceFilter: 50,
					forceRequestLocation: true,
				},
			);
		});
	}

	removeLocationUpdates = () => {
		if (this.watchId !== null) {
			Geolocation.clearWatch(this.watchId);

			this.setState({
				latitude: null,
				longitude: null,
				isLoading: false,
			});
		}
	};

	render() {
		const { latitude, isLoading, longitude } = this.state;

		return (
			<ThemeProvider>
				<SecondaryHeader header={ I18n.t('geoLocation.header') }/>
				<ScrollView
					style={ styles.container }
					{ ...testProperties(I18n.t('geoLocation.screen')) }
				>
					<View style={ [ styles.text_container, styles.container_padding ] }>
						<NavigationEvents
							onWillFocus={ () => this.getLocation() }
							onDidBlur={ () => this.removeLocationUpdates() }
						/>
						<Text style={ styles.text }>
							Below you will find the latitude and longitude.
							You can use Appium to change the latitude and longitude and verify them.
						</Text>
						<Text style={ styles.label }>Latitude:</Text>
						<Text style={ styles.text }>{ isLoading ? 'Determining position...' : latitude }</Text>
						<Text style={ styles.label }>Longitude:</Text>
						<Text style={ styles.text }>{ isLoading ? 'Determining position...' : longitude }</Text>
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
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		color: colors.gray,
		textAlign: 'center',
	},
});

export default withNavigationFocus(GeoLocation);

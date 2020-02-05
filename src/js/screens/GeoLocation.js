import React, { Component } from 'react';
import { PermissionsAndroid, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { ThemeProvider } from 'react-native-elements';
import { WEATHER_API_KEY } from 'react-native-dotenv';
import SecondaryHeader from '../components/SecondaryHeader';
import { colors } from '../utils/colors';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import Footer from '../components/Footer';
import { IS_IOS, MUSEO_SANS_BOLD, PLATFORM_VERSION } from '../config/Constants';

// const WEATHER_API_KEY = '475fd1ff0c76940fc6fe2b9243c2a726';

class GeoLocation extends Component {
	state = {
		longitude: null,
		latitude: null,
		country: 'Trying to determine country...',
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

	getLocation = async () => {
		const hasLocationPermission = await this.hasLocationPermission();

		if (!hasLocationPermission) {
			return;
		}

		this.setState(this.state, () => {
			Geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;

					this.setState({ longitude, latitude });

					return this.fetchWeather(latitude, longitude);
				},
				(error) => {
					this.setState({
						longitude: 'Longitude could not be determined',
						latitude: 'Latitude could not be determined',
					});
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
	};

	fetchWeather = async (lat = 35, lon = 139) => {
		try {
			const weatherData = await axios(
				`http://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&APPID=${ WEATHER_API_KEY }&units=metric`,
			);

			this.setState({
				country: weatherData ? weatherData.data.sys.country : 'Could not be determined',
			});
		} catch (e) {
			console.log('error = ', e);
		}
	};

	render() {
		const { country, latitude, longitude } = this.state;

		return (
			<ThemeProvider>
				<SecondaryHeader header={ I18n.t('geoLocation.header') }/>
				<ScrollView
					style={ styles.container }
					{ ...testProperties(I18n.t('geoLocation.screen')) }
				>
					<View style={ [ styles.text_container, styles.container_padding ] }>
						<NavigationEvents onWillFocus={ () => this.getLocation() }/>
						<Text style={ styles.text }>
							Below you will find the latitude, longitude and (if we can determine) also the country code of these coordinates.
							You can use Appium to change the latitude and longitude and verify the county code if needed.
						</Text>
						<Text style={ styles.label }>Latitude:</Text>
						<Text style={ styles.text }>{ latitude }</Text>
						<Text style={ styles.label }>Longitude:</Text>
						<Text style={ styles.text }>{ longitude }</Text>
						<Text style={ styles.label }>Countrycode:</Text>
						<Text style={ styles.text }>{ country }</Text>
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

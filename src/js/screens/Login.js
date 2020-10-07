import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Biometrics from 'react-native-biometrics';
import { Divider } from 'react-native-elements';
import { Credentials } from '../credentials.js';
import SyncStorage from 'sync-storage';
import { ShoppingCart } from '../shopping-cart.js';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import { MUSEO_SANS_BOLD, MUSEO_SANS_NORMAL, SCREENS } from '../config/Constants';
import { colors } from '../utils/colors';
import { STATUS_BAR_HEIGHT } from '../components/StatusBar';
import ActionButton from '../components/ActionButton';
import InputError from '../components/InputError';
import ErrorMessageContainer from '../components/ErrorMessageContainer';
import BiometryButton from '../components/BiometryButton';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';

export default class Login extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			usernameError: false,
			password: '',
			passwordError: false,
			error: '',
			biometryType: null,
		};

		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderBiometryIcon = this.renderBiometryIcon.bind(this);
		this.handleBiometryLogin = this.handleBiometryLogin.bind(this);
		this.successfulLogin = this.successfulLogin.bind(this);
		this.autoFillLoginDataButton = this.autoFillLoginDataButton.bind(this);
	}

	async componentDidMount() {
		// This is the first page loaded, so init our storage here
		await SyncStorage.init();

		// Set the type of biometry so it can be used later, catch the error
		// if it can't be determined on a specific phone
		try {
			this.setState({
				biometryType: (await Biometrics.isSensorAvailable()).available,
			});
		} catch (e) {
			// Do nothing
		}

		handleQuickActionsNavigation(this.props.navigation);
	}

	resetState() {
		this.setState({
			error: '',
			passwordError: false,
			usernameError: false,
		});
	}

	handleUserChange(text) {
		this.setState({
			username: text,
		});
	}

	handlePassChange(text) {
		this.setState({
			password: text,
		});
	}

	handleSubmit() {
		// First, clear any errors
		this.resetState();

		if (!this.state.username) {
			return this.setState({
				error: I18n.t('login.errors.username'),
				usernameError: true,
			});
		}

		if (!this.state.password) {
			return this.setState({
				error: I18n.t('login.errors.password'),
				passwordError: true,
			});
		}

		if (Credentials.verifyCredentials(this.state.username, this.state.password)) {
			// Catch our locked-out user and bail out
			const isLockedOutUser = Credentials.isLockedOutUser();

			if (isLockedOutUser) {
				return this.setState({ error: I18n.t('login.errors.lockedOut') });
			}

			return this.successfulLogin();
		}

		return this.setState({
			error: I18n.t('login.errors.noMatch'),
			passwordError: true,
			usernameError: true,
		});

	}

	async handleBiometryLogin() {
		// Using object destructuring here will automatically call the `handleBiometryLogin`
		const loginResult = await Biometrics.simplePrompt({
			promptMessage: 'Please sign in',
			cancelButtonText: 'Cancel',
		});

		return loginResult.success ? this.successfulLogin() : this.handleBiometryLogin();
	}

	successfulLogin() {
		// First, clear any errors
		this.resetState();
		this.handleUserChange('');
		this.handlePassChange('');
		// and redirect after we wipe out any previous shopping cart contents
		ShoppingCart.resetCart();
		this.props.navigation.navigate(SCREENS.INVENTORY_LIST);
	}

	/**
	 * Parse a string that holds a `__text__` markdown and transform it into a
	 * string with bolds or normal text components
	 *
	 * @param {string} username
	 * @param {string} password
	 *
	 * @return {*[]}
	 */
	autoFillLoginDataButton(username, password) {
		return (
			<TouchableOpacity
				onPress={ () => {
					this.setState({
						username,
						password,
						error: '',
						passwordError: false,
						usernameError: false,
					});
				} }
				{ ...testProperties(username) }
			>
				<Text style={ [ styles.login_info, styles.text_bold ] }>
					{ username }
				</Text>
			</TouchableOpacity>
		);
	}

	/**
	 * Render the biometry icon if it is there
	 *
	 * @return {null}
	 */
	renderBiometryIcon() {
		return this.state.biometryType
			? <BiometryButton onPress={ this.handleBiometryLogin } type={ this.state.biometryType }/>
			: null;
	}

	render() {
		const password = I18n.t('login.loginText.password');

		return (
			<ScrollView
				contentContainerStyle={ styles.scroll_container }
				keyboardShouldPersistTaps="handled"
				{ ...testProperties(I18n.t('login.screen')) }
			>
				<View style={ styles.wrapper }>
					<View style={ styles.login_container }>
						<Image
							resizeMode="contain"
							source={ require('../../img/swag-labs-logo.png') }
							style={ styles.swag_logo_image }
						/>
						<InputError
							placeholder={ 'login.username' }
							value={ this.state.username }
							onChangeText={ this.handleUserChange }
							error={ this.state.usernameError }
						/>
						<Divider style={ styles.bottomMargin20 }/>
						<InputError
							placeholder={ 'login.password' }
							value={ this.state.password }
							onChangeText={ this.handlePassChange }
							error={ this.state.passwordError }
							secureTextEntry={ true }
						/>
						<ErrorMessageContainer
							testID={ I18n.t('login.errors.container') }
							message={ this.state.error }
						/>
						{ this.renderBiometryIcon() }
						<ActionButton
							onPress={ this.handleSubmit }
							title={ I18n.t('login.loginButton') }
						/>
						<Image
							source={ require('../../img/login-bot.png') }
							style={ styles.login_bot_image }
							resizeMode="contain"
						/>
					</View>
					<View style={ styles.login_info_container }>
						<View>
							<Text style={ [ styles.login_info, styles.bottomMargin20 ] }>
								{ I18n.t('login.loginText.usernamesText') }
							</Text>
							{ this.autoFillLoginDataButton(I18n.t('login.loginText.standard'), password) }
							{ this.autoFillLoginDataButton(I18n.t('login.loginText.locked'), password) }
							{ this.autoFillLoginDataButton(I18n.t('login.loginText.problem'), password) }
						</View>
						<Divider style={ styles.divider }/>
						<View>
							<Text style={ [styles.login_info, styles.bottomMargin20] }>
								{ I18n.t('login.loginText.passwordText') }
							</Text>
							<Text style={ [styles.login_info, styles.text_bold] }>
								{ I18n.t('login.loginText.password') }
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	scroll_container: {
		backgroundColor: colors.white,
		paddingTop: STATUS_BAR_HEIGHT,
	},
	wrapper: {
		flex: 1,
	},
	login_container: {
		alignItems: 'center',
		paddingTop: 20,
		paddingRight: 40,
		paddingLeft: 40,
	},
	swag_logo_image: {
		marginBottom: 30,
		width: '100%',
	},
	bottomMargin20: {
		marginBottom: 20,
	},
	message_container: {
		width: '100%',
		height: 55,
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 2,
		marginTop: 2,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error_message_container: {
		backgroundColor: colors.slRed,
	},
	error_message: {
		color: colors.white,
		fontSize: 14,
		fontFamily: MUSEO_SANS_NORMAL,
		textAlign: 'center',
	},
	login_bot_image: {
		flex: 1,
		height: 320,
		width: '100%',
	},
	login_info_container: {
		backgroundColor: colors.superLightGray,
		paddingBottom: STATUS_BAR_HEIGHT,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 20,
	},
	login_info: {
		color: colors.gray,
		fontSize: 18,
		fontFamily: MUSEO_SANS_NORMAL,
	},
	divider: {
		borderColor: colors.lightGray,
		borderBottomWidth: 3,
		marginBottom: 20,
		marginTop: 20,
	},
	text_bold: {
		fontFamily: MUSEO_SANS_BOLD,
	},
});

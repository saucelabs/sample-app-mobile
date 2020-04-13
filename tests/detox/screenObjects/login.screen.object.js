class LoginScreenObject {
	get screen() {
		return element(by.id('test-Login'));
	}

	get username() {
		return element(by.id('test-Username'));
	}

	get password() {
		return element(by.id('test-Password'));
	}

	get loginButton() {
		return element(by.id('test-LOGIN'));
	}

	get errorMessage() {
		return element(by.id('test-Error message'));
	}

	/**
	 * Sign in
	 *
	 * @param {object} userDetails
	 * @param {string} userDetails.username
	 * @param {string} userDetails.password
	 */
	async signIn(userDetails) {
		const { password, username } = userDetails;

		if (username !== '') {
			await this.username.typeText(username);
		}
		if (password !== '') {
			await this.password.typeText(password);
		}

		await this.loginButton.tap();
	}
}

export default new LoginScreenObject();

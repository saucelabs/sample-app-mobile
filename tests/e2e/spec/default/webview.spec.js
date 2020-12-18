import { languageSelectors, openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import Webview, { CONTEXT_REF } from '../../screenObjects/webview';

describe('Menu', () => {
	const SELECTORS = languageSelectors();

	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
		openDeepLinkUrl('webview');
		Webview.waitForIsShown();
	});

	it('should be able to see the error message when an incorrect url is being entered', () => {
		Webview.submitURL('http://www.saucelabs.com');

		expect(Webview.getErrorMessage()).toContain(SELECTORS.webview.urlError, 'The error message is not as expected');
	});

	it('should be able open the saucelabs website in the webview', () => {
		Webview.submitURL('https://www.saucelabs.com');
		Webview.waitForWebsiteLoaded();
		// Change the context ton Webview to get the url of the browser
		Webview.switchToContext(CONTEXT_REF.WEBVIEW);

		expect(driver.getUrl()).toContain('https://saucelabs.com', 'Url not as expected');
	});
});

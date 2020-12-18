import { languageSelectors, openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import CheckoutPageTwo from '../../screenObjects/checkoutPageTwo';
import CheckoutComplete from '../../screenObjects/checkoutComplete';

describe('Checkout: Overview', () => {
  const SELECTORS = languageSelectors();

  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.waitForIsShown();
    openDeepLinkUrl('checkout-overview/0');
    CheckoutPageTwo.waitForIsShown();
  });

  it('should show the correct selected item in the overview', () => {
    expect(CheckoutPageTwo.getSwagItemText(0)).toContain(SELECTORS.products.backpack.name, 'The selected swag item is not equal.');
  });

  it('should be able to finish the checkout', () => {
    CheckoutPageTwo.finishCheckout();
    CheckoutComplete.waitForIsShown();

    expect(CheckoutPageTwo.isShown()).toEqual(false, 'The Checkout: Overview screen is still visible.');
  });
});

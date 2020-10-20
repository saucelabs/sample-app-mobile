import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './translations/en';
import nl from './translations/nl';
import es from './translations/es';
import de from './translations/de';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
	I18n.locale = locales[ 0 ].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
	en,
	nl,
	es,
	de,
};

export default I18n;

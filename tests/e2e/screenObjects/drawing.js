import Base from './base';
import { languageSelectors } from '../helpers/utils';

class DrawingScreen extends Base {
	constructor() {
		super(`~test-${ languageSelectors().drawing.screen }`);
	}

	get SELECTORS() {
		return languageSelectors();
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.drawing.screen }`);
	}
}

export default new DrawingScreen();

import Base from './base';

class DrawingScreen extends Base {
	constructor() {
		super(`~test-${ driver.selectors.drawing.screen }`);
	}

	get SELECTORS() {
		return driver.selectors;
	}

	get screen() {
		return $(`~test-${ this.SELECTORS.drawing.screen }`);
	}
}

export default new DrawingScreen();

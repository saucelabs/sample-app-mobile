/**
 * This src is from the appium-boilerplate
 * src: https://github.com/webdriverio/appium-boilerplate/blob/master/tests/helpers/Gestures.js
 */

let SCREEN_SIZE;

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
	down: {
		start: { x: 50, y: 35 },
		end: { x: 50, y: 85 },
	},
	left: {
		start: { x: 95, y: 50 },
		end: { x: 5, y: 50 },
	},
	right: {
		start: { x: 5, y: 50 },
		end: { x: 95, y: 50 },
	},
	up: {
		start: { x: 50, y: 85 },
		end: { x: 50, y: 15 },
	},
};

class Gestures {
	/**
	 * Check if an element is visible and if not scroll up/down a portion of the screen to
	 * check if it visible after a x amount of scrolls
	 *
	 * @param {element} element
	 * @param {number} maxScrolls
	 * @param {number} amount
	 * @param {string} swipeDirection
	 */
	static scrollToElement({ element, maxScrolls = 10, amount = 0, swipeDirection }) {
		if ((!element.isExisting() || !element.isDisplayed()) && amount <= maxScrolls) {
			this[ `swipe${ swipeDirection.toLowerCase() === 'up' ? 'Up' : 'Down' }` ](0.50);
			this.scrollToElement({ element, maxScrolls, amount: amount + 1, swipeDirection });
		} else if (amount > maxScrolls) {
			throw new Error(`The element '${ element }' could not be found or is not visible.`);
		}
	}

	/**
	 * Swipe down based on a percentage
	 *
	 * @param {number} percentage from 0 - 1
	 */
	static swipeDown(percentage = 1) {
		this.swipeOnPercentage(
			this._calculateXY(SWIPE_DIRECTION.down.start, percentage),
			this._calculateXY(SWIPE_DIRECTION.down.end, percentage),
		);
	}

	/**
	 * Swipe Up based on a percentage
	 *
	 * @param {number} percentage from 0 - 1
	 */
	static swipeUp(percentage = 1) {
		this.swipeOnPercentage(
			this._calculateXY(SWIPE_DIRECTION.up.start, percentage),
			this._calculateXY(SWIPE_DIRECTION.up.end, percentage),
		);
	}

	/**
	 * Swipe left based on a percentage
	 *
	 * @param {number} percentage from 0 - 1
	 */
	static swipeLeft(percentage = 1) {
		this.swipeOnPercentage(
			this._calculateXY(SWIPE_DIRECTION.left.start, percentage),
			this._calculateXY(SWIPE_DIRECTION.left.end, percentage),
		);
	}

	/**
	 * Swipe right based on a percentage
	 *
	 * @param {number} percentage from 0 - 1
	 */
	static swipeRight(percentage = 1) {
		this.swipeOnPercentage(
			this._calculateXY(SWIPE_DIRECTION.right.start, percentage),
			this._calculateXY(SWIPE_DIRECTION.right.end, percentage),
		);
	}

	/**
	 * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
	 * percentages of the screen.
	 *
	 * @param {object} from { x: 50, y: 50 }
	 * @param {object} to { x: 25, y: 25 }
	 *
	 * @example
	 * <pre>
	 *   // This is a swipe to the left
	 *   const from = { x: 50, y:50 }
	 *   const to = { x: 25, y:50 }
	 * </pre>
	 */
	static swipeOnPercentage(from, to) {
		SCREEN_SIZE = SCREEN_SIZE || driver.getWindowRect();
		const pressOptions = this._getDeviceScreenCoordinates(SCREEN_SIZE, from);
		const moveToScreenCoordinates = this._getDeviceScreenCoordinates(SCREEN_SIZE, to);
		this.swipe(
			pressOptions,
			moveToScreenCoordinates,
		);
	}

	/**
	 * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
	 *
	 * @param {object} from { x: 50, y: 50 }
	 * @param {object} to { x: 25, y: 25 }
	 *
	 * @example
	 * <pre>
	 *   // This is a swipe to the left
	 *   const from = { x: 50, y:50 }
	 *   const to = { x: 25, y:50 }
	 * </pre>
	 */
	static swipe(from, to) {
		driver.touchPerform([ {
			action: 'press',
			options: from,
		}, {
			action: 'wait',
			options: { ms: 1000 },
		}, {
			action: 'moveTo',
			options: to,
		}, {
			action: 'release',
		} ]);
		driver.pause(1000);
	}

	/**
	 * Get the screen coordinates based on a device his screensize
	 *
	 * @param {number} screenSize the size of the screen
	 * @param {object} coordinates like { x: 50, y: 50 }
	 *
	 * @return {{x: number, y: number}}
	 *
	 * @private
	 */
	static _getDeviceScreenCoordinates(screenSize, coordinates) {
		return {
			x: Math.round(screenSize.width * (coordinates.x / 100)),
			y: Math.round(screenSize.height * (coordinates.y / 100)),
		};
	}

	/**
	 * Calculate the x y coordinates based on a percentage
	 *
	 * @param {object} coordinates
	 * @param {number} percentage
	 *
	 * @return {{x: number, y: number}}
	 *
	 * @private
	 */
	static _calculateXY({ x, y }, percentage) {
		return {
			x: x * percentage,
			y: y * percentage,
		};
	}

	/**
	 * Drag an element from position A to B
	 *
	 * @param {Element} draggableElement
	 * @param {Element} dropZoneElement
	 */
	static dragAndDrop(draggableElement, dropZoneElement) {
		// Get the dropzone and the draggable element rectangles
		const dropZoneRec = driver.getElementRect(dropZoneElement.elementId);
		const dragElementRec = driver.getElementRect(draggableElement.elementId);

		// See http://appium.io/docs/en/commands/interactions/actions/#actions
		driver.performActions([ {
			type: 'pointer',
			id: 'finger1',
			parameters: { pointerType: 'touch' },
			actions: [
				// Pick the center of the draggable element
				{
					type: 'pointerMove',
					duration: 0,
					x: dragElementRec.x + dragElementRec.width / 2,
					y: dragElementRec.y + dragElementRec.height / 2,
				},
				{ type: 'pointerDown', button: 0 },
				{ type: 'pause', duration: 250 },
				// Finger moves a small amount very quickly to trigger the event
				{
					type: 'pointerMove',
					duration: 1,
					x: dragElementRec.x + dragElementRec.width / 2,
					y: dragElementRec.y + dragElementRec.height / 2 - 10,
				},
				{ type: 'pause', duration: 100 },
				// Move it to the center of the drop zone
				{
					type: 'pointerMove',
					duration: 250,
					x: dropZoneRec.x + dropZoneRec.width / 2,
					y: dropZoneRec.y + dropZoneRec.height / 2,
				},
				{ type: 'pointerUp', button: 0 },
			],
		} ]);
	}

	/**
	 * Pinch or zoom an element (pinch doesn't work on Android with this method yet)
	 *
	 * @param {Element} element
	 * @param {string} gesture Possible values are `zoom|pinch`
	 */
	static pinchAndZoom(element, gesture = 'zoom') {
		const isZoom = gesture.toLowerCase() === 'zoom';
		const { x, y, width, height } = driver.getElementRect(element.elementId);
		const centerX = x + width / 2;
		const centerY = y + height / 2;
		// iOS seems to respond 'heavier' on a position change, so make it way smaller
		const xPosition = driver.isIOS ? 10 : width / 2;
		const finger1 = {
			start: { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
			end: { type: 'pointerMove', duration: 250, x: centerX - xPosition, y: centerY },
		};
		const finger2 = {
			start: { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
			end: { type: 'pointerMove', duration: 250, x: centerX + xPosition, y: centerY },
		};

		driver.performActions([
			// First finger
			{
				type: 'pointer',
				id: 'finger1',
				parameters: { pointerType: 'touch' },
				actions: [
					// move finger into start position
					isZoom ? finger1.start : finger1.end,
					// finger comes down into contact with screen
					{ type: 'pointerDown', button: 0 },
					// pause for a little bit
					{ type: 'pause', duration: 100 },
					// finger moves to end position
					isZoom ? finger1.end : finger1.start,
					// finger lets up, off the screen
					{ type: 'pointerUp', button: 0 },
				],
			},
			// Second finger
			{
				type: 'pointer',
				id: 'finger2',
				parameters: { pointerType: 'touch' },
				actions: [
					// move finger into start position
					isZoom ? finger2.start : finger2.end,
					// finger comes down into contact with screen
					{ type: 'pointerDown', button: 0 },
					// pause for a little bit
					{ type: 'pause', duration: 100 },
					// finger moves to end position
					isZoom ? finger2.end : finger2.start,
					// finger lets up, off the screen
					{ type: 'pointerUp', button: 0 },
				],
			},
		]);
	}

	/**
	 * Pinch or zoom an element (pinch doesn't work on Android with this method yet)
	 *
	 * @param {Element} element
	 */
	static swipeItemLeft(element) {
		const { x, y, width, height } = driver.getElementRect(element.elementId);
		const centerX = x + width / 2;
		const centerY = y + height / 2;

		driver.performActions([
			{
				type: 'pointer',
				id: 'finger1',
				parameters: { pointerType: 'touch' },
				actions: [
					// move finger into start position
					{ type: 'pointerMove', duration: 0, x: centerX, y: centerY },
					// finger comes down into contact with screen
					{ type: 'pointerDown', button: 0 },
					// pause for a little bit
					{ type: 'pause', duration: 100 },
					// finger moves to end position
					{ type: 'pointerMove', duration: 250, x: centerX - width / 4, y: centerY },
					// finger lets up, off the screen
					{ type: 'pointerUp', button: 0 },
				],
			},
		]);
	}
}

export default Gestures;

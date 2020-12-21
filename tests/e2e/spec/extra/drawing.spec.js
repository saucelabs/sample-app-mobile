import { openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import Drawing from '../../screenObjects/drawing';

describe('Drawing', () => {
	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
	});

	it('should be able to draw the Sauce Bolt', () => {
		openDeepLinkUrl('drawing');
		Drawing.waitForIsShown();

		driver.pause(3000);

		// Calculate the center
		const { width, height } = driver.getWindowRect();
		const centerX = width / 2;
		const centerY = height / 2;
		const dpr = driver.isIOS ? 1 : driver.capabilities.pixelRatio;

		driver.performActions([
			{
				type: 'pointer',
				id: 'finger1',
				parameters: { pointerType: 'touch' },
				actions: [
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 60), y: centerY + (dpr * -91) },
					{ type: 'pointerDown', button: 0 },
					{ type: 'pause', duration: 10 },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -77), y: centerY + (dpr * 46.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 44), y: centerY + (dpr * 48.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -44), y: centerY + (dpr * 136.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -10.5), y: centerY + (dpr * 69.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -99), y: centerY + (dpr * 68.5) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -99), y: centerY + (dpr * 68.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -100), y: centerY + (dpr * 60.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -101.5), y: centerY + (dpr * 51) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -102), y: centerY + (dpr * 41.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -102), y: centerY + (dpr * 33) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -100.5), y: centerY + (dpr * 22.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -98.5), y: centerY + (dpr * 13.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -95.5), y: centerY + (dpr * 3) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -91.5), y: centerY + (dpr * -6) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -87.5), y: centerY + (dpr * -13.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -82), y: centerY + (dpr * -20.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -77), y: centerY + (dpr * -27.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -69), y: centerY + (dpr * -34) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -62.5), y: centerY + (dpr * -39.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -52.5), y: centerY + (dpr * -46) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -45), y: centerY + (dpr * -51) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -36), y: centerY + (dpr * -55) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -27), y: centerY + (dpr * -58) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -19.5), y: centerY + (dpr * -60) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -10), y: centerY + (dpr * -62) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -2.5), y: centerY + (dpr * -62.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 2.5), y: centerY + (dpr * -63) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 2.5), y: centerY + (dpr * -63) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 16), y: centerY + (dpr * -75) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 6.5), y: centerY + (dpr * -76) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -3.5), y: centerY + (dpr * -76) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -14), y: centerY + (dpr * -76) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -22.5), y: centerY + (dpr * -74) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -32), y: centerY + (dpr * -71.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -39), y: centerY + (dpr * -69) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -47.5), y: centerY + (dpr * -66) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -57.5), y: centerY + (dpr * -61) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -65.5), y: centerY + (dpr * -56) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -77), y: centerY + (dpr * -47.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -84), y: centerY + (dpr * -40) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -90.5), y: centerY + (dpr * -32.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -98), y: centerY + (dpr * -24) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -105.5), y: centerY + (dpr * -12) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -110.5), y: centerY + (dpr * 0) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -115), y: centerY + (dpr * 14) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -117), y: centerY + (dpr * 28.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -117), y: centerY + (dpr * 42) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -115.5), y: centerY + (dpr * 56) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -113), y: centerY + (dpr * 69.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -109), y: centerY + (dpr * 82.5) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -109), y: centerY + (dpr * 82.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -32.5), y: centerY + (dpr * 84) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -75), y: centerY + (dpr * 163) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -75), y: centerY + (dpr * 163) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -83.5), y: centerY + (dpr * 159) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -92), y: centerY + (dpr * 152.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -99.5), y: centerY + (dpr * 146) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -108.5), y: centerY + (dpr * 135.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -118), y: centerY + (dpr * 124) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -124.5), y: centerY + (dpr * 113.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -133), y: centerY + (dpr * 97.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -137.5), y: centerY + (dpr * 83) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -140.5), y: centerY + (dpr * 66.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -143.5), y: centerY + (dpr * 46) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -143), y: centerY + (dpr * 27) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -141), y: centerY + (dpr * 9.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -138), y: centerY + (dpr * -7) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -130.5), y: centerY + (dpr * -20) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -124), y: centerY + (dpr * -34) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -115), y: centerY + (dpr * -47) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -107), y: centerY + (dpr * -56) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -92.5), y: centerY + (dpr * -69.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -78), y: centerY + (dpr * -79.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -61.5), y: centerY + (dpr * -89.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -44.5), y: centerY + (dpr * -98) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -24.5), y: centerY + (dpr * -104) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * -1.5), y: centerY + (dpr * -105.5) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 15.5), y: centerY + (dpr * -105) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 32.5), y: centerY + (dpr * -101) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 48), y: centerY + (dpr * -98) },
					{ type: 'pointerMove', duration: 10, x: centerX + (dpr * 60), y: centerY + (dpr * -91) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerUp', button: 0 },
				],
			},
		]);

		driver.performActions([
			{
				type: 'pointer',
				id: 'finger1',
				parameters: { pointerType: 'touch' },
				actions: [
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 59.5), y: centerY + (dpr * -91) },
					{ type: 'pointerDown', button: 0 },
					{ type: 'pause', duration: 10 },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 76), y: centerY + (dpr * -82) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 34), y: centerY + (dpr * -2.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 110.5), y: centerY + (dpr * 0.5) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 110.5), y: centerY + (dpr * 0.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 115.5), y: centerY + (dpr * 16.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 116.5), y: centerY + (dpr * 27) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 117.5), y: centerY + (dpr * 45) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 116.5), y: centerY + (dpr * 57) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 114.5), y: centerY + (dpr * 72.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 109.5), y: centerY + (dpr * 87.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 101), y: centerY + (dpr * 103) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 89.5), y: centerY + (dpr * 118) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 75), y: centerY + (dpr * 130) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 60), y: centerY + (dpr * 140.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 44.5), y: centerY + (dpr * 148.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 26.5), y: centerY + (dpr * 155.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 8.5), y: centerY + (dpr * 158.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -6), y: centerY + (dpr * 158.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -14.5), y: centerY + (dpr * 157) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -3.5), y: centerY + (dpr * 143.5) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -3.5), y: centerY + (dpr * 143.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 11), y: centerY + (dpr * 143) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 28), y: centerY + (dpr * 140.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 41.5), y: centerY + (dpr * 135) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 59), y: centerY + (dpr * 126.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 71), y: centerY + (dpr * 116) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 84), y: centerY + (dpr * 102) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 93), y: centerY + (dpr * 86.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 99.5), y: centerY + (dpr * 70.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 102.5), y: centerY + (dpr * 55.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 103.5), y: centerY + (dpr * 39.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 102), y: centerY + (dpr * 25) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 99.5), y: centerY + (dpr * 14) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 99.5), y: centerY + (dpr * 14) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 11.5), y: centerY + (dpr * 11.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 46), y: centerY + (dpr * -56.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -43.5), y: centerY + (dpr * 33.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * 77.5), y: centerY + (dpr * 33.5) },
					{ type: 'pointerMove', duration: 100, x: centerX + (dpr * -59.5), y: centerY + (dpr * 172.5) },

					{ type: 'pause', duration: 1000 },

					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -59.5), y: centerY + (dpr * 172.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -47), y: centerY + (dpr * 177) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -32.5), y: centerY + (dpr * 181.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * -14.5), y: centerY + (dpr * 185) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 7.5), y: centerY + (dpr * 184.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 25.5), y: centerY + (dpr * 182.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 43), y: centerY + (dpr * 178.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 64), y: centerY + (dpr * 171.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 78), y: centerY + (dpr * 164) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 92), y: centerY + (dpr * 153) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 105), y: centerY + (dpr * 141) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 117.5), y: centerY + (dpr * 125) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 129), y: centerY + (dpr * 106) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 138.5), y: centerY + (dpr * 86) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 144), y: centerY + (dpr * 65) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 146), y: centerY + (dpr * 45.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 144.5), y: centerY + (dpr * 22.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 139.5), y: centerY + (dpr * 0) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 133), y: centerY + (dpr * -17.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 122), y: centerY + (dpr * -35.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 114), y: centerY + (dpr * -50.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 99), y: centerY + (dpr * -64.5) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 89), y: centerY + (dpr * -74) },
					{ type: 'pointerMove', duration: 25, x: centerX + (dpr * 76), y: centerY + (dpr * -81.5) },

					{ type: 'pointerUp', button: 0 },
				],
			},
		]);

		// For demo purpose
		driver.pause(3000);

		// Store a screenshot
		driver.saveScreenshot(`${process.cwd()}/${driver.capabilities.deviceName}-drawing.png`);
	});
});

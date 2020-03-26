import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Signature from 'react-native-signature-canvas';
import SecondaryHeader from '../components/SecondaryHeader';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import { JsHtmlPage } from '../config/DrawHtmlPage';

export default class Draw extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signature: null,
		};
	}

	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
	}

	handleEmpty = () => {
		console.log('Empty');
	};

	render() {
		return (
			<ThemeProvider>
				<SecondaryHeader/>
				<View style={ styles.container }>
					<Signature
						onEmpty={ this.handleEmpty }
						clearText="Clear"
						confirmText="Save"
						customHtml={ JsHtmlPage }
					/>
				</View>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

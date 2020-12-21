import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import { InventoryData } from '../data/inventory-data.js';
import I18n from '../config/I18n';
import { testProperties } from '../config/TestProperties';
import { colors } from '../utils/colors';
import Footer from '../components/Footer';
import InventoryListItem from '../components/InventoryListItem';
import toggleRow from '../../img/toggle-row.png';
import toggleGrid from '../../img/toggle-grid.png';
import SecondaryHeader from '../components/SecondaryHeader';
import { ShoppingCart } from '../shopping-cart';
import { handleQuickActionsNavigation } from '../config/QuickActionsNavigation';
import { MUSEO_SANS_NORMAL } from '../config/Constants';

export default class InventoryList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inventoryList: InventoryData.ITEMS_NAME_AZ,
			scrollEnabled: true,
			drag: false,
			sortState: 'az',
			menuOpen: false,
			gridView: true,
			dropZoneValues: {
				bottom: 0,
				left: 0,
				right: 0,
				top: 0,
			},
		};

		this.changeSort = this.changeSort.bind(this);
		this.sortNameAZ = this.sortNameAZ.bind(this);
		this.sortNameZA = this.sortNameZA.bind(this);
		this.sortPriceLoHi = this.sortPriceLoHi.bind(this);
		this.sortPriceHiLo = this.sortPriceHiLo.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.toggleState = this.toggleState.bind(this);
		this.toggleImage = this.toggleImage.bind(this);
		this.scrollEnabled = this.scrollEnabled.bind(this);
		this.dragEnabled = this.dragEnabled.bind(this);

		// If provided through deeplink, add the items to the cart
		ShoppingCart.addDeeplinkItems(this.props.navigation.getParam('ids', ''));
	}

	componentDidMount() {
		handleQuickActionsNavigation(this.props.navigation);
	}

	changeSort(sortType) {
		switch (sortType) {
			case 'az':
				this.sortNameAZ();
				break;
			case 'za':
				this.sortNameZA();
				break;
			case 'lohi':
				this.sortPriceLoHi();
				break;
			case 'hilo':
				this.sortPriceHiLo();
				break;
			default:
				break;
		}
	}

	sortNameAZ() {
		this.setState({
			inventoryList: InventoryData.ITEMS_NAME_AZ,
			sortState: 'az',
		});
	}

	sortNameZA() {
		this.setState({
			inventoryList: InventoryData.ITEMS_NAME_ZA,
			sortState: 'za',
		});
	}

	sortPriceLoHi() {
		this.setState({
			inventoryList: InventoryData.ITEMS_PRICE_LOHI,
			sortState: 'lohi',
		});
	}

	sortPriceHiLo() {
		this.setState({
			inventoryList: InventoryData.ITEMS_PRICE_HILO,
			sortState: 'hilo',
		});
	}

	openMenu() {
		this.setState({ menuOpen: true });
	}

	closeMenu() {
		this.setState({ menuOpen: false });
	}

	toggleState() {
		this.setState({ gridView: !this.state.gridView });
	}

	toggleImage() {
		return (
			<Image
				style={ styles.toggle_image }
				resizeMode="contain"
				source={ this.state.gridView ? toggleRow : toggleGrid }
			/>
		);
	}

	scrollEnabled() {
		this.setState({ scrollEnabled: !this.state.scrollEnabled });
	}

	dragEnabled(dragStatus) {
		this.setState({ drag: dragStatus });
	}

	keyExtractor = item => item.name;

	setDropZoneValues = () => {
		this.dropZone.measure((x, y, width, height, pageX, pageY) => {
			this.setState({
				dropZoneValues: {
					bottom: pageY + 65,
					left: pageX,
					right: pageX + width,
					top: pageY,
				},
			});
		});
	};

	render() {
		const sortOptions = [
			{ key: 'sectionLabel', section: true, label: I18n.t('modalSelector.sectionLabel') },
			{ key: 'az', label: I18n.t('modalSelector.azLabel') },
			{ key: 'za', label: I18n.t('modalSelector.zaLabel') },
			{ key: 'lohi', label: I18n.t('modalSelector.loHiLabel') },
			{ key: 'hilo', label: I18n.t('modalSelector.hiLoLabel') },
		];
		const headerButtons = (
			<View style={ styles.component_container }>
				<TouchableOpacity
					style={ styles.toggle }
					{ ...testProperties(I18n.t('inventoryListPage.toggle')) }
					onPress={ this.toggleState }
				>
					{ this.toggleImage() }
				</TouchableOpacity>
				<View { ...testProperties(I18n.t('modalSelector.button')) }>
					<ModalSelector
						data={ sortOptions }
						style={ styles.selector }
						selectTextStyle={ styles.selector_text }
						onChange={ (sortOption) => this.changeSort(sortOption.key) }
						cancelText={ I18n.t('modalSelector.cancel') }
						listItemAccessible
						cancelButtonAccessible={false}
						openButtonContainerAccessible
						scrollViewAccessibilityLabel={ I18n.t('modalSelector.container') }
					>
						<Image
							style={ styles.selector_image }
							resizeMode="contain"
							source={ require('../../img/filter-button.png') }
						/>
					</ModalSelector>
				</View>
			</View>
		);

		return (
			<ThemeProvider>
				<View { ...testProperties(I18n.t('inventoryListPage.dropZone')) } ref={ dropZone => {this.dropZone = dropZone;} }>
					{ !this.state.drag && (
						<SecondaryHeader
							header={ I18n.t('inventoryListPage.header') }
							component={ headerButtons }
						/>
					) }
					{ this.state.drag && (
						<View style={ styles.dragCartContainer }>
							<Text style={ styles.dragCartText }>Drag here to add to cart!</Text>
						</View>
					) }
				</View>
				<FlatList
					data={ this.state.inventoryList }
					keyExtractor={ this.keyExtractor }
					key={ (this.state.gridView) ? 1 : 0 }
					numColumns={ this.state.gridView ? 2 : 1 }
					scrollEnabled={ this.state.scrollEnabled }
					renderItem={ ({ item, index }) =>
						<InventoryListItem
							key={ item.id }
							id={ item.id }
							image_url={ item.image_url }
							name={ item.name }
							desc={ item.desc }
							price={ item.price }
							navigation={ this.props.navigation }
							index={ index }
							gridView={ this.state.gridView }
							disableScroll={ this.scrollEnabled }
							enableDrag={ this.dragEnabled }
							draggable={ this.state.drag }
							dropZoneValues={ this.state.dropZoneValues }
							setDropZoneValues={ this.setDropZoneValues }
						/>
					}
					style={ [
						styles.scrollContainer,
						this.state.drag ? styles.dragScrollContainer : {},
						this.state.drag ? styles.activeDragFlatList : styles.inActiveDragFlatList,
					] }
					keyboardShouldPersistTaps="handled"
					{ ...testProperties(I18n.t('inventoryListPage.screen')) }
					ListFooterComponent={ <Footer/> }
				/>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	component_container: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	toggle: {
		marginRight: 10,
	},
	toggle_image: {
		height: 40,
		width: 40,
	},
	selector: {
		height: 40,
	},
	selector_text: {
		color: colors.white,
	},
	selector_image: {
		backgroundColor: colors.white,
		height: 40,
		width: 40,
	},
	scrollContainer: {
		flex: 1,
	},
	dragScrollContainer: {
		zIndex: 5,
	},
	dragCartContainer: {
		borderWidth: 2,
		borderColor: colors.slRed,
		borderStyle: 'dashed',
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		height: 65,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: 2,
	},
	dragCartText: {
		color: colors.slRed,
		fontSize: 22,
		fontFamily: MUSEO_SANS_NORMAL,
	},
	inActiveDragFlatList: {
		paddingTop: 0,
	},
	activeDragFlatList: {
		paddingTop: 65,
	},
});

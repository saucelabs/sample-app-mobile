import I18n from '../config/I18n';

export class InventoryData {}

InventoryData.ITEMS = [
	{
		name: I18n.t('products.backpack.name'),
		desc: I18n.t('products.backpack.desc'),
		price: I18n.t('products.backpack.price'),
		image_url: require('../../img/sauce-backpack.jpg'),
	},
	{
		name: I18n.t('products.bikeLight.name'),
		desc: I18n.t('products.bikeLight.desc'),
		price: I18n.t('products.bikeLight.price'),
		image_url: require('../../img/bike-light.jpg'),
	},
	{
		name: I18n.t('products.boltShirt.name'),
		desc: I18n.t('products.boltShirt.desc'),
		price: I18n.t('products.boltShirt.price'),
		image_url: require('../../img/bolt-shirt.jpg'),
	},
	{
		name: I18n.t('products.fleeceJacket.name'),
		desc: I18n.t('products.fleeceJacket.desc'),
		price: I18n.t('products.fleeceJacket.price'),
		image_url: require('../../img/sauce-pullover.jpg'),
	},
	{
		name: I18n.t('products.onesie.name'),
		desc: I18n.t('products.onesie.desc'),
		price: I18n.t('products.onesie.price'),
		image_url: require('../../img/red-onesie.jpg'),
	},
	{
		name: I18n.t('products.tattRed.name'),
		desc: I18n.t('products.tattRed.desc'),
		price: I18n.t('products.tattRed.price'),
		image_url: require('../../img/red-tatt.jpg'),
	},
];

InventoryData.ITEMS.map((item, i) => {
	// Dynamically map our item IDs based on their positions in the item array
	item.id = i;
});

InventoryData.ITEMS_NAME_AZ = InventoryData.ITEMS.slice().sort(function (a, b) {
	return a.name.localeCompare(b.name);
});

InventoryData.ITEMS_NAME_ZA = InventoryData.ITEMS_NAME_AZ.slice().reverse();


InventoryData.ITEMS_PRICE_LOHI = InventoryData.ITEMS.slice().sort(function (a, b) {
	return a.price - b.price;
});

InventoryData.ITEMS_PRICE_HILO = InventoryData.ITEMS_PRICE_LOHI.slice().reverse();

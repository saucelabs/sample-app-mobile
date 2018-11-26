import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, ScrollView, Image, Picker} from 'react-native';
import {Button, ThemeProvider, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Credentials } from '../credentials.js';
import { InventoryData } from '../data/inventory-data.js';

class InventoryListItem extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      id: props.id,
      image_url: props.image_url,
      name: props.name,
      desc: props.desc,
      price: props.price,
    };
  }

  render () {    

    var cartButton;
    
//    if (this.state.itemInCart) {
//      cartButton = <Button style={styles.item_cart_button} title="REMOVE"/>;
//    } else {
      cartButton = <Button style={styles.item_cart_button} title="ADD TO CART"/>;
//    }
//    <button className="add-to-cart-button" onClick={() => this.addToCart(this.state.id)}>ADD TO CART</button>
  
    return (
      <View style={styles.item_container}>
        <Image source={this.state.image_url} style={styles.item_image} />
        <View style={styles.item_infobox}>
          <View style={styles.item_details}>
            <Text style={styles.item_name}>{this.state.name}</Text>
            <Text style={styles.item_desc}>{this.state.desc}</Text>
          </View>
          <View style={styles.item_price_bar}>
            <Text style={styles.price_text}>${this.state.price}</Text>
            { cartButton }
          </View>
        </View>
      </View>
    );
  }
}

export default class InventoryListPage extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        inventoryList: InventoryData.ITEMS_NAME_AZ,
        sortState: "az"
    };

    this.changeSort = this.changeSort.bind(this);
    this.sortNameAZ = this.sortNameAZ.bind(this);
    this.sortNameZA = this.sortNameZA.bind(this);
    this.sortPriceLoHi = this.sortPriceLoHi.bind(this);
    this.sortPriceHiLo = this.sortPriceHiLo.bind(this);
  }

  changeSort(sortType) {
    switch (sortType){
      case "az":
        this.sortNameAZ();
        break;
      case "za":
        this.sortNameZA();
        break;
      case "lohi":
        this.sortPriceLoHi();
        break;
      case "hilo":
        this.sortPriceHiLo();
        break;
      default:
        break;
    }
  }
  
  sortNameAZ() {
    this.setState({
      inventoryList: InventoryData.ITEMS_NAME_AZ,
      sortState: "az"
    });
  }

  sortNameZA() {
    this.setState({
      inventoryList: InventoryData.ITEMS_NAME_ZA,
      sortState: "za"
    });
  }

  sortPriceLoHi() {
    this.setState({
      inventoryList: InventoryData.ITEMS_PRICE_LOHI,
      sortState: "lohi"
    });
  }

  sortPriceHiLo() {
    this.setState({
      inventoryList: InventoryData.ITEMS_PRICE_HILO,
      sortState: "hilo"
    });
  }

  render() {
    
    return (
      <ThemeProvider>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Swag Labs', style: { color: '#fff' } }}
          rightComponent={{ icon: 'shopping-cart', color: '#fff' }}
        />
      <Image source={require('../../img/peek.png')} style={styles.peek_img} />
      <View style={styles.secondary_header}>
        <Text style={styles.header_title}>Products</Text>
        <Picker selectedValue={this.state.sortState} style={styles.item_sort} itemStyle={styles.sort_text} onValueChange={(itemValue, itemIndex) => this.changeSort(itemValue)}>
          <Picker.Item label="Name (A to Z)" value="az" />
          <Picker.Item label="Name (Z to A)" value="za" />
          <Picker.Item label="Price (low to high)" value="lohi" />
          <Picker.Item label="Price (high to low)" value="hilo" />
        </Picker>
      </View>
      <ScrollView style={styles.container}>
        {this.state.inventoryList.map((item, i) => {     
          return (<InventoryListItem key={item.id} id={item.id} image_url={item.image_url} name={item.name} desc={item.desc} price={item.price} />) 
        })}
      </ScrollView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  secondary_header: {
    height: 80,
    backgroundColor: '#474c55',
    flexDirection: 'row'
  },
  header_title: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 90,
    marginTop: 32,
  },
  container: {
    flex: 5,
    backgroundColor: '#FFF',
  },
  item_image: {
    width: 80,
    height: 100,
    flex: 1
  },
  peek_img: {
    width: 71,
    height: 70,
    top: 108,
    left: 5,
    position: 'absolute',
    zIndex: 10
  },
  item_container: {
    flexDirection: 'row',
    padding: 5
  },
  item_infobox: {
    flexDirection: 'column',
    flex: 4,
    padding: 5
  },
  item_price_bar: {
    flexDirection: 'row',
    paddingTop: 5
  },
  item_cart_button: {
    flex: 3,
    backgroundColor: '#57c1e8'
  },
  item_details: {
    flexDirection: 'column'
  },
  price_text: {
    color: '#569210',
    fontSize: 18,
    flex: 2,
    paddingTop: 10
  },
  item_name: {
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 5
  },
  item_desc: {
    
  },
  item_sort: {
    marginLeft: 15,
    width: 140,
    height: 30,
    top: -60
  },
  sort_text: {
    color: '#FFF',
  }
});
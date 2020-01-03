import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { DrawerActions } from 'react-navigation-drawer';

import styles from './HomeScreenStyle';

import HeaderLeft from '../../../../shared/HeaderLeft';
import HeaderRight from '../../../../shared/HeaderRight';
import SideDrawer from '../../../../shared/SideDrawer';

import Search from '../../components/Search';
import DotsMenu from '../../components/DotsMenu';
import SlidePanel from '../../components/SlidePanel';
import Product from '../../components/Product';

import c from '../../constants';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: {
        marginTop: 20
      },
      headerLeft: () => <HeaderLeft openDrawer={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>,
      headerRight: () => <HeaderRight goTo={() => navigation.navigate('CartHome')} />
    };
  };
  constructor(props) {
    super(props);
    this.state = {
        carouselItems: [
          {
            image: require('../../../../assets/images/carousel1.png')
          },
          {
            image: require('../../../../assets/images/carousel1.png')
          },
          {
            image: require('../../../../assets/images/carousel1.png')
          }
        ]
    }
    this._showProducts = this._showProducts.bind(this);
  }

  _renderItem({item,index}){
    return (
      <View>
          <Image source={item.image} style={{width: '100%'}}/>
      </View>
    )
  }

  _showProducts() {
    let prodArray = c
    return(
      prodArray.map(item =>
        <Product
          prodImage={item.image}
          prodName={item.name}
          prodPrice={item.price}
          prodOrigPrice={item.origPrice}
          nav={this.props.navigation}
        />
      )
    )
  }

  render() {
    const horizontalMargin = 0;
    const slideWidth = 280;
    const sliderWidth = Dimensions.get('window').width;
    const itemWidth = slideWidth + horizontalMargin * 2;
    const productsArray = this._showProducts();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="dark-content"/>
        <View style={styles.searchContainer}>
          <Search />
          <DotsMenu nav={this.props.navigation}/>
        </View>
        <View style={styles.discoverContainer}>
          <Text style={styles.discoverBold}>Discover</Text>
          <Text style={styles.seeGrey}>See All</Text>
        </View>
        <View style={{
          width: itemWidth
          }}>
          <Carousel
            data={this.state.carouselItems}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={1}
          />
        </View>
        <SlidePanel
          products={productsArray}
        />
      </View>
    );
  }
}

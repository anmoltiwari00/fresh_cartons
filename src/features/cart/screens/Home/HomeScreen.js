import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';

import styles from './HomeScreenStyle';
import HeaderLeft from '../../../../shared/HeaderLeft';
import HeaderRight from '../../../../shared/HeaderRight';
import Product from '../../components/Product';
import Delivery from '../../components/Delivery';

export default class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: {
        marginTop: 20
      },
      headerLeft: () => <HeaderLeft back onBack={() => navigation.goBack()}/>
    };
  };
  constructor(props){
    super(props);
    this.state = {
      cart: {
        total: 1575,
        cart: [
          {
            name: 'Virgin Olive Olive',
            image: require('../../../../assets/images/s1.png'),
            price: '1500',
            origPrice: '1600',
            quant: 1,
            desc: '500 ml'
          },
          {
            name: 'Domino Sugar',
            image: require('../../../../assets/images/s2.png'),
            price: '75',
            origPrice: '90',
            quant: 1,
            desc: '1 kg'
          }
        ]
      }
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} barStyle="light-content"/>
        <View style={styles.parent}>
          <ScrollView>
            <View><Text style={styles.headingText}>My Cart</Text></View>
            <View style={{alignItems: 'center'}}>
              <Product product={this.state.cart.cart} />
              <Delivery />
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>- ₹{this.state.cart.total}</Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.white}>Checkout</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity><Text style={styles.orangeText}>Continue Shopping</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

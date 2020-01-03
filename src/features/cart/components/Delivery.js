import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

export default class Delivery extends PureComponent {

  render() {
    return(
        <View style={styles.orderContainer}>
          <Image source={require('../../../assets/images/delivery.png')} style={styles.image} resizeMode="contain" />
          <View>
            <Text style={styles.blackDate}>Delivery</Text>
            <Text style={styles.greyDate}>Hurray! Your delivery is free</Text>
          </View>
          <View>
            <View>
              <Text style={styles.boldText}>-₹0.00</Text>
            </View>
          </View>
        </View>
    )
  }
}

export const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    elevation: 10,
    padding: 20,
    width: '90%',
    backgroundColor: 'white',
    marginBottom: '5%'
  },
  boldText: {
    fontWeight: 'bold'
  },
  blackDate: {
    fontSize: 16
  },
  greyDate: {
    fontSize: 16,
    color: 'black',
    opacity: 0.36
  },
  image: {
    width: '25%',
    marginRight: '2%'
  },
  white: {
    color: 'white'
  }
})

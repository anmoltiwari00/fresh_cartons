import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

export default class Product extends PureComponent {

  render() {
    const { product } = this.props;
    return(
        <View>
            {
              product.map(item =>
                <View style={styles.orderContainer}>
                  <Image source={item.image} style={styles.image} resizeMode="contain"/>
                  <View style={[styles.inColumn, styles.fixedWidth]}>
                    <Text style={styles.blackDate}>{item.name}</Text>
                    <Text style={styles.greyDate}>{item.desc}</Text>
                  </View>
                  <View style={[styles.inColumn, styles.spaceLeft]}>
                    <View style={styles.inLine}>
                      <Text style={styles.boldText}>-₹{item.price}</Text>
                      <Text style={styles.strike}>₹{item.origPrice}</Text>
                    </View>
                    <View style={styles.inLine}>
                      <TouchableOpacity style={styles.active}>
                        <Text style={styles.white}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quant}>{item.quant}</Text>
                      <TouchableOpacity style={styles.active}>
                        <Text style={styles.white}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            }
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
    padding: 10,
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
  active: {
    backgroundColor: '#FF8900',
    width: '15%',
    borderRadius: 5,
    paddingVertical: '1%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  white: {
    color: 'white'
  },
  inColumn: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  strike: {
    textDecorationLine: 'line-through',
    color: 'black',
    opacity: 0.36,
    fontSize: 10
  },
  inLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fixedWidth: {
    width: '30%'
  },
  spaceLeft: {
    alignItems: 'center'
  },
  quant: {
    marginHorizontal: '5%'
  }
})

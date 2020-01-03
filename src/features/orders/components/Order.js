import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

export default class Order extends PureComponent {
  _getJustDate(date) {
    let d = date.split(' ');
    return d[0]+' '+d[1]+' '+d[2];
  }
  render() {
    const { orders } = this.props;
    return(
        <View>
            {
              orders.map(item =>
                <View style={styles.orderContainer}>
                  <View style={styles.sameLine}>
                    <Image source={item.image} style={styles.image} resizeMode="contain"/>
                    <View style={styles.orderDetails}>
                      <Text style={styles.blackDate}>{this._getJustDate(item.date)}</Text>
                      {
                        item.prods.map(i => <Text numberOfLines={1} style={styles.prods}>{i.name}  x  {i.quant}</Text>)
                      }
                      <Text style={styles.greyDate}>{item.date}</Text>
                    </View>
                    <View style={styles.inTheEnd}>
                      <Text style={styles.boldText}>- ₹{item.total}</Text>
                    </View>
                  </View>
                  <View style={styles.sameLine}>
                    <TouchableOpacity style={styles.active}>
                      <Text style={styles.white}>Reorder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inactive}>
                      <Text style={styles.orange}>Details</Text>
                    </TouchableOpacity>
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
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 20,
    padding: 15,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: '5%'
  },
  sameLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold'
  },
  orderDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  blackDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '3%'
  },
  greyDate: {
    fontSize: 10,
    color: 'black',
    opacity: 0.36
  },
  prods: {
    fontSize: 16,
    color: '#5E5E5E',
    opacity: 0.8,
    marginBottom: '3%'
  },
  inTheEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  image: {
    width: '25%',
    marginRight: '2%'
  },
  active: {
    backgroundColor: '#FF8900',
    borderRadius: 10,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: '2%',
    marginRight: '5%'
  },
  inactive: {
    borderWidth: 1,
    borderColor: '#FF8900',
    borderRadius: 10,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: '2%'
  },
  white: {
    color: 'white'
  },
  orange: {
    color: '#FF8900'
  }
})

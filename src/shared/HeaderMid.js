import React, { PureComponent } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text
} from 'react-native';

export default class HeaderMid extends PureComponent {
  render() {
    const { mid } = this.props;
    return(
      <View>
        {
          mid ?
          <View style={styles.container}>
            <Image source={require('../assets/images/address.png')} style={styles.image}/>
            <Text style={styles.address} numberOfLines={1}>501, D Block, Vashi, Sector 17, Navi Mumbai, Mumbai</Text>
          </View> : null
        }
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  address: {
    color: '#A6A6A6',
    fontSize: 14
  },
  image: {
    marginRight: 10
  }
})

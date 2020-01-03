import React, { PureComponent } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

export default class HeaderMid extends PureComponent {
  render() {
    const { mid } = this.props;
    return(
      <View>
        {
          mid ?
          <View>
            <Image source={require('../assets/images/address.png')} />
            <Text style={styles.address}>Vashi, Navi Mumbai</Text>
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
    alignItems: 'center'
  },
  address: {
    color: '#A6A6A6',
    fontSize: 14
  }
})

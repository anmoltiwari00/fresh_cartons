import React, { PureComponent } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class HeaderRight extends PureComponent {
  render() {
    const { white } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.goTo()}>
          {
            white ?
            <Image source={require('../assets/images/cart-white.png')} /> :
            <Image source={require('../assets/images/cart.png')} />
          }
        </TouchableOpacity>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20
  }
})

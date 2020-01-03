import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

export default class DotsMenu extends PureComponent {
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dotsContainer}
          onPress={() => this.props.nav.navigate('Categories')}
        >
          <Image source={require('../../../assets/images/menu-dots.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    marginLeft: '-3%'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 15
  }
})

import React, { PureComponent } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import SideDrawer from './SideDrawer';

export default class HeaderLeft extends PureComponent {
  render() {
    const { back, onBack, openDrawer } = this.props;
    return(
      <View style={styles.container}>
        {
          back ?
          <TouchableOpacity onPress={() => onBack()}>
            <Image source={require('../assets/images/back-white.png')} />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => openDrawer()}>
            <Image source={require('../assets/images/drawer.png')} />
          </TouchableOpacity>
        }
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20
  }
})

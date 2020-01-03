import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text
} from 'react-native'

export default class Search extends PureComponent {
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder='Search'
        />
        <Image source={require('../../../assets/images/search-outline.png')} style={styles.placeholderImage}/>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  inputStyle: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 10,
    padding: 10,
    paddingLeft: '12%'
  },
  inputText: {
    fontSize: 17
  },
  placeholderImage: {
    position: 'absolute',
    left: '4%'
  }
})

import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class SharedFacebookButton extends PureComponent {
  render() {
    const { value, passedStyles, onPress } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, passedStyles]}
          onPress={onPress}
        >
          <Image source={this.props.imgSrc} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{value}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '4%'
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: '#FF8900',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 15
  },
  textContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 17
  }
});

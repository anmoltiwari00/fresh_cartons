import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class SharedButton extends PureComponent {
  render() {
    const { value, passedStyles, onPress } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, passedStyles]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '4%',
    marginTop: '4%'
  },
  button: {
    backgroundColor: '#FF8900',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  }
});

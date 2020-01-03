import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';

export default class SharedInput extends PureComponent {
  render() {
    const { label, passedStyles } = this.props;
    return(
      <View style={styles.container}>
        <Text style={styles.labelInput}>{label}</Text>
        <TextInput
          placeholder={this.props.placeholder}
          style={[styles.defaultInput, passedStyles]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '4%'
  },
  defaultInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAECEF',
    fontSize: 17,
    marginTop: -10,
    paddingBottom: 5
  },
  labelInput: {
    color: '#ACB1C0',
    fontSize: 13
  }
});

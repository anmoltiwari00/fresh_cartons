import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>Main</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
  }
});
